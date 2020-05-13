import React from 'react'
import SEO from '../components/SEO';
import Wrapper from '../templates/wrapper';

export default () => (
  <Wrapper>
    <SEO title="404" />
    <article className="cf pv6 ph4 pa5-l bt mw9 center min-vh-100">
      <header className="pv3 f2-ns db lh-copy serif fw1 mv0 measure center">
        <h1 className="fw6 f1 fl w-100 mt0 mb3 sans-serif">Page Not Found!</h1>
        <p className="bakersville f5 f4-m f3-l">The page your requested cannot be found!</p>
      </header>
    </article>
  </Wrapper>
)
