import { BigNumber, TransactionReceipt, Utils, Wallet } from "@ijstech/eth-wallet";
import { Contracts } from "@scom/oswap-openswap-contract";
import { ITokenObject } from "@scom/scom-token-list";
import { getWETH, State } from "./store/index";

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

const mapTokenObjectSet = (state: State, obj: any) => {
    let chainId = state.getChainId();
    const WETH9 = getWETH(chainId);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key]?.address) obj[key] = WETH9;
        }
    }
    return obj;
}

function govTokenDecimals(state: State) {
    const chainId = state.getChainId();
    return state.getGovToken(chainId).decimals || 18
}

export async function stakeOf(state: State, address: string) {
    let result = new BigNumber(0);
    try {
        const wallet = state.getRpcWallet();
        const chainId = state.getChainId();
        const gov = state.getAddresses(chainId).OAXDEX_Governance;
        const govContract = new Contracts.OAXDEX_Governance(wallet, gov);
        let stakeOf = await govContract.stakeOf(address);
        result = Utils.fromDecimals(stakeOf, govTokenDecimals(state));
    } catch (err) {}
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
    const address = state.getAddresses(chainId)?.OAXDEX_Governance;
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
export async function getPair(state: State, tokenA: ITokenObject, tokenB: ITokenObject) {
    const wallet = state.getRpcWallet();
    const chainId = state.getChainId();
    let tokens = mapTokenObjectSet(state, { tokenA, tokenB });
    let params = { param1: tokens.tokenA.address, param2: tokens.tokenB.address };
    let factoryAddress = state.getAddresses(chainId).OSWAP_RestrictedFactory;
    let groupQ = new Contracts.OSWAP_RestrictedFactory(wallet, factoryAddress);
    return await groupQ.getPair({ ...params, param3: 0 });
}

export async function doNewVote(
    state: State,
    quorum: number,
    threshold: number,
    voteEndTime: number,
    exeDelay: number,
    exeCmd: string,
    exeParams1: any,
    exeParams2: any
) {
    let result: string;
    const wallet: any = Wallet.getClientInstance();
    const chainId = state.getChainId();
    let param = {
        executor: '',
        name: '',
        options: [Utils.stringToBytes32('Y') as string, Utils.stringToBytes32('N') as string],
        quorum: new BigNumber(quorum).shiftedBy(18),
        threshold: new BigNumber(threshold).shiftedBy(18 - 2),
        voteEndTime,
        executeDelay: exeDelay,
        executeParam: []
    };
    const Addresses = state.getAddresses(chainId);
    const WETH9 = getWETH(chainId);
    // restrictedOracle
    let executor: string = Executor4;
    let factoryContract = new Contracts.OSWAP_RestrictedFactory(wallet, Addresses.OSWAP_RestrictedFactory);
    exeParams2 = Addresses.OSWAP_RestrictedOracle;
    let tokens = exeParams1.map(e => e?.address ? e : WETH9);
    let oldOracle = await factoryContract.oracles({ param1: tokens[0].address, param2: tokens[1].address });
    let oracleName: string;

    let existingOracle = await factoryContract.isOracle(exeParams2);
    if (oldOracle == Utils.nullAddress && existingOracle) {
        exeCmd = "addOldOracleToNewPair";
        oracleName = "addOrc_";
    } else {
        exeCmd = "setOracle";
        oracleName = "setOrc_";
    }
    let symbol1 = await new Contracts.ERC20(wallet, tokens[0].address).symbol();
    let symbol2 = await new Contracts.ERC20(wallet, tokens[1].address).symbol();
    oracleName = oracleName + symbol1 + "/" + symbol2 + "_" + exeParams2.substring(2);
    param.executor = Addresses[executor];
    param.name = Utils.stringToBytes32(oracleName.substring(0, 32)) as string;
    if (new BigNumber(tokens[0].address.toLowerCase()).lt(tokens[1].address.toLowerCase()))
        param.executeParam = [Utils.stringToBytes32(exeCmd), Utils.addressToBytes32Right(tokens[0].address, true), Utils.addressToBytes32Right(tokens[1].address, true), Utils.addressToBytes32Right(exeParams2, true)];
    else
        param.executeParam = [Utils.stringToBytes32(exeCmd), Utils.addressToBytes32Right(tokens[1].address, true), Utils.addressToBytes32Right(tokens[0].address, true), Utils.addressToBytes32Right(exeParams2, true)];
    const votingRegistry = new Contracts.OAXDEX_VotingRegistry(wallet, Addresses.OAXDEX_VotingRegistry);
    let receipt = await votingRegistry.newVote(param);
    const governance = new Contracts.OAXDEX_Governance(wallet, Addresses.OAXDEX_Governance);
    let event = governance.parseNewVoteEvent(receipt)[0];
    result = event?.vote || '';
    return result;
}

export function parseNewVoteEvent(state: State, receipt: TransactionReceipt) {
    const wallet: any = Wallet.getClientInstance();
    const chainId = state.getChainId();
    const govAddress = state.getAddresses(chainId).OAXDEX_Governance;
    const governance = new Contracts.OAXDEX_Governance(wallet, govAddress);
    let event = governance.parseNewVoteEvent(receipt)[0];
    return event?.vote || '';
}