import React from 'react';
import "./css/Home.css"


const AboutSection = () => {
  return (
    <section className="about-crate fullDiv" style={{ fontSize: '14px', fontFamily: 'Raleway' }}>
      <div className="about-crate__left-block crate-helvetica-roman">
        <div className="about-crate__header">
          <h2 className="cmsBlack crate-bold copy-sub">About Crate</h2>
          <p className="crate-helvetica-roman copy-sub" style={{ padding: '2% 0 1%' }}>
            We curate inspiration for the home, connecting the creative work
            <br /> of artisans and designers to people and places around the world.
          </p>
        </div>
        <div style={{ display: 'flex', width: '100%', marginBottom: '10%' }}>
          <div style={{ paddingRight: '3%', width: '50%' }}>
            <p className="crate-helvetica-roman copy-gr">
              Crate and Barrel Holdings is a member of the <a href="/about-otto-group">Otto Group</a> and employs 7,500 associates across Crate and Barrel and
              CB2. With over 100 stores and franchise partners in 9 countries, we are an international destination for contemporary
              and modern furniture, housewares and decor that help people Welcome Life In.
            </p>
            <p className="crate-helvetica-roman copy-gr">Our lifestyle brands offer inspired living through high-quality products, exclusive designs, and</p>
          </div>
          <div style={{ width: '50%' }}>
            <p className="crate-helvetica-roman copy-gr">
              timeless style - all powered by digital design and visualization tools that provide seamless shopping solutions
              in-store and online.
            </p>
            <p className="crate-helvetica-roman copy-gr">
              With a distinct architectural aesthetic, experiential store environment, and online community, we engage with our
              customers through social media, mobile shopping, design services, gift registry, and more.
            </p>
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
      <div className="about-crate__right-block ">
        <div className="text-container crate-helvetica-roman ">
          <div style={{ marginBottom: '5%' }}>
            <p className="copy-sub crate-bold " style={{ marginBottom: '0' }}>Media Inquiries</p>
            <p className="crate-helvetica-roman copy-gr ">
              For all press and partnership inquiries, contact
              <strong>
                <a href="mailto:Kafka@gmail.com"> Kafka@gmail.com</a>
              </strong>
            </p>
          </div>
          <div>
            <p className="copy-sub crate-bold " style={{ marginBottom: '0' }}>Contact Center</p>
            <p className="crate-helvetica-roman copy-gr ">
              For questions and comments regarding your order or shopping experience, contact us through
              <strong>
                <a href="/customer-service/">Customer Service.</a>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
