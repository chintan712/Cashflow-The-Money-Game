import React from "react";
import market_card from "./MarketCard";

export default function randomMarketCard() {
    const mc = market_card [Math.floor(Math.random() * market_card.length)];
    return mc;
}