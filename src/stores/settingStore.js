import {observable, action} from "mobx";
import remotedev from 'mobx-remotedev';

class SettingStore {
  @observable age;

  @action
  changeAge = age => this.age = age;

  constructor() {
    this.age = 25;
  }
}

const settingStore = new SettingStore();
export default remotedev(settingStore);