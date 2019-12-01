import {observable, action} from "mobx";

class HomeStore {

  @observable name;

  @action
  changeName = name => this.name = name;

  constructor() {
    this.name = '惠思雨';
  }

}

const homeStore = new HomeStore();
export default homeStore;