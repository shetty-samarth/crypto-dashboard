import React from 'react';
import { fetcher } from '@/lib/coingeko.actions';

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<TrendingCoin[]>('/search/trending', undefined, 300);
  console.log('trendingCoins', trendingCoins);
  return <div>TrendingCoins</div>;
};

export default TrendingCoins;
