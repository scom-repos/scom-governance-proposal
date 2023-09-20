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
            GOV_TOKEN: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93"
        },
        97: {
            OAXDEX_Governance: "0xDfC070E2dbDAdcf892aE2ed2E2C426aDa835c528",
            OAXDEX_VotingRegistry: "0x28a5bB54A53831Db40e00a6d416FfB2dBe0Fef68",
            GOV_TOKEN: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19"
        }
    };
});
define("@scom/scom-governance-proposal/store/utils.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-network-list", "@scom/scom-governance-proposal/store/core.ts"], function (require, exports, components_2, eth_wallet_1, scom_network_list_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isClientWalletConnected = exports.State = void 0;
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
            var _a, _b, _c;
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_1.Wallet.getClientInstance();
            const networkList = Object.values(((_a = components_2.application.store) === null || _a === void 0 ? void 0 : _a.networkMap) || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: (_b = components_2.application.store) === null || _b === void 0 ? void 0 : _b.infuraId,
                multicalls: (_c = components_2.application.store) === null || _c === void 0 ? void 0 : _c.multicalls
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
            return wallet === null || wallet === void 0 ? void 0 : wallet.isConnected;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet === null || rpcWallet === void 0 ? void 0 : rpcWallet.chainId;
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
                this.networkMap[network.chainId] = Object.assign(Object.assign({}, networkInfo), network);
                wallet.setNetworkInfo(this.networkMap[network.chainId]);
            }
        }
        async setApprovalModelAction(options) {
            const approvalOptions = Object.assign(Object.assign({}, options), { spenderAddress: '' });
            let wallet = this.getRpcWallet();
            this.approvalModel = new eth_wallet_1.ERC20ApprovalModel(wallet, approvalOptions);
            let approvalModelAction = this.approvalModel.getAction();
            return approvalModelAction;
        }
        getAddresses(chainId) {
            return core_1.coreAddress[chainId || this.getChainId()];
        }
    }
    exports.State = State;
    function isClientWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
});
define("@scom/scom-governance-proposal/store/index.ts", ["require", "exports", "@scom/scom-governance-proposal/store/utils.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-governance-proposal/store/index.ts'/> 
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
            }
        }
    });
});
define("@scom/scom-governance-proposal", ["require", "exports", "@ijstech/components", "@scom/scom-governance-proposal/assets.ts", "@scom/scom-governance-proposal/store/index.ts", "@scom/scom-governance-proposal/data.json.ts", "@ijstech/eth-wallet", "@scom/scom-governance-proposal/index.css.ts"], function (require, exports, components_4, assets_1, index_1, data_json_1, eth_wallet_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    const actions = [
        {
            label: 'Modify Restricted Oracle',
            value: 'restrictedOracle'
        }
    ];
    let GovernanceProposal = class GovernanceProposal extends components_4.Module {
        constructor() {
            super(...arguments);
            this._data = {
                wallets: [],
                networks: []
            };
            this.tag = {};
            this.form = {
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
            };
            this.validateStatus = {};
            this.initWallet = async () => {
                try {
                    await eth_wallet_2.Wallet.getClientInstance().init();
                    const rpcWallet = this.state.getRpcWallet();
                    await rpcWallet.init();
                }
                catch (err) {
                    console.log(err);
                }
            };
            this.initializeWidgetConfig = async () => {
                setTimeout(async () => {
                    await this.initWallet();
                });
            };
            this.connectWallet = async () => {
                if (!(0, index_1.isClientWalletConnected)()) {
                    if (this.mdWallet) {
                        await components_4.application.loadPackage('@scom/scom-wallet-modal', '*');
                        this.mdWallet.networks = this.networks;
                        this.mdWallet.wallets = this.wallets;
                        this.mdWallet.showModal();
                    }
                    return;
                }
                if (!this.state.isRpcWalletConnected()) {
                    const clientWallet = eth_wallet_2.Wallet.getClientInstance();
                    await clientWallet.switchNetwork(this.chainId);
                }
            };
        }
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
            var _a;
            return (_a = this._data.wallets) !== null && _a !== void 0 ? _a : [];
        }
        set wallets(value) {
            this._data.wallets = value;
        }
        get networks() {
            var _a;
            return (_a = this._data.networks) !== null && _a !== void 0 ? _a : [];
        }
        set networks(value) {
            this._data.networks = value;
        }
        get showHeader() {
            var _a;
            return (_a = this._data.showHeader) !== null && _a !== void 0 ? _a : true;
        }
        set showHeader(value) {
            this._data.showHeader = value;
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
            this.state = new index_1.State(data_json_1.default);
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
            return actions;
        }
        getConfigurators() {
            return [];
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
            var _a;
            this.tag[type] = (_a = this.tag[type]) !== null && _a !== void 0 ? _a : {};
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
            var _a;
            this.removeRpcWalletEvents();
            const rpcWalletId = this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.state.getRpcWallet();
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_2.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.refreshUI();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_2.Constants.RpcWalletEvent.Connected, async (connected) => {
                this.refreshUI();
            });
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                rpcWalletId: rpcWallet.instanceId
            };
            if ((_a = this.dappContainer) === null || _a === void 0 ? void 0 : _a.setData)
                this.dappContainer.setData(data);
        }
        async refreshUI() {
            await this.initializeWidgetConfig();
        }
        onChangeAction(source) {
            this.form.action = source.selectedItem.value;
            this.validateStatus.action = true;
            if (this.lblActionErr)
                this.lblActionErr.visible = false;
        }
        onSelectDay(value, name) { }
        onChangedInput(source, name) { }
        onConfirm() { }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer" },
                this.$render("i-panel", { class: index_css_1.default, background: { color: Theme.background.main } },
                    this.$render("i-panel", null,
                        this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-vstack", { width: "100%", height: "100%", maxWidth: 1200, padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, margin: { left: 'auto', right: 'auto' }, gap: "1rem" },
                            this.$render("i-hstack", { width: "100%", horizontalAlignment: "center", margin: { bottom: '1.25rem', left: 'auto', right: 'auto' } },
                                this.$render("i-label", { caption: "Create new executive proposal", font: { size: 'clamp(1.5rem, 1.4rem + 0.5vw, 2rem)', bold: true, color: Theme.text.third } })),
                            this.$render("i-vstack", { width: "100%", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, gap: "1rem" },
                                this.$render("i-hstack", { width: "100%", gap: "1rem", wrap: "wrap" },
                                    this.$render("i-vstack", { gap: '0.5rem', stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: "4px" },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { caption: "Action", font: { size: '1rem', weight: 600 } })),
                                        this.$render("i-combo-box", { id: "comboAction", class: "custom-combobox", height: 32, minWidth: 180, margin: { top: '1rem' }, border: { bottom: { width: '1px', style: 'solid', color: Theme.colors.primary.main } }, icon: { name: "angle-down", fill: Theme.text.third, width: 12, height: 12 }, font: { size: '0.875rem' }, items: actions, onChanged: this.onChangeAction.bind(this) }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "lblActionErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-label", { font: { size: '0.875rem' }, caption: "Learn more about actions", margin: { left: 'auto' } }))),
                                    this.$render("i-vstack", { id: "systemStack", width: "100%", gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' }, visible: false })),
                                this.$render("i-vstack", { id: "firstAddressStack", width: "100%", gap: "0.5rem", visible: false }),
                                this.$render("i-hstack", { width: "100%", gap: "1rem", wrap: "wrap" },
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { id: "lblDuration", caption: "Duration", font: { size: '1rem', weight: 600 } })),
                                        this.$render("i-input", { id: "edtDuration", height: 32, width: "100%", inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: (source) => this.onSelectDay(source.value, 'dayValue') }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "lblDurationErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-label", { id: "lblDurationNote", margin: { left: 'auto' }, font: { size: '0.875rem' }, caption: "Minimum: 0 second" }))),
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { id: "lblDelay", caption: "Delay", font: { size: '1rem', weight: 600 } })),
                                        this.$render("i-input", { id: "edtDelay", class: 'poll-input', height: 32, width: '100%', inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: (source) => this.onSelectDay(source.value, 'delay') }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "lblDelayErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-vstack", { margin: { left: 'auto' }, class: "text-right" },
                                                this.$render("i-label", { id: "lblDelayMinNote", font: { size: '0.875rem' }, caption: "Minimum: 0 second" }),
                                                this.$render("i-label", { id: "lblDelayMaxNote", font: { size: '0.875rem' }, caption: "Maximum: 0 second" }))))),
                                this.$render("i-hstack", { width: "100%", gap: "1rem", wrap: "wrap" },
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { caption: "Quorum", font: { size: '1rem', weight: 600 } })),
                                        this.$render("i-input", { id: "edtQuorum", height: 32, width: "100%", inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: (source) => this.onChangedInput(source, 'quorum') }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "lblQuorumErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-label", { id: "lblQuorumNote", font: { size: '0.875rem' }, caption: "Minimum: 0 second", margin: { left: 'auto' } }))),
                                    this.$render("i-vstack", { gap: "0.5rem", stack: { grow: '1', shrink: '0', basis: '330px' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", gap: 4 },
                                            this.$render("i-label", { caption: "*", font: { size: '0.875rem', color: Theme.colors.primary.main } }),
                                            this.$render("i-label", { caption: "Threshold", font: { size: '1rem', weight: 600 } })),
                                        this.$render("i-input", { id: "edtThreshold", height: 32, width: "100%", inputType: "number", margin: { top: '1rem' }, border: { bottom: { width: 1, style: 'solid', color: Theme.colors.primary.main } }, value: "0", onChanged: (source) => this.onChangedInput(source, 'threshold') }),
                                        this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                            this.$render("i-label", { id: "lblThresholdErr", font: { color: '#f5222d', size: '0.875rem' }, visible: false }),
                                            this.$render("i-label", { font: { size: '0.875rem' }, caption: "Minimum: 50%", margin: { left: 'auto' } }))))),
                            this.$render("i-vstack", { width: "100%", padding: { left: "1rem", right: "1rem" } },
                                this.$render("i-button", { id: 'btnConfirm', class: 'btn-os', height: 'auto', caption: "Create Executive Proposal", padding: { top: '0.75rem', bottom: '0.75rem', left: '1.5rem', right: '1.5rem' }, border: { radius: 5 }, font: { weight: 600 }, rightIcon: { spin: true, visible: false }, enabled: false, onClick: this.onConfirm.bind(this) })))),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }),
                    this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] }))));
        }
    };
    GovernanceProposal = __decorate([
        (0, components_4.customElements)('i-scom-governance-proposal')
    ], GovernanceProposal);
    exports.default = GovernanceProposal;
});
