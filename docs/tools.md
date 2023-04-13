## Some Tools on plugchain




| functionName          | describe                             | arguments                                                         | returns |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------- | ------- |
| contractFormatDataV2  | format contract abi data to hex data | ```(func: string, abi: (AbiInput \| string)[], args: string[])``` | string  |
| addressForHexToBech32 |                                      | ```(hex: string, prev?: string)```                                | string  |
| addressForBech32ToHex |                                      | ```(bech: string, LIMIT?: number)```                              | string  |
| isHexAddress          |                                      | string                                                            | boolean |
| isBechAddress         |                                      | ```(input: string, prev?: string)```                              | boolean |
| getHexAddress         | any address to hex address           | string                                                            | boolean |
| getBechAddress        | any address to bech address          | string                                                            | boolean |