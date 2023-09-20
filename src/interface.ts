import { INetworkConfig } from "@scom/scom-network-picker";
import { IWalletPlugin } from "@scom/scom-wallet-modal";

export interface IGovernanceProposal {
    wallets: IWalletPlugin[];
    networks: INetworkConfig[];
    defaultChainId?: number;
    showHeader?: boolean;
}

export interface IValidateStatus {
    action?: boolean;
    duration?: boolean;
    quorum?: boolean;
    delay?: boolean;
    threshold?: boolean;
    value?: boolean;
    dayValue?: boolean;
    address?: boolean;
    firstTokenName?: boolean;
    secondTokenName?: boolean;
    systemParamOption?: boolean;
    profileOption?: boolean;
}