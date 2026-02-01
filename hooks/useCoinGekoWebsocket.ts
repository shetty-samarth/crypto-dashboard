import { use, useEffect, useRef, useState } from "react";
//Need paid plan to access WebSocket API
const WS_BASE_URL = `${process.env.NEXT_PUBLIC_COINGECKO_WS_URL}?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`;

export const useCoinGekoWebsocket = ({coinId, poolId, liveInterval}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
    const wsRef = useRef<WebSocket | null>(null);
    const subscribed = useRef<Set<string>>(new Set());

    const [price, setPrice] = useState<ExtendedPriceData | null>(null);
    const [trade, setTrade] = useState<Trade[]>([]);
    const [ohlcv, setOhlcv] = useState<OHLCData | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {}, [coinId, poolId, liveInterval]);

    return {
        price,
        trades: trade,
        ohlcv,
        isConnected,
    };
}   