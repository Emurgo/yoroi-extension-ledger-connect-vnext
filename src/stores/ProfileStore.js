// @flow
import { observable, runInAction, action } from 'mobx';

export default class ProfileStore {
  @observable currentLocale: string;

  constructor(locale: string) {
    runInAction(() => {
      this.currentLocale = locale;
    });
  }

  @action('Changing Locale')
  setLocale = (locale: string) => {
    this.currentLocale = locale;
  }
}
