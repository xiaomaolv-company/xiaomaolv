import {observable, action} from "mobx";
import service from "../service/http";

class KeepingAccountsStore {
  @observable data = [];


}

const keepingAccountsStore = new KeepingAccountsStore();
export default keepingAccountsStore;