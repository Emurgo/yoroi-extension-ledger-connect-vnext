// @flow
import ProfileStore from './ProfileStore';
import ConnectStore from './ConnectStore';
import {
  DEFAULT_TRANSPORT_PROTOCOL,
  DEFAULT_LOCALE
} from '../const';
import { SUPPORTED_LOCALS } from '../i18n/translations';
import type { URLParams, IRootStore, IChildStore } from '../types';

/**
 * This is the RootStore, RootStore is responsible for creating all store
 * Refer: https://mobx.js.org/best/store.html (Combining multiple stores section)
 */
export default class RootStore implements IRootStore {
  profileStore: IChildStore;
  connectStore: IChildStore;

  constructor() {
    const urlParams: URLParams = this.makeURLParams();
    this.profileStore = new ProfileStore(this, urlParams.locale);
    this.connectStore = new ConnectStore(this, urlParams.transportId);
  }

  makeURLParams = (): URLParams => {
    const urlParams = new URLSearchParams(window.location.search);

    const p: URLParams = {
      transportId: urlParams.get('transport') || '',
      locale: urlParams.get('locale') || ''
    };

    if (p.transportId == null || p.transportId === '') {
      p.transportId = DEFAULT_TRANSPORT_PROTOCOL;
    }

    if (p.locale == null ||
      p.locale === '' ||
      !SUPPORTED_LOCALS.includes(p.locale)) {
      p.locale = DEFAULT_LOCALE;
    }

    return p;
  }
}
