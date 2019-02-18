import React from 'react';
import Header from '../components/Header';

export default () => (
  <div className="work">
    <Header />
    <section className="work__items">
      <div className="work__inner">
        <article className="work__item">
          <div className="work__image">
            <img src="./static/images/work/industry.jpg" alt="Industry Website Screenshot." />
          </div>
          <div className="work__deets">
            <h2>Industry Denver</h2>
            <h6>Role: Lead Dev.</h6>
            <p>Employed newer cutting edge CSS3 tactics for things like the angled bit towards the top and the navigation. Utilized custom post types to allow for easy management of tenants and their individual pages. Empowered the client to be able to feature and manage events and empower users on desktop and mobile to make it easier to find companies within Industry.</p>
            <a href="http://www.industrydenver.com" target="_blank" rel="noopener noreferrer" className="btn">See the site.</a>
          </div>
        </article>
        <article className="work__item">
          <div className="work__image">
            <img src="./static/images/work/soco.jpg" alt="Speical Olympics Colorado Website Screenshot." />
          </div>
          <div className="work__deets">
            <h2>Special Olympics of Colorado</h2>
            <h6>Role: Lead Dev.</h6>
            <p>Established a robust event calendar through WordPress and The Events Calendar plugin. Provided the client an easier way to manage events and update pages through the use of Advanced Custom Fields. Through simple main navigation and specific calls to action, we were able to provide the user with a more concise and efficient way to find information.</p>
            <a href="http://www.specialolympicsco.org" target="_blank" rel="noopener noreferrer" className="btn">See the site.</a>
          </div>
        </article>
        <article className="work__item">
          <div className="work__image">
            <img src="./static/images/work/imagebrew.jpg" alt="Industry Website Screenshot." />
          </div>
          <div className="work__deets">
            <h2>Imagebrew</h2>
            <h6>Role: Lead Dev.</h6>
            <p>Utilizing the client's awesome work as the focal point, we were able to provide a slick looking way to showcase their work. Through the Vimeo API we were able to automatically pull titles, descriptions and video embeds directly into the site. All the client had to do was add a vimeo ID to the WordPress backend. This also gave the user the opportunity to immediately see what the cleint had to offer through the imagery and video content.</p>
            <a href="http://www.imagebrew.com" target="_blank" rel="noopener noreferrer" className="btn">See the site.</a>
          </div>
        </article>
        <article className="work__item">
          <div className="work__image">
            <img src="./static/images/work/joe-arch.jpg" alt="Industry Website Screenshot." />
          </div>
          <div className="work__deets">
            <h2>Joe Architect</h2>
            <h6>Role: Lead Dev.</h6>
            <p>With the help of Isotope.js we were able to provide the client with an elegant way to categorize and showcase their work. With WordPress' Sticky Post functionality we were able to give the client the opportunity to select specific works and feature them separately. By utilizing SVG maps we were able to help users from all around the world see that the client took work near them, giving the site more exposure globally.</p>
            <a href="http://www.joearchitect.com" target="_blank" rel="noopener noreferrer" className="btn">See the site.</a>
          </div>
        </article>
        <article className="work__item">
          <div className="work__image">
            <img src="./static/images/work/coin.jpg" alt="Industry Website Screenshot." />
          </div>
          <div className="work__deets">
            <h2>Colorado Innovation Network</h2>
            <h6>Role: Lead Dev.</h6>
            <p>Three years ago when the site was built, the Colorado Innovation Network was looking for an (obviously) innovative website. With responsive web in its earlier stages, we were able to provide the client a cutting edge responsive website with a WordPress backend. Users were able to see agendas and speakers for upcoming summits, complete with a countdown timer to the next summit.</p>
          </div>
        </article>
        <p className="aligncenter">Don't forget to check out <a href="http://codepen.io/magnificode/">my codepen</a> for more examples of my dev chops!</p>
      </div>
    </section>
  </div>
)