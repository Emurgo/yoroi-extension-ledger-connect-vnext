// @flow
import { observable } from 'mobx';

export default class ProfileStore {
  @observable language: string;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.language = 'ja-JP';
  }
}
