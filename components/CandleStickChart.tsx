'use client';

import { PERIOD_BUTTONS } from '@/constants';
import { useState } from 'react';

const CandleStickChart = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = 'daily',
}: CandlestickChartProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [period, setPeriod] = useState<Period>(initialPeriod);

  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period) return;
    setPeriod(newPeriod);
  };
  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        {/* <div className="flex-1">{children}</div> */}
        <div className="button-group">
          <span className="text-sm font-medium text-purple-100/50">Period:</span>
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={period === value ? 'config-button-active' : 'config-button'}
              onClick={() => {
                console.log(`${value} clicked`);
                handlePeriodChange(value);
              }}
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandleStickChart;
