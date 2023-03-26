import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
const ToogleCategory = (props) => {
  const key = props.cat;
  return (
    <div>
      <ToggleButton
        value="all"
        style={{ backgroundColor: props.cat === "all" && "gray" }}
      >
        ALL
      </ToggleButton>
      {props.category.map((cat, index) => {
        return (
          <ToggleButton
            key={index}
            value={cat.toLowerCase()}
            style={{
              backgroundColor: props.cat === cat.toLowerCase() && "gray",
            }}
          >
            {cat.toUpperCase()}
          </ToggleButton>
        );
      })}
    </div>
  );
};
export default ToogleCategory;
