/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <amd-module name="@scom/scom-governance-proposal/interface.ts" />
declare module "@scom/scom-governance-proposal/interface.ts" {
    import { INetworkConfig } from "@scom/scom-network-picker";
    import { ITokenObject } from "@scom/scom-token-list";
    import { IWalletPlugin } from "@scom/scom-wallet-modal";
    export enum QueueType {
        PRIORITY_QUEUE = 0,
        RANGE_QUEUE = 1,
        GROUP_QUEUE = 2,
        PEGGED_QUEUE = 3,
        OTC_QUEUE = 4
    }
    export interface IGovernanceProposal {
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        defaultChainId?: number;
        showHeader?: boolean;
        fromToken?: string;
        toToken?: string;
        customTokens?: Record<number, ITokenObject[]>;
        isFlow?: boolean;
    }
    export interface IValidateStatus {
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
        OSWAP_RestrictedFactory: string;
        OSWAP_VotingExecutor4: string;
        OSWAP_RestrictedOracle: string;
    }
    export const coreAddress: {
        [chainId: number]: CoreAddress;
    };
}
/// <amd-module name="@scom/scom-governance-proposal/store/utils.ts" />
declare module "@scom/scom-governance-proposal/store/utils.ts" {
    import { BigNumber, ERC20ApprovalModel, IERC20ApprovalEventOptions, INetwork } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export class State {
        infuraId: string;
        networkMap: {
            [key: number]: INetwork;
        };
        rpcWalletId: string;
        approvalModel: ERC20ApprovalModel;
        handleNextFlowStep: (data: any) => Promise<void>;
        handleAddTransactions: (data: any) => Promise<void>;
        handleJumpToStep: (data: any) => Promise<void>;
        handleUpdateStepStatus: (data: any) => Promise<void>;
        constructor(options: any);
        private initData;
        initRpcWallet(defaultChainId: number): string;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        isRpcWalletConnected(): boolean;
        getChainId(): number;
        private setNetworkList;
        setApprovalModelAction(options: IERC20ApprovalEventOptions): Promise<import("@ijstech/eth-wallet").IERC20ApprovalAction>;
        getAddresses(chainId?: number): import("@scom/scom-governance-proposal/store/core.ts").CoreAddress;
        getGovToken(chainId: number): ITokenObject;
    }
    export function isClientWalletConnected(): boolean;
    export const getWETH: (chainId: number) => ITokenObject;
    export const isAddressValid: (address: string) => any;
    export function formatNumber(value: number | string | BigNumber, decimalFigures?: number): string;
}
/// <amd-module name="@scom/scom-governance-proposal/store/index.ts" />
declare module "@scom/scom-governance-proposal/store/index.ts" {
    export const nullAddress = "0x0000000000000000000000000000000000000000";
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
/// <amd-module name="@scom/scom-governance-proposal/api.ts" />
declare module "@scom/scom-governance-proposal/api.ts" {
    import { BigNumber, TransactionReceipt } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    import { State } from "@scom/scom-governance-proposal/store/index.ts";
    export function stakeOf(state: State, address: string): Promise<BigNumber>;
    export function getVotingValue(state: State, param1: any): Promise<{
        minExeDelay?: number;
        minVoteDuration?: number;
        maxVoteDuration?: number;
        minOaxTokenToCreateVote?: number;
        minQuorum?: number;
    }>;
    export function getPair(state: State, tokenA: ITokenObject, tokenB: ITokenObject): Promise<string>;
    export function doNewVote(state: State, quorum: number, threshold: number, voteEndTime: number, exeDelay: number, exeCmd: string, exeParams1: any, exeParams2: any): Promise<string>;
    export function parseNewVoteEvent(state: State, receipt: TransactionReceipt): string;
}
/// <amd-module name="@scom/scom-governance-proposal/formSchema.ts" />
declare module "@scom/scom-governance-proposal/formSchema.ts" {
    import ScomNetworkPicker from '@scom/scom-network-picker';
    const _default_3: {
        dataSchema: {
            type: string;
            properties: {
                networks: {
                    type: string;
                    required: boolean;
                    items: {
                        type: string;
                        properties: {
                            chainId: {
                                type: string;
                                enum: number[];
                                required: boolean;
                            };
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: {
                type: string;
                scope: string;
                options: {
                    detail: {
                        type: string;
                    };
                };
            }[];
        };
        customControls(): {
            '#/properties/networks/properties/chainId': {
                render: () => ScomNetworkPicker;
                getData: (control: ScomNetworkPicker) => number;
                setData: (control: ScomNetworkPicker, value: number) => void;
            };
        };
    };
    export default _default_3;
}
/// <amd-module name="@scom/scom-governance-proposal/flow/initialSetup.tsx" />
declare module "@scom/scom-governance-proposal/flow/initialSetup.tsx" {
    import { Control, ControlElement, Module } from "@ijstech/components";
    import { State } from "@scom/scom-governance-proposal/store/index.ts";
    interface ScomGovernanceProposalFlowInitialSetupElement extends ControlElement {
        data?: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-governance-proposal-flow-initial-setup']: ScomGovernanceProposalFlowInitialSetupElement;
            }
        }
    }
    export default class ScomGovernanceProposalFlowInitialSetup extends Module {
        private lblConnectedStatus;
        private btnConnectWallet;
        private lblMinVotingBalance;
        private lblVotingBalance;
        private lblBalanceErr;
        private fromTokenInput;
        private toTokenInput;
        private btnStart;
        private mdWallet;
        private _state;
        private tokenRequirements;
        private executionProperties;
        private walletEvents;
        private minThreshold;
        private votingBalance;
        get state(): State;
        set state(value: State);
        private get rpcWallet();
        private get chainId();
        private get hasEnoughStake();
        private resetRpcWallet;
        setData(value: any): Promise<void>;
        private initWallet;
        private initializeWidgetConfig;
        connectWallet(): Promise<void>;
        private updateConnectStatus;
        private registerEvents;
        onHide(): void;
        init(): void;
        handleClickStart(): Promise<void>;
        render(): any;
        handleFlowStage(target: Control, stage: string, options: any): Promise<{
            widget: ScomGovernanceProposalFlowInitialSetup;
        }>;
    }
}
/// <amd-module name="@scom/scom-governance-proposal" />
declare module "@scom/scom-governance-proposal" {
    import { Container, Control, ControlElement, Module } from "@ijstech/components";
    import { INetworkConfig } from "@scom/scom-network-picker";
    import { IWalletPlugin } from "@scom/scom-wallet-modal";
    import { IGovernanceProposal } from "@scom/scom-governance-proposal/interface.ts";
    import { ITokenObject } from "@scom/scom-token-list";
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
        private lblMinVotingBalance;
        private actionStack;
        private tokenPairStack;
        private firstTokenSelection;
        private firstTokenErr;
        private secondTokenSelection;
        private secondTokenErr;
        private lblDuration;
        private durationInput;
        private durationErr;
        private lblDurationMinNote;
        private lblDelay;
        private delayInput;
        private delayErr;
        private lblDelayMinNote;
        private lblDurationMaxNote;
        private quorumInput;
        private quorumErr;
        private lblQuorumNote;
        private thresholdInput;
        private thresholdErr;
        private btnConfirm;
        private proposalAlert;
        private txStatusModal;
        private mdWallet;
        private state;
        private _data;
        tag: any;
        private minVoteDurationInDays;
        private maxVoteDurationInDays;
        private minQuorum;
        private minThreshold;
        private minDelay;
        private currentStake;
        private dayValueDefault;
        private dayInSeconds;
        private form;
        private validateStatus;
        private rules;
        private get chainId();
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        private get hasEnoughStake();
        private get isValidToCreateVote();
        private get isFlow();
        constructor(parent?: Container, options?: any);
        removeRpcWalletEvents(): void;
        onHide(): void;
        isEmptyData(value: IGovernanceProposal): boolean;
        init(): Promise<void>;
        private _getActions;
        private getProjectOwnerActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getProxySelectors: (chainId: number) => Promise<any[]>;
            getActions: () => any[];
            getData: any;
            setData: (data: any) => Promise<void>;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getActions: any;
            getData: any;
            setData: (data: any) => Promise<void>;
            getTag: any;
            setTag: any;
            getProxySelectors?: undefined;
        } | {
            name: string;
            target: string;
            getData: () => Promise<{
                wallets: IWalletPlugin[];
                networks: INetworkConfig[];
                defaultChainId?: number;
                showHeader?: boolean;
                fromToken?: string;
                toToken?: string;
                customTokens?: Record<number, ITokenObject[]>;
                isFlow?: boolean;
            }>;
            setData: (properties: IGovernanceProposal, linkParams?: Record<string, any>) => Promise<void>;
            getTag: any;
            setTag: any;
            getProxySelectors?: undefined;
            getActions?: undefined;
        })[];
        private getData;
        private setData;
        getTag(): Promise<any>;
        private updateTag;
        private setTag;
        private resetRpcWallet;
        private refreshUI;
        private initWallet;
        private getGovParamValue;
        private checkTimeFormat;
        private initializeWidgetConfig;
        private showResultMessage;
        private connectWallet;
        private updateBalance;
        private getErrorMessage;
        private onValidateInput;
        private onValidateSelection;
        private onSelectFirstToken;
        private onSelectSecondToken;
        private onDurationChanged;
        private onDelayChanged;
        private onQuorumChanged;
        private onThresholdChanged;
        private createExecutiveProposal;
        private getCheckingProps;
        private onValidate;
        private onConfirm;
        render(): any;
        handleFlowStage(target: Control, stage: string, options: any): Promise<{
            widget: any;
        }>;
    }
}
