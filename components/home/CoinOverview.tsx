import { fetcher } from '@/lib/coingeko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

const CoinOverview = async () => {
  try {
    const coinData = await fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol',
    });

    if (!coinData || !coinData.market_data) {
      throw new Error('Invalid coin data');
    }

    return (
      <div id="coin-overview">
        <div className="header">
          <Image src={coinData.image.large} alt={coinData.name} width={56} height={56} />
          <div className="info">
            <p>{`${coinData.name} / ${coinData.symbol.toUpperCase()}`}</p>
            <h1>{formatCurrency(coinData.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to load coin overview:', error);

    return (
      <div id="coin-overview">
        <p className="py-5 px-3">Failed to load coin data. Please try again later.</p>
      </div>
    );
  }
};

export default CoinOverview;
