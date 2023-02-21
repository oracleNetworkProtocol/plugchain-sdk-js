import { setResultDevice, setResultOk, setResultUnknown } from './interface';
import { TypeResult, TypePermission, TypeAllResult, TypeSuccessResult, TypeErrorResult } from './interface.type';
import { checkIsWallet, walletApplyPermissionV2, walletGetAccountV2, walletGetPermissionV2, walletGetVersion } from './wallet';
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

// TODO:
/**
 * call cosmos base prc
 * @returns Promise<{code, message, data}>
 * @returns data: hash string
 **/
export const baseCallV2 = async(
  { callName, callArgs, gasLimit = 400000, feeAmount = [{denom: 'uplugcn', amount: '200'}], onlySign = false }: 
  {
    callName: string,
    callArgs: any,
    gasLimit?: number,
    feeAmount?: {denom: string, amount: string}[],
    /** if only sign is true, the function will return sign data with offline mode */
    onlySign?: boolean
  }
): TypeAllResult<string> => {
  return setResultDevice();
}

/**
 * call evm contract prc
 * @returns Promise<{code, message, data}>
 * @returns data: hash string
 **/
export const contractCallV2 = async(
  {type, sender, to, data, gasPrice, onlySign}:
  {
    /** call evm type */
    type: 'send'|'call',
    /** sender user address. example: gx1.... */
    sender: string,
    /** recipient address */
    to: string,
    /** example: 0x00000....1212 */
    data: string,
    gasPrice?: string,
    maxGas?: string,
    /** if only sign is true, the function will return sign data with offline mode */
    onlySign?: boolean,
  }
): TypeAllResult<string> => {
  return setResultDevice();
}

/**
 * call evm sign some data
 * @returns Promise<{code, message, data}>
 * @returns data: string
 **/
export const contractSignStrV2 = async(signStr: string): TypeAllResult<string> => {
  return setResultDevice();
};

/**
 * check platform type. app or extension
 **/
export const getPlatformType = (): 'app'|'extension'|'unknown' => {
  if (checkIsExtension()) return 'extension';
  if (checkIsWallet()) return 'app';
  return 'unknown';
}