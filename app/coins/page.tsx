import React from 'react';
import { fetcher } from '@/lib/coingeko.actions';
import Image from 'next/image';
import Link from 'next/link';
import DataTable from '@/components/DataTable';

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
  console.log('coinsData:', coinsData);

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Rank',
      cellClassName: 'rank-cell',
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View Coin" />
        </>
      ),
    },
    {
      header: 'Token',
      cellClassName: 'token-cell',
      cell: (coin) => (
        <div className="token-info">
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
      ),
    },
  ];
  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>
        <DataTable columns={columns} data={coinsData} rowKey={(coin) => coin.id} />
      </div>
    </main>
  );
};

export default Coins;
