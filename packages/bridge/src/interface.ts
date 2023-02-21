import { TypeResult, TypeCode, TypeMsg, TypeSuccessResult, TypeErrorResult } from './interface.type';

export const setResult = <T = any>(code: TypeCode, message = '', data: T): TypeResult<T> => ({ code, message, data});

export const setResultOk = <T = any>(data: T): TypeSuccessResult<T> => setResult(TypeCode.SuccessOk, TypeMsg.SuccessOk, data);
export const setResultRewrite = <T = any>(data: T): TypeSuccessResult<T> => setResult(TypeCode.SuccessRewrite, TypeMsg.SuccessRewrite, data);
export const setResultTimeout = <T = any>(data?: T): TypeErrorResult<T> => setResult(TypeCode.ErrorTimeout, TypeMsg.ErrorTimeout, data);
export const setResultUnknown = <T = any>(data?: T): TypeErrorResult<T> => setResult(TypeCode.ErrorUnknown, TypeMsg.ErrorUnknown, data);
export const setResultDevice = <T = any>(data?: T): TypeErrorResult<T> => setResult(TypeCode.ErrorDevice, TypeMsg.ErrorDevice, data);
export const setResultReject = <T = any>(data?: T): TypeErrorResult<T> => setResult(TypeCode.ErrorReject, TypeMsg.ErrorReject, data);
export const setResultPermission = <T = any>(data?: T): TypeErrorResult<T> => setResult(TypeCode.ErrorPermission, TypeMsg.ErrorPermission, data);


