// import { fetcher } from '@/lib/coingeko.actions';
// import { formatCurrency } from '@/lib/utils';

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

// type CoinDetail = {
//   label: string;
//   value: string;
//   link?: string;
//   linkText?: string;
// };

// const page = async ({ params }: PageProps) => {
//   const { id } = params;

//   let coinData: CoinDetailsData | null = null;
//   let coinDetails: CoinDetail[] = [];
//   let error: string | null = null;

//   try {
//     coinData = await fetcher<CoinDetailsData>(`/coins/${id}`, {
//       dex_pair_format: 'contract_address',
//     });
//     console.log('Fetched coin data:', coinData);
//     if (!coinData) {
//       throw new Error('No coin data returned');
//     }

//     // coinDetails = [
//     //   {
//     //     label: 'Market Cap',
//     //     value: formatCurrency(coinData.market_data.market_cap.usd),
//     //   },
//     //   {
//     //     label: 'Market Cap Rank',
//     //     value: `# ${coinData.market_cap_rank}`,
//     //   },
//     //   {
//     //     label: 'Total Volume',
//     //     value: formatCurrency(coinData.market_data.total_volume.usd),
//     //   },
//     //   {
//     //     label: 'Website',
//     //     value: '-',
//     //     link: coinData.links.homepage?.[0],
//     //     linkText: 'Homepage',
//     //   },
//     //   {
//     //     label: 'Explorer',
//     //     value: '-',
//     //     link: coinData.links.blockchain_site?.[0],
//     //     linkText: 'Explorer',
//     //   },
//     //   {
//     //     label: 'Community',
//     //     value: '-',
//     //     link: coinData.links.subreddit_url,
//     //     linkText: 'Community',
//     //   },
//     // ];
//   } catch (e) {
//     console.error('Failed to fetch coin data:', e);
//     error = 'Failed to load coin details. Please try again later.';
//   }

//   if (error) {
//     return <main className="p-10 text-red-500">{error}</main>;
//   }

//   if (!coinData) {
//     return <main className="p-10 text-gray-500">Loading...</main>;
//   }

//   return (
//     <main id="coin-details-page">
//       <section className="primary">
//         <h1 className="text-3xl font-bold">{coinData.name}</h1>
//       </section>

//       <section className="secondary">
//         <h4>Coin Details</h4>
//         <ul className="details-grid">
//           {coinDetails.map(({ label, value, link, linkText }, index) => (
//             <li key={index}>
//               {label}: {value}
//               {link && (
//                 <a href={link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500">
//                   {linkText}
//                 </a>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </main>
//   );
// };

// export default page;

import React from 'react';
// import { fetcher, getPools } from '@/lib/coingecko.actions';
import Link from 'next/link';
import { fetcher } from '@/lib/coingeko.actions';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
// import LiveDataWrapper from '@/components/LiveDataWrapper';
// import Converter from '@/components/Converter';

const Page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  const [coinData, coinOHLCData] = await Promise.all([
    fetcher<CoinDetailsData>(`/coins/${id}`, {
      dex_pair_format: 'contract_address',
    }),
    fetcher<OHLCData>(`/coins/${id}/ohlc`, {
      vs_currency: 'usd',
      days: 1,
      interval: 'hourly',
      precision: 'full',
    }),
  ]);
  console.log(coinOHLCData);
  const platform = coinData.asset_platform_id
    ? coinData.detail_platforms?.[coinData.asset_platform_id]
    : null;
  console.log(platform);
  //const network = platform?.geckoterminal_url.split('/')[3] || null;
  //const contractAddress = platform?.contract_address || null;

  //const pool = await getPools(id, network, contractAddress);

  const coinDetails = [
    {
      label: 'Market Cap',
      value: formatCurrency(coinData.market_data.market_cap.usd),
    },
    {
      label: 'Market Cap Rank',
      value: `# ${coinData.market_cap_rank}`,
    },
    {
      label: 'Total Volume',
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      label: 'Website',
      value: '-',
      link: coinData.links.homepage[0],
      linkText: 'Homepage',
    },
    {
      label: 'Explorer',
      value: '-',
      link: coinData.links.blockchain_site[0],
      linkText: 'Explorer',
    },
    {
      label: 'Community',
      value: '-',
      link: coinData.links.subreddit_url,
      linkText: 'Community',
    },
  ];

  return (
    <main id="coin-details-page">
      <section className="primary">
        {/* <LiveDataWrapper coinId={id} poolId={pool.id} coin={coinData} coinOHLCData={coinOHLCData}>
          <h4>Exchange Listings</h4>
        </LiveDataWrapper> */}
      </section>

      <section className="secondary">
        {/* <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        /> */}

        <div className="details">
          <h4>Coin Details</h4>

          <ul className="details-grid">
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className={label}>{label}</p>

                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {linkText || label}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};
export default Page;
