import React from "react"
import TestCard from "./TestCard";

const Test = () => {
  return (
    <>
      <TestCard
  productName="Example Product "
  productWeight="500g"
  originalPrice="₹ 10.00"
  discountedPrice="$8.00"
  showDropdown={1}
/>
    </>
  )
};

export default Test;
