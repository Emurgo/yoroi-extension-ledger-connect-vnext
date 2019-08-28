// @flow
import ProfileStore from './ProfileStore';
import ConnectStore from './ConnectStore';

/**
 * This is the RootStore, RootStore is responsible for creating all store
 * Refer: https://mobx.js.org/best/store.html (Combining multiple stores section)
 */
export default class RootStore {
  constructor() {
    this.profileStore = new ProfileStore(this);
    this.connectStore = new ConnectStore(this);
  }
}
