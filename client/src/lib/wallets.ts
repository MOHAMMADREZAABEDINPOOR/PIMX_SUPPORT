export type Wallet = {
  key: string;
  name: string;
  network: string;
  address: string;
  color: string;
  logo: string;
  group: "main" | "stable" | "ecosystem";
};

export const WALLETS: Wallet[] = [
  {
    key: "btc",
    name: "Bitcoin",
    network: "Native SegWit",
    address: "bc1q7z986uxkm6tpy9uuem04wx7p5eed4clvvx7778",
    color: "#f7931a",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/btc.svg",
    group: "main",
  },
  {
    key: "eth",
    name: "Ethereum",
    network: "Mainnet",
    address: "0x3a89f0C03F864D1062d6ad882aAe39eFD1CaF580",
    color: "#627eea",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/eth.svg",
    group: "ecosystem",
  },
  {
    key: "usdt-e",
    name: "Tether",
    network: "ERC-20 · Ethereum",
    address: "0x3a89f0C03F864D1062d6ad882aAe39eFD1CaF580",
    color: "#26a17b",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/usdt.svg",
    group: "stable",
  },
  {
    key: "bnb",
    name: "BNB",
    network: "BNB Smart Chain",
    address: "0x3a89f0C03F864D1062d6ad882aAe39eFD1CaF580",
    color: "#f3ba2f",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/bnb.svg",
    group: "main",
  },
  {
    key: "usdt-t",
    name: "Tether",
    network: "TRC-20 · TRON",
    address: "TBRU8RY3BpCh9DCymSFCi8rRAozStQfExt",
    color: "#26a17b",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/usdt.svg",
    group: "stable",
  },
  {
    key: "trx",
    name: "TRON",
    network: "TRON Network",
    address: "TBRU8RY3BpCh9DCymSFCi8rRAozStQfExt",
    color: "#ff0013",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/trx.svg",
    group: "main",
  },
  {
    key: "sol",
    name: "Solana",
    network: "Solana Network",
    address: "56hEupXKzQxUNvA4ziLVvrNiGDJpWwBsPHi2aHFJjL2v",
    color: "#9945ff",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/sol.svg",
    group: "ecosystem",
  },
  {
    key: "ton",
    name: "TON",
    network: "Telegram Open Network",
    address: "UQDtca3U_vzAtzhf4s_tR7P0nYyXGA1ok-69rDuAjShsXeN6",
    color: "#0098ea",
    logo: "https://cryptologos.cc/logos/toncoin-ton-logo.svg?v=040",
    group: "ecosystem",
  },
  {
    key: "doge",
    name: "Dogecoin",
    network: "Dogecoin Network",
    address: "D9pHxFrn4JQjVbWGASaCBj9xsATZ2ov4x2",
    color: "#c2a633",
    logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/doge.svg",
    group: "main",
  },
];
