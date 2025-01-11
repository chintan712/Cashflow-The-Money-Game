import React from "react";
import small_deal from "./small_deals";

export default function randomSmallDeal() {
    const sd = small_deal [Math.floor(Math.random() * small_deal.length)];
    return sd;
}