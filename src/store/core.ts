export interface CoreAddress {
    OAXDEX_Governance: string;
    OAXDEX_VotingRegistry: string;
    GOV_TOKEN: string;
    OSWAP_RestrictedFactory: string;
    OSWAP_VotingExecutor4: string;
    OSWAP_RestrictedOracle: string;
}
export const coreAddress: { [chainId: number]: CoreAddress } = {
    56: { // BSC
        OAXDEX_Governance: "0x510a179AA399672e26e54Ed8Ce0e822cc9D0a98D",
        OAXDEX_VotingRegistry: "0x845308010C3B699150Cdd54dCf0E7C4b8653e6B2",
        GOV_TOKEN: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
        OSWAP_RestrictedFactory: "0x91d137464b93caC7E2c2d4444a9D8609E4473B70",
        OSWAP_VotingExecutor4: "0xD055df2049465293016C3AFF966b65Ad18A12054",
        OSWAP_RestrictedOracle: "0xb1e6db5ccf8153edf9ffbaf206bb6eb2b4dff5c7",
    },
    97: { // BSC Testnet
        OAXDEX_Governance: "0xDfC070E2dbDAdcf892aE2ed2E2C426aDa835c528",
        OAXDEX_VotingRegistry: "0x28a5bB54A53831Db40e00a6d416FfB2dBe0Fef68",
        GOV_TOKEN: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
        OSWAP_RestrictedFactory: "0xa158FB71cA5EF59f707c6F8D0b9CC5765F97Fd60",
        OSWAP_VotingExecutor4: "0x6EDE6Ab7c32D95C210f84eFedC39f80505ed4ea6",
        OSWAP_RestrictedOracle: "0x4a10650eac83aeb59D007E1F0039B4F1BCeFe0c3",
    },
    137: { // Polygon
        OAXDEX_Governance: "0x5580B68478e714C02850251353Cc58B85D4033C3",
        OAXDEX_VotingRegistry: "0x64062158A5Cc2aA3740B1035785F29153eA64677",
        GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
        OSWAP_RestrictedFactory: "0xF879576c2D674C5D22f256083DC8fD019a3f33A1",
        OSWAP_VotingExecutor4: "0x9146C8Be06F6EA2a09aD0EA2320e823eC3e98df5",
        OSWAP_RestrictedOracle: "0x501Fbfa9C9BcE27dEe6c481324545Ecd31c8C160",
    },
    80001: {//polygon testnet
        OAXDEX_Governance: "0x198b150E554F46aee505a7fb574F5D7895889772",
        OAXDEX_VotingRegistry: "0xC2F105d6413aCE38B9FcB6F43Edc76191a295aC5",
        GOV_TOKEN: "0xb0AF504638BDe5e53D6EaE1119dEd13411c35cF2",
        OSWAP_RestrictedFactory: "0x6D2b196aBf09CF97612a5c062bF14EC278F6D677",
        OSWAP_VotingExecutor4: "0xaE9e339cE34eCc8Beab6c0ffF7aC19cb3a535A5c",
        OSWAP_RestrictedOracle: "0x1368833b4e5e014Bb9bB2583C1617e949E7fA29B",
    },
    43113: { //Avalanche FUJI C-Chain
        OAXDEX_Governance: "0xC025b30e6D4cBe4B6978a1A71a86e6eCB9F87F92",
        OAXDEX_VotingRegistry: "0x05E425dD88dd7D4f725aC429D0C8C022B2004cBB",
        GOV_TOKEN: "0x27eF998b96c9A66937DBAc38c405Adcd7fa5e7DB",
        OSWAP_RestrictedFactory: "0x6C99c8E2c587706281a5B66bA7617DA7e2Ba6e48",
        OSWAP_VotingExecutor4: "0x5AE58EA32B231576ADE76c6f94b13F06C2B8387b",
        OSWAP_RestrictedOracle: "0xc37B982d836b72374f5D276E60A69C66062b9Bcf",
    },
    43114: { //Avalanche Mainnet C-Chain
        OAXDEX_Governance: "0x845308010c3b699150cdd54dcf0e7c4b8653e6b2",
        OAXDEX_VotingRegistry: "0x0625468f8F56995Ff1C27EB6FD44ac90E96C5D22",
        GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
        OSWAP_RestrictedFactory: "0x739f0BBcdAd415127FE8d5d6ED053e9D817BdAdb",
        OSWAP_VotingExecutor4: "0x646C5e3Ec40706372243accF2D457D9162553685",
        OSWAP_RestrictedOracle: "0x510a179AA399672e26e54Ed8Ce0e822cc9D0a98D",
    },
}