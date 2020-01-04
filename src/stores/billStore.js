import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from 'mobx-remotedev';
@remotedev
class BillStore {
  @observable recorderSummaryData = {}
  @action
  queryBillList = (data) => {
    service.post('/queryBillList',data).then((recorderList) => {
      this.recorderSummaryData = recorderList
    })

  }
}

const billStore = new BillStore();
export default billStore;