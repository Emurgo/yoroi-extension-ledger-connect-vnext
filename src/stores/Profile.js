// @flow
import { observable } from 'mobx';

export default class Profile {
  @observable language: string;

  constructor() {
    this.language = 'ja-JP';
  }
}
