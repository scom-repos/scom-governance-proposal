import { BigNumber, Utils } from "@ijstech/eth-wallet";
import { Contracts } from "@scom/oswap-openswap-contract";
import { State } from "./store/index";

function govTokenDecimals(state: State) {
    const chainId = state.getChainId();
    return state.getGovToken(chainId).decimals || 18
}

export async function stakeOf(state: State, address: string) {
    const wallet = state.getRpcWallet();
    const chainId = state.getChainId();
    const gov = state.getAddresses(chainId).OAXDEX_Governance;
    const govContract = new Contracts.OAXDEX_Governance(wallet, gov);
    let result = await govContract.stakeOf(address);
    result = Utils.fromDecimals(result, govTokenDecimals(state));
    return result;
}

export async function getVotingValue(state: State, param1: any) {
    let result: {
        minExeDelay?: number;
        minVoteDuration?: number;
        maxVoteDuration?: number;
        minOaxTokenToCreateVote?: number;
        minQuorum?: number;
    } = {};
    const wallet = state.getRpcWallet();
    const chainId = state.getChainId();
    const address = state.getAddresses(chainId).OAXDEX_Governance;
    if (address) {
        const govContract = new Contracts.OAXDEX_Governance(wallet, address);
        const params = await govContract.getVotingParams(Utils.stringToBytes32(param1) as string);
        result = {
            minExeDelay: params.minExeDelay.toNumber(),
            minVoteDuration: params.minVoteDuration.toNumber(),
            maxVoteDuration: params.maxVoteDuration.toNumber(),
            minOaxTokenToCreateVote: Number(Utils.fromDecimals(params.minOaxTokenToCreateVote).toFixed()),
            minQuorum: Number(Utils.fromDecimals(params.minQuorum).toFixed())
        };
    }
    return result;
}