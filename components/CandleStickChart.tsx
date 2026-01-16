'use client';

import { useState } from "react";

const CandleStickChart = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = 'daily',
}: CandlestickChartProps) => {
    const [loading, setLoading] = useState<boolean>(false);
  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div className="flex-1">{children}</div>
        <div className="button-group">
            <span className="text-sm mx-2 font-medium text-purple-100/50">Period:</span>
            <button key="1h" className="config-button" onClick={()=>{console.log("1h clicked")}}>
                1 Hour
            </button>
        </div>
      </div>
    </div>
  );
};

export default CandleStickChart;
