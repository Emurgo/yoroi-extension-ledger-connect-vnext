// @flow
import { observable } from 'mobx';

export default class ConnectStore {
  @observable test: string;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
