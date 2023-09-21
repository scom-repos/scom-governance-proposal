import {
    application,
    Button,
    ComboBox,
    Control,
    ControlElement,
    customElements,
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
import { IGovernanceProposal, IValidateStatus } from "./interface";
import Assets from './assets';
import { isClientWalletConnected, State } from "./store/index";
import configData from './data.json';
import { Constants, Wallet } from "@ijstech/eth-wallet";
import customStyles from './index.css';
import { getVotingValue, stakeOf } from "./api";
import { ITokenObject, tokenStore } from "@scom/scom-token-list";

const Theme = Styles.Theme.ThemeVars;

const actions = [
    {
        label: 'Modify Restricted Oracle',
        value: 'restrictedOracle'
    }
]

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
    private comboAction: ComboBox;
    private lblActionErr: Label;
    private firstAddressStack: VStack;
    private actionStack: VStack;
    private tokenPairStack: VStack;
    private firstTokenNameSelection: ScomTokenInput;
    private firstTokenNameErr: Label;
    private secondTokenNameSelection: ScomTokenInput;
    private secondTokenNameErr: Label;
    private lblDuration: Label;
    private edtDuration: Input;
    private lblDurationErr: Label;
    private lblDurationNote: Label;
    private lblDelay: Label;
    private edtDelay: Input;
    private lblDelayErr: Label;
    private lblDelayMinNote: Label;
    private lblDelayMaxNote: Label;
    private edtQuorum: Input;
    private lblQuorumErr: Label;
    private lblQuorumNote: Label;
    private edtThreshold: Input;
    private lblThresholdErr: Label;
    private btnConfirm: Button;
    private systemStack: VStack;
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
    private currentStake: number = 0;
    private dayValueDefault: number = 7;
    private dayInSeconds = 24 * 60 * 60;

    private form = {
        action: '',
        duration: 0,
        quorum: 0,
        value: '',
        dayValue: 0,
        address: '',
        delay: 0,
        threshold: 0,
        tokenName: '',
        firstTokenName: '',
        secondTokenName: '',
        systemParamOption: '',
        profileOption: ''
    }
    private validateStatus: IValidateStatus = {}
    private rules = {
        firstTokenName: [
            {
                required: true,
                message: 'Please Select a pair'
            },
            {
                validator: (value: any) => value !== this.form.secondTokenName,
                message: 'A pair must not be the same'
            },
        ],
        secondTokenName: [
            {
                required: true,
                message: 'Please Select a pair'
            },
            {
                validator: (value: any) => value !== this.form.firstTokenName,
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
    private get isTokenPairInputShown() {
        return this.form.action === 'oracle' || this.form.action === 'restrictedOracle' || this.form.action === 'peggedOracle' || this.form.action === 'otcOracle';
    }

    private get hasEnoughStake() {
        return this.currentStake >= this.minThreshold;
    }

    private get isValidToCreateVote() {
        return this.hasEnoughStake;
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
        this.state = new State(configData);
        this.firstTokenNameSelection.title = (
            <i-hstack gap="4px" verticalAlignment="center">
                <i-label caption="Select a token" font={{ color: Theme.colors.primary.main, size: '1.25rem', bold: true }}></i-label>
                <i-icon
                    name="question-circle"
                    fill={Theme.colors.primary.main} width={16} height={16}
                    tooltip={{ content: 'Find a token by searching for its name or symbol or by pasting its address below.', placement: 'right' }}
                ></i-icon>
            </i-hstack>
        );
        this.secondTokenNameSelection.title = (
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
        return actions;
    }

    getConfigurators() {
        return [];
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
            this.firstTokenNameSelection.token = null;
            this.secondTokenNameSelection.token = null;
            this.firstTokenNameSelection.classList.remove('has-token');
            this.secondTokenNameSelection.classList.remove('has-token');
            this.refreshUI();
        });
        const connectedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
            this.refreshUI();
        });
        if (rpcWallet.instanceId) {
            if (this.firstTokenNameSelection) this.firstTokenNameSelection.rpcWalletId = rpcWallet.instanceId;
            if (this.secondTokenNameSelection) this.secondTokenNameSelection.rpcWalletId = rpcWallet.instanceId;
        }
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
        this.currentStake = (await stakeOf(this.state, selectedAddress)).toNumber();
        const maxDur = paramValueObj.maxVoteDuration;
        const minDur = paramValueObj.minVoteDuration;
        const extraSecs = 60;
        this.maxVoteDurationInDays = maxDur;
        this.minVoteDurationInDays = minDur + extraSecs;
        this.minQuorum = paramValueObj.minQuorum;
        this.minThreshold = paramValueObj.minOaxTokenToCreateVote;
        this.minDelay = paramValueObj.minExeDelay;
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
            this.lblDurationNote.caption = `Minimum: ${this.checkTimeFormat(this.minVoteDurationInDays)}`;
            this.lblQuorumNote.caption = `Minimum: ${this.minQuorum}`;
            this.lblDelayMinNote.caption = `Minimum: ${this.checkTimeFormat(this.minDelay)}`;
            this.lblDelayMaxNote.caption = `Maximum: ${this.checkTimeFormat(this.maxVoteDurationInDays)}`;
            this.edtDuration.placeholder = `${Math.ceil(this.minVoteDurationInDays)}`;
            this.edtDelay.placeholder = `${Math.ceil(this.minDelay)}`;
            this.edtDuration.value = this.form.duration;
            this.edtDelay.value = this.form.delay;
            this.edtQuorum.value = this.form.quorum;
            this.edtThreshold.value = this.form.threshold;
            const tokens = tokenStore.getTokenList(chainId);
            this.firstTokenNameSelection.tokenDataListProp = tokens;
            this.secondTokenNameSelection.tokenDataListProp = tokens;
        });
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
            if (!this.isEmptyData(this._data)) await tokenStore.updateAllTokenBalances(rpcWallet);
            let tokenBalances = tokenStore.getTokenBalancesByChainId(this.chainId);
        }
    }

    private onChangeAction(source: ComboBox) {
        this.form.action = (source.selectedItem as IComboItem).value;
        this.validateStatus.action = true;
        if (this.lblActionErr) this.lblActionErr.visible = false;
        this.actionStack.visible = this.tokenPairStack.visible = this.isTokenPairInputShown;
        this.firstTokenNameSelection.token = null;
        this.secondTokenNameSelection.token = null;
        this.firstTokenNameSelection.classList.remove('has-token');
        this.secondTokenNameSelection.classList.remove('has-token');
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
                    (rule.validator !== undefined && inputElm.token && !rule.validator(inputElm.token.address));
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
        this.form.firstTokenName = token.address;
        this.validateStatus.firstTokenName = this.onValidateSelection('firstTokenName');
        this.firstTokenNameSelection.classList.add('has-token');
    }

    private onSelectSecondToken(token: ITokenObject) {
        this.form.secondTokenName = token.address;
        this.validateStatus.secondTokenName = this.onValidateSelection('secondTokenName');
        this.secondTokenNameSelection.classList.add('has-token');
    }

    private onSelectDay(value: number | string, name: string) { }

    private onChangedInput(source: Input, name: string) { }

    private onConfirm() {
        if (!isClientWalletConnected() || !this.state.isRpcWalletConnected()) {
            this.connectWallet();
            return;
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
                            <i-hstack width="100%" horizontalAlignment="center" margin={{ bottom: '1.25rem', left: 'auto', right: 'auto' }}>
                                <i-label caption="Create new executive proposal" font={{ size: 'clamp(1.5rem, 1.4rem + 0.5vw, 2rem)', bold: true, color: Theme.text.third }}></i-label>
                            </i-hstack>
                            <i-vstack
                                width="100%"
                                padding={{ top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }}
                                gap="1rem"
                            >
                                <i-hstack width="100%" gap="1rem" wrap="wrap">
                                    <i-vstack gap='0.5rem' stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap="4px">
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label caption="Action" font={{ size: '1rem', weight: 600 }}></i-label>
                                        </i-hstack>
                                        <i-combo-box
                                            id="comboAction"
                                            class="custom-combobox"
                                            height={32}
                                            minWidth={180}
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: '1px', style: 'solid', color: Theme.colors.primary.main } }}
                                            icon={{ name: "angle-down", fill: Theme.text.third, width: 12, height: 12 }}
                                            font={{ size: '0.875rem' }}
                                            items={actions}
                                            onChanged={this.onChangeAction.bind(this)}
                                        ></i-combo-box>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="lblActionErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            <i-label font={{ size: '0.875rem' }} caption="Learn more about actions" margin={{ left: 'auto' }}></i-label>
                                        </i-hstack>
                                    </i-vstack>
                                    <i-vstack id="systemStack" width="100%" gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }} visible={false}></i-vstack>
                                </i-hstack>
                                <i-vstack id="firstAddressStack" width="100%" gap="0.5rem" visible={false}></i-vstack>
                                <i-vstack id="actionStack">
                                    <i-vstack id="tokenPairStack" gap='0.5rem' width="100%" visible={false}>
                                        <i-hstack verticalAlignment="center" gap="4px">
                                            <i-label caption='*' font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label caption='Select a pair' font={{ size: '1rem', weight: 600 }}></i-label>
                                        </i-hstack>
                                        <i-hstack gap="1rem">
                                            <i-vstack gap="0.5rem">
                                                <i-scom-token-input
                                                    id="firstTokenNameSelection"
                                                    class="custom-token-selection"
                                                    width="auto"
                                                    height={34}
                                                    type="button"
                                                    isBalanceShown={false}
                                                    isBtnMaxShown={false}
                                                    isInputShown={false}
                                                    onSelectToken={this.onSelectFirstToken.bind(this)}
                                                ></i-scom-token-input>
                                                <i-label id="firstTokenNameErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            </i-vstack>
                                            <i-vstack gap="0.5rem">
                                                <i-scom-token-input
                                                    id="secondTokenNameSelection"
                                                    class="custom-token-selection"
                                                    width="auto"
                                                    height={34}
                                                    type="button"
                                                    isBalanceShown={false}
                                                    isBtnMaxShown={false}
                                                    isInputShown={false}
                                                    onSelectToken={this.onSelectSecondToken.bind(this)}
                                                ></i-scom-token-input>
                                                <i-label id="secondTokenNameErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            </i-vstack>
                                        </i-hstack>
                                    </i-vstack>
                                </i-vstack>
                                <i-hstack width="100%" gap="1rem" wrap="wrap">
                                    <i-vstack gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap={4}>
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label id="lblDuration" caption="Duration" font={{ size: '1rem', weight: 600 }}></i-label>
                                        </i-hstack>
                                        <i-input
                                            id="edtDuration"
                                            height={32}
                                            width="100%"
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={(source: Input) => this.onSelectDay(source.value, 'dayValue')}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="lblDurationErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            <i-label id="lblDurationNote"
                                                margin={{ left: 'auto' }}
                                                font={{ size: '0.875rem' }}
                                                caption="Minimum: 0 second"
                                            ></i-label>
                                        </i-hstack>
                                    </i-vstack>
                                    <i-vstack gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap={4}>
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label id="lblDelay" caption="Delay" font={{ size: '1rem', weight: 600 }}></i-label>
                                        </i-hstack>
                                        <i-input
                                            id="edtDelay"
                                            class='poll-input'
                                            height={32}
                                            width='100%'
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={(source: Input) => this.onSelectDay(source.value, 'delay')}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="lblDelayErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
                                            <i-vstack margin={{ left: 'auto' }} class="text-right">
                                                <i-label id="lblDelayMinNote" font={{ size: '0.875rem' }} caption="Minimum: 0 second" ></i-label>
                                                <i-label id="lblDelayMaxNote" font={{ size: '0.875rem' }} caption="Maximum: 0 second" ></i-label>
                                            </i-vstack>
                                        </i-hstack>
                                    </i-vstack>
                                </i-hstack>
                                <i-hstack width="100%" gap="1rem" wrap="wrap">
                                    <i-vstack gap="0.5rem" stack={{ grow: '1', shrink: '0', basis: '330px' }}>
                                        <i-hstack verticalAlignment="center" gap={4}>
                                            <i-label caption="*" font={{ size: '0.875rem', color: Theme.colors.primary.main }}></i-label>
                                            <i-label caption="Quorum" font={{ size: '1rem', weight: 600 }}></i-label>
                                        </i-hstack>
                                        <i-input
                                            id="edtQuorum"
                                            height={32}
                                            width="100%"
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={(source: Input) => this.onChangedInput(source, 'quorum')}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="lblQuorumErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
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
                                        </i-hstack>
                                        <i-input
                                            id="edtThreshold"
                                            height={32}
                                            width="100%"
                                            inputType="number"
                                            margin={{ top: '1rem' }}
                                            border={{ bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }}
                                            value="0"
                                            onChanged={(source: Input) => this.onChangedInput(source, 'threshold')}
                                        ></i-input>
                                        <i-hstack horizontalAlignment="space-between">
                                            <i-label id="lblThresholdErr" font={{ color: '#f5222d', size: '0.875rem' }} visible={false}></i-label>
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
                    <i-scom-tx-status-modal id="txStatusModal" />
                    <i-scom-wallet-modal id="mdWallet" wallets={[]} />
                </i-panel>
            </i-scom-dapp-container>
        )
    }
} 