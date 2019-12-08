import {observable, action} from "mobx";
import service from "../service/http";

class HomeStore {

  @observable menuData = [];

  @action
  getMenu = () => {
    if (this.menuData.length > 0)
      return;
    service.get("/app/SysTabBarController/queryAllFuncList", {}).then(data => {
      const menuData = data.map(item => {
        return {
          text: item.name,
          id: item.id,
          icon: 'icon-keeps-accounts'
        }
      });
      this.menuData = menuData;
    }).catch(error => {
      throw new Error(error);
    });
  };

}

const homeStore = new HomeStore();
export default homeStore;