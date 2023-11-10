var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-governance-proposal/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QueueType = void 0;
    var QueueType;
    (function (QueueType) {
        QueueType[QueueType["PRIORITY_QUEUE"] = 0] = "PRIORITY_QUEUE";
        QueueType[QueueType["RANGE_QUEUE"] = 1] = "RANGE_QUEUE";
        QueueType[QueueType["GROUP_QUEUE"] = 2] = "GROUP_QUEUE";
        QueueType[QueueType["PEGGED_QUEUE"] = 3] = "PEGGED_QUEUE";
        QueueType[QueueType["OTC_QUEUE"] = 4] = "OTC_QUEUE";
    })(QueueType = exports.QueueType || (exports.QueueType = {}));
});
define("@scom/scom-governance-proposal/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_1.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-governance-proposal/store/core.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.coreAddress = void 0;
    exports.coreAddress = {
        56: {
            OAXDEX_Governance: "0x510a179AA399672e26e54Ed8Ce0e822cc9D0a98D",
            OAXDEX_VotingRegistry: "0x845308010C3B699150Cdd54dCf0E7C4b8653e6B2",
            GOV_TOKEN: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
            OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
            OSWAP_VotingExecutor4: "0xD055df2049465293016C3AFF966b65Ad18A12054",
            OSWAP_RestrictedOracle: "0xb1e6db5ccf8153edf9ffbaf206bb6eb2b4dff5c7",
        },
        97: {
            OAXDEX_Governance: "0xDfC070E2dbDAdcf892aE2ed2E2C426aDa835c528",
            OAXDEX_VotingRegistry: "0x28a5bB54A53831Db40e00a6d416FfB2dBe0Fef68",
            GOV_TOKEN: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
            OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
            OSWAP_VotingExecutor4: "0x6EDE6Ab7c32D95C210f84eFedC39f80505ed4ea6",
            OSWAP_RestrictedOracle: "0x4a10650eac83aeb59D007E1F0039B4F1BCeFe0c3",
        },
        137: {
            OAXDEX_Governance: "0x5580B68478e714C02850251353Cc58B85D4033C3",
            OAXDEX_VotingRegistry: "0x64062158A5Cc2aA3740B1035785F29153eA64677",
            GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
            OSWAP_RestrictedFactory: "0xF879576c2D674C5D22f256083DC8fD019a3f33A1",
            OSWAP_VotingExecutor4: "0x9146C8Be06F6EA2a09aD0EA2320e823eC3e98df5",
            OSWAP_RestrictedOracle: "0x501Fbfa9C9BcE27dEe6c481324545Ecd31c8C160",
        },
        80001: {
            OAXDEX_Governance: "0x198b150E554F46aee505a7fb574F5D7895889772",
            OAXDEX_VotingRegistry: "0xC2F105d6413aCE38B9FcB6F43Edc76191a295aC5",
            GOV_TOKEN: "0xb0AF504638BDe5e53D6EaE1119dEd13411c35cF2",
            OSWAP_RestrictedFactory: "0x6D2b196aBf09CF97612a5c062bF14EC278F6D677",
            OSWAP_VotingExecutor4: "0xaE9e339cE34eCc8Beab6c0ffF7aC19cb3a535A5c",
            OSWAP_RestrictedOracle: "0x1368833b4e5e014Bb9bB2583C1617e949E7fA29B",
        },
        43113: {
            OAXDEX_Governance: "0xC025b30e6D4cBe4B6978a1A71a86e6eCB9F87F92",
            OAXDEX_VotingRegistry: "0x05E425dD88dd7D4f725aC429D0C8C022B2004cBB",
            GOV_TOKEN: "0x27eF998b96c9A66937DBAc38c405Adcd7fa5e7DB",
            OSWAP_RestrictedFactory: "0x6C99c8E2c587706281a5B66bA7617DA7e2Ba6e48",
            OSWAP_VotingExecutor4: "0x5AE58EA32B231576ADE76c6f94b13F06C2B8387b",
            OSWAP_RestrictedOracle: "0xc37B982d836b72374f5D276E60A69C66062b9Bcf",
        },
        43114: {
            OAXDEX_Governance: "0x845308010c3b699150cdd54dcf0e7c4b8653e6b2",
            OAXDEX_VotingRegistry: "0x0625468f8F56995Ff1C27EB6FD44ac90E96C5D22",
            GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
            OSWAP_RestrictedFactory: "0x739f0BBcdAd415127FE8d5d6ED053e9D817BdAdb",
            OSWAP_VotingExecutor4: "0x646C5e3Ec40706372243accF2D457D9162553685",
            OSWAP_RestrictedOracle: "0x510a179AA399672e26e54Ed8Ce0e822cc9D0a98D",
        },
        42161: {
            OAXDEX_Governance: "0x5580B68478e714C02850251353Cc58B85D4033C3",
            OAXDEX_VotingRegistry: "0x64062158A5Cc2aA3740B1035785F29153eA64677",
            GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
            OSWAP_RestrictedFactory: "0x408aAf94BD851eb991dA146dFc7C290aA42BA70f",
            OSWAP_VotingExecutor4: "0x2d7BB250595db7D588D32A0f3582BB73CD902060",
            OSWAP_RestrictedOracle: "0x9146C8Be06F6EA2a09aD0EA2320e823eC3e98df5",
        },
        421613: {
            OAXDEX_Governance: "0x6f460B0Bf633E22503Efa460429B0Ab32d655B9D",
            OAXDEX_VotingRegistry: "0x3Eb8e7B7EbdcA63031504fe4C94b8e393D530Ec9",
            GOV_TOKEN: "0x5580B68478e714C02850251353Cc58B85D4033C3",
            OSWAP_RestrictedFactory: "0x6f641f4F5948954F7cd675f3D874Ac60b193bA0d",
            OSWAP_VotingExecutor4: "0xe06a37e298733d418b3e5a36445877A0C657414F",
            OSWAP_RestrictedOracle: "0x20700BC53b3B2259626FB0A51D1D3Ec7Ba63A4B3",
        },
    };
});
define("@scom/scom-governance-proposal/store/utils.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-network-list", "@scom/scom-token-list", "@scom/scom-governance-proposal/store/core.ts"], function (require, exports, components_2, eth_wallet_1, scom_network_list_1, scom_token_list_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatNumber = exports.isAddressValid = exports.getWETH = exports.isClientWalletConnected = exports.State = void 0;
    class State {
        constructor(options) {
            this.infuraId = '';
            this.networkMap = {};
            this.rpcWalletId = '';
            this.networkMap = (0, scom_network_list_1.default)();
            this.initData(options);
        }
        initData(options) {
            if (options.infuraId) {
                this.infuraId = options.infuraId;
            }
            if (options.networks) {
                this.setNetworkList(options.networks, options.infuraId);
            }
        }
        initRpcWallet(defaultChainId) {
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_1.Wallet.getClientInstance();
            const networkList = Object.values(components_2.application.store?.networkMap || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: components_2.application.store?.infuraId,
                multicalls: components_2.application.store?.multicalls
            });
            this.rpcWalletId = instanceId;
            if (clientWallet.address) {
                const rpcWallet = eth_wallet_1.Wallet.getRpcWalletInstance(instanceId);
                rpcWallet.address = clientWallet.address;
            }
            return instanceId;
        }
        getRpcWallet() {
            return this.rpcWalletId ? eth_wallet_1.Wallet.getRpcWalletInstance(this.rpcWalletId) : null;
        }
        isRpcWalletConnected() {
            const wallet = this.getRpcWallet();
            return wallet?.isConnected;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet?.chainId;
        }
        setNetworkList(networkList, infuraId) {
            const wallet = eth_wallet_1.Wallet.getClientInstance();
            this.networkMap = {};
            const defaultNetworkList = (0, scom_network_list_1.default)();
            const defaultNetworkMap = defaultNetworkList.reduce((acc, cur) => {
                acc[cur.chainId] = cur;
                return acc;
            }, {});
            for (let network of networkList) {
                const networkInfo = defaultNetworkMap[network.chainId];
                if (!networkInfo)
                    continue;
                if (infuraId && network.rpcUrls && network.rpcUrls.length > 0) {
                    for (let i = 0; i < network.rpcUrls.length; i++) {
                        network.rpcUrls[i] = network.rpcUrls[i].replace(/{InfuraId}/g, infuraId);
                    }
                }
                this.networkMap[network.chainId] = {
                    ...networkInfo,
                    ...network
                };
                wallet.setNetworkInfo(this.networkMap[network.chainId]);
            }
        }
        async setApprovalModelAction(options) {
            const approvalOptions = {
                ...options,
                spenderAddress: ''
            };
            let wallet = this.getRpcWallet();
            this.approvalModel = new eth_wallet_1.ERC20ApprovalModel(wallet, approvalOptions);
            let approvalModelAction = this.approvalModel.getAction();
            return approvalModelAction;
        }
        getAddresses(chainId) {
            return core_1.coreAddress[chainId || this.getChainId()];
        }
        getGovToken(chainId) {
            let govToken;
            let address = this.getAddresses(chainId).GOV_TOKEN;
            if (chainId == 43113 || chainId == 43114 || chainId == 42161 || chainId == 421613 || chainId == 80001 || chainId == 137) {
                govToken = { address: address, decimals: 18, symbol: "veOSWAP", name: 'Vote-escrowed OSWAP' };
            }
            else {
                govToken = { address: address, decimals: 18, symbol: "OSWAP", name: 'OpenSwap' };
            }
            return govToken;
        }
    }
    exports.State = State;
    function isClientWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
    const getWETH = (chainId) => {
        let wrappedToken = scom_token_list_1.WETHByChainId[chainId];
        return wrappedToken;
    };
    exports.getWETH = getWETH;
    const isAddressValid = (address) => {
        let wallet = eth_wallet_1.Wallet.getClientInstance();
        const isValid = wallet.web3.utils.isAddress(address);
        return isValid;
    };
    exports.isAddressValid = isAddressValid;
    function formatNumber(value, decimalFigures) {
        decimalFigures = decimalFigures || 4;
        const newValue = typeof value === 'object' ? value.toFixed(decimalFigures) : new eth_wallet_1.BigNumber(value).toFixed(decimalFigures);
        return components_2.FormatUtils.formatNumber(newValue, { decimalFigures: decimalFigures });
    }
    exports.formatNumber = formatNumber;
});
define("@scom/scom-governance-proposal/store/index.ts", ["require", "exports", "@scom/scom-governance-proposal/store/utils.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nullAddress = void 0;
    ///<amd-module name='@scom/scom-governance-proposal/store/index.ts'/> 
    exports.nullAddress = "0x0000000000000000000000000000000000000000";
    __exportStar(utils_1, exports);
});
define("@scom/scom-governance-proposal/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-governance-proposal/data.json.ts'/> 
    exports.default = {
        "infuraId": "adc596bf88b648e2a8902bc9093930c5",
        "networks": [
            {
                "chainId": 97,
                "explorerTxUrl": "https://testnet.bscscan.com/tx/",
                "explorerAddressUrl": "https://testnet.bscscan.com/address/"
            },
            {
                "chainId": 43113,
                "explorerTxUrl": "https://testnet.snowtrace.io/tx/",
                "explorerAddressUrl": "https://testnet.snowtrace.io/address/"
            }
        ],
        "defaultBuilderData": {
            "defaultChainId": 43113,
            "networks": [
                {
                    "chainId": 43113
                },
                {
                    "chainId": 97
                }
            ],
            "wallets": [
                {
                    "name": "metamask"
                }
            ],
            "showHeader": true,
            "showFooter": true
        }
    };
});
define("@scom/scom-governance-proposal/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.default = components_3.Styles.style({
        $nest: {
            '.custom-combobox .selection': {
                background: 'transparent',
                border: 'none',
                $nest: {
                    'input': {
                        background: 'transparent',
                        color: Theme.text.third,
                        border: 'none'
                    }
                }
            },
            '.custom-combobox .icon-btn': {
                border: 'none'
            },
            'input': {
                background: 'transparent',
                color: Theme.text.third,
                border: 'none'
            },
            '.btn-os': {
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 5,
                background: Theme.background.gradient,
                $nest: {
                    '&:disabled': {
                        color: '#fff'
                    }
                }
            },
            '.custom-token-selection #gridTokenInput': {
                background: 'transparent',
                padding: '0 !important',
                $nest: {
                    '#btnToken': {
                        background: Theme.background.gradient,
                        color: '#fff !important'
                    },
                    '#btnToken i-label': {
                        color: Theme.text.third,
                        fontWeight: 700
                    }
                }
            },
            '.custom-token-selection.has-token #gridTokenInput #btnToken': {
                background: 'transparent'
            },
        }
    });
});
define("@scom/scom-governance-proposal/api.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/oswap-openswap-contract", "@scom/scom-governance-proposal/store/index.ts"], function (require, exports, eth_wallet_2, oswap_openswap_contract_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseNewVoteEvent = exports.doNewVote = exports.getPair = exports.getVotingValue = exports.stakeOf = void 0;
    const Factory = "OAXDEX_Factory";
    const OracleFactory = "OSWAP_OracleFactory";
    const Pair = "OSWAP_Pair";
    const OraclePair = "OSWAP_OraclePair";
    const VotingContract = "OAXDEX_VotingContract";
    const Executor = "OAXDEX_VotingExecutor";
    const Executor1 = "OAXDEX_VotingExecutor1";
    const Executor2 = "OSWAP_VotingExecutor2";
    const Executor3 = "OSWAP_VotingExecutor3";
    const Governance = "OAXDEX_Governance";
    const Executor4 = "OSWAP_VotingExecutor4";
    const Executor5 = "OSWAP_PeggedVotingExecutor2";
    const Executor6 = "OSWAP_OtcVotingExecutor4";
    const RestrictedFactory = "OSWAP_RestrictedFactory";
    const PeggedFactory = "OSWAP_PeggedOracleFactory";
    const mapTokenObjectSet = (state, obj) => {
        let chainId = state.getChainId();
        const WETH9 = (0, index_1.getWETH)(chainId);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!obj[key]?.address)
                    obj[key] = WETH9;
            }
        }
        return obj;
    };
    function govTokenDecimals(state) {
        const chainId = state.getChainId();
        return state.getGovToken(chainId).decimals || 18;
    }
    async function stakeOf(state, address) {
        let result = new eth_wallet_2.BigNumber(0);
        try {
            const wallet = state.getRpcWallet();
            const chainId = state.getChainId();
            const gov = state.getAddresses(chainId).OAXDEX_Governance;
            const govContract = new oswap_openswap_contract_1.Contracts.OAXDEX_Governance(wallet, gov);
            let stakeOf = await govContract.stakeOf(address);
            result = eth_wallet_2.Utils.fromDecimals(stakeOf, govTokenDecimals(state));
        }
        catch (err) { }
        return result;
    }
    exports.stakeOf = stakeOf;
    async function getVotingValue(state, param1) {
        let result = {};
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const address = state.getAddresses(chainId)?.OAXDEX_Governance;
        if (address) {
            const govContract = new oswap_openswap_contract_1.Contracts.OAXDEX_Governance(wallet, address);
            const params = await govContract.getVotingParams(eth_wallet_2.Utils.stringToBytes32(param1));
            result = {
                minExeDelay: params.minExeDelay.toNumber(),
                minVoteDuration: params.minVoteDuration.toNumber(),
                maxVoteDuration: params.maxVoteDuration.toNumber(),
                minOaxTokenToCreateVote: Number(eth_wallet_2.Utils.fromDecimals(params.minOaxTokenToCreateVote).toFixed()),
                minQuorum: Number(eth_wallet_2.Utils.fromDecimals(params.minQuorum).toFixed())
            };
        }
        return result;
    }
    exports.getVotingValue = getVotingValue;
    async function getPair(state, tokenA, tokenB) {
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        let tokens = mapTokenObjectSet(state, { tokenA, tokenB });
        let params = { param1: tokens.tokenA.address, param2: tokens.tokenB.address };
        let factoryAddress = state.getAddresses(chainId).OSWAP_RestrictedFactory;
        let groupQ = new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
        return await groupQ.getPair({ ...params, param3: 0 });
    }
    exports.getPair = getPair;
    async function doNewVote(state, quorum, threshold, voteEndTime, exeDelay, exeCmd, exeParams1, exeParams2) {
        let result;
        const wallet = eth_wallet_2.Wallet.getClientInstance();
        const chainId = state.getChainId();
        let param = {
            executor: '',
            name: '',
            options: [eth_wallet_2.Utils.stringToBytes32('Y'), eth_wallet_2.Utils.stringToBytes32('N')],
            quorum: new eth_wallet_2.BigNumber(quorum).shiftedBy(18),
            threshold: new eth_wallet_2.BigNumber(threshold).shiftedBy(18 - 2),
            voteEndTime,
            executeDelay: exeDelay,
            executeParam: []
        };
        const Addresses = state.getAddresses(chainId);
        const WETH9 = (0, index_1.getWETH)(chainId);
        // restrictedOracle
        let executor = Executor4;
        let factoryContract = new oswap_openswap_contract_1.Contracts.OSWAP_RestrictedFactory(wallet, Addresses.OSWAP_RestrictedFactory);
        exeParams2 = Addresses.OSWAP_RestrictedOracle;
        let tokens = exeParams1.map(e => e?.address ? e : WETH9);
        let oldOracle = await factoryContract.oracles({ param1: tokens[0].address, param2: tokens[1].address });
        let oracleName;
        let existingOracle = await factoryContract.isOracle(exeParams2);
        if (oldOracle == eth_wallet_2.Utils.nullAddress && existingOracle) {
            exeCmd = "addOldOracleToNewPair";
            oracleName = "addOrc_";
        }
        else {
            exeCmd = "setOracle";
            oracleName = "setOrc_";
        }
        let symbol1 = await new oswap_openswap_contract_1.Contracts.ERC20(wallet, tokens[0].address).symbol();
        let symbol2 = await new oswap_openswap_contract_1.Contracts.ERC20(wallet, tokens[1].address).symbol();
        oracleName = oracleName + symbol1 + "/" + symbol2 + "_" + exeParams2.substring(2);
        param.executor = Addresses[executor];
        param.name = eth_wallet_2.Utils.stringToBytes32(oracleName.substring(0, 32));
        if (new eth_wallet_2.BigNumber(tokens[0].address.toLowerCase()).lt(tokens[1].address.toLowerCase()))
            param.executeParam = [eth_wallet_2.Utils.stringToBytes32(exeCmd), eth_wallet_2.Utils.addressToBytes32Right(tokens[0].address, true), eth_wallet_2.Utils.addressToBytes32Right(tokens[1].address, true), eth_wallet_2.Utils.addressToBytes32Right(exeParams2, true)];
        else
            param.executeParam = [eth_wallet_2.Utils.stringToBytes32(exeCmd), eth_wallet_2.Utils.addressToBytes32Right(tokens[1].address, true), eth_wallet_2.Utils.addressToBytes32Right(tokens[0].address, true), eth_wallet_2.Utils.addressToBytes32Right(exeParams2, true)];
        const votingRegistry = new oswap_openswap_contract_1.Contracts.OAXDEX_VotingRegistry(wallet, Addresses.OAXDEX_VotingRegistry);
        let receipt = await votingRegistry.newVote(param);
        const governance = new oswap_openswap_contract_1.Contracts.OAXDEX_Governance(wallet, Addresses.OAXDEX_Governance);
        let event = governance.parseNewVoteEvent(receipt)[0];
        result = event?.vote || '';
        return result;
    }
    exports.doNewVote = doNewVote;
    function parseNewVoteEvent(state, receipt) {
        const wallet = eth_wallet_2.Wallet.getClientInstance();
        const chainId = state.getChainId();
        const govAddress = state.getAddresses(chainId).OAXDEX_Governance;
        const governance = new oswap_openswap_contract_1.Contracts.OAXDEX_Governance(wallet, govAddress);
        let event = governance.parseNewVoteEvent(receipt)[0];
        return event?.vote || '';
    }
    exports.parseNewVoteEvent = parseNewVoteEvent;
});
define("@scom/scom-governance-proposal/formSchema.ts", ["require", "exports", "@scom/scom-network-picker"], function (require, exports, scom_network_picker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chainIds = [1, 56, 137, 250, 97, 80001, 43113, 43114, 42161, 421613];
    const networks = chainIds.map(v => { return { chainId: v }; });
    exports.default = {
        dataSchema: {
            type: 'object',
            properties: {
                networks: {
                    type: 'array',
                    required: true,
                    items: {
                        type: 'object',
                        properties: {
                            chainId: {
                                type: 'number',
                                enum: chainIds,
                                required: true
                            }
                        }
                    }
                },
            }
        },
        uiSchema: {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/networks',
                    options: {
                        detail: {
                            type: 'VerticalLayout'
                        }
                    }
                }
            ]
        },
        customControls() {
            return {
                '#/properties/networks/properties/chainId': {
                    render: () => {
                        const networkPicker = new scom_network_picker_1.default(undefined, {
                            type: 'combobox',
                            networks
                        });
                        return networkPicker;
                    },
                    getData: (control) => {
                        return control.selectedNetwork?.chainId;
                    },
                    setData: (control, value) => {
                        control.setNetworkByChainId(value);
                    }
                }
            };
        }
    };
});
define("@scom/scom-governance-proposal/flow/initialSetup.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-governance-proposal/store/index.ts", "@ijstech/eth-wallet", "@scom/scom-token-list", "@scom/scom-governance-proposal/api.ts"], function (require, exports, components_4, index_2, eth_wallet_3, scom_token_list_2, api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomGovernanceProposalFlowInitialSetup = class ScomGovernanceProposalFlowInitialSetup extends components_4.Module {
        constructor() {
            super(...arguments);
            this.walletEvents = [];
            this.minThreshold = 0;
            this.votingBalance = new eth_wallet_3.BigNumber(0);
        }
        get state() {
            return this._state;
        }
        set state(value) {
            this._state = value;
        }
        get rpcWallet() {
            return this.state.getRpcWallet();
        }
        get chainId() {
            return this.executionProperties.chainId || this.executionProperties.defaultChainId;
        }
        get hasEnoughStake() {
            return this.votingBalance.gte(this.minThreshold);
        }
        async resetRpcWallet() {
            await this.state.initRpcWallet(this.chainId);
        }
        async setData(value) {
            this.executionProperties = value.executionProperties;
            this.tokenRequirements = value.tokenRequirements;
            await this.resetRpcWallet();
            await this.initializeWidgetConfig();
        }
        async initWallet() {
            try {
                const rpcWallet = this.rpcWallet;
                await rpcWallet.init();
            }
            catch (err) {
                console.log(err);
            }
        }
        async initializeWidgetConfig() {
            const connected = (0, index_2.isClientWalletConnected)();
            this.updateConnectStatus(connected);
            await this.initWallet();
            this.fromTokenInput.chainId = this.chainId;
            this.toTokenInput.chainId = this.chainId;
            const tokens = scom_token_list_2.tokenStore.getTokenList(this.chainId);
            this.fromTokenInput.tokenDataListProp = tokens;
            this.toTokenInput.tokenDataListProp = tokens;
            const paramValueObj = await (0, api_1.getVotingValue)(this.state, 'vote');
            this.minThreshold = paramValueObj.minOaxTokenToCreateVote;
            this.votingBalance = await (0, api_1.stakeOf)(this.state, this.rpcWallet.account.address);
            this.lblMinVotingBalance.caption = (0, index_2.formatNumber)(this.minThreshold);
            this.lblVotingBalance.caption = (0, index_2.formatNumber)(this.votingBalance);
            this.lblBalanceErr.visible = !this.hasEnoughStake;
            this.btnStart.enabled = this.hasEnoughStake;
        }
        async connectWallet() {
            if (!(0, index_2.isClientWalletConnected)()) {
                if (this.mdWallet) {
                    await components_4.application.loadPackage('@scom/scom-wallet-modal', '*');
                    this.mdWallet.networks = this.executionProperties.networks;
                    this.mdWallet.wallets = this.executionProperties.wallets;
                    this.mdWallet.showModal();
                }
            }
        }
        updateConnectStatus(connected) {
            if (connected) {
                this.lblConnectedStatus.caption = 'Connected with ' + eth_wallet_3.Wallet.getClientInstance().address;
                this.btnConnectWallet.visible = false;
            }
            else {
                this.lblConnectedStatus.caption = 'Please connect your wallet first';
                this.btnConnectWallet.visible = true;
            }
        }
        registerEvents() {
            let clientWallet = eth_wallet_3.Wallet.getClientInstance();
            this.walletEvents.push(clientWallet.registerWalletEvent(this, eth_wallet_3.Constants.ClientWalletEvent.AccountsChanged, async (payload) => {
                const { account } = payload;
                let connected = !!account;
                this.updateConnectStatus(connected);
            }));
        }
        onHide() {
            let clientWallet = eth_wallet_3.Wallet.getClientInstance();
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
            if (!this.hasEnoughStake)
                return;
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
                    executionProperties: this.executionProperties,
                    isFlow: true
                });
        }
        render() {
            return (this.$render("i-vstack", { gap: "1rem", padding: { top: 10, bottom: 10, left: 20, right: 20 } },
                this.$render("i-label", { caption: "Get Ready to Create Executive Proposal" }),
                this.$render("i-vstack", { gap: "1rem" },
                    this.$render("i-label", { id: "lblConnectedStatus" }),
                    this.$render("i-hstack", null,
                        this.$render("i-button", { id: "btnConnectWallet", caption: "Connect Wallet", font: { color: Theme.colors.primary.contrastText }, padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, onClick: this.connectWallet.bind(this) }))),
                this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "6px" },
                    this.$render("i-label", { caption: "Minimum Voting Balance" }),
                    this.$render("i-label", { id: "lblMinVotingBalance" })),
                this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "6px" },
                    this.$render("i-label", { caption: "Voting Balance" }),
                    this.$render("i-label", { id: "lblVotingBalance" })),
                this.$render("i-label", { id: "lblBalanceErr", caption: "Insufficient Voting Balance", font: { color: Theme.colors.error.main }, visible: false }),
                this.$render("i-label", { caption: "Select a Pair" }),
                this.$render("i-hstack", { horizontalAlignment: "center", verticalAlignment: "center", wrap: 'wrap', gap: 10 },
                    this.$render("i-scom-token-input", { id: "fromTokenInput", type: "combobox", isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 } }),
                    this.$render("i-label", { caption: "to", font: { size: "1rem" } }),
                    this.$render("i-scom-token-input", { id: "toTokenInput", type: "combobox", isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, border: { radius: 12 } })),
                this.$render("i-hstack", { horizontalAlignment: 'center' },
                    this.$render("i-button", { id: "btnStart", caption: "Start", padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, font: { color: Theme.colors.primary.contrastText, size: '1.5rem' }, onClick: this.handleClickStart })),
                this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] })));
        }
        async handleFlowStage(target, stage, options) {
            let widget = this;
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
            return { widget };
        }
    };
    ScomGovernanceProposalFlowInitialSetup = __decorate([
        (0, components_4.customElements)('i-scom-governance-proposal-flow-initial-setup')
    ], ScomGovernanceProposalFlowInitialSetup);
    exports.default = ScomGovernanceProposalFlowInitialSetup;
});
define("@scom/scom-governance-proposal", ["require", "exports", "@ijstech/components", "@scom/scom-governance-proposal/assets.ts", "@scom/scom-governance-proposal/store/index.ts", "@scom/scom-governance-proposal/data.json.ts", "@ijstech/eth-wallet", "@scom/scom-governance-proposal/index.css.ts", "@scom/scom-governance-proposal/api.ts", "@scom/scom-token-list", "@scom/scom-governance-proposal/formSchema.ts", "@scom/scom-governance-proposal/flow/initialSetup.tsx"], function (require, exports, components_5, assets_1, index_3, data_json_1, eth_wallet_4, index_css_1, api_2, scom_token_list_3, formSchema_1, initialSetup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_5.Styles.Theme.ThemeVars;
    let GovernanceProposal = class GovernanceProposal extends components_5.Module {
        get chainId() {
            return this.state.getChainId();
        }
        get defaultChainId() {
            return this._data.defaultChainId;
        }
        set defaultChainId(value) {
            this._data.defaultChainId = value;
        }
        get wallets() {
            return this._data.wallets ?? [];
        }
        set wallets(value) {
            this._data.wallets = value;
        }
        get networks() {
            return this._data.networks ?? [];
        }
        set networks(value) {
            this._data.networks = value;
        }
        get showHeader() {
            return this._data.showHeader ?? true;
        }
        set showHeader(value) {
            this._data.showHeader = value;
        }
        get hasEnoughStake() {
            return this.currentStake.gte(this.minThreshold);
        }
        get isValidToCreateVote() {
            return this.hasEnoughStake;
        }
        get isFlow() {
            return this._data.isFlow ?? false;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                wallets: [],
                networks: []
            };
            this.tag = {};
            this.minVoteDurationInDays = 0;
            this.maxVoteDurationInDays = 0;
            this.minQuorum = 0;
            this.minThreshold = 0;
            this.minDelay = 0;
            this.currentStake = new eth_wallet_4.BigNumber(0);
            this.dayValueDefault = 7;
            this.dayInSeconds = 24 * 60 * 60;
            this.form = {
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
            };
            this.validateStatus = {};
            this.rules = {
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
                        message: (minVoteDurationInDays, maxVoteDurationInDays) => `Duration should be between ${minVoteDurationInDays} and ${maxVoteDurationInDays}`,
                        validator: (value) => +value >= this.minVoteDurationInDays && +value <= this.maxVoteDurationInDays
                    },
                ],
                quorum: [
                    {
                        required: true,
                        message: 'Please input Quorum'
                    },
                    {
                        message: (minQuorum) => `Quorum must be greater than or equal to ${minQuorum}`,
                        validator: (value) => +value >= this.minQuorum
                    },
                ],
                address: [
                    {
                        required: true,
                        message: `Please input Address`
                    },
                    {
                        validator: async (value) => (0, index_3.isAddressValid)(value),
                        message: `Please enter valid Address`
                    },
                ],
                delay: [
                    {
                        required: true,
                        message: `Please select Delay (seconds)`
                    },
                    {
                        message: (minDelay) => `Delay must be greater than or equal to ${minDelay}`,
                        validator: (value) => +value >= this.minDelay
                    },
                ],
                threshold: [
                    {
                        required: true,
                        message: `Please input Threshold`
                    },
                    {
                        message: `Threshold must be greater than or equal to 50 and smaller than or equal to 100`,
                        validator: (value) => +value >= 50 && +value <= 100
                    },
                ],
                firstToken: [
                    {
                        required: true,
                        message: 'Please Select a pair'
                    },
                    {
                        validator: (value) => value !== this.form.secondToken?.address ?? this.form.secondToken?.symbol,
                        message: 'A pair must not be the same'
                    },
                ],
                secondToken: [
                    {
                        required: true,
                        message: 'Please Select a pair'
                    },
                    {
                        validator: (value) => value !== this.form.firstToken?.address ?? this.form.firstToken?.symbol,
                        message: 'A pair must not be the same'
                    },
                ]
            };
            this.initWallet = async () => {
                try {
                    await eth_wallet_4.Wallet.getClientInstance().init();
                    const rpcWallet = this.state.getRpcWallet();
                    await rpcWallet.init();
                }
                catch (err) {
                    console.log(err);
                }
            };
            this.getGovParamValue = async () => {
                let paramValueObj = await (0, api_2.getVotingValue)(this.state, 'vote');
                const wallet = this.state.getRpcWallet();
                const selectedAddress = wallet.account.address;
                this.currentStake = await (0, api_2.stakeOf)(this.state, selectedAddress);
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
            };
            this.checkTimeFormat = (date) => {
                return `${date} second${date === 1 ? '' : 's'}`;
            };
            this.initializeWidgetConfig = async () => {
                setTimeout(async () => {
                    const chainId = this.chainId;
                    scom_token_list_3.tokenStore.updateTokenMapData(chainId);
                    await this.initWallet();
                    await this.getGovParamValue();
                    this.updateBalance();
                    const connected = (0, index_3.isClientWalletConnected)();
                    if (!connected || !this.state.isRpcWalletConnected()) {
                        this.btnConfirm.caption = connected ? "Switch Network" : "Connect Wallet";
                        this.btnConfirm.enabled = true;
                    }
                    else {
                        this.btnConfirm.enabled = this.isValidToCreateVote;
                        this.btnConfirm.caption = !this.hasEnoughStake ? 'Insufficient Voting Balance' : 'Create Executive Proposal';
                    }
                    this.firstTokenSelection.chainId = chainId;
                    this.secondTokenSelection.chainId = chainId;
                    this.firstTokenSelection.tokenReadOnly = this.isFlow;
                    this.secondTokenSelection.tokenReadOnly = this.isFlow;
                    const tokens = scom_token_list_3.tokenStore.getTokenList(chainId);
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
                    this.lblMinVotingBalance.caption = `Minimum Voting Balance: ${(0, index_3.formatNumber)(this.minThreshold)} ${tokenSymbol}`;
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
            };
            this.showResultMessage = (status, content) => {
                if (!this.txStatusModal)
                    return;
                let params = { status };
                if (status === 'success') {
                    params.txtHash = content;
                }
                else {
                    params.content = content;
                }
                this.txStatusModal.message = { ...params };
                this.txStatusModal.showModal();
            };
            this.connectWallet = async () => {
                if (!(0, index_3.isClientWalletConnected)()) {
                    if (this.mdWallet) {
                        await components_5.application.loadPackage('@scom/scom-wallet-modal', '*');
                        this.mdWallet.networks = this.networks;
                        this.mdWallet.wallets = this.wallets;
                        this.mdWallet.showModal();
                    }
                    return;
                }
                if (!this.state.isRpcWalletConnected()) {
                    const clientWallet = eth_wallet_4.Wallet.getClientInstance();
                    await clientWallet.switchNetwork(this.chainId);
                }
            };
            this.createExecutiveProposal = async () => {
                this.btnConfirm.rightIcon.spin = true;
                this.btnConfirm.rightIcon.visible = true;
                let voteEndTime = Math.floor(Date.now() / 1000) + this.form.duration;
                let exeCmd;
                let exeParams1;
                let exeParams2;
                const fromToken = this.form.firstToken;
                const toToken = this.form.secondToken;
                let pair = index_3.nullAddress;
                try {
                    pair = await (0, api_2.getPair)(this.state, fromToken, toToken);
                }
                catch (error) {
                }
                if (pair === index_3.nullAddress) {
                    let tempVal = await (0, api_2.getVotingValue)(this.state, 'oracle');
                    this.minThreshold = tempVal.minOaxTokenToCreateVote;
                }
                else {
                    let tempVal = await (0, api_2.getVotingValue)(this.state, 'vote');
                    this.minThreshold = tempVal.minOaxTokenToCreateVote;
                }
                exeParams1 = [fromToken, toToken];
                exeParams2 = undefined;
                exeCmd = 'oracle';
                const wallet = eth_wallet_4.Wallet.getClientInstance();
                try {
                    const delayInSeconds = this.form.delay;
                    const chainId = this.chainId;
                    const firstToken = fromToken?.address || fromToken?.symbol;
                    const secondToken = toToken?.address || toToken?.symbol;
                    this.showResultMessage('warning', 'Creating new Executive Proposal');
                    const txHashCallback = async (err, receipt) => {
                        if (err) {
                            this.showResultMessage('error', err);
                        }
                        else if (receipt) {
                            this.showResultMessage('success', receipt);
                        }
                    };
                    const confirmationCallback = async (receipt) => {
                        const address = (0, api_2.parseNewVoteEvent)(this.state, receipt);
                        if (!address)
                            return;
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
                        }
                        catch (err) {
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
                            });
                        }
                    };
                    wallet.registerSendTxEvents({
                        transactionHash: txHashCallback,
                        confirmation: confirmationCallback
                    });
                    let result = await (0, api_2.doNewVote)(this.state, this.form.quorum, this.form.threshold, voteEndTime, delayInSeconds, exeCmd, exeParams1, exeParams2);
                    if (result && !this._data.isFlow) {
                        this.proposalAlert.status = "success";
                        this.proposalAlert.title = "Voting Address";
                        this.proposalAlert.content = result;
                        this.proposalAlert.showModal();
                    }
                }
                catch (err) {
                    console.log('newVote', err);
                    this.showResultMessage('error', '');
                    wallet.registerSendTxEvents({});
                }
                finally {
                    this.btnConfirm.rightIcon.spin = false;
                    this.btnConfirm.rightIcon.visible = false;
                }
            };
            this.state = new index_3.State(data_json_1.default);
        }
        removeRpcWalletEvents() {
            const rpcWallet = this.state.getRpcWallet();
            if (rpcWallet)
                rpcWallet.unregisterAllWalletEvents();
        }
        onHide() {
            this.dappContainer.onHide();
            this.removeRpcWalletEvents();
        }
        isEmptyData(value) {
            return !value || !value.networks || value.networks.length === 0;
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.firstTokenSelection.title = (this.$render("i-hstack", { gap: "4px", verticalAlignment: "center" },
                this.$render("i-label", { caption: "Select a token", font: { color: Theme.colors.primary.main, size: '1.25rem', bold: true } }),
                this.$render("i-icon", { name: "question-circle", fill: Theme.colors.primary.main, width: 16, height: 16, tooltip: { content: 'Find a token by searching for its name or symbol or by pasting its address below.', placement: 'right' } })));
            this.secondTokenSelection.title = (this.$render("i-hstack", { gap: "4px", verticalAlignment: "center" },
                this.$render("i-label", { caption: "Select a token", font: { color: Theme.colors.primary.main, size: '1.25rem', bold: true } }),
                this.$render("i-icon", { name: "question-circle", fill: Theme.colors.primary.main, width: 16, height: 16, tooltip: { content: 'Find a token by searching for its name or symbol or by pasting its address below.', placement: 'right' } })));
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const networks = this.getAttribute('networks', true);
                const wallets = this.getAttribute('wallets', true);
                const defaultChainId = this.getAttribute('defaultChainId', true);
                const showHeader = this.getAttribute('showHeader', true);
                const data = {
                    networks,
                    wallets,
                    defaultChainId,
                    showHeader
                };
                if (!this.isEmptyData(data)) {
                    await this.setData(data);
                }
            }
            this.loadingElm.visible = false;
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
        }
        _getActions(category) {
            const actions = [];
            if (category && category !== 'offers') {
                actions.push({
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = {
                            wallets: [],
                            networks: []
                        };
                        let oldTag = {};
                        return {
                            execute: () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { networks } = userInputData;
                                const themeSettings = {};
                                ;
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
                        };
                    },
                    userInputDataSchema: formSchema_1.default.dataSchema,
                    userInputUISchema: formSchema_1.default.uiSchema,
                    customControls: formSchema_1.default.customControls()
                });
            }
            return actions;
        }
        getProjectOwnerActions() {
            const actions = [
                {
                    name: 'Settings',
                    userInputDataSchema: formSchema_1.default.dataSchema,
                    userInputUISchema: formSchema_1.default.uiSchema,
                    customControls: formSchema_1.default.customControls()
                }
            ];
            return actions;
        }
        getConfigurators() {
            return [
                {
                    name: 'Project Owner Configurator',
                    target: 'Project Owners',
                    getProxySelectors: async (chainId) => {
                        return [];
                    },
                    getActions: () => {
                        return this.getProjectOwnerActions();
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
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
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData({ ...defaultData, ...data });
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Embedder Configurator',
                    target: 'Embedders',
                    getData: async () => {
                        return { ...this._data };
                    },
                    setData: async (properties, linkParams) => {
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
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.resetRpcWallet();
            await this.refreshUI();
        }
        async getTag() {
            return this.tag;
        }
        updateTag(type, value) {
            this.tag[type] = this.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        setTag(value) {
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
        resetRpcWallet() {
            this.removeRpcWalletEvents();
            const rpcWalletId = this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.state.getRpcWallet();
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_4.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.firstTokenSelection.token = null;
                this.secondTokenSelection.token = null;
                this.form.firstToken = undefined;
                this.form.secondToken = undefined;
                this.firstTokenSelection.classList.remove('has-token');
                this.secondTokenSelection.classList.remove('has-token');
                this.refreshUI();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_4.Constants.RpcWalletEvent.Connected, async (connected) => {
                this.refreshUI();
            });
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                rpcWalletId: rpcWallet.instanceId
            };
            if (this.dappContainer?.setData)
                this.dappContainer.setData(data);
        }
        async refreshUI() {
            await this.initializeWidgetConfig();
        }
        async updateBalance() {
            const rpcWallet = this.state.getRpcWallet();
            if (rpcWallet.address) {
                if (!this.isEmptyData(this._data))
                    await scom_token_list_3.tokenStore.updateTokenBalancesByChainId(this.chainId);
            }
        }
        getErrorMessage(name, callback) {
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
        onValidateInput(name) {
            const rules = this.rules[name] || [];
            let result = true;
            if (rules.length) {
                const inputElm = this[`${name}Input`];
                const errorElm = this[`${name}Err`];
                errorElm && (errorElm.visible = false);
                const selectElm = this[`${name}Select`];
                if (!inputElm && !selectElm)
                    return false;
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
        onValidateSelection(name) {
            const rules = this.rules[name] || [];
            let result = true;
            if (rules.length) {
                const inputElm = this[`${name}Selection`];
                const errorElm = this[`${name}Err`];
                errorElm && (errorElm.visible = false);
                if (!inputElm)
                    return false;
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
        onSelectFirstToken(token) {
            this.form.firstToken = token;
            this.validateStatus.firstToken = this.onValidateSelection('firstToken');
            this.firstTokenSelection.classList.add('has-token');
        }
        onSelectSecondToken(token) {
            this.form.secondToken = token;
            this.validateStatus.secondToken = this.onValidateSelection('secondToken');
            this.secondTokenSelection.classList.add('has-token');
        }
        onDurationChanged() {
            this.form.duration = Number(this.durationInput.value);
            this.validateStatus.duration = this.onValidateInput("duration");
        }
        onDelayChanged() {
            this.form.delay = Number(this.delayInput.value);
            this.validateStatus.delay = this.onValidateInput("delay");
        }
        onQuorumChanged() {
            this.form.quorum = Number(this.quorumInput.value);
            this.validateStatus.quorum = this.onValidateInput("quorum");
        }
        onThresholdChanged() {
            this.form.threshold = Number(this.thresholdInput.value);
            this.validateStatus.threshold = this.onValidateInput("threshold");
        }
        getCheckingProps() {
            const { duration, quorum, delay, threshold, firstToken, secondToken, } = this.validateStatus;
            let result = {
                duration,
                quorum,
                delay,
                threshold
            };
            return result = { ...result, firstToken, secondToken };
        }
        onValidate() {
            const validateKeys = Object.keys(this.getCheckingProps());
            let hasValid = true;
            for (let i = 0; i < validateKeys.length; i++) {
                const key = validateKeys[i];
                const isSelection = key === 'firstToken' || key === 'secondToken';
                const result = isSelection ? this.onValidateSelection(key) : this.onValidateInput(key);
                if (!result)
                    hasValid = false;
            }
            return hasValid;
        }
        onConfirm() {
            if (!(0, index_3.isClientWalletConnected)() || !this.state.isRpcWalletConnected()) {
                this.connectWallet();
                return;
            }
            if (!this.isValidToCreateVote) {
                const tokenSymbol = this.state.getGovToken(this.chainId)?.symbol || '';
                this.showResultMessage('error', `Minimum ${this.minThreshold} ${tokenSymbol} Required`);
            }
            else {
                if (!this.onValidate())
                    return;
                this.createExecutiveProposal();
            }
        }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer" },
                this.$render("i-panel", { class: index_css_1.default, background: { color: Theme.background.main } },
                    this.$render("i-panel", null,
                        this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-vstack", { width: "100%", height: "100%", maxWidth: 1200, padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, margin: { left: 'auto', right: 'auto' }, gap: "1rem" },
                            this.$render("i-vstack", { width: "100%", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, gap: "1rem" },
                                this.$render("i-vstack", { id: "actionStack" },
                                    this.$render("i-vstack", { id: "tokenPairStack", gap: '0.5rem', width: "100%" },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: "4px" },
                                            this.$render("i-label", { caption: '*', font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { caption: 'Select a pair', font: { size: '1rem', weight: 600 } }),
                                            this.$render("i-icon", { name: "question-circle", fill: "#fff", width: 16, height: 16, tooltip: { content: 'The pair you want to register in the Oracle', placement: 'right' } })),
                                        this.$render("i-hstack", { gap: "1rem" },
                                            this.$render("i-vstack", { horizontalAlignment: "start", gap: "0.5rem" },
                                                this.$render("i-scom-token-input", { id: "firstTokenSelection", class: "custom-token-selection", width: "auto", height: 34, type: "button", importable: true, isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, onSelectToken: this.onSelectFirstToken.bind(this) }),
                                                this.$render("i-label", { id: "firstTokenErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false })),
                                            this.$render("i-vstack", { horizontalAlignment: "start", gap: "0.5rem" },
                                                this.$render("i-scom-token-input", { id: "secondTokenSelection", class: "custom-token-selection", width: "auto", height: 34, type: "button", importable: true, isBalanceShown: false, isBtnMaxShown: false, isInputShown: false, onSelectToken: this.onSelectSecondToken.bind(this) }),
                                                this.$render("i-label", { id: "secondTokenErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }))),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "lblMinVotingBalance", font: { size: '0.875rem' }, margin: { left: 'auto' } })))),
                                this.$render("i-hstack", { width: "100%", gap: "1rem", wrap: "wrap" },
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { id: "lblDuration", caption: "Duration", font: { size: '1rem', weight: 600 } }),
                                            this.$render("i-icon", { name: "question-circle", fill: "#fff", width: 16, height: 16, tooltip: { content: 'Vote Duration in seconds', placement: 'right' } })),
                                        this.$render("i-input", { id: "durationInput", height: 32, width: "100%", inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: this.onDurationChanged.bind(this) }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "durationErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-vstack", { margin: { left: 'auto' }, class: "text-right" },
                                                this.$render("i-label", { id: "lblDurationMinNote", font: { size: '0.875rem' }, caption: "Minimum: 0 second" }),
                                                this.$render("i-label", { id: "lblDurationMaxNote", font: { size: '0.875rem' }, caption: "Maximum: 0 second" })))),
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { id: "lblDelay", caption: "Delay", font: { size: '1rem', weight: 600 } }),
                                            this.$render("i-icon", { name: "question-circle", fill: "#fff", width: 16, height: 16, tooltip: { content: 'Execution Delay in seconds', placement: 'right' } })),
                                        this.$render("i-input", { id: "delayInput", class: 'poll-input', height: 32, width: '100%', inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: this.onDelayChanged.bind(this) }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "delayErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-label", { id: "lblDelayMinNote", font: { size: '0.875rem' }, caption: "Minimum: 0 second", margin: { left: 'auto' } })))),
                                this.$render("i-hstack", { width: "100%", gap: "1rem", wrap: "wrap" },
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { caption: "Quorum", font: { size: '1rem', weight: 600 } }),
                                            this.$render("i-icon", { name: "question-circle", fill: "#fff", width: 16, height: 16, tooltip: { content: 'The minimum quorum required for voting', placement: 'right' } })),
                                        this.$render("i-input", { id: "quorumInput", height: 32, width: "100%", inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: this.onQuorumChanged.bind(this) }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "quorumErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-label", { id: "lblQuorumNote", font: { size: '0.875rem' }, caption: "Minimum: 0 second", margin: { left: 'auto' } }))),
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { caption: "Threshold", font: { size: '1rem', weight: 600 } }),
                                            this.$render("i-icon", { name: "question-circle", fill: "#fff", width: 16, height: 16, tooltip: { content: 'The minimum quorum threshold should be reached to pass the executive proposal', placement: 'right' } })),
                                        this.$render("i-input", { id: "thresholdInput", height: 32, width: "100%", inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: this.onThresholdChanged.bind(this) }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "thresholdErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-label", { font: { size: '0.875rem' }, caption: "Minimum: 50%", margin: { left: 'auto' } }))))),
                            this.$render("i-vstack", { width: "100%", padding: { left: "1rem", right: "1rem" } },
                                this.$render("i-button", { id: 'btnConfirm', class: 'btn-os', height: 'auto', caption: "Create Executive Proposal", padding: { top: '0.75rem', bottom: '0.75rem', left: '1.5rem', right: '1.5rem' }, border: { radius: 5 }, font: { weight: 600 }, rightIcon: { spin: true, visible: false }, enabled: false, onClick: this.onConfirm.bind(this) })))),
                    this.$render("i-alert", { id: "proposalAlert" }),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
        async handleFlowStage(target, stage, options) {
            let widget;
            if (stage === 'initialSetup') {
                widget = new initialSetup_1.default();
                target.appendChild(widget);
                await widget.ready();
                widget.state = this.state;
                await widget.handleFlowStage(target, stage, options);
            }
            else {
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
    };
    GovernanceProposal = __decorate([
        (0, components_5.customElements)('i-scom-governance-proposal')
    ], GovernanceProposal);
    exports.default = GovernanceProposal;
});
