import React from 'react';
import "./css/Home.css"

const HeroSection = () => {
  return (
    <section className="hero fullDiv">
      <div className="hero__img">
        <img className="fullImg" style={{ filter: 'brightness(30%)', height: '450px' }} src="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg" alt="family gathered over a table eating food" />
        <div className="hero__text">
          <h2 className="crate-bold headline-large cmsWhite">
            To help people love how they
            <br /> live in moments that matter.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
