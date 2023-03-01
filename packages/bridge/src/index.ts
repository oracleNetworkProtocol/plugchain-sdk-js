import { getHexAddress } from '@plug_chain/tools';
import { setResultDevice, setResultOk, setResultUnknown } from './interface';
import { TypeResult, TypePermission, TypeAllResult, TypeSuccessResult, TypeErrorResult } from './interface.type';
import { checkIsWallet, walletApplyPermissionV2, walletBaseCallV2, walletContractCallSignV2, walletContractCallV2, walletGetAccountV2, walletGetPermissionV2, walletGetVersion } from './wallet';
import { checkIsExtension } from './web';

/**
 * get now device tools version
 * @returns Promise<{code, message, data}>
 **/
export const getVersion = async(): TypeAllResult<string> => {
  let res: Awaited<TypeAllResult<string>> = setResultDevice();
  if (checkIsWallet()) res = await walletGetVersion();
  return res;
};

/**
 * get wallet platform approved permission list for the DAPP
 * @returns Promise<{code, message, data}>
 **/
export const getPermissionV2 = async(): TypeAllResult<TypePermission[]> => {
  let res: Awaited<TypeAllResult<TypePermission[]>> = setResultDevice();
  if (checkIsWallet()) res = await walletGetPermissionV2();
  return res;
};

/**
 * Apply for user permission
 * @returns Promise<{code, message, data}>
 **/
export const applyPermissionV2 = async(
  permission: TypePermission[]|'*'
): TypeAllResult<TypePermission[]> => {
  let res: Awaited<TypeAllResult<TypePermission[]>> = setResultDevice();
  let _permission: TypePermission[] = permission === '*' ? ['accountInfo', 'baseCall', 'contractCall'] : permission;
  if (checkIsWallet()) res = await walletApplyPermissionV2(_permission);
  return res;
};

/**
 * get user address info by platform
 * @returns Promise<{code, message, data}>
 * @returns data: { address: bech32 address string; type:'PRC10'|'PRC20' }
 **/
export const getAccountInfoV2 = async(): TypeAllResult<{ address: string; type:'PRC10'|'PRC20' }> => {
  let res: Awaited<TypeAllResult<{ address: string; type:'PRC10'|'PRC20' }>> = setResultDevice();
  if (checkIsWallet()) res = await walletGetAccountV2();
  return res;
};


/**
 * call cosmos base prc
 * @returns Promise<{code, message, data}>
 * @returns data: hash string
 **/
export const baseCallV2 = async(
  { callName, callArgs, gasLimit = 400000, feeAmount = {denom: 'uplugcn', amount: '200'}, onlySign = false }: 
  {
    callName: string,
    callArgs: {[key: string]: any},
    gasLimit?: number,
    // denom is not use, only amount
    feeAmount?: {denom: string, amount: string},
    /** if only sign is true, the function will return sign data with offline mode */
    onlySign?: boolean
  }
): TypeAllResult<string> => {
  /** MsgSend
   * { toAddress: string, volume: number, denom: string, gasAll?: string, memo?: string, gasLimit?: number} */
  /** MsgSwapWithinBatch
   * { poolId: number, fromSymbol: string, fromAmount: string, toSymbol: string, feeAmount: string, orderPrice: number, gasAll?: string, gasLimit?: number} */
  /** MsgCreatePool
   * { fromSymbol: string, toSymbol: string, fromAmount: string, toAmount: string, gasAll?: string, gasLimit?: number} */
  /** dexPoolAddExchange
   * { poolId: number, fromSymbol: string, toSymbol: string, fromAmount: string, toAmount: string, gasAll?: string, gasLimit?: number} */
  /** dexPoolRemoveExchange
   * { poolId: number, fromSymbol: string, fromAmount: string, gasAll?: string, gasLimit?: number} */
  let res: Awaited<TypeAllResult<string>> = setResultDevice();
  if (checkIsWallet()) res = await walletBaseCallV2(callName, {memo: "", gasLimit, gasAll: feeAmount.amount, onlySign, ...callArgs});
  return res;
}

/**
 * call evm contract prc
 * @returns Promise<{code, message, data}>
 * @returns data: hash string | signed string
 **/
export const contractCallV2 = async(
  {type, to, volume, data, gasPrice, onlySign}:
  {
    /** call evm type */
    type: 'send'|'call',
    /** recipient address. example: gx..... */
    to: string,
    /** send base token(uplugcn) with the transfer */
    volume?: string,
    /** example: 0x00000....1212 */
    data: string,
    gasPrice?: string,
    maxGas?: string,
    /** if only sign is true, the function will return sign data with offline mode */
    onlySign?: boolean,
  }
): TypeAllResult<string> => {
  let res: Awaited<TypeAllResult<string>> = setResultDevice();
  if (checkIsWallet()) res = await walletContractCallV2({type, to: getHexAddress(to), data, volume, gasPrice, onlySign});
  return res;
}

/**
 * call evm sign some data
 * @returns Promise<{code, message, data}>
 * @returns data: string
 **/
export const contractSignStrV2 = async(signStr: string): TypeAllResult<string> => {
  let res: Awaited<TypeAllResult<string>> = setResultDevice();
  if (checkIsWallet()) res = await walletContractCallSignV2(signStr);
  return res;
};

/**
 * check platform type. app or extension
 **/
export const getPlatformType = (): 'app'|'extension'|'unknown' => {
  if (checkIsExtension()) return 'extension';
  if (checkIsWallet()) return 'app';
  return 'unknown';
}