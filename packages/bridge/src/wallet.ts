import { TypeAllResult, TypePermission } from './interface.type';
import { setResultDevice, setResultOk, setResultReject, setResultPermission, setResultUnknown } from './interface';

export const checkIsWallet = () => {
  const tool = (window as any)._cosmoWalletFunction;
  if (!tool) return false;
  if (!tool.postMessage) return false;
  return true;
};

export const walletGetVersion = async (): TypeAllResult<string> => {
  try {
    let res = await _demoFunction<string>('getVersion', null);
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err) {
    return setResultDevice((err as string).toString());
  }
};

export const walletGetPermissionV2 = async (): TypeAllResult<TypePermission[]> => {
  try {
    let res = await _demoFunction<TypePermission[]>('getPermissionV2', null);
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err) {
    return setResultDevice();
  }
};

export const walletApplyPermissionV2 = async (permission: TypePermission[]): TypeAllResult<TypePermission[]> => {
  try {
    let res = await _demoFunction<TypePermission[]>('applyPermissionV2', permission);
    if (res) {
      if (res.length > permission.length) {
        res = Array.from(new Set(res));
      }
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

export const walletGetAccountV2 = async (): TypeAllResult<{ address: string; type:'PRC10'|'PRC20' }> => {
  try {
    let res = await _demoFunction<{ address: string; type:'PRC10'|'PRC20' }>('accountInfoV2.getInfo', null);
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err: any) {
    if (err.toString().match('No Permission')) return setResultPermission(err);
    return setResultUnknown(err);
  }
};

export const walletBaseCallV2 = async (name: string, args: {[key: string]: any}): TypeAllResult<string> => {
  let callName = '';
  if (name === 'MsgSend') {
    callName = 'baseCallV2.MsgSend';
  } else if (name === 'MsgSwapWithinBatch') {
    callName = 'baseCallV2.MsgSwapWithinBatch';
  } else if (name === 'MsgCreatePool') {
    callName = 'baseCallV2.MsgCreatePool';
  } else if (name === 'dexPoolAddExchange') {
    callName = 'baseCallV2.dexPoolAddExchange';
  } else if (name === 'dexPoolRemoveExchange') {
    callName = 'baseCallV2.dexPoolRemoveExchange';
  }
  try {
    if (callName === '') throw new Error('no call name');
    let res = await _demoFunction<string>(callName, args);
    if (res) return setResultOk(res);
    else return setResultDevice();
  } catch (err: any) {
    if (err.toString().match('No Permission')) return setResultPermission(err);
    return setResultUnknown(err);
  }
};



const _demoFunction = async <T = any>(type: string, data: any, sleepTime = 10): Promise<T|null> => {
  const _errorName = '_comoWalletError' + (Math.random() * 1000000).toFixed(0);
  (window as any)._cosmoErrorCall = (error: string) => (window as any)[_errorName] = error;
  return new Promise((resolve, reject) => {
    const getName = (): string => {
      const resultName = '_comoWallet' + (Math.random() * 1000000).toFixed(0);
      if ((window as any)[resultName] !== undefined) return getName();
      return resultName;
    };
    var name = getName();
    (window as any)._cosmoWalletFunction.postMessage(JSON.stringify({
      type, data,
      windowAttrName: name,
    }));
    var timer = setInterval(() => {
      if ((window as any)[_errorName]) {
        clearTimeout(timer);
        reject((window as any)[_errorName]);
        (window as any)[_errorName] = undefined;
      } else if ((window as any)[name]) {
        clearTimeout(timer);
        resolve((window as any)[name]);
        (window as any)[name] = undefined;
      }
    }, sleepTime);
  });
}