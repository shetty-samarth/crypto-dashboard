import React from 'react';
import { fetcher } from '@/lib/coingeko.actions';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DataTable from '../DataTable';

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    '/search/trending',
    undefined,
    300,
  );
  console.log('trendingCoins', trendingCoins);
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link href={`/coins/${item.id}`} className="flex items-center gap-3">
            <Image src={item.large} alt={item.name} width={24} height={24} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: '24h Change',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd >= 0;
        return (
          <p className={isTrendingUp ? 'text-green-500' : 'text-red-500'}>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
            {item.data.price_change_percentage_24h.usd.toFixed(2)}%
          </p>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => {
        const item = coin.item;
        return <p>${item.data.price.toLocaleString()}</p>;
      },
    },
  ];
  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        columns={columns}
        data={trendingCoins.coins.slice(0, 5) || []}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoins;
