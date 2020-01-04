import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from 'mobx-remotedev';
import {ListView} from "antd-mobile";

@remotedev
class DetailsStore {
  @observable detailsData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
  @observable listProps = {
    refreshing: false,
    page: 1,
    rows: 8
  };

  @action
  queryCostList = () => {
    const reqData = {
      page: this.listProps.page,
      rows: this.listProps.rows,
    }
    service.post('/queryCostList', reqData).then(({recorderList}) => {
      this.setDetailsData(recorderList);
    })
  }

  @action
  setDetailsData = (data) => {
    this.detailsData = this.detailsData.cloneWithRows(data);
  };

  @action
  setListProps = (data) => {
    this.listProps = data;
  }

}

const detailsStore = new DetailsStore();
export default detailsStore;