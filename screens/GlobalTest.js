import React from "react"
import GlobalSearchCard from "../components/test/GlobalSearchCard";
import { View } from "react-native";

const GlobalTest = () => {
  return (
    <>
    <View style={{height:100}}>

    </View>
      <GlobalSearchCard
  productName="Doritos Tortilla Chips, "
  productWeight="311.8 gm"
  originalPrice="₹ 10.00"
  discountedPrice="₹ 8.00"
  showDropdown={1}
  productimg="https://m.media-amazon.com/images/I/81nfmUmU2qL.jpg"
  shopname="Blinkit"
  waitingbar={40}
/>
<GlobalSearchCard
  productName="Maggi 2 Minute Noodles "
  productWeight="50g"
  originalPrice="₹ 14.00"
  discountedPrice="₹ 13.00"
  showDropdown={1}
  productimg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08p6zP416vHRmVLcPxRdPER8RAMmB2DsmNgQ6BLCuRQ&"
  shopname="Zepto"
  waitingbar={80}
/>
<GlobalSearchCard
  productName="Apple iPhone 13 Pro Max"
  productWeight="256GB"
  originalPrice="₹ 1,54429"
  discountedPrice="₹ 1,1455339"
  showDropdown={1}
  productimg="https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_GEO_09142021_inline.jpg.slideshow-large_2x.jpg"
  shopname="Swiggy"
  waitingbar={20}
/>
<GlobalSearchCard
  productName="Whole Wheat Flour"
  productWeight="5 kg"
  originalPrice="₹ 250.00"
  discountedPrice="₹ 220.00"
  showDropdown={1}
  productimg="https://static.toiimg.com/photo/63797959.cms"
  shopname="BigBasket"
  waitingbar={50}
/>
    </>
  )
};

export default GlobalTest;
