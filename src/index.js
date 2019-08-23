import React, { Component } from 'react';
import { render } from "react-dom";
import { Provider, inject } from "mobx-react";
import { HashRouter as Router, BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import { MobxIntlProvider, LocaleStore } from "mobx-react-intl";
import { addLocaleData } from "react-intl";

import enLocale from 'react-intl/locale-data/en';
import jaLocale from 'react-intl/locale-data/ja';
import koLocale from 'react-intl/locale-data/ko';
import zhLocale from 'react-intl/locale-data/zh';
import ruLocale from 'react-intl/locale-data/ru';

addLocaleData([...enLocale, ...jaLocale, ...koLocale, ...zhLocale, ...ruLocale]);

import translations from './language/language'
const localeStore = new LocaleStore("en", translations);
const languageStore = { locale: localeStore };

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./components/Home"
import About from "./components/About"
import FAQ from "./components/FAQ"
import Support from "./components/Support"
import Terms from "./components/Terms"

const App = () =>
  <div>
    <Provider {...languageStore}>
      <MobxIntlProvider>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/faq/:id" component={FAQ} />
              <Route path="/support" component={Support} />
              <Route path="/terms_and_conditions" component={Terms} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </MobxIntlProvider>
    </Provider>
  </div>;

if (typeof window !== 'undefined') {
  render(<App />, document.getElementById('root'));
}
