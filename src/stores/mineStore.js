import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from 'mobx-remotedev';

@remotedev
class MineStore{
  @observable userData={};
  @observable loginUserInfo={}
  @action
  queryUserData = () => {
    service.get('/queryUserData').then((recorderList) => {
      console.log(recorderList,'userData')
      this.setUserData(recorderList)
    })

  }
  @action
  getUserLoginInfo = () => {
    service.get('/queryUserLoginInfo').then((loginUserInfo) => {
      console.log(loginUserInfo,'loginUserInfo')
      this.setLoginUserInfo(loginUserInfo)
    })

  }

  // @action
  // queryUserBillInfo = () => {
  //   service.get('/queryUserBillInfo').then((recorderList) => {
  //     console.log(recorderList,'userBillInfo')
  //     this.setUserBillInfo(recorderList)
  //   })
  // }

  @action
  setUserData = (data) => {
    this.userData = data
  }
  @action
  setLoginUserInfo = (data) => {
    this.loginUserInfo = data
  }

  // @action
  // setUserBillInfo = (data) => {
  //   this.userBillInfo = data
  // }
}

const mineStore = new MineStore();
export default mineStore;