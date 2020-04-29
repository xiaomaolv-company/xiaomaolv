import React, {useState, useEffect} from 'react';
import './Chart.less';
import {Button, InputItem, List} from "antd-mobile";
import io from 'socket.io-client';
import * as urlConfig from '../../utils/urlConfig';

function Chart() {

  const [chartData, setChartData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const socket = io.connect(urlConfig.realTimeUrl);

  useEffect(() => {
    console.log("执行effect函数了")
    socket.emit("realTime");
    socket.on("realTime", data => {
      console.log(data, 'nodejs返回的数据')
      if (data.flag === 0) {
        setChartData(data.data);
      }
    });

  }, []);

  function handle() {
    socket.emit("addData", {name: inputValue});
    socket.on("addData", data => {
      if (data.flag === 0) {
        console.log(data.data, `${data.message}`)
      }
    })
    // socket.emit("realTime");

  }

  return (
    <div className="Chart">
      <List>
        <InputItem
          onChange={(value) => {
            setInputValue(value)
          }}
          clear
          placeholder="请输入文本"
          value={inputValue}
        >人员：</InputItem>
      </List>

      <Button type="primary" onClick={() => {
        handle();
      }}>添加人员</Button>

      {
        chartData.map(item => {
          return (
            <div key={item.id}>{item.name}</div>
          )
        })
      }
    </div>
  )


}

export default Chart;