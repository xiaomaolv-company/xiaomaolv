import React, {Component} from 'react';
import "./Details.less";
import {observer, inject} from "mobx-react";
import {toJS} from "mobx";

@inject("detailsStore")
@observer
class Details extends Component {
  render() {
    const {
      detailsStore: {
        detailsData
      }
    } = this.props;
    return (
      <div className="Details">

      </div>
    );
  }

  componentDidMount() {
    const {
      detailsStore: {
        queryCostList
      }
    } = this.props;
    queryCostList();
  }
}

export default Details;