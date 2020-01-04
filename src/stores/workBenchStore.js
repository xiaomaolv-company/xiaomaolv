import {observable, action} from "mobx";
import service from "../service/http";

class WorkBenchStore {
  @observable tabBarData = [];
  @observable selectedTab = '';

  @action
  getTabBarData = () => {
    if (this.tabBarData.length > 0)
      return;
    service.get("/queryAllTabBar", {}).then(data => {
      const tabBarData = data.map(item => ({
        ...item,
        tabBarName: item.name,
        tabBarId: item.id,
      }));
      this.setTabBarData(tabBarData);
      this.handleOnPress(tabBarData[0].tabBarId);
    }).catch(error => {
      throw new Error(error);
    })
  };

  @action
  handleOnPress = (tabBarId) => {
    this.selectedTab = tabBarId;
  };

  @action
  setTabBarData = (data) => {
    this.tabBarData = data;
  }


}

const workBenchStore = new WorkBenchStore();
export default workBenchStore;