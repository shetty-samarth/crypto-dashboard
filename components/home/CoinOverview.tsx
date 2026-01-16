import { fetcher } from '@/lib/coingeko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CoinOverViewFallback } from '../fallback';
// import CandleStickChart from '../CandleStickChart';

const CoinOverview = async () => {
  let coinData: CoinDetailsData | null = null;
  let coinOHLCData: OHLCData[] | null = null;
  try {
    [coinData, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>('/coins/bitcoin', {
        dex_pair_format: 'symbol',
      }),
      fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: '1',
        precision: 'full',
      }),
    ]);

    if (!coinData || !coinData.market_data) {
      throw new Error('Invalid coin data');
    }
  } catch (error) {
    console.error('Failed to load coin overview:', error);

    return <CoinOverViewFallback />;
  }

  return (
    <div id="coin-overview">
      <div className="header py-5">
        <Image src={coinData.image.large} alt={coinData.name} width={56} height={56} />
        <div className="info">
          <p>{`${coinData.name} / ${coinData.symbol.toUpperCase()}`}</p>
          <h1>{formatCurrency(coinData.market_data.current_price.usd)}</h1>
        </div>
      </div>
      {/* <CandleStickChart data={coinOHLCData} coinId="bitcoin" /> */}
    </div>
  );
};

export default CoinOverview;
