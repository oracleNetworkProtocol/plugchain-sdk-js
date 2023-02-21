export const checkIsExtension = () => {
  const tool = (window as any).cosmoWallet;
  if (!tool) return false;
  if (!tool.getAccount) return false;
  return true;
};
