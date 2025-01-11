import React from "react";
import big_deal from "./BigDeal";

export default function randomBigDeal() {
    const bd = big_deal [Math.floor(Math.random() * big_deal.length)];
    return bd;
}