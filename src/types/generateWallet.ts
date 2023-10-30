export type IGenerateWallet = {
  address: string;
  mnemonic: string;
  signature_payload: string;
  verify_code?: string;
};
