import { INetworkConfig } from "@scom/scom-network-picker";
import { ITokenObject } from "@scom/scom-token-list";
import { IWalletPlugin } from "@scom/scom-wallet-modal";

export enum QueueType {
    PRIORITY_QUEUE,
    RANGE_QUEUE,
    GROUP_QUEUE,
    PEGGED_QUEUE,
    OTC_QUEUE
}

export interface IGovernanceProposal {
    wallets: IWalletPlugin[];
    networks: INetworkConfig[];
    defaultChainId?: number;
    showHeader?: boolean;
    action?: string;
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
    firstToken?: boolean;
    secondToken?: boolean;
    systemParamOption?: boolean;
    profileOption?: boolean;
}

export interface IProposalForm {
    action: string;
    duration: number;
    quorum: number;
    value: string;
    dayValue: number;
    address: string;
    delay: number;
    threshold: number;
    tokenName: string;
    firstToken?: ITokenObject;
    secondToken?: ITokenObject;
    systemParamOption: string;
    profileOption: string;
}