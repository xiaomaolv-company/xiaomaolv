import {observable, action} from "mobx";

class SettingStore {
  @observable age;

  @action
  changeAge = age => this.age = age;

  constructor() {
    this.age = 25;
  }
}

const settingStore = new SettingStore();
export default settingStore;