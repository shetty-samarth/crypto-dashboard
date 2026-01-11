import Image from 'next/image'
import DataTable from '@/components/DataTable'
import Link from 'next/link';
import {fetcher} from '@/lib/coingeko.actions';
import { TrendingUp, TrendingDown } from 'lucide-react';

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name', cellClassName: 'name-cell', cell: (coin) => {
      const item = coin.item;
      return (
        <Link href={`/coins/${item.id}`} className='flex items-center gap-3'>
          <Image src={item.large} alt={item.name} width={24} height={24} />
          <p>{item.name}</p>
        </Link>
      )
    }
  },
  {
    header: '24h Change', cellClassName: 'name-cell', cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd >= 0;
      return (
        <p className={isTrendingUp ? 'text-green-500' : 'text-red-500'}>
          {isTrendingUp ? <TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />}{item.data.price_change_percentage_24h.usd.toFixed(2)}%
        </p>
      )
    }
  },
  {
    header: 'Price', cellClassName: 'price-cell', cell: (coin) => {
      const item = coin.item;
      return (
        <p>${item.data.price.toLocaleString()}</p>
      )
    }
  }
]

const page = async() => {
  const coinData = await fetcher<CoinDetailsData>('/coins/bitcoin', {
    dex_pair_format: 'symbol'
  });
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <div id='coin-overview'>
          <div className='header'>
            <Image src={coinData.image.large} alt="Bitcoin" width={56} height={56} />
            <div className='info'>
              <p>{`${coinData.name} / ${coinData.symbol.toUpperCase()}`}</p>
              <h1>${coinData.market_data.current_price.usd.toLocaleString()}</h1>
          </div>
          </div>

        </div>
        <p>Trending Coins</p>
        {/* Dummy data for DataTable during development */}
        <DataTable
          columns={columns}
          data={[
            {
              item: {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'btc',
                market_cap_rank: 1,
                thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
                large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
                data: {
                  price: 27000,
                  price_change_percentage_24h: { usd: -1.23 }
                }
              }
            },
            {
              item: {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'eth',
                market_cap_rank: 2,
                thumb: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
                large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
                data: {
                  price: 1800,
                  price_change_percentage_24h: { usd: 2.45 }
                }
              }
            }
          ]}
          rowKey={(row) => row.item.id}
        />
      </section>
      <section className='w-full mt-7 space-y-4'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page