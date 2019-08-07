# yoroi-extension-ledger-bridge-connector
Hosted [Github page](https://emurgo.github.io/yoroi-extension-ledger-bridge/).

# Overview
This is the [gh-pages](https://github.com/Emurgo/yoroi-extension-ledger-bridge/tree/gh-pages) branch which is hosted as Github pages.

Here we host [ledgerjs-hw-app-cardano](https://www.npmjs.com/package/@cardano-foundation/ledgerjs-hw-app-cardano) in order to communicate with the actual Ledger device using following [Transport layers](https://github.com/LedgerHQ/ledgerjs#ledgerhqhw-transport-).
- [hw-transport-u2f](https://www.npmjs.com/package/@ledgerhq/hw-transport-u2f)
- [hw-transport-webusb](https://www.npmjs.com/package/@ledgerhq/hw-transport-webusb)

# Development

```
yarn
yarn run build
yarn run start
```

* **It will run on https://localhost:3000/**.
* You can check for connected devices by pressing [Get Connected Device Version] button:
![image](https://user-images.githubusercontent.com/19986226/56442802-f7495580-632c-11e9-9bdf-aea7b2458712.png)
**Output will be displayed in the browser's console log**.

# Production

```
yarn
yarn run build
```

* **Push all the changes to the [gh-pages](https://github.com/Emurgo/yoroi-extension-ledger-bridge/tree/gh-pages) branch, hosted [Github page](https://emurgo.github.io/yoroi-extension-ledger-bridge/) will be updated autmatically after few minutes.**