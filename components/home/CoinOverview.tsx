import { fetcher } from '@/lib/coingeko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

const CoinOverview = async () => {
  const coinData = await fetcher<CoinDetailsData>('/coins/bitcoin', {
    dex_pair_format: 'symbol',
  });
  return (
    <div id="coin-overview">
      <div className="header">
        <Image src={coinData.image.large} alt="Bitcoin" width={56} height={56} />
        <div className="info">
          <p>{`${coinData.name} / ${coinData.symbol.toUpperCase()}`}</p>
          <h1>{formatCurrency(coinData.market_data.current_price.usd)}</h1>
        </div>
      </div>
      <p>Chart goes below</p>
    </div>
  );
};

export default CoinOverview;
