// @flow

// $FlowFixMe require.context comes from webpack
const req = require.context('./locales', true, /\.json.*$/);
export const translations: { [locale: string]: { [key: string]: string } } = {};

req.keys().forEach((file) => {
  const locale = file.replace('./', '').replace('.json', '');
  translations[locale] = req(file);
});
