import React from 'react';
import SEO from '../components/SEO';
import Wrapper from '../templates/wrapper';

export default () => (
  <Wrapper>
    <SEO title="Resume" />
    <section className="cf pv6 ph4 pa5-l bt mw9 center mw9-l f5 f3-ns lh-copy measure avenir">
      <div className="resume__inner">
        <div className="resume__section resume__section--head">
          <div className="resume__title">
            <h1>Dominic Magnifico</h1>
            <h3>Front End Developer</h3>
          </div>
          <div className="resume__address">
            <p>Denver, CO 80210</p>
            <p>Email: hello@dommagnifi.co</p>
          </div>
        </div>
        <div className="resume__section">
          <div className="resume__subhead">
            <h2>Objective</h2>
          </div>
          <div className="resume__description">
            <p>To utilize the beauty that is well organized, clever and standards compliant code in order to produce cutting edge UI and UX interactions.</p>
          </div>
        </div>
        <div className="resume__section">
          <div className="resume__subhead">
            <h2>Experience</h2>
          </div>
          <div className="resume__description job-grid">
            <div className="resume__job">
              <div className="resume__job-title">
                <h3>Founder</h3>
                <hr />
                <p><strong><em>House of Giants</em></strong></p>
                <p><em>October 2019 - Present</em></p>
              </div>
            </div>
            <div className="resume__job">
              <div className="resume__job-title">
                <h3>Lead Front-End Engineer</h3>
                <hr />
                <p><strong><em>10up</em></strong></p>
                <p><em>September 2015 - September 2019</em></p>
              </div>
            </div>
            <div className="resume__job">
              <div className="resume__job-title">
                <h3>Senior Developer</h3>
                <hr />
                <p><strong><em>Zenman</em></strong></p>
                <p><em>January 2012 - September 2015</em></p>
              </div>
              <ul>
                <li>Development team lead.</li>
                <li>Worked to implement numerous processes in order to streamline and increase the quality of code that the development team produces.</li>
                <li>Produce high quality work through use of tools like WordPress to provide clients an easy to manage custom website.</li>
                <li>Work closely with clients to better understand their needs in addition to their users' needs.</li>
                <li>Utilize analytics and other data to make informed UI and UX decisions.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="resume__section">
          <div className="resume__subhead">
            <h2>Skills</h2>
          </div>
          <div className="resume__description">
            <ul className="resume__skills">
              <li>HTML</li>
              <li>CSS / PostCSS / SASS</li>
              <li>React</li>
              <li>WordPress</li>
            </ul>
            <ul className="resume__skills">
              <li>JavaScript (ES5/6)</li>
              <li>GraphQL</li>
              <li>PHP</li>
              <li>Grunt / Gulp</li>
            </ul>
            <ul className="resume__skills">
              <li>Git</li>
              <li>UI/UX</li>
              <li>Responsive Design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Wrapper>
)