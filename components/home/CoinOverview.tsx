import { fetcher } from '@/lib/coingeko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CoinOverViewFallback } from '../fallback';

const CoinOverview = async () => {
  let coinData: CoinDetailsData | null = null;
  try {
    coinData = await fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol',
    });

    if (!coinData || !coinData.market_data) {
      throw new Error('Invalid coin data');
    }
  } catch (error) {
    console.error('Failed to load coin overview:', error);

    return <CoinOverViewFallback />;
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
};

export default CoinOverview;
