
## Run it with DAPP

run it [example](../example/index.html)

**all function is promise, return data template: {code, message, data}**


| functionName            | describe                                         | arguments                                                                                                                                     | returns                                                                                                        |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ```getVersion```        | get the bridge api version                       | null                                                                                                                                          | data: string                                                                                                   |
| ```getPermissionV2```   | get user's permissions list                      | null                                                                                                                                          | data: ```["accountInfo", "baseCall", "contractCall"]```                                                        |
| ```applyPermissionV2``` | apply permissions                                | ```["accountInfo", "baseCall", "contractCall"]``` or ```"*"```                                                                                | data: ```["accountInfo", "baseCall", "contractCall"]```                                                        |
| ```getAccountInfoV2```  | get user's address and type. must: "accountInfo" | null                                                                                                                                          | data: ```{ address: string; type:'PRC10'                                                                       | 'PRC20' }``` |
| ```baseCallV2```        | call base chain by platform. must: "baseCall"    | ```{ callName: string, callArgs: [key: string]: any}, gasLimit = 400000, feeAmount = {denom: 'uplugcn', amount: '200'}, onlySign = false }``` | data: string                                                                                                   |
| ```contractCallV2```    | call pvm by platform. must: "contractCall"       | ```{type: 'send'                                                                                                                              | 'call', to: string, volume?: string, data: string, gasPrice?: string, maxGas?: string, onlySign?: boolean }``` | data: string |
| ```contractSignStrV2``` | sign data by user. must: "contractCall"          | string                                                                                                                                        | data: string                                                                                                   |