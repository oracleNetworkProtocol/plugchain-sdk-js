/**
 * tool result type
 **/
export type TypeResult<T = any, code = number> = {
  readonly code: code;
  readonly message: string;
  readonly data: T;
};


/**
 * tools result code and msg
 **/
export enum TypeCode {
  'SuccessOk' = 200,
  'SuccessRewrite' = 204,
  'ErrorReject' = 304,
  'ErrorPermission' = 305,
  'ErrorUnknown' = 400,
  'ErrorTimeout' = 403,
  'ErrorDevice' = 404,
}
export enum TypeMsg {
  'SuccessOk' = 'Success',
  'SuccessRewrite' = 'Sorry, the platform not support the function. we rewrite the call to implementation the function.',
  'ErrorReject' = 'Sorry, user refused to execute',
  'ErrorPermission' = 'Sorry, Permission denied',
  'ErrorUnknown' = 'Sorry, this error may not be caused by the plug js-sdk.',
  'ErrorTimeout' = 'The function call error by timeout',
  'ErrorDevice' = 'Not found Pando platform',
}

/**
 * platform permission list
 **/
export type TypePermission = 'accountInfo'|'baseCall'|'contractCall';


/**
 * bridge callback result type
 **/
export type TypeSuccessResult<T> = TypeResult<T, TypeCode.SuccessOk|TypeCode.SuccessRewrite>;
export type TypeErrorResult<T> = TypeResult<T|undefined, TypeCode.ErrorDevice|TypeCode.ErrorTimeout|TypeCode.ErrorUnknown|TypeCode.ErrorReject|TypeCode.ErrorPermission>;
export type TypeAllResult<T> = Promise<TypeSuccessResult<T>|TypeErrorResult<T>>;