import React from "react";
import doodad from "./doodad";

export default function randomDoodad() {
  
    const rd = doodad[Math.floor(Math.random() * doodad.length)];
     
    return rd;
}
