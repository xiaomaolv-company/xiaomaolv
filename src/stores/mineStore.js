import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from 'mobx-remotedev';

@remotedev
class MineStore{
  @observable userData={};
  @action
  queryUserData = () => {
    service.get('/queryUserData').then((recorderList) => {
      console.log(recorderList,'userData')
      this.setUserData(recorderList)
    })

  }

  @action
  setUserData = (data) => {
    this.userData = data
  }
}

const mineStore = new MineStore();
export default mineStore;