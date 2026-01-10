'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY || '';

if (!API_KEY) {
  console.warn('Warning: COINGECKO_API_KEY is not set. API requests may be rate-limited.');
}

export async function fetcher<T>(
    endpoint: string,
    params?: QueryParams,
    revalidate= 60
): Promise<T> {

    const url = qs.stringifyUrl({
        url: `${BASE_URL}${endpoint}`,
        query: params
    }, {skipEmptyString: true, skipNull: true}); 

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'x-ch-pro-api-key': API_KEY
        } as Record<string, string>,    
        next: {revalidate}
    });

    if (!response.ok) {
        const errorData: CoinGeckoErrorBody = await response.json();
        throw new Error(`Error fetching data from CoinGecko: ${response.status} ${errorData.error} || ${response.statusText}`);
    }
    
    return response.json();
}