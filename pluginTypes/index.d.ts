/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@scom/scom-token-modal/@ijstech/eth-wallet/index.d.ts" />
/// <amd-module name="@scom/scom-governance-proposal/interface.ts" />
declare module "@scom/scom-governance-proposal/interface.ts" {
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
}
/// <amd-module name="@scom/scom-governance-proposal/assets.ts" />
declare module "@scom/scom-governance-proposal/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-governance-proposal/store/core.ts" />
declare module "@scom/scom-governance-proposal/store/core.ts" {
    export interface CoreAddress {
        OAXDEX_Governance: string;
        OAXDEX_VotingRegistry: string;
        GOV_TOKEN: string;
    }
    export const coreAddress: {
        [chainId: number]: CoreAddress;
    };
}
/// <amd-module name="@scom/scom-governance-proposal/store/utils.ts" />
declare module "@scom/scom-governance-proposal/store/utils.ts" {
    import { ERC20ApprovalModel, IERC20ApprovalEventOptions, INetwork } from "@ijstech/eth-wallet";
    export class State {
        infuraId: string;
        networkMap: {
            [key: number]: INetwork;
        };
        rpcWalletId: string;
        approvalModel: ERC20ApprovalModel;
        constructor(options: any);
        private initData;
        initRpcWallet(defaultChainId: number): string;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        isRpcWalletConnected(): boolean;
        getChainId(): number;
        private setNetworkList;
        setApprovalModelAction(options: IERC20ApprovalEventOptions): Promise<import("@ijstech/eth-wallet").IERC20ApprovalAction>;
        getAddresses(chainId?: number): import("@scom/scom-governance-proposal/store/core.ts").CoreAddress;
    }
    export function isClientWalletConnected(): boolean;
}
/// <amd-module name="@scom/scom-governance-proposal/store/index.ts" />
declare module "@scom/scom-governance-proposal/store/index.ts" {
    export * from "@scom/scom-governance-proposal/store/utils.ts";
}
/// <amd-module name="@scom/scom-governance-proposal/data.json.ts" />
declare module "@scom/scom-governance-proposal/data.json.ts" {
    const _default_1: {
        infuraId: string;
        networks: {
            chainId: number;
            explorerTxUrl: string;
            explorerAddressUrl: string;
        }[];
        defaultBuilderData: {
            defaultChainId: number;
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
            showHeader: boolean;
            showFooter: boolean;
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-governance-proposal/index.css.ts" />
declare module "@scom/scom-governance-proposal/index.css.ts" {
    const _default_2: string;
    export default _default_2;
}
/// <amd-module name="@scom/scom-governance-proposal" />
declare module "@scom/scom-governance-proposal" {
    import { ControlElement, Module } from "@ijstech/components";
    import { INetworkConfig } from "@scom/scom-network-picker";
    import { IWalletPlugin } from "@scom/scom-wallet-modal";
    import { IGovernanceProposal } from "@scom/scom-governance-proposal/interface.ts";
    interface ScomGovernanceProposalElement extends ControlElement {
        lazyLoad?: boolean;
        networks: INetworkConfig[];
        wallets: IWalletPlugin[];
        defaultChainId?: number;
        showHeader?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-governance-proposal']: ScomGovernanceProposalElement;
            }
        }
    }
    export default class GovernanceProposal extends Module {
        private dappContainer;
        private loadingElm;
        private comboAction;
        private lblActionErr;
        private firstAddressStack;
        private lblDuration;
        private edtDuration;
        private lblDurationErr;
        private lblDurationNote;
        private lblDelay;
        private edtDelay;
        private lblDelayErr;
        private lblDelayMinNote;
        private lblDelayMaxNote;
        private edtQuorum;
        private lblQuorumErr;
        private lblQuorumNote;
        private edtThreshold;
        private lblThresholdErr;
        private btnConfirm;
        private systemStack;
        private txStatusModal;
        private mdWallet;
        private state;
        private _data;
        tag: any;
        private form;
        private validateStatus;
        private get chainId();
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        removeRpcWalletEvents(): void;
        onHide(): void;
        isEmptyData(value: IGovernanceProposal): boolean;
        init(): Promise<void>;
        private _getActions;
        getConfigurators(): any[];
        private getData;
        private setData;
        getTag(): Promise<any>;
        private updateTag;
        private setTag;
        private resetRpcWallet;
        private refreshUI;
        private initWallet;
        private initializeWidgetConfig;
        private connectWallet;
        private onChangeAction;
        private onSelectDay;
        private onChangedInput;
        private onConfirm;
        render(): any;
    }
}
