import { INetworkConfig } from "@scom/scom-network-picker";
import { IWalletPlugin } from "@scom/scom-wallet-modal";

export interface IGovernanceProposal {
    wallets: IWalletPlugin[];
    networks: INetworkConfig[];
    defaultChainId?: number;
    showHeader?: boolean;
}