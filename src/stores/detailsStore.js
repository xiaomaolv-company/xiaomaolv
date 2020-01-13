import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from 'mobx-remotedev';
import {ListView} from "antd-mobile";
import {fromJS} from "immutable";
import moment from "moment";

const defaultState = fromJS({
  listProps: {
    refreshing: false,
    loading: false,
    noMore: false,
    page: 1,
    rows: 8
  },
  listDataArr: [],
  dateTimeData: {
    year: moment().format("YYYY"),
    month: moment().format("MM")
  },
  totalAmount: {
    income: 0,
    expend: 0
  },

});

@remotedev
class DetailsStore {

  // listView的数据源
  @observable detailsData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });

  @observable listProps = defaultState.get("listProps");

  @observable listDataArr = defaultState.get("listDataArr"); // 用于保存列表所有页的数据，由于listView数据源不能记住上一页的数据，所以要这样处理

  @observable dateTimeData = defaultState.get("dateTimeData");

  @observable totalAmount = defaultState.get("totalAmount");

  /**
   * 查询列表数据
   */
  @action
  queryCostList = async () => {
    const newListProps = this.listProps.toJS();
    const newDateTimeData = this.dateTimeData.toJS();
    const reqData = {
      page: newListProps.page,
      rows: newListProps.rows,
      year: newDateTimeData.year,
      month: newDateTimeData.month
    };

    // const data = await service.post('/queryCostList', reqData);


    service.post('/queryCostList', reqData, {params: 'form'}).then(({recorderList, monthSumData}) => {
      // 将刷新状态消除掉
      newListProps.refreshing = false;
      newListProps.loading = false;
      if (recorderList.length < newListProps.rows) {
        newListProps.noMore = true;
      } else {
        newListProps.noMore = false;
      }
      this.setListProps(newListProps);

      this.setListDataArr(recorderList);

      this.setTotalAmount({
        income: monthSumData[0].income,
        expend: monthSumData[0].pay
      })
    })
  };

  /**
   * 刷新列表的数据源
   */
  @action
  setDetailsData = () => {
    this.detailsData = this.detailsData.cloneWithRows(this.listDataArr.toJS());
  };

  /**
   * 设置列表的属性
   * @param data
   */
  @action
  setListProps = (data) => {
    this.listProps = fromJS(data);
  };

  /**
   * 暂存列表的数据源供listView去刷新列表
   * @param data
   */
  @action
  setListDataArr = (data) => {
    this.listDataArr = fromJS([...this.listDataArr.toJS(), ...data]);
    this.setDetailsData();
  };

  @action
  setDateTimeData = (data) => {
    this.dateTimeData = fromJS(data);
  };

  @action
  clearListDataArr = () => {
    this.listDataArr = fromJS([]);
  };

  @action
  setTotalAmount = (data) => {
    this.totalAmount = fromJS(data);
  };

  /**
   * 恢复默认的state，目的是为了刷新页面
   */
  @action
  recoverDetailsDefaultState = () => {
    this.detailsData = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.listProps = defaultState.get("listProps");
    this.listDataArr = defaultState.get("listDataArr");
    this.dateTimeData = defaultState.get("dateTimeData");
    this.totalAmount = defaultState.get("totalAmount");
  };

}

const detailsStore = new DetailsStore();
export default detailsStore;