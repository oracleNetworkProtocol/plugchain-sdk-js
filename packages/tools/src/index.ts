import web3EthAbi from 'web3-eth-abi';
import { AbiInput, bytesToHex, hexToBytes, isAddress, isHex, stripHexPrefix } from 'web3-utils';
import { bech32 } from 'bech32';

const encodeFunc = web3EthAbi.encodeFunctionSignature;
const encodeArgs = web3EthAbi.encodeParameters.bind(web3EthAbi);

/**
 * format contract abi data to hex data
 **/
export const contractFormatDataV2: (func: string, abi: (AbiInput|string)[], args: string[]) => string =  (func, abi, args) => {
  const funcCode = encodeFunc(func);
  const argsCode = stripHexPrefix(
    encodeArgs(
      abi, args.map(getHexAddress)
    )
  );
  const code = funcCode + argsCode;
  return code;
};

export const addressForHexToBech32: (hex: string, prev?: string) => string = (hex, prev = 'gx') => {
  return bech32.encode(prev, bech32.toWords(hexToBytes(hex)));
};

export const addressForBech32ToHex: (bech: string, LIMIT?: number) => string = (bech, LIMIT = 1023) => {
  return bytesToHex(bech32.fromWords(bech32.decode(bech, LIMIT).words));
};

export const isHexAddress: (input: string) => boolean = isAddress;
export const isBechAddress: (input: string, prev?: string) => boolean = (input, prev = 'gx') => {
  if (!new RegExp('^' + prev + '1').test(input)) return false;
  if (input.length !== 39 + prev.length) return false;
  let addressInput = input.replace(new RegExp('^' + prev + '1'), '');
  if (/[1|O|0|l|I]/.test(addressInput)) return false;
  return true;
};

export const getHexAddress: (input: string) => string = (input) => {
  if (isHexAddress(input)) return input;
  if (isBechAddress(input)) return addressForBech32ToHex(input);
  return input;
}

export const getBechAddress: (input: string) => string = (input) => {
  if (isBechAddress(input)) return input;
  if (isHexAddress(input)) return addressForHexToBech32(input);
  return input;
}