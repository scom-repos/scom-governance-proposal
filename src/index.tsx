import {
    Alert,
    application,
    Button,
    ComboBox,
    Container,
    Control,
    ControlElement,
    customElements,
    FormatUtils,
    IComboItem,
    Input,
    Label,
    Module,
    Panel,
    Styles,
    VStack
} from "@ijstech/components";
import ScomDappContainer from "@scom/scom-dapp-container";
import { INetworkConfig } from "@scom/scom-network-picker";
import ScomTxStatusModal from '@scom/scom-tx-status-modal';
import ScomTokenInput from '@scom/scom-token-input';
import ScomWalletModal, { IWalletPlugin } from "@scom/scom-wallet-modal";
import { IGovernanceProposal, IProposalForm, IValidateStatus, QueueType } from "./interface";
import Assets from './assets';
import { formatNumber, isAddressValid, isClientWalletConnected, nullAddress, State } from "./store/index";
import configData from './data.json';
import { BigNumber, Constants, Wallet } from "@ijstech/eth-wallet";
import customStyles from './index.css';
import { doNewVote, getPair, getVotingValue, parseNewVoteEvent, stakeOf } from "./api";
import { ITokenObject, tokenStore } from "@scom/scom-token-list";
import formSchema from './formSchema';
import ScomGovernanceProposalFlowInitialSetup from "./flow/initialSetup";

const Theme = Styles.Theme.ThemeVars;

interface ScomGovernanceProposalElement extends ControlElement {
    lazyLoad?: boolean;
    networks: INetworkConfig[];
    wallets: IWalletPlugin[];
    defaultChainId?: number;
    showHeader?: boolean;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-governance-proposal']: ScomGovernanceProposalElement;
        }
    }
}

@customElements('i-scom-governance-proposal')
export default class GovernanceProposal extends Module {
    private dappContainer: ScomDappContainer;
    private loadingElm: Panel;
    private lblMinVotingBalance: Label;
    private actionStack: VStack;
    private tokenPairStack: VStack;
    private firstTokenSelection: ScomTokenInput;
    private firstTokenErr: Label;
    private secondTokenSelection: ScomTokenInput;
    private secondTokenErr: Label;
    private lblDuration: Label;
    private durationInput: Input;
    private durationErr: Label;
    private lblDurationMinNote: Label;
    private lblDelay: Label;
    private delayInput: Input;
    private delayErr: Label;
    private lblDelayMinNote: Label;
    private lblDurationMaxNote: Label;
    private quorumInput: Input;
    private quorumErr: Label;
    private lblQuorumNote: Label;
    private thresholdInput: Input;
    private thresholdErr: Label;
    private btnConfirm: Button;
    private proposalAlert: Alert;
    private txStatusModal: ScomTxStatusModal;
    private mdWallet: ScomWalletModal;
    private state: State;
    private _data: IGovernanceProposal = {
        wallets: [],
        networks: []
    };
    tag: any = {};
    private minVoteDurationInDays: number = 0;
    private maxVoteDurationInDays: number = 0;
    private minQuorum: number = 0;
    private minThreshold: number = 0;
    private minDelay: number = 0;
    private currentStake: BigNumber = new BigNumber(0);
    private dayValueDefault: number = 7;
    private dayInSeconds = 24 * 60 * 60;

    private form: IProposalForm = {
        duration: 0,
        quorum: 0,
        value: '',
        dayValue: 0,
        address: '',
        delay: 0,
        threshold: 0,
        tokenName: '',
        systemParamOption: '',
        profileOption: ''
    }
    private validateStatus: IValidateStatus = {}
    private rules = {
        action: [
          {
            required: true,
            message: 'Please select Action'
          }
        ],
        duration: [
          {
            required: true,
            message: `Please select Duration (seconds)`
          },
          {
            message: (minVoteDurationInDays: number, maxVoteDurationInDays: number) => `Duration should be between ${minVoteDurationInDays} and ${maxVoteDurationInDays}`,
            validator: (value: any) => +value >= this.minVoteDurationInDays && +value <= this.maxVoteDurationInDays
          },
        ],
        quorum: [
          {
            required: true,
            message: 'Please input Quorum'
          },
          {
            message: (minQuorum: number) => `Quorum must be greater than or equal to ${minQuorum}`,
            validator: (value: any) => +value >= this.minQuorum
          },
        ],
        address: [
          {
            required: true,
            message: `Please input Address`
          },
          {
            validator: async (value: any) => isAddressValid(value),
            message: `Please enter valid Address`
          },
        ],
        delay: [
          {
            required: true,
            message: `Please select Delay (seconds)`
          },
          {
            message: (minDelay: number) => `Delay must be greater than or equal to ${minDelay}`,
            validator: (value: any) => +value >= this.minDelay
          },
        ],
        threshold: [
          {
            required: true,
            message: `Please input Threshold`
          },
          {
            message: `Threshold must be greater than or equal to 50 and smaller than or equal to 100`,
            validator: (value: any) => +value >= 50 && +value <= 100
          },
        ],
        firstToken: [
            {
                required: true,
                message: 'Please Select a pair'
            },
            {
                validator: (value: any) => value !== this.form.secondToken?.address ?? this.form.secondToken?.symbol,
                message: 'A pair must not be the same'
            },
        ],
        secondToken: [
            {
                required: true,
                message: 'Please Select a pair'
            },
            {
                validator: (value: any) => value !== this.form.firstToken?.address ?? this.form.firstToken?.symbol,
                message: 'A pair must not be the same'
            },
        ]
    }

    private get chainId() {
        return this.state.getChainId();
    }

    get defaultChainId() {
        return this._data.defaultChainId;
    }

    set defaultChainId(value: number) {
        this._data.defaultChainId = value;
    }

    get wallets() {
        return this._data.wallets ?? [];
    }
    set wallets(value: IWalletPlugin[]) {
        this._data.wallets = value;
    }

    get networks() {
        return this._data.networks ?? [];
    }
    set networks(value: INetworkConfig[]) {
        this._data.networks = value;
    }

    get showHeader() {
        return this._data.showHeader ?? true;
    }
    set showHeader(value: boolean) {
        this._data.showHeader = value;
    }

    private get hasEnoughStake() {
        return this.currentStake.gte(this.minThreshold);
    }

    private get isValidToCreateVote() {
        return this.hasEnoughStake;
    }
    
    private get isFlow() {
        return this._data.isFlow ?? false;
    }

    constructor(parent?: Container, options?: any) {
        super(parent, options);
        this.state = new State(configData);
    }

    removeRpcWalletEvents() {
        const rpcWallet = this.state.getRpcWallet();
        if (rpcWallet) rpcWallet.unregisterAllWalletEvents();
    }

    onHide() {
        this.dappContainer.onHide();
        this.removeRpcWalletEvents();
    }

    isEmptyData(value: IGovernanceProposal) {
        return !value || !value.networks || value.networks.length === 0;
    }

    async init() {
        this.isReadyCallbackQueued = true;
        super.init();
        this.firstTokenSelection.title = (
            <i-hstack gap="4px" verticalAlignment="center">
                <i-label caption="Select a token" font={{ color: Theme.colors.primary.main, size: '1.25rem', bold: true }}></i-label>
                <i-icon
                    name="question-circle"
                    fill={Theme.colors.primary.main} width={16} height={16}
                    tooltip={{ content: 'Find a token by searching for its name or symbol or by pasting its address below.', placement: 'right' }}
                ></i-icon>
            </i-hstack>
        );
        this.secondTokenSelection.title = (
            <i-hstack gap="4px" verticalAlignment="center">
                <i-label caption="Select a token" font={{ color: Theme.colors.primary.main, size: '1.25rem', bold: true }}></i-label>
                <i-icon
                    name="question-circle"
                    fill={Theme.colors.primary.main} width={16} height={16}
                    tooltip={{ content: 'Find a token by searching for its name or symbol or by pasting its address below.', placement: 'right' }}
                ></i-icon>
            </i-hstack>
        );
        const lazyLoad = this.getAttribute('lazyLoad', true, false);
        if (!lazyLoad) {
            const networks = this.getAttribute('networks', true);
            const wallets = this.getAttribute('wallets', true);
            const defaultChainId = this.getAttribute('defaultChainId', true);
            const showHeader = this.getAttribute('showHeader', true);
            const data: IGovernanceProposal = {
                networks,
                wallets,
                defaultChainId,
                showHeader
            }
            if (!this.isEmptyData(data)) {
                await this.setData(data);
            }
        }
        this.loadingElm.visible = false;
        this.isReadyCallbackQueued = false;
        this.executeReadyCallback();
    }

    private _getActions(category?: string) {
        const actions: any[] = [];
        if (category && category !== 'offers') {
            actions.push({
                name: 'Edit',
                icon: 'edit',
                command: (builder: any, userInputData: any) => {
                    let oldData: IGovernanceProposal = {
                        wallets: [],
                        networks: []
                    };
                    let oldTag = {};
                    return {
                        execute: () => {
                            oldData = JSON.parse(JSON.stringify(this._data));
                            const { networks } = userInputData;
                            const themeSettings = {};;
                            this._data.networks = networks;
                            this._data.defaultChainId = this._data.networks[0].chainId;
                            this.resetRpcWallet();
                            this.refreshUI();
                            if (builder?.setData)
                                builder.setData(this._data);

                            oldTag = JSON.parse(JSON.stringify(this.tag));
                            if (builder?.setTag)
                                builder.setTag(themeSettings);
                            else
                                this.setTag(themeSettings);
                            if (this.dappContainer)
                                this.dappContainer.setTag(themeSettings);
                        },
                        undo: () => {
                            this._data = JSON.parse(JSON.stringify(oldData));
                            this.refreshUI();
                            if (builder?.setData)
                                builder.setData(this._data);

                            this.tag = JSON.parse(JSON.stringify(oldTag));
                            if (builder?.setTag)
                                builder.setTag(this.tag);
                            else
                                this.setTag(this.tag);
                            if (this.dappContainer)
                                this.dappContainer.setTag(this.tag);
                        },
                        redo: () => { }
                    }
                },
                userInputDataSchema: formSchema.dataSchema,
                userInputUISchema: formSchema.uiSchema,
                customControls: formSchema.customControls()
            });
        }
        return actions;
    }

    private getProjectOwnerActions() {
        const actions: any[] = [
            {
                name: 'Settings',
                userInputDataSchema: formSchema.dataSchema,
                userInputUISchema: formSchema.uiSchema,
                customControls: formSchema.customControls()
            }
        ];
        return actions;
    }

    getConfigurators() {
        return [
            {
                name: 'Project Owner Configurator',
                target: 'Project Owners',
                getProxySelectors: async (chainId: number) => {
                    return [];
                },
                getActions: () => {
                    return this.getProjectOwnerActions();
                },
                getData: this.getData.bind(this),
                setData: async (data: any) => {
                    await this.setData(data);
                },
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            },
            {
                name: 'Builder Configurator',
                target: 'Builders',
                getActions: this._getActions.bind(this),
                getData: this.getData.bind(this),
                setData: async (data: any) => {
                    const defaultData = configData.defaultBuilderData;
                    await this.setData({ ...defaultData, ...data });
                },
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            },
            {
                name: 'Embedder Configurator',
                target: 'Embedders',
                getData: async () => {
                    return { ...this._data }
                },
                setData: async (properties: IGovernanceProposal, linkParams?: Record<string, any>) => {
                    let resultingData = {
                      ...properties
                    };
                    if (!properties.defaultChainId && properties.networks?.length) {
                        resultingData.defaultChainId = properties.networks[0].chainId;
                    }
                    await this.setData(resultingData);
                },
                getTag: this.getTag.bind(this),
                setTag: this.setTag.bind(this)
            }
        ];
    }

    private getData() {
        return this._data;
    }

    private async setData(data: IGovernanceProposal) {
        this._data = data;
        this.resetRpcWallet();
        await this.refreshUI();
    }

    async getTag() {
        return this.tag;
    }

    private updateTag(type: 'light' | 'dark', value: any) {
        this.tag[type] = this.tag[type] ?? {};
        for (let prop in value) {
            if (value.hasOwnProperty(prop))
                this.tag[type][prop] = value[prop];
        }
    }

    private setTag(value: any) {
        const newValue = value || {};
        for (let prop in newValue) {
            if (newValue.hasOwnProperty(prop)) {
                if (prop === 'light' || prop === 'dark')
                    this.updateTag(prop, newValue[prop]);
                else
                    this.tag[prop] = newValue[prop];
            }
        }
        if (this.dappContainer)
            this.dappContainer.setTag(this.tag);
    }

    private resetRpcWallet() {
        this.removeRpcWalletEvents();
        const rpcWalletId = this.state.initRpcWallet(this.defaultChainId);
        const rpcWallet = this.state.getRpcWallet();
        const chainChangedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.ChainChanged, async (chainId: number) => {
            this.firstTokenSelection.token = null;
            this.secondTokenSelection.token = null;
            this.form.firstToken = undefined;
            this.form.secondToken = undefined;
            this.firstTokenSelection.classList.remove('has-token');
            this.secondTokenSelection.classList.remove('has-token');
            this.refreshUI();
        });
        const connectedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
            this.refreshUI();
        });
        const data: any = {
            defaultChainId: this.defaultChainId,
            wallets: this.wallets,
            networks: this.networks,
            showHeader: this.showHeader,
            rpcWalletId: rpcWallet.instanceId
        };
        if (this.dappContainer?.setData) this.dappContainer.setData(data);
    }

    private async refreshUI() {
        await this.initializeWidgetConfig();
    }

    private initWallet = async () => {
        try {
            await Wallet.getClientInstance().init();
            const rpcWallet = this.state.getRpcWallet();
            await rpcWallet.init();
        } catch (err) {
            console.log(err);
        }
    }

    private getGovParamValue = async () => {
        let paramValueObj = await getVotingValue(this.state, 'vote');
        const wallet = this.state.getRpcWallet();
        const selectedAddress = wallet.account.address;
        this.currentStake = await stakeOf(this.state, selectedAddress);
        const extraSecs = 60;
        this.maxVoteDurationInDays = paramValueObj.maxVoteDuration || 0;
        this.minVoteDurationInDays = paramValueObj.minVoteDuration ? paramValueObj.minVoteDuration + extraSecs : 0;
        this.minQuorum = paramValueObj.minQuorum || 0;
        this.minThreshold = paramValueObj.minOaxTokenToCreateVote || 0;
        this.minDelay = paramValueObj.minExeDelay || 0;
        // set default value for form
        this.form.duration = this.minVoteDurationInDays;
        this.form.delay = this.minDelay;
        this.form.quorum = this.minQuorum;
        this.form.threshold = 50;
    }

    private checkTimeFormat = (date: number) => {
        return `${date} second${date === 1 ? '' : 's'}`;
    }

    private initializeWidgetConfig = async () => {
        setTimeout(async () => {
            const chainId = this.chainId;
            tokenStore.updateTokenMapData(chainId);
            await this.initWallet();
            await this.getGovParamValue();
            this.updateBalance();
            const connected = isClientWalletConnected();
            if (!connected || !this.state.isRpcWalletConnected()) {
                this.btnConfirm.caption = connected ? "Switch Network" : "Connect Wallet";
                this.btnConfirm.enabled = true;
            } else {
                this.btnConfirm.enabled = this.isValidToCreateVote;
                this.btnConfirm.caption = !this.hasEnoughStake ? 'Insufficient Voting Balance' : 'Create Executive Proposal';
            }
            this.firstTokenSelection.chainId = chainId;
            this.secondTokenSelection.chainId = chainId;
            this.firstTokenSelection.tokenReadOnly = this.isFlow;
            this.secondTokenSelection.tokenReadOnly = this.isFlow;
            const tokens = tokenStore.getTokenList(chainId);
            const customTokens = this._data.customTokens?.[this.chainId] ?? [];
            const tokenList = [...tokens, ...customTokens];
            this.firstTokenSelection.tokenDataListProp = tokenList;
            this.secondTokenSelection.tokenDataListProp = tokenList;
            if (this._data.fromToken) {
                const fromToken = this._data.fromToken.toLowerCase();
                this.firstTokenSelection.token = tokenList.find(t => t.symbol.toLowerCase() === fromToken || t.address?.toLowerCase() === fromToken);
                this.onSelectFirstToken(this.firstTokenSelection.token);
            }
            if (this._data.toToken) {
                const toToken = this._data.toToken.toLowerCase();
                this.secondTokenSelection.token = tokenList.find(t => t.symbol.toLowerCase() === toToken || t.address?.toLowerCase() === toToken);
                this.onSelectSecondToken(this.secondTokenSelection.token);
            }
            const tokenSymbol = this.state.getGovToken(this.chainId)?.symbol || '';
            this.lblMinVotingBalance.caption = `Minimum Voting Balance: ${formatNumber(this.minThreshold)} ${tokenSymbol}`;
            this.lblDurationMinNote.caption = `Minimum: ${this.checkTimeFormat(this.minVoteDurationInDays)}`;
            this.lblDurationMaxNote.caption = `Maximum: ${this.checkTimeFormat(this.maxVoteDurationInDays)}`;
            this.lblQuorumNote.caption = `Minimum: ${this.minQuorum}`;
            this.lblDelayMinNote.caption = `Minimum: ${this.checkTimeFormat(this.minDelay)}`;
            this.durationInput.placeholder = `${Math.ceil(this.minVoteDurationInDays)}`;
            this.delayInput.placeholder = `${Math.ceil(this.minDelay)}`;
            this.durationInput.value = this.form.duration > 0 ? this.form.duration : 180;
            this.delayInput.value = this.form.delay;
            this.quorumInput.value = this.form.quorum;
            this.thresholdInput.value = this.form.threshold;
        });
    }

    private showResultMessage = (status: 'warning' | 'success' | 'error', content?: string | Error) => {
        if (!this.txStatusModal) return;
        let params: any = { status };
        if (status === 'success') {
            params.txtHash = content;
        } else {
            params.content = content;
        }
        this.txStatusModal.message = { ...params };
        this.txStatusModal.showModal();
    }

    private connectWallet = async () => {
        if (!isClientWalletConnected()) {
            if (this.mdWallet) {
                await application.loadPackage('@scom/scom-wallet-modal', '*');
                this.mdWallet.networks = this.networks;
                this.mdWallet.wallets = this.wallets;
                this.mdWallet.showModal();
            }
            return;
        }
        if (!this.state.isRpcWalletConnected()) {
            const clientWallet = Wallet.getClientInstance();
            await clientWallet.switchNetwork(this.chainId);
        }
    }

    private async updateBalance() {
        const rpcWallet = this.state.getRpcWallet();
        if (rpcWallet.address) {
            if (!this.isEmptyData(this._data)) await tokenStore.updateTokenBalancesByChainId(this.chainId);
        }
    }

    private getErrorMessage(name: string, callback: any) {
        let message = '';
        switch (name) {
            case 'duration':
                message = callback(this.minVoteDurationInDays, this.maxVoteDurationInDays);
                break;
            case 'quorum':
                message = callback(this.minQuorum);
                break;
            case 'dayValue':
                message = callback(this.dayValueDefault);
                break;
            case 'delay':
                message = callback(this.minDelay);
                break;
        }
        return message;
    }

    private onValidateInput(name: string) {
        const rules = this.rules[name] || [];
        let result = true;
        if (rules.length) {
            const inputElm = this[`${name}Input`] as Input;
            const errorElm = this[`${name}Err`] as Label;
            errorElm && (errorElm.visible = false);
            const selectElm = this[`${name}Select`] as ComboBox;
            if (!inputElm && !selectElm) return false;
            const ruleLength = rules.length;
            for (let i = 0; i < ruleLength; i++) {
                const rule = rules[i];
                const emptyValue = ((inputElm && (inputElm.value === undefined || inputElm.value === '')) || (selectElm && !selectElm.selectedItem));
                const invalidValue = (rule.required !== undefined && emptyValue) ||
                    (rule.max !== undefined && inputElm.value?.length > rule.max) ||
                    (rule.validator !== undefined && !rule.validator(inputElm.value));
                if (invalidValue && errorElm) {
                    errorElm.caption = typeof rule.message === 'string' ? rule.message : this.getErrorMessage(name, rule.message);
                    errorElm.visible = true;
                    result = false;
                    break;
                }
            }
        }
        return result;
    }

    private onValidateSelection(name: string) {
        const rules = this.rules[name] || [];
        let result = true;
        if (rules.length) {
            const inputElm = this[`${name}Selection`] as ScomTokenInput;
            const errorElm = this[`${name}Err`] as Label;
            errorElm && (errorElm.visible = false);
            if (!inputElm) return false;
            const ruleLength = rules.length;
            for (let i = 0; i < ruleLength; i++) {
                const rule = rules[i];
                const invalidValue = (rule.required !== undefined && !inputElm.token) ||
                    (rule.validator !== undefined && inputElm.token && !rule.validator(inputElm.token.address ?? inputElm.token.symbol));
                if (invalidValue && errorElm) {
                    errorElm.caption = rule.message;
                    errorElm.visible = true;
                    result = false;
                    break;
                }
            }
        }
        return result;
    }

    private onSelectFirstToken(token: ITokenObject) {
        this.form.firstToken = token;
        this.validateStatus.firstToken = this.onValidateSelection('firstToken');
        this.firstTokenSelection.classList.add('has-token');
    }

    private onSelectSecondToken(token: ITokenObject) {
        this.form.secondToken = token;
        this.validateStatus.secondToken = this.onValidateSelection('secondToken');
        this.secondTokenSelection.classList.add('has-token');
    }
    
    private onDurationChanged() {
        this.form.duration = Number(this.durationInput.value);
        this.validateStatus.duration = this.onValidateInput("duration");
    }

    private onDelayChanged() {
        this.form.delay = Number(this.delayInput.value);
        this.validateStatus.delay = this.onValidateInput("delay");
    }

    private onQuorumChanged() {
        this.form.quorum = Number(this.quorumInput.value);
        this.validateStatus.quorum = this.onValidateInput("quorum");
    }

    private onThresholdChanged() {
        this.form.threshold = Number(this.thresholdInput.value);
        this.validateStatus.threshold = this.onValidateInput("threshold");
    }

    private createExecutiveProposal = async () => {
        this.btnConfirm.rightIcon.spin = true;
        this.btnConfirm.rightIcon.visible = true;
        let voteEndTime = Math.floor(Date.now() / 1000) + this.form.duration;
        let exeCmd: string;
        let exeParams1: any;
        let exeParams2: any;

        const fromToken = this.form.firstToken;
        const toToken = this.form.secondToken;
        let pair = nullAddress;
        try {
            pair = await getPair(this.state, fromToken, toToken);
        } catch (error) {
        }

        if (pair === nullAddress) {
            let tempVal = await getVotingValue(this.state, 'oracle');
            this.minThreshold = tempVal.minOaxTokenToCreateVote;
        } else {
            let tempVal = await getVotingValue(this.state, 'vote');
            this.minThreshold = tempVal.minOaxTokenToCreateVote;
        }

        exeParams1 = [fromToken, toToken];
        exeParams2 = undefined;
        exeCmd = 'oracle';
        
        const wallet = Wallet.getClientInstance();

        try {
            const delayInSeconds = this.form.delay;
            const chainId = this.chainId;
            const firstToken = fromToken?.address || fromToken?.symbol;
            const secondToken = toToken?.address || toToken?.symbol;
            this.showResultMessage('warning', 'Creating new Executive Proposal');

            const txHashCallback = async (err: Error, receipt?: string) => {
                if (err) {
                    this.showResultMessage('error', err);
                } else if (receipt) {
                    this.showResultMessage('success', receipt);
                }
            }
    
            const confirmationCallback = async (receipt: any) => {
                const address = parseNewVoteEvent(this.state, receipt);
                if (!address) return;
                if (this.state.handleUpdateStepStatus) {
                    this.state.handleUpdateStepStatus({
                        status: "Completed",
                        color: Theme.colors.success.main,
                        message: address
                    });
                }
                try {
                    if (this.state.handleAddTransactions) {
                        const timestamp = await this.state.getRpcWallet().getBlockTimestamp(receipt.blockNumber.toString());
                        const transactionsInfoArr = [
                            {
                                desc: 'Create Pair Executive Proposal',
                                chainId: chainId,
                                fromToken: null,
                                toToken: null,
                                fromTokenAmount: '-',
                                toTokenAmount: '-',
                                hash: receipt.transactionHash,
                                timestamp,
                                value: address
                            }
                        ];
                        this.state.handleAddTransactions({
                            list: transactionsInfoArr
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
                wallet.registerSendTxEvents({});
                if (this.state.handleJumpToStep) {
                    this.state.handleJumpToStep({
                        widgetName: 'scom-governance-voting',
                        executionProperties: {
                            votingAddress: address,
                            fromToken: firstToken || '',
                            toToken: secondToken || '',
                            customTokens: this._data.customTokens,
                            isFlow: true
                        }
                    })
                }
            };
            wallet.registerSendTxEvents({
                transactionHash: txHashCallback,
                confirmation: confirmationCallback
            });

            let result = await doNewVote(
                this.state,
                this.form.quorum,
                this.form.threshold,
                voteEndTime,
                delayInSeconds,
                exeCmd,
                exeParams1,
                exeParams2
            );
            if (result && !this._data.isFlow) {
                this.proposalAlert.status = "success";
                this.proposalAlert.title = "Voting Address";
                this.proposalAlert.content = result;
                this.proposalAlert.showModal();
            }
        } catch (err) {
            console.log('newVote', err);
            this.showResultMessage('error', '');
            wallet.registerSendTxEvents({});
        } finally { 
            this.btnConfirm.rightIcon.spin = false;
            this.btnConfirm.rightIcon.visible = false;
        }
    }

    private getCheckingProps() {
        const {
            duration,
            quorum,
            delay,
            threshold,
            firstToken,
            secondToken,
        } = this.validateStatus;
        let result: any = {
            duration,
            quorum,
            delay,
            threshold
        };
        return result = { ...result, firstToken, secondToken };
    }

    private onValidate() {
        const validateKeys = Object.keys(this.getCheckingProps());
        let hasValid = true;
        for (let i = 0; i < validateKeys.length; i++) {
            const key = validateKeys[i];
            const isSelection = key === 'firstToken' || key === 'secondToken';
            const result = isSelection ? this.onValidateSelection(key) : this.onValidateInput(key);
            if (!result) hasValid = false;
        }
        return hasValid;
    }

    private onConfirm() {
        if (!isClientWalletConnected() || !this.state.isRpcWalletConnected()) {
            this.connectWallet();
            return;
        }
        if (!this.isValidToCreateVote) {
            const tokenSymbol = this.state.getGovToken(this.chainId)?.symbol || '';
            this.showResultMessage('error', `Minimum ${this.minThreshold} ${tokenSymbol} Required`)
        } else {
            if (!this.onValidate()) return;
            this.createExecutiveProposal();
        }
    }

    render() {
        return (
            <i-scom-dapp-container id="dappContainer">
                <i-panel class={customStyles} background={{ color: Theme.background.main }}>
                    <i-panel>
                        <i-vstack id="loadingElm" class="i-loading-overlay">
                            <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
                                <i-icon
                                    class="i-loading-spinner_icon"
                                    image={{ url: Assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
                                />
                                <i-label
                                    caption="Loading..." font={{ color: '#FD4A4C', size: '1.5em' }}
                                    class="i-loading-spinner_text"
                                />
                            </i-vstack>
                        </i-vstack>
                        <i-vstack
                            width="100%"
                            height="100%"
                            maxWidth={1200}
                            padding={{ top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }}
                            margin={{ left: 'auto', right: 'auto' }}
                            gap="1rem"
                        >
                            <i-vstack
                                width="100%"
                                padding={{ top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }}
                                gap="1rem"
                            >
                                <i-vstack id="actionStack">
                                    <i-vstack id="tokenPairStack" gap='0.5rem' width="100%">
                                        <i-hstack verticalAlignment="center" gap="4px">
                                            <i-label caption='*' font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label caption='Select a pair' font={{ size: '1rem', weight: 600 }}></i-label>
                                            <i-icon
                                                name="question-circle"
                                                fill="#fff" width={16} height={16}
                                                tooltip={{ content: 'The pair you want to register in the Oracle', placement: 'right' }}
                                            ></i-icon>
                                        </i-hstack>
                                        <i-hstack gap="1rem">
                                            <i-vstack horizontalAlignment="start" gap="0.5rem">
                                                <i-scom-token-input
                                                    id="firstTokenSelection"
                                                    class="custom-token-selection"
                                                    width="auto"
                                                    height={34}
                                                    type="button"
                                                    importable={true}
                                                    isBalanceShown={false}
                                                    isBtnMaxShown={false}
                                                    isInputShown={false}
                                                    onSelectToken={this.onSelectFirstToken.bind(this)}
                                                ></i-scom-token-input>
                                                <i-label id="firstTokenErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            </i-vstack>
                                            <i-vstack horizontalAlignment="start" gap="0.5rem">
                                                <i-scom-token-input
                                                    id="secondTokenSelection"
                                                    class="custom-token-selection"
                                                    width="auto"
                                                    height={34}
                                                    type="button"
                                                    importable={true}
                                                    isBalanceShown={false}
                                                    isBtnMaxShown={false}
                                                    isInputShown={false}
                                                    onSelectToken={this.onSelectSecondToken.bind(this)}
                                                ></i-scom-token-input>
                                                <i-label id="secondTokenErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            </i-vstack>
                                        </i-hstack>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="lblMinVotingBalance" font={{ size: '0.875rem' }} margin={{ left: 'auto' }}></i-label>
                                        </i-hstack>
                                    </i-vstack>
                                </i-vstack>
                                <i-hstack width="100%" gap="1rem" wrap="wrap">
                                    <i-vstack gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap={4}>
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label id="lblDuration" caption="Duration" font={{ size: '1rem', weight: 600 }}></i-label>
                                            <i-icon
                                                name="question-circle"
                                                fill="#fff" width={16} height={16}
                                                tooltip={{ content: 'Vote Duration in seconds', placement: 'right' }}
                                            ></i-icon>
                                        </i-hstack>
                                        <i-input
                                            id="durationInput"
                                            height={32}
                                            width="100%"
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={this.onDurationChanged.bind(this)}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="durationErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            <i-vstack margin={{ left: 'auto' }} class="text-right">
                                                <i-label id="lblDurationMinNote" font={{ size: '0.875rem' }} caption="Minimum: 0 second" ></i-label>
                                                <i-label id="lblDurationMaxNote" font={{ size: '0.875rem' }} caption="Maximum: 0 second" ></i-label>
                                            </i-vstack>
                                        </i-hstack>
                                    </i-vstack>
                                    <i-vstack gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap={4}>
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label id="lblDelay" caption="Delay" font={{ size: '1rem', weight: 600 }}></i-label>
                                            <i-icon
                                                name="question-circle"
                                                fill="#fff" width={16} height={16}
                                                tooltip={{ content: 'Execution Delay in seconds', placement: 'right' }}
                                            ></i-icon>
                                        </i-hstack>
                                        <i-input
                                            id="delayInput"
                                            class='poll-input'
                                            height={32}
                                            width='100%'
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={this.onDelayChanged.bind(this)}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="delayErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            <i-label
                                                id="lblDelayMinNote"
                                                font={{ size: '0.875rem' }}
                                                caption="Minimum: 0 second"
                                                margin={{ left: 'auto' }}
                                            ></i-label>
                                        </i-hstack>
                                    </i-vstack>
                                </i-hstack>
                                <i-hstack width="100%" gap="1rem" wrap="wrap">
                                    <i-vstack gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap={4}>
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label caption="Quorum" font={{ size: '1rem', weight: 600 }}></i-label>
                                            <i-icon
                                                name="question-circle"
                                                fill="#fff" width={16} height={16}
                                                tooltip={{ content: 'The minimum quorum required for voting', placement: 'right' }}
                                            ></i-icon>
                                        </i-hstack>
                                        <i-input
                                            id="quorumInput"
                                            height={32}
                                            width="100%"
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={this.onQuorumChanged.bind(this)}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="quorumErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            <i-label id="lblQuorumNote"
                                                font={{ size: '0.875rem' }}
                                                caption="Minimum: 0 second"
                                                margin={{ left: 'auto' }}
                                            ></i-label>
                                        </i-hstack>
                                    </i-vstack>
                                    <i-vstack gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap={4}>
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label caption="Threshold" font={{ size: '1rem', weight: 600 }}></i-label>
                                            <i-icon
                                                name="question-circle"
                                                fill="#fff" width={16} height={16}
                                                tooltip={{ content: 'The minimum quorum threshold should be reached to pass the executive proposal', placement: 'right' }}
                                            ></i-icon>
                                        </i-hstack>
                                        <i-input
                                            id="thresholdInput"
                                            height={32}
                                            width="100%"
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={this.onThresholdChanged.bind(this)}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="thresholdErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            <i-label font={{ size: '0.875rem' }} caption="Minimum: 50%" margin={{ left: 'auto' }}></i-label>
                                        </i-hstack>
                                    </i-vstack>
                                </i-hstack>
                            </i-vstack>
                            <i-vstack
                                width="100%"
                                padding={{ left: "1rem", right: "1rem" }}
                            >
                                <i-button
                                    id='btnConfirm'
                                    class='btn-os'
                                    height='auto'
                                    caption="Create Executive Proposal"
                                    padding={{ top: '0.75rem', bottom: '0.75rem', left: '1.5rem', right: '1.5rem' }}
                                    border={{ radius: 5 }}
                                    font={{ weight: 600 }}
                                    rightIcon={{ spin: true, visible: false }}
                                    enabled={false}
                                    onClick={this.onConfirm.bind(this)}
                                ></i-button>
                            </i-vstack>
                        </i-vstack>
                    </i-panel>
                    <i-alert id="proposalAlert"></i-alert>
                    <i-scom-tx-status-modal id="txStatusModal" />
                    <i-scom-wallet-modal id="mdWallet" wallets={[]} />
                </i-panel>
            </i-scom-dapp-container>
        )
    }
    
    async handleFlowStage(target: Control, stage: string, options: any) {
        let widget;
        if (stage === 'initialSetup') {
            widget = new ScomGovernanceProposalFlowInitialSetup();
            target.appendChild(widget);
            await widget.ready();
            widget.state = this.state;
            await widget.handleFlowStage(target, stage, options);
        } else {
            widget = this;
            if (!options.isWidgetConnected) {
                target.appendChild(widget);
                await widget.ready();
            }
			let properties = options.properties;
			let tag = options.tag;
            this.state.handleNextFlowStep = options.onNextStep;
            this.state.handleAddTransactions = options.onAddTransactions;
            this.state.handleJumpToStep = options.onJumpToStep;
            this.state.handleUpdateStepStatus = options.onUpdateStepStatus;
			await this.setData(properties);
			if (tag) {
				this.setTag(tag);
			}
        }

        return { widget };
    }
} 