import { addressForBech32ToHex, addressForHexToBech32, getHexAddress, getBechAddress } from './../src/index';
import { contractFormatDataV2 } from "../src";

describe('tools test', () => {
  const hexAddress = '0x46eb996706b7bd80edb3090959ba57a560e1f3bc';
  const bech32Address = 'gx1gm4ejecxk77cpmdnpyy4nwjh54swruauyau2ga';

  it('do contract data format', () => {
    const getStr = contractFormatDataV2(
      'isApprovedForAll(address,address)',
      ['address', 'address'],
      [bech32Address, bech32Address]
    );
    expect(getStr).toBe('0xe985e9c500000000000000000000000046eb996706b7bd80edb3090959ba57a560e1f3bc00000000000000000000000046eb996706b7bd80edb3090959ba57a560e1f3bc');
  });

  it('hex address to plug bech32 address', () => {
    const getBech32Address = addressForHexToBech32(hexAddress);
    expect(getBech32Address).toBe(bech32Address);
  });

  it('bech32 address to plug hex address', () => {
    const getHexAddress = addressForBech32ToHex(bech32Address);
    expect(getHexAddress).toBe(hexAddress);
  });

  it('any address to plug hex address', () => {
    const hexAddressOne = getHexAddress(bech32Address);
    const hexAddressTwo = getHexAddress(hexAddress);
    expect(hexAddressOne).toBe(hexAddressTwo);
  });

  it('any address to plug bech32 address', () => {
    const bechAddressOne = getBechAddress(bech32Address);
    const bechAddressTwo = getBechAddress(hexAddress);
    expect(bechAddressOne).toBe(bechAddressTwo);
  });
});
