import React from 'react';
import { fetcher } from '@/lib/coingeko.actions';
import Image from 'next/image';
import Link from 'next/link';
import DataTable from '@/components/DataTable';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import CoinPagination from '@/components/CoinsPagination';

const Coins = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page as string) : 1;
  const perPage = 10;

  const coinsData = await fetcher<CoinMarketData[]>('/coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: perPage,
    page: currentPage,
    sparkline: false,
  });

  const hasMorePages = coinsData.length === perPage;

  const totalPageEST = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Rank',
      cellClassName: 'rank-cell',
      cell: (coin) => (
        <>
          <Link href={`/coins/${coin.id}`} aria-label="View Coin">
            #{coin.market_cap_rank}
          </Link>
        </>
      ),
    },
    {
      header: 'Token',
      cellClassName: 'token-cell',
      cell: (coin) => (
        <Link href={`/coins/${coin.id}`} aria-label="View Coin">
          <div className="token-info flex">
            <Image
              src={coin.image}
              alt={coin.name}
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            <p>
              {coin.name} ({coin.symbol.toUpperCase()})
            </p>
          </div>
        </Link>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'name-cell',
      cell: (coin) => <p>{formatCurrency(coin.current_price)}</p>,
    },
    {
      header: 'Price Change 24h',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const change = coin.price_change_percentage_24h ?? 0;
        const isTrendingUp = change >= 0;

        return (
          <div className={isTrendingUp ? 'text-green-500' : 'text-red-500'}>
            <p className="flex">
              <span className="px-1">{coin.price_change_percentage_24h?.toFixed(2)}%</span>
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: 'Market Cap',
      cellClassName: 'name-cell',
      cell: (coin) => <p>{formatCurrency(coin.market_cap)}</p>,
    },
    {
      header: 'Volume (24h)',
      cellClassName: 'name-cell',
      cell: (coin) => <p>{formatCurrency(coin.total_volume)}</p>,
    },
  ];
  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>
        <DataTable columns={columns} data={coinsData} rowKey={(coin) => coin.id} />
        <CoinPagination
          currentPage={currentPage}
          totalPages={totalPageEST}
          hasMorePages={hasMorePages}
        />
      </div>
    </main>
  );
};

export default Coins;
