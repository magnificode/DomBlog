import React, { Component } from "react"
import PropTypes from "prop-types"
import favicon from '../static/favicon.png';
import "tachyons";

export default class HTML extends Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-43739046-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-43739046-1');
        </script>

          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" type="image/png" href={favicon} />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes} className={`sans-serif`}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
