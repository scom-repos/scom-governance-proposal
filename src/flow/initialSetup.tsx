import {
    application,
    Button,
    Control,
    ControlElement,
    customElements,
    FormatUtils,
    Label,
    Module,
    Styles
} from "@ijstech/components";
import { formatNumber, isClientWalletConnected, State } from "../store/index";
import ScomWalletModal from "@scom/scom-wallet-modal";
import { BigNumber, Constants, IEventBusRegistry, Wallet } from "@ijstech/eth-wallet";
import ScomTokenInput from "@scom/scom-token-input";
import { tokenStore } from "@scom/scom-token-list";
import { getVotingValue, stakeOf } from "../api";


const Theme = Styles.Theme.ThemeVars;

interface ScomGovernanceProposalFlowInitialSetupElement extends ControlElement {
    data?: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-governance-proposal-flow-initial-setup']: ScomGovernanceProposalFlowInitialSetupElement;
        }
    }
}

@customElements('i-scom-governance-proposal-flow-initial-setup')
export default class ScomGovernanceProposalFlowInitialSetup extends Module {
    private lblConnectedStatus: Label;
    private btnConnectWallet: Button;
    private lblMinVotingBalance: Label;
    private lblVotingBalance: Label;
    private lblBalanceErr: Label;
    private fromTokenInput: ScomTokenInput;
    private toTokenInput: ScomTokenInput;
    private btnStart: Button;
    private mdWallet: ScomWalletModal;
    private _state: State;
    private tokenRequirements: any;
    private executionProperties: any;
    private walletEvents: IEventBusRegistry[] = [];
    private minThreshold: number = 0;
    private votingBalance: BigNumber = new BigNumber(0);

    get state(): State {
        return this._state;
    }
    set state(value: State) {
        this._state = value;
    }
    private get rpcWallet() {
        return this.state.getRpcWallet();
    }
    private get chainId() {
        return this.executionProperties.chainId || this.executionProperties.defaultChainId;
    }
    private get hasEnoughStake() {
        return this.votingBalance.gte(this.minThreshold);
    }
    private async resetRpcWallet() {
        await this.state.initRpcWallet(this.chainId);
    }
    async setData(value: any) {
        this.executionProperties = value.executionProperties;
        this.tokenRequirements = value.tokenRequirements;
        await this.resetRpcWallet();
        await this.initializeWidgetConfig();
    }
    private async initWallet() {
        try {
            const rpcWallet = this.rpcWallet;
            await rpcWallet.init();
        } catch (err) {
            console.log(err);
        }
    }
    private async initializeWidgetConfig() {
        const connected = isClientWalletConnected();
        this.updateConnectStatus(connected);
        await this.initWallet();
        this.fromTokenInput.chainId = this.chainId;
        this.toTokenInput.chainId = this.chainId;
        const tokens = tokenStore.getTokenList(this.chainId);
        this.fromTokenInput.tokenDataListProp = tokens;
        this.toTokenInput.tokenDataListProp = tokens;
        const paramValueObj = await getVotingValue(this.state, 'vote');
        this.minThreshold = paramValueObj.minOaxTokenToCreateVote;
        this.votingBalance = await stakeOf(this.state, this.rpcWallet.account.address);
        this.lblMinVotingBalance.caption = formatNumber(this.minThreshold);
        this.lblVotingBalance.caption = formatNumber(this.votingBalance);
        this.lblBalanceErr.visible = !this.hasEnoughStake;
        this.btnStart.enabled = this.hasEnoughStake;
    }
    async connectWallet() {
        if (!isClientWalletConnected()) {
            if (this.mdWallet) {
                await application.loadPackage('@scom/scom-wallet-modal', '*');
                this.mdWallet.networks = this.executionProperties.networks;
                this.mdWallet.wallets = this.executionProperties.wallets;
                this.mdWallet.showModal();
            }
        }
    }
    private updateConnectStatus(connected: boolean) {
        if (connected) {
            this.lblConnectedStatus.caption = 'Connected with ' + Wallet.getClientInstance().address;
            this.btnConnectWallet.visible = false;
        } else {
            this.lblConnectedStatus.caption = 'Please connect your wallet first';
            this.btnConnectWallet.visible = true;
        }
    }
    private registerEvents() {
        let clientWallet = Wallet.getClientInstance();
        this.walletEvents.push(
            clientWallet.registerWalletEvent(this, Constants.ClientWalletEvent.AccountsChanged, async (payload: Record<string, any>) => {
                const { account } = payload;
                let connected = !!account;
                this.updateConnectStatus(connected);
            })
        )
    }
    onHide() {
        let clientWallet = Wallet.getClientInstance();
        for (let event of this.walletEvents) {
            clientWallet.unregisterWalletEvent(event);
        }
        this.walletEvents = [];
    }
    init() {
        super.init();
        this.fromTokenInput.style.setProperty('--input-background', '#232B5A');
        this.fromTokenInput.style.setProperty('--input-font_color', '#fff');
        this.toTokenInput.style.setProperty('--input-background', '#232B5A');
        this.toTokenInput.style.setProperty('--input-font_color', '#fff');
        this.registerEvents();
    }
    async handleClickStart() {
        if (!this.hasEnoughStake) return;
        this.executionProperties.fromToken = this.fromTokenInput.token?.address || this.fromTokenInput.token?.symbol;
        this.executionProperties.toToken = this.toTokenInput.token?.address || this.toTokenInput.token?.symbol;
        if (this.state.handleUpdateStepStatus)
            this.state.handleUpdateStepStatus({
                status: "Completed",
                color: Theme.colors.success.main
            });
        if (this.state.handleNextFlowStep)
            this.state.handleNextFlowStep({
                isInitialSetup: true,
                tokenRequirements: this.tokenRequirements,
                executionProperties: this.executionProperties
            });
    }
    render() {
        return (
            <i-vstack gap="1rem" padding={{ top: 10, bottom: 10, left: 20, right: 20 }}>
                <i-label caption="Get Ready to Create Executive Proposal"></i-label>
                <i-vstack gap="1rem">
                    <i-label id="lblConnectedStatus"></i-label>
                    <i-hstack>
                        <i-button
                            id="btnConnectWallet"
                            caption="Connect Wallet"
                            font={{ color: Theme.colors.primary.contrastText }}
                            padding={{ top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }}
                            onClick={this.connectWallet.bind(this)}
                        ></i-button>
                    </i-hstack>
                </i-vstack>
                <i-hstack verticalAlignment="center" horizontalAlignment="space-between" gap="6px">
                    <i-label caption="Minimum Voting Balance"></i-label>
                    <i-label id="lblMinVotingBalance"></i-label>
                </i-hstack>
                <i-hstack verticalAlignment="center" horizontalAlignment="space-between" gap="6px">
                    <i-label caption="Voting Balance"></i-label>
                    <i-label id="lblVotingBalance"></i-label>
                </i-hstack>
                <i-label id="lblBalanceErr" caption="Insufficient Voting Balance" font={{ color: Theme.colors.error.main }} visible={false}></i-label>
                <i-label caption="Select a Pair"></i-label>
                <i-hstack horizontalAlignment="center" verticalAlignment="center" wrap='wrap' gap={10}>
                    <i-scom-token-input
                        id="fromTokenInput"
                        type="combobox"
                        isBalanceShown={false}
                        isBtnMaxShown={false}
                        isInputShown={false}
                        border={{ radius: 12 }}
                    ></i-scom-token-input>
                    <i-label caption="to" font={{ size: "1rem" }}></i-label>
                    <i-scom-token-input
                        id="toTokenInput"
                        type="combobox"
                        isBalanceShown={false}
                        isBtnMaxShown={false}
                        isInputShown={false}
                        border={{ radius: 12 }}
                    ></i-scom-token-input>
                </i-hstack>
                <i-hstack horizontalAlignment='center'>
                    <i-button
                        id="btnStart"
                        caption="Start"
                        padding={{ top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }}
                        font={{ color: Theme.colors.primary.contrastText, size: '1.5rem' }}
                        onClick={this.handleClickStart}
                    ></i-button>
                </i-hstack>
                <i-scom-wallet-modal id="mdWallet" wallets={[]} />
            </i-vstack>
        )
    }
    async handleFlowStage(target: Control, stage: string, options: any) {
        let widget: ScomGovernanceProposalFlowInitialSetup = this;
        if (!options.isWidgetConnected) {
            let properties = options.properties;
            let tokenRequirements = options.tokenRequirements;
            this.state.handleNextFlowStep = options.onNextStep;
            this.state.handleAddTransactions = options.onAddTransactions;
            this.state.handleJumpToStep = options.onJumpToStep;
            this.state.handleUpdateStepStatus = options.onUpdateStepStatus;
            await widget.setData({
                executionProperties: properties,
                tokenRequirements
            });
        }
        return { widget }
    }
}