import { ControlElement, customElements, Module } from "@ijstech/components";
import ScomDappContainer from "@scom/scom-dapp-container";
import { INetworkConfig } from "@scom/scom-network-picker";
import { IWalletPlugin } from "@scom/scom-wallet-modal";
import { IGovernanceProposal } from "./interface";

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
    private _data: IGovernanceProposal = {
        wallets: [],
        networks: []
    };
    tag: any = {};

    render() {
        return (
            <i-scom-dapp-container id="dappContainer"></i-scom-dapp-container>
        )
    }
} 