// @flow
import { observable, decorate } from 'mobx';

export default class ProfileStore {
  rootStore: any;
  currentLocale: string;

  constructor(rootStore: any, locale: string) {
    this.rootStore = rootStore;
    this.currentLocale = locale;
  }
}

decorate(ProfileStore, {
  currentLocale: observable,
});
