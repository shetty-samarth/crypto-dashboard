import { useEffect, useRef, useState } from "react";

export const useCoinGekoWebsocket = ({coinId, poolId, liveInterval}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
    const wsRef = useRef<WebSocket | null>(null);
    const subscribed = useRef<Set<string>>(new Set());

    const [price, setPrice] = useState<ExtendedPriceData | null>(null);
    const [trade, setTrade] = useState<Trade[]>([]);
}   