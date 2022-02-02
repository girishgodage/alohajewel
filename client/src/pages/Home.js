import React, { useState } from "react";
import Background1 from "../assets/home/bg8.png";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";

import useWindowDimensions from "../hooks/useWindowDimensions";

import ring4 from "../assets/product/ring/1/4.jpg";
import bracelet4 from "../assets/product/bracelet/1/4.jpg";
import earing4 from "../assets/product/earring/1/4.jpg";
import NewArrival from "../components/App/NewArrival";
import slide1 from "../assets/product/slider/1.jpg";
import slide2 from "../assets/product/slider/2.jpg";
import slide3 from "../assets/product/slider/3.jpg";
import slide4 from "../assets/product/slider/4.jpg";
import slide5 from "../assets/product/slider/5.jpg";
import slide6 from "../assets/product/slider/6.jpg";
import slide7 from "../assets/product/slider/7.jpg";
import slide8 from "../assets/product/slider/8.jpg";
import slide9 from "../assets/product/slider/9.jpg";
import slide10 from "../assets/product/slider/10.jpg";

const images = [
  { url: slide1 },
  { url: slide2 },
  { url: slide3 },
  { url: slide4 },
  { url: slide5 },
  { url: slide6 },
  { url: slide7 },
  { url: slide8 },
  { url: slide9 },
  { url: slide10 },
];

export const Home = () => {
  const { height, width } = useWindowDimensions();

  console.log(height, width);

  return (
    <div>
      <div className="home">
        <div
          className="home_slider_background"
          // style={{ backgroundImage: `url(${Background1})` }}
        >
          <div>
            <SimpleImageSlider
              style={{
                margin: "0 auto",
                marginTop: "50px",
              }}
              width={width * 0.8}
              height={width * 0.5}
              images={images}
              showBullets={true}
              showNavs={true}
              loop={true}
              autoPlay={true}
              autoPlayDelay={2}
              startIndex={0}
              useGPURender={true}
              navStyle={1}
              navSize={50}
              navMargin={30}
              slideDuration={0.5}
            />
          </div>
        </div>

        <div className="home_slider_content">
          <div className="home_slider_content_inner">
            <div className="home_slider_subtitle">New Collection</div>
            <div className="home_slider_title">Where Love Begins</div>
          </div>

          <div className="btn_container">
            <Link to="/shop">
              <div className="btn">Shop now</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="promo">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container text-center">
                <div className="section_subtitle">only the best</div>
                <div className="section_title">Categories</div>
              </div>
            </div>
          </div>
          <div className="row promo_container">
            <div className="col-md-4 promo_col">
              <div className="promo_item">
                <div className="promo_image">
                  <img src={ring4} alt="" />
                </div>
                <div className="promo_link">
                  <Link to="/shop" name="ring">
                    Ring
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 promo_col">
              <div className="promo_item">
                <div className="promo_image">
                  <img src={bracelet4} alt="" />
                </div>
                <div className="promo_link">
                  <Link to="/shop" name="bracelet">
                    Bracelet
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 promo_col">
              <div className="promo_item">
                <div className="promo_image">
                  <img src={earing4} alt="" />
                </div>
                <div className="promo_link">
                  <Link to="/shop" name="earring">
                    Earring
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="arrivals">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container text-center">
                <div className="section_subtitle">only the best</div>
                <div className="section_title">new arrivals</div>
              </div>
            </div>
          </div>
          <NewArrival />

          <div className="testimonials">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="section_title_container text-center">
                    <div className="section_subtitle">only the best</div>
                    <div className="section_title">About Us</div>
                  </div>
                </div>
              </div>
              <div className="row test_slider_container">
                <div className="col">
                  <div className="owl-item">
                    <div className="test_text">
                      “Aloha Jewel focuses on creating the perfect demi-fine
                      jewellery for your everyday wardrobe. An integral part of
                      our designs is their ability to be worn alone or layered.
                      We embrace the need for versatility, interchangeable
                      pieces, mix & match studs, and collectable pendants and
                      charms; ultimately your jewellery should be a unique
                      expression of your individual style and express every
                      dimension of you.”
                    </div>
                    <div
                      className="test_content"
                      style={{ textAlign: "center" }}
                    >
                      <div className="test_name">Shaila & Sanjay Gawane</div>
                      <div className="test_title">Funders of Aloha Jewel </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
