import { fetcher } from '@/lib/coingeko.actions';
import React from 'react';

const page = async ({ params }: NextPageProps) => {
  const { id } = await params;
  const coinData = await fetcher<CoinMarketData>(`/coins/${id}`, {
    dex_pair_format: 'contract_address'
  });
  console.log('coinData:', coinData);
  return (
    <main id='coin-details-page'>
        <section className='primary'>
            <h1 className='text-3xl font-bold'>{coinData?.name}</h1>
            <p>Trend Overview</p>
            <p>Recent Trades</p>
            <p>Exchange Listing</p>
        </section>
        <section className='secondary'>
            <h4>Coin Details</h4>
            <ul className='details-grid'></ul>
        </section>
    </main>
  )
};

export default page;
