import {observable, action} from "mobx";
import service from "../service/http";

class WorkBenchStore {
  @observable tabBarData = [];
  @observable selectedTab = '';

  @action
  getTabBarData = () => {
    if (this.tabBarData.length > 0)
      return;
    service.get("/app/SysTabBarController/queryAllTabBar", {}).then(data => {
      const tabBarData = data.map(item => {
        if (item.name == '首页') {
          return {
            tabBarName: item.name,
            tabBarId: item.id,
            icon: 'icon-home-page'
          }
        }
        if (item.name == '我的') {
          return {
            tabBarName: item.name,
            tabBarId: item.id,
            icon: 'icon-personal'
          }
        }
      });
      this.tabBarData = tabBarData;
      this.selectedTab = tabBarData[0].tabBarId;
    }).catch(error => {
      throw new Error(error);
    })
  };

  @action
  handleOnPress = (tabBarId) => {
    this.selectedTab = tabBarId;
  };

}

const workBenchStore = new WorkBenchStore();
export default workBenchStore;