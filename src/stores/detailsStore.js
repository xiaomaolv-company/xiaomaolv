import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from 'mobx-remotedev';

@remotedev
class DetailsStore {
  @observable detailsData = [];

  @action
  queryCostList = () => {
    service.post('/queryCostList').then(({recorderList}) => {
      this.detailsData = recorderList;
    })
  }
}

const detailsStore = new DetailsStore();
export default detailsStore;