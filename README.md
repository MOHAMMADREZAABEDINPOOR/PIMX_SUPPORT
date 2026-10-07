<div align="center">

<img src="assets/readme/hero.gif" width="1200" alt="PIMX SUPPORT — rotating 3D geometry" />

**[English](README.md) · [فارسی](README.fa.md)**

<img src="assets/readme/identity.svg" width="1200" alt="web / English and Persian documentation" />

</div>

# PIMX SUPPORT

A bilingual donation page for PIMX with cryptocurrency network cards, wallet addresses and receipt-style detail dialogs.

[GitHub](https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT) · [PIMX / Profile](https://github.com/MOHAMMADREZAABEDINPOOR) · [Static artwork](assets/readme/hero.png)

## Features

- Wallet/network cards and copyable addresses
- Receipt-style wallet detail dialogs
- English/Persian content and responsive layout
- React frontend and optional Express static server

## Stack

| Tool | Version / source |
|---|---|
| React | `^19.2.1` |
| Vite | `^7.1.7` |
| TypeScript | `5.6.3` |
| Express | `^4.21.2` |
| Framer Motion | `^12.23.22` |
| Tailwind CSS | `^4.1.14` |

## Getting started

Node.js 22.12+ and the package manager declared in package.json. Install dependencies from the checked-in lockfile where available.

```bash
git clone https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT.git
cd PIMX_SUPPORT

pnpm install --frozen-lockfile
pnpm run dev
```

## Configuration

These names are found in the example configuration or source; not all are required. Check their defaults/usage in those files and supply secrets only in your local or hosting environment.

| Name | Role |
|---|---|
| `BUILT_IN_FORGE_API_KEY` | Credential/connection setting; keep private |
| `BUILT_IN_FORGE_API_URL` | Application setting; inspect its definition |
| `PORT` | Application setting; inspect its definition |

## Usage

Select a wallet card, verify the displayed address and network, and use the copy control. Maintainers can edit the wallets array in client/src/pages/Home.tsx.

## Project structure

| Path | Role |
|---|---|
| [`assets/`](assets/) | Brand/media/README assets |
| [`client/`](client/) | Browser application |
| [`server/`](server/) | Server implementation |
| [`components.json`](components.json) | Project entry/configuration file |
| [`package.json`](package.json) | Project entry/configuration file |
| [`template.json`](template.json) | Project entry/configuration file |
| [`tsconfig.json`](tsconfig.json) | Project entry/configuration file |
| [`tsconfig.node.json`](tsconfig.node.json) | Project entry/configuration file |

## Commands and checks

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run preview
pnpm run check
```

These commands are declared in package.json; the list is not a test execution report. Test commands may need a browser, service or prepared database.

## Deployment

Deploy the build according to its architecture: server-backed projects need a Node process; static Vite frontends can host dist. Pages functions, KV or D1 require separate configuration.

## Limitations

The page displays donation destinations; it does not process payments or confirm transactions. Verify wallet ownership and network before use. This snapshot does not implement a support-ticket backend.

## Troubleshooting

- Missing packages: install dependencies using the project’s package manager.
- API/network failure: check the configured origin, provider and hosting bindings.
- Old assets: rebuild when a build script exists, then clear the browser cache.

## Contributing

Create a focused branch, verify the affected behavior and explain the change clearly. Keep private data, build outputs and local databases out of commits.

## License

No repository-level license file is included in this snapshot. Public visibility alone does not grant reuse rights; contact the repository owner for terms.

---

Part of **PIMX** · Documentation in English and Persian.
