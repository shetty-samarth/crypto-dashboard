import { fetcher } from '@/lib/coingeko.actions';
import { formatCurrency } from '@/lib/utils';

type PageProps = {
  params: {
    id: string;
  };
};

type CoinDetail = {
  label: string;
  value: string;
  link?: string;
  linkText?: string;
};

const page = async ({ params }: PageProps) => {
  const { id } = params;

  let coinData: CoinDetailsData | null = null;
  let coinDetails: CoinDetail[] = [];
  let error: string | null = null;

  try {
    coinData = await fetcher<CoinDetailsData>(`/coins/${id}`, {
      dex_pair_format: 'contract_address',
    });

    if (!coinData) {
      throw new Error('No coin data returned');
    }

    coinDetails = [
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
        link: coinData.links.homepage?.[0],
        linkText: 'Homepage',
      },
      {
        label: 'Explorer',
        value: '-',
        link: coinData.links.blockchain_site?.[0],
        linkText: 'Explorer',
      },
      {
        label: 'Community',
        value: '-',
        link: coinData.links.subreddit_url,
        linkText: 'Community',
      },
    ];
  } catch (e) {
    console.error('Failed to fetch coin data:', e);
    error = 'Failed to load coin details. Please try again later.';
  }

  if (error) {
    return <main className="p-10 text-red-500">{error}</main>;
  }

  if (!coinData) {
    return <main className="p-10 text-gray-500">Loading...</main>;
  }

  return (
    <main id="coin-details-page">
      <section className="primary">
        <h1 className="text-3xl font-bold">{coinData.name}</h1>
      </section>

      <section className="secondary">
        <h4>Coin Details</h4>
        <ul className="details-grid">
          {coinDetails.map((item) => (
            <li key={item.label}>
              {item.label}: {item.value}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default page;
