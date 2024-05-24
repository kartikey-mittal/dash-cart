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
  productimg="https://m.media-amazon.com/images/I/712l62VZ0mL._AC_UF1000,1000_QL80_.jpg"
/>
    </>
  )
};

export default Test;
