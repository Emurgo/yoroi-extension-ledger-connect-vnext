// @flow
import { observable } from 'mobx';

export default class ProfileStore {
  @observable currentLocale: string;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentLocale = 'ja-JP';
  }
}
