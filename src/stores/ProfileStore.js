// @flow
import { observable } from 'mobx';

export default class ProfileStore {
  rootStore: any;
  @observable currentLocale: string;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this.currentLocale = 'ja-JP';
  }
}
