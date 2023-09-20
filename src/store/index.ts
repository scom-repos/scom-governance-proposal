export interface CoreAddress {
    OAXDEX_Governance:string
    OAXDEX_VotingRegistry:string
    GOV_TOKEN:string
}
export const coreAddress: {[chainId: number]: CoreAddress} = {
    56: { // BSC
        OAXDEX_Governance:"0x510a179AA399672e26e54Ed8Ce0e822cc9D0a98D",
        OAXDEX_VotingRegistry:"0x845308010C3B699150Cdd54dCf0E7C4b8653e6B2",
        GOV_TOKEN:"0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93"
    },
    97: { // BSC Testnet
        OAXDEX_Governance:"0xDfC070E2dbDAdcf892aE2ed2E2C426aDa835c528",
        OAXDEX_VotingRegistry:"0x28a5bB54A53831Db40e00a6d416FfB2dBe0Fef68",
        GOV_TOKEN:"0x45eee762aaeA4e5ce317471BDa8782724972Ee19"
    }
}