import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from "mobx-remotedev";
import * as commonHistory from '@utils/common-history';

@remotedev
class KeepingAccountsStore {
  @observable tabsData = [];
  @observable amount = '';
  @observable currentActiveTabItemId;
  @observable moneyKeyboardWrapProps = {};

  @action
  getCostTypeData = () => {
    if (this.tabsData.length > 0)
      return;
    service.get('/queryCostType').then(data => {
      const costTypeData = data.filter(item => item.type == 1).map(item => ({...item, text: item.name}));
      const incomeTypeData = data.filter(item => item.type == 2).map(item => ({...item, text: item.name}));
      const tabsData = [
        {
          title: '支出',
          data: costTypeData
        },
        {
          title: '收入',
          data: incomeTypeData
        }
      ];
      this.setTabsData(tabsData);
    }).catch(error => {
      throw new Error(error);
    })
  };

  /**
   *  设置tabsData数据
   * @param data
   */
  @action
  setTabsData = (data) => {
    this.tabsData = data;
  };

  @action
  setMoneyKeyboardWrapProps = () => {
    const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
    if (isIPhone) {
      this.moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
      };
    }
  };

  @action
  inputOnChange = (value) => {
    this.amount = value;
  };

  @action
  setCurrentActiveTabItemId = (id) => {
    this.currentActiveTabItemId = id;
  };

  @action
  saveCostData = (value) => {
    const reqData = {
      balance: value,
      configId: this.currentActiveTabItemId,
      // userId:'10015'
    };
    service.post('/addCostDetail', reqData).then(data => {
      commonHistory.back();
    })
  }


}

const keepingAccountsStore = new KeepingAccountsStore();
export default keepingAccountsStore;