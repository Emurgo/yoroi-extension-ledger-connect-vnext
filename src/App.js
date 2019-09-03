// @flow
import React, { Suspense, lazy } from 'react';
import { observer } from 'mobx-react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';
import ru from 'react-intl/locale-data/ru';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import id from 'react-intl/locale-data/id';
import es from 'react-intl/locale-data/es';
import it from 'react-intl/locale-data/it';

import { translations } from './i18n/translations';
import { DEFAULT_LOCALE } from './const';
import styleVariables from './cmn-style/style-variables';
// https://github.com/yahoo/react-intl/wiki#loading-locale-data
addLocaleData([...en, ...ko, ...ja, ...zh, ...ru, ...de, ...fr, ...id, ...es, ...it]);

// https://reactjs.org/docs/code-splitting.html#reactlazy
const ConnectPage = lazy(() => import('./containers/ConnectPage'));
const StyleVariableLoader = lazy(() => import('./containers/StyleVariableLoader'));

@observer
export default class App extends React.Component {

  render() {
    const { profileStore } = this.props.rootStore;

    const locale = profileStore.currentLocale;

    // Merged english messages with selected by user locale messages
    // In this case all english data would be overridden to user selected locale, but untranslated
    // (missed in object keys) just stay in english
    const mergedMessages = Object.assign(
      {},
      translations[DEFAULT_LOCALE],
      translations[locale]
    );

    const component = (
      <div style={{ height: '100%' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <StyleVariableLoader variables={styleVariables} />
          <IntlProvider {...{ locale, key: locale, messages: mergedMessages }}>
            <ConnectPage rootStore={this.props.rootStore} />
          </IntlProvider>
        </Suspense>
      </div>
    );

    return component;
  }
}
