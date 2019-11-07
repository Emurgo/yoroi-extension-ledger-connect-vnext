# yoroi-extension-ledger-connect
This module is resposible for showing Ledger operation steps UI and directly communicating with Ledger device using various [Transport protocol](https://github.com/LedgerHQ/ledgerjs#ledgerhqhw-transport-).WebPage is hosted as [`gh-pages`](https://emurgo.github.io/yoroi-extension-ledger-connect/).

# Supported Ledger Transport
click [here](https://github.com/Emurgo/yoroi-extension-ledger-connect-handler#supported-ledger-transport)

# Environment
`development` and `production` environments is supported.

# Development
Follwing steps is to start`webpack-dev-server`in hot reload mode at `http://localhost:8080/`.
- nvm i
- yarn
- yarn start

# Deployment
Following steps is to deploy new version to `gh-pages`.
- nvm i
- yarn
- Mave changes and update the version in `package.json`
- git push
- yarn run deploy

# Manual Testing
In `development` mode testing panel will be shown on the top left like below.
You can hide it by double clicking over the panel or make it visible again by single click is the same top left area.<br>
![manual-testing](https://user-images.githubusercontent.com/19986226/68367231-8c505680-0178-11ea-802d-ef9aaa29f70b.gif)
