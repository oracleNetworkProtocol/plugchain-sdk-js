import { getVersion, getPermissionV2, applyPermissionV2, baseCallV2, getAccountInfoV2, contractCallV2, contractSignStrV2 } from '@plug_chain/bridge';

const getBtn = (dataEvent: string) => document.querySelector(`button.button[data-event="${dataEvent}"]`);
const getView = (dataEvent: string): HTMLParagraphElement => document.querySelector(`p.view[data-event="${dataEvent}"]`)!;
const getInput = (dataEvent: string): string => (document.querySelector(`input[data-event=${dataEvent}]`) as HTMLInputElement).value;
const getSelect = (dataEvent: string): string => (document.querySelector(`select[data-event=${dataEvent}]`) as HTMLInputElement).value;
const setData = (dataEvent: string, input: any) => {
  try {
    getView(dataEvent).innerHTML = JSON.stringify(input, null, 2)
      .replace(/\n/g, '<br/>')
      .replace(/\s/g, '&nbsp;')
      .replace(/(\:[\&nbsp\;]*?")(.*?)("[\&nbsp\;]*?,?)/g, '$1<span class="string">$2</span>$3')
      .replace(/(\:[\&nbsp\;]*?)(\d+)([\&nbsp\;]*?,?)/g, '$1<span class="number">$2</span>$3')
      .replace(/(\:[\&nbsp\;]*?)(true|false)([\&nbsp\;]*?,?)/g, '$1<span class="boolean $2">$2</span>$3')
      .replace(/"([^"]*?)"\:/g, '"<span class="key">$1</span>":');
  } catch {
    getView(dataEvent).innerHTML = input;
  }
};

document.querySelector('#root')?.addEventListener('click', async (event) => {
  if (event.target instanceof HTMLButtonElement) {
    event.target.disabled = true;
    await btnEvent(event.target);
    event.target.disabled = false;
  }
});

async function btnEvent(target: HTMLButtonElement) {
  switch (target) {
    case getBtn('version'): {
      const res = await getVersion();
      setData('version', res);
      break;
    }
    case getBtn('approved'): {
      const res = await getPermissionV2();
      setData('approved', res);
      break;
    }
    case getBtn('apply'): {
      let will: any = ["accountInfo", "baseCall"];
      try {
        will = JSON.parse(getInput('permission'));
      } catch (_) {}
      if (getInput('permission') === '*') will = '*';
      const res = await applyPermissionV2(will);
      setData('apply', res);
      break;
    }
    case getBtn('accountInfo'): {
      const res = await getAccountInfoV2();
      setData('accountInfo', res);
      break;
    }
    case getBtn('baseCall'): {
      let will = {};
      try {
        will = JSON.parse(getInput('baseCallArgs'));
      } catch (_) {}
      const res = await baseCallV2({
        callName: getSelect('baseCallName'), callArgs: will, onlySign: getInput('baseCallSign') === 'true'
      });
      setData('baseCall', res);
      break;
    }
    case getBtn('evmCall'): {
      const res = await contractCallV2({
        type: getSelect('evmCallType') == 'send' ? 'send' : 'call',
        to: getInput('evmCallTo'),
        data: getInput('evmCallData'),
        volume: getInput('evmCallVolume'),
        onlySign: getInput('evmCallSign') === 'true'
      });
      setData('evmCall', res);
      break;
    }
    case getBtn('signData'): {
      const res = await contractSignStrV2(getInput('signData'));
      setData('signData', res);
      break;
    }
    case getBtn('language'): {
      const language = window.navigator.language;
      setData('language', {language: language});
      break;
    }
  }
}