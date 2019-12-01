import {observable, action} from "mobx";
import axios from 'axios';

class HomeStore {

  @observable menuData;

  @action
  getMenu = () => {
    this.menuData = [
      {
        text: '记账',
        id: 1003,
        icon:''
      }
    ];
    return;
    axios.get("/app/SysTabBarController/queryAllFuncList", {}).then(({data}) => {
      this.menuData = data;
    }).catch(error => {
      throw new Error(error);
    });
  };

  constructor() {
    this.menuData = [];
  }

}

const homeStore = new HomeStore();
export default homeStore;