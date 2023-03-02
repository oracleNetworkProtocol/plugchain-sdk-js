import { TypeAllResult, TypePermission } from './interface.type';
import { setResultDevice, setResultOk, setResultReject, setResultPermission, setResultUnknown } from './interface';
export const checkIsExtension = () => {
  const tool = (window as any).cosmoWallet;
  if (!tool) return false;
  if (!tool.getAccount) return false;
  return true;
};

export const extensionGetVersion = async (): TypeAllResult<string> => {
  try {
    let res = await (window as any).cosmoWallet.getVersion();
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err) {
    return setResultDevice((err as string).toString());
  }
};

export const extensionGetPermissionV2 = async (): TypeAllResult<TypePermission[]> => {
  try {
    let res = await (window as any).cosmoWallet.getPermissionV2();
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err) {
    return setResultDevice();
  }
};

export const extensionApplyPermissionV2 = async (permission: TypePermission[]): TypeAllResult<TypePermission[]> => {
  try {
    let res = await (window as any).cosmoWallet.applyPermissionV2(permission);
    if (res) {
      return setResultOk(res);
    }
    else return setResultOk([]);
  } catch (err) {
    if (/reject/.test((err as string).toString())) {
      return setResultReject();
    }
    return setResultDevice();
  }
};

export const extensionGetAccountV2 = async (): TypeAllResult<{ address: string; type:'PRC10'|'PRC20' }> => {
  
  try {
    let res = await (window as any).cosmoWallet.getAccountInfoV2();
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err: any) {
    if (err.toString().match('No Permission')) return setResultPermission(err);
    return setResultUnknown(err);
  }
};

export const extensionBaseCallV2 = async (name: string, args: {[key: string]: any}): TypeAllResult<string> => {
  let callName = '';
  if (name === 'MsgSend') {
    callName = 'MsgSend';
  } else if (name === 'MsgSwapWithinBatch') {
    callName = 'baseCallV2.MsgSwapWithinBatch';
  } else if (name === 'MsgCreatePool') {
    callName = 'baseCallV2.MsgCreatePool';
  } else if (name === 'dexPoolAddExchange') {
    callName = 'MsgDepositWithinBatch';
  } else if (name === 'dexPoolRemoveExchange') {
    callName = 'MsgWithdrawWithinBatch';
  }
  try {
    if (callName === '') throw new Error('no call name');
    args.callName = callName;
    
    let res = await (window as any).cosmoWallet.baseCallV2(args);
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err: any) {
    if (err.toString().match('No Permission')) return setResultPermission(err);
    return setResultUnknown(err);
  }
};

export const extensionContractCallV2 = async (type: string, to: string, data:string,onlySign:boolean|undefined): TypeAllResult<string> => {
  try {
    let res = await (window as any).cosmoWallet.contractCallV2({type,to,data,onlySign});
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err: any) {
    if (err.toString().match('No Permission')) return setResultPermission(err);
    return setResultUnknown(err);
  }
};
export const extensionContractSignStrV2 = async (signStr: string): TypeAllResult<string> => {
  try {
    let res = await (window as any).cosmoWallet.contractSignStrV2({signStr});
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err: any) {
    if (err.toString().match('No Permission')) return setResultPermission(err);
    return setResultUnknown(err);
  }
};

export const extensionGetBalanceV2 = async (): TypeAllResult<string> => {
  try {
    let res = await (window as any).cosmoWallet.getBalanceV2();
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err) {
    return setResultDevice((err as string).toString());
  }
};

export const extensionGetRealBalanceV2 = async (): TypeAllResult<string> => {
  try {
    let res = await (window as any).cosmoWallet.getRealBalanceV2();
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err) {
    return setResultDevice((err as string).toString());
  }
};