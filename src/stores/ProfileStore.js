// @flow
import { observable, decorate } from 'mobx';

export default class ProfileStore {
  rootStore: any;
  currentLocale: string;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this.currentLocale = 'ja-JP';
  }
}

decorate(ProfileStore, {
  currentLocale: observable
});
