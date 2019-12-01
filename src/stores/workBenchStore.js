import {observable, action} from "mobx";
import axios from "axios";

class WorkBenchStore {
  @observable tabBarData = [];
  @observable selectedTab = '';

  @action
  getTabBarData = () => {
    axios.get("/app/SysTabBarController/queryAllTabBar", {}).then(({data}) => {
      console.log("哈哈哈", data)
      const tabBarData = data.map(item => {
        return {
          tabBarName: item.name,
          tabBarId: item.id,
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