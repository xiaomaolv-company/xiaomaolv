import React, {useState} from 'react';
import './Chart.less';

function Chart() {

  const [chartData, setChartData] = useState('惠思雨');

  return (
    <div className="Chart">
      {chartData}
    </div>
  )


}

export default Chart;