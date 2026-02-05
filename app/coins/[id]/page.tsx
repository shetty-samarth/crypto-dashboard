import { fetcher } from '@/lib/coingeko.actions';
import React from 'react';

const page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  let coinData: CoinMarketData | null = null;
  let error: string | null = null;

  try {
    // The request happens here.
    // If you have a loading.tsx file, Next.js shows it automatically while this awaits.
    coinData = await fetcher<CoinMarketData>(`/coins/${id}`, {
      dex_pair_format: 'contract_address',
    });
  } catch (e) {
    console.error('Failed to fetch coin data:', e);
    error = 'Failed to load coin details. Please try again later.';
  }

  if (error) {
    return <main className="p-10 text-red-500">{error}</main>;
  }

  // Fallback UI if data is still null for some reason
  if (!coinData) {
    return <main className="p-10 text-gray-500">Loading...</main>;
  }

  return (
    <main id="coin-details-page">
      <section className="primary">
        <h1 className="text-3xl font-bold">{coinData.name}</h1>
        <p>Trend Overview</p>
        <p>Recent Trades</p>
        <p>Exchange Listing</p>
      </section>
      <section className="secondary">
        <h4>Coin Details</h4>
        <ul className="details-grid">
          {/* Example detail item */}
          <li>Symbol: {coinData.symbol?.toUpperCase()}</li>
        </ul>
      </section>
    </main>
  );
};

export default page;
