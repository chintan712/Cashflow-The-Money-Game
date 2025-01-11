import React from "react";
import profession from "./professions";

export default function randomProfession() {
  
    const Prof =
      profession[Math.floor(Math.random() * profession.length)];
     
    return Prof;
}
