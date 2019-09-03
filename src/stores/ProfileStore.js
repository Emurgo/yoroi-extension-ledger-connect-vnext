import { observable, runInAction, action } from 'mobx';
import type { IRootStore, IChildStore } from '../types';

export default class ProfileStore implements IChildStore {
  rootStore: IRootStore;
  @observable currentLocale: string;

  constructor(rootStore: IRootStore, locale: string) {
    this.rootStore = rootStore;

    runInAction(() => {
      this.currentLocale = locale;
    });
  }

  @action('Changing Locale')
  setLocale = (locale: string) => {
    this.currentLocale = locale;
  }
}
