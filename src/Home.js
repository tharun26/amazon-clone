import React from "react";
import "./Home.css";
import Product from "./Product.js";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <Carousel
          showArrows={false}
          showThumbs={false}
          swipeable={false}
          autoPlay={true}
          showStatus={false}
          infiniteLoop={true}
          interval={5000}
        >
          <div>
            <img
              className="home__image"
              src="https://m.media-amazon.com/images/I/81as-JqGwYL._SX3000_.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="home__image"
              src="https://m.media-amazon.com/images/I/61EYPlaji4L._SX3000_.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="home__image"
              src="https://m.media-amazon.com/images/I/91YWi5LZ8eL._SX3000_.jpg"
              alt=""
            />
          </div>
        </Carousel>
      </div>
      <div className="home__row">
        <Product
          id={1}
          title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
          price={29.99}
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
          rating={5}
        />
        <Product
          id={2}
          title="Kenwood KMC011 5 Quart Chef Titanium Kitchen Machine, Stainless Steel"
          price={549.99}
          image="https://m.media-amazon.com/images/I/71kj5nomj0L._AC_UY218_.jpg 1x, https://m.media-amazon.com/images/I/71kj5nomj0L._AC_UY327_FMwebp_QL65_.jpg 1.5x, https://m.media-amazon.com/images/I/71kj5nomj0L._AC_UY436_FMwebp_QL65_.jpg 2x, https://m.media-amazon.com/images/I/71kj5nomj0L._AC_UY545_FMwebp_QL65_.jpg 2.5x, https://m.media-amazon.com/images/I/71kj5nomj0L._AC_UY654_FMwebp_QL65_.jpg"
          rating={4}
        />
      </div>
      <div className="home__row">
        <Product
          id={3}
          title="Echo (4th Gen) | With premium sound, smart home hub, and Alexa | Twilight Blue"
          price={549.99}
          image="https://m.media-amazon.com/images/I/71yEX4ugtJL._AC_UY218_.jpg 1x, https://m.media-amazon.com/images/I/71yEX4ugtJL._AC_UY327_FMwebp_QL65_.jpg 1.5x, https://m.media-amazon.com/images/I/71yEX4ugtJL._AC_UY436_FMwebp_QL65_.jpg 2x, https://m.media-amazon.com/images/I/71yEX4ugtJL._AC_UY545_FMwebp_QL65_.jpg 2.5x, https://m.media-amazon.com/images/I/71yEX4ugtJL._AC_UY654_FMwebp_QL65_.jpg"
          rating={4}
        />
        <Product
          id={4}
          title="SAMSUNG LC49RG90SSNXZA 49-Inch CRG9 Curved Gaming Monitor, Black, QHD, 120Hz"
          price={549.99}
          image="https://m.media-amazon.com/images/I/71916r38cNL._AC_UY545_FMwebp_QL65_.jpg 2.5x, https://m.media-amazon.com/images/I/71916r38cNL._AC_UY654_FMwebp_QL65_.jpg"
          rating={4}
        />
        <Product
          id={5}
          title="Apple iPad Pro 12.9-inch, Wi-Fi, 3rd Generation 64GB - Space Gray(Renewed)"
          price={746}
          image="https://m.media-amazon.com/images/I/61DsXT1ldtL._AC_UY654_FMwebp_QL65_.jpg"
          rating={5}
        />
      </div>
      <div className="home__row">
        <Product
          id={6}
          title="Acer Predator X38 Pbmiphzx 2300R Curved 37.5 UltraWide QHD+ (3840 x 1600) Gaming Monitor | NVI"
          price={746}
          image="https://m.media-amazon.com/images/I/714b7UD3yKL._AC_UY545_FMwebp_QL65_.jpg 2.5x, https://m.media-amazon.com/images/I/714b7UD3yKL._AC_UY654_FMwebp_QL65_.jpg"
          rating={5}
        />
      </div>
    </div>
  );
}

export default Home;
