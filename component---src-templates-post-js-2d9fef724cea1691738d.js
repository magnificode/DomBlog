(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{140:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return i});var l=a(0),n=a.n(l),r=a(155),c=a(152);t.default=function(e){var t=e.data.markdownRemark;return n.a.createElement(c.a,null,n.a.createElement(r.Helmet,null,n.a.createElement("title",null,t.fields.title)),n.a.createElement("article",{className:"pv5 post"},n.a.createElement("header",{className:"bg-parent sans-serif"},n.a.createElement("div",{className:"mw9 center pa4 pt5-ns ph7-l"},n.a.createElement("time",{className:"date f6 mb2 dib ttu tracked"},n.a.createElement("small",null,t.fields.date)),n.a.createElement("h3",{className:"f2 f1-m f-headline-l measure-narrow lh-title mv0"},n.a.createElement("span",{className:"bg lh-copy color-font pv1 ph3 tracked-tight"},t.fields.title)))),n.a.createElement("div",{className:"bg pa4 ph7-l georgia mw9-l center f5 f3-ns lh-copy measure georgia"},n.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}))))};var i="2997076459"},147:function(e,t,a){var l;e.exports=(l=a(151))&&l.default||l},148:function(e,t,a){"use strict";a.d(t,"b",function(){return i}),a.d(t,"c",function(){return c}),a.d(t,"a",function(){return r});a(32);var l=a(0),n=a.n(l),r=Object(l.createContext)({dark:!1,themeToggle:function(){}}),c=function(){return Object(l.useContext)(r)},i=function(e){var t=e.children,a=function(){var e=Object(l.useState)({dark:!1,hasThemeLoaded:!1}),t=e[0],a=e[1];return Object(l.useEffect)(function(){var e="true"===localStorage.getItem("darkTheme");a(Object.assign({},t,{dark:e,hasThemeLoaded:!0}))},[]),[t,a]}(),c=a[0],i=a[1];if(!c.hasThemeLoaded)return n.a.createElement("div",null);return n.a.createElement(r.Provider,{value:{dark:c.dark,themeToggle:function(){var e=!c.dark;localStorage.setItem("darkTheme",e),i(Object.assign({},c,{dark:e}))}}},t)}},149:function(e,t,a){"use strict";var l=a(0),n=a.n(l);t.a=function(e){var t=e.width;return n.a.createElement("svg",{width:t,viewBox:"-255 347 100 100"},n.a.createElement("path",{fill:"#221F1F",d:"M-174.8 363l-60.5.1v21.8s.1 19.7.9 22.6c.6 3.6 2 7.1 4.5 9.2l.4-2.8s4.5 10.9 11.5 14.2l-1-3.6s3.5 7.3 11.5 9.7l-.5-1.9s3.8 1.7 2.8 3.8c-1 2 3.5-1.1 3.8-3.9l.5 1.9s7.3-5.4 9.6-10.1c0 0 0 2.5-1.3 3.8 0 0 11.5-7.5 11.5-14.9 0 0 .5 1.8 0 3 0 0 2.5-3.2 4.1-7.8 0-.1.1-.2.1-.2.1-.2.2-.5.3-.9.3-1.1.6-2.4.7-3.6.8-4.5 1.2-17.7 1.2-17.7V363z"}),n.a.createElement("path",{fill:"#fff",d:"M-198.3 371.9c-2.2.5-4.6 1.1-6.9 1-1.3 0-2.6-.4-3.8-.6-8.1-1.9-15.3-2.6-24.3-.5l.6 3.8c.6 0 1.5.2 1.5 1.3.3 8.6 2.6 12.7 10.7 12.5 10.1-.3 12.7-8.3 13.3-11.4.3-1.6 1.1-1.8 2.1-1.8 1.7 0 1.9 1.2 2.2 1.9 3.5 8.7 5.5 10.7 12.8 11.4 11 1 9.8-7.2 11.3-12 .3-.9.6-1.4 1.6-1.4l.5-3.8c-6.4-1.5-13.1-2.6-21.6-.4zm-32.2 2.3c-.8 0-1.4-.2-1.4-.4s.6-.4 1.4-.4c.8 0 1.4.2 1.4.4.1.2-.6.4-1.4.4zm20.4 5.8c-1.5 4.6-4 7.9-10.2 8-6.2 0-7.9-1.1-8.8-8.3 0-4.8-.3-7.6 8.8-7.6 6.3.6 12.7.5 10.2 7.9zm29.2-.3c-.8 7.2-2.6 8.3-8.8 8.3-6.2-.2-8.6-3.5-10.2-8-2.5-7.3 4-7.3 10.1-7.9 9.2 0 8.9 2.8 8.9 7.6zm1.5-5.2c-.8 0-1.4-.2-1.4-.4s.6-.4 1.4-.4c.8 0 1.4.2 1.4.4.1.3-.6.4-1.4.4z"}),n.a.createElement("path",{fill:"#fff",d:"M-198.2 373.6l-2 2c0 .1-.1.2-.1.4l2.5-2.5c-.1-.1-.2 0-.4.1zM-193.7 372.5l-6.5 6.5v.2l6.7-6.7h-.2zM-189.7 372.1h-.2l-9.4 9.4c0 .1 0 .1.1.2l9.5-9.6zM-187.7 373.5l1.3-1.3h-.2l-1.2 1.2-10.3 10.3.1.1 10.3-10.3zM-183.7 372.9c-.1 0-.1 0-.2-.1l-12.8 12.8.1.1 8.8-8.8 4.1-4zM-182.5 375.1l.8-.8-.1-.1-12.8 12.8c.1 0 .1.1.2.1l6.7-6.7 5.2-5.3zM-182.2 378.2l1.2-1.2v-.2l-.1.1-11 11h.2l4.1-4.1 5.6-5.6zM-188.9 388h.2l.9-.9 5.8-5.8.9-.9v-.3l-.1.1-7.7 7.8zM-184.6 387.3l2.5-2.5c.1-.1.1-.3.2-.4l-3 3c.1 0 .2 0 .3-.1zM-195.7 372.8l-4.7 4.7v.2l5-5c-.1 0-.2.1-.3.1zM-191.8 372.3l-8 8c0 .1 0 .1.1.2l8.2-8.2h-.3zM-188.9 373l.8-.8h-.2l-.7.7-9.8 9.8c0 .1.1.1.1.2l9.8-9.9zM-185 372.5h-.2l-12.2 12.2.1.1 8.5-8.5 3.8-3.8zM-183.6 374.5l1.1-1.1-.1-.1-13 13 .1.1 6.7-6.7 5.2-5.2zM-183.3 377.6l1.3-1.3.9-.9c0-.1 0-.1-.1-.2l-.9.9-11.2 11.2c.1 0 .1 0 .2.1l4.3-4.3 5.5-5.5zM-183 380.7l1-1 1.2-1.2v-.2l-1.3 1.3-8.3 8.3h.2l1.5-1.5 5.7-5.7zM-187.1 387.9h.3l4-4 .7-.7.7-.7c0-.1 0-.2.1-.3l-.9.9-4.9 4.8zM-211.7 373.5l2 2c.1.1.1.2.1.4l-2.6-2.6c.2.1.3.2.5.2zM-216.3 372.4l6.6 6.6v.2l-6.8-6.8h.2zM-220.3 372h.2l9.5 9.5c0 .1 0 .1-.1.2l-9.6-9.7c0 .1 0 0 0 0zM-222.3 373.5l-1.3-1.3h.2l1.2 1.2 10.5 10.5-.1.1-10.5-10.5zM-226.4 372.8c.1 0 .1 0 .2-.1l12.9 12.9-.1.1-8.9-8.9-4.1-4zM-227.6 375.1l-.8-.8.1-.1 12.9 12.9c-.1 0-.1.1-.2.1l-6.8-6.8-5.2-5.3zM-227.9 378.2l-1.2-1.2v-.2l.1.1 11.1 11.1h-.2l-4.2-4.2-5.6-5.6zM-221.2 388.2h-.2l-.9-.9-5.9-5.9-.9-.9v-.3l.1.1 7.8 7.9zM-225.5 387.5l-2.5-2.5c-.1-.1-.1-.3-.2-.4l3.1 3.1c-.1-.1-.3-.1-.4-.2zM-214.2 372.7l4.8 4.8v.2l-5-5h.2zM-218.1 372.2l8.1 8.1c0 .1 0 .1-.1.2l-8.3-8.3h.3zM-221.2 372.9l-.8-.8h.2l.7.7 9.9 9.9c0 .1-.1.1-.1.2l-9.9-10zM-225.1 372.4h.2l12.4 12.4-.1.1-8.6-8.6-3.9-3.9zM-226.4 374.5l-1.1-1.1.1-.1 13.1 13.1-.1.1-6.8-6.8-5.2-5.2zM-226.8 377.6l-1.3-1.3-.9-.9c0-.1 0-.1.1-.2l.9.9 11.3 11.3c-.1 0-.1 0-.2.1l-4.4-4.4-5.5-5.5zM-227 380.8l-1-1-1.2-1.2v-.2l1.3 1.3 8.5 8.5h-.2l-1.5-1.5-5.9-5.9zM-222.9 388.1h-.3l-4.1-4.1-.7-.7-.8-.8c0-.1 0-.2-.1-.3l.9.9 5.1 5z"}),n.a.createElement("path",{d:"M-235.2 357.3h60.5v4.3h-60.5z"}),n.a.createElement("path",{fill:"#fff",d:"M-205.1 400.6s.1-2 1.5-2.9c1.4-.9 2.4-.3 2.8.7.4 1.1.3 4-.2 4.3-.6.4-3.8 1-4.1-.9v-1.2z"}),n.a.createElement("path",{fill:"#fff",d:"M-200.6 400.6s0-1.7 1.3-2.5 2.1-.3 2.5.6c.4.9.3 3.5-.2 3.8-.5.3-3.3.8-3.6-.8v-1.1z"}),n.a.createElement("path",{fill:"#fff",d:"M-196.8 401s0-1.4 1.3-2c1.3-.6 2.1-.2 2.5.5.4.7.3 2.8-.2 3.1-.5.3-3.3.7-3.6-.6v-1zM-213.4 400.6s.1-1.7 1.3-2.5c1.3-.8 2.1-.3 2.5.6.4.9.3 3.5-.2 3.8-.5.3-3.3.8-3.6-.8v-1.1z"}),n.a.createElement("path",{fill:"#fff",d:"M-217.2 401.1s.1-1.3 1.3-2c1.3-.6 2.1-.2 2.5.5.4.7.3 2.7-.2 3-.5.3-3.3.7-3.6-.6v-.9zM-205 400.6s-.1-2-1.5-2.9c-1.4-.9-2.4-.3-2.8.7-.4 1.1-.3 4 .2 4.3.6.4 3.8 1 4.1-.9v-1.2zM-206.4 407.5c.7 0 1.7-1.5 1.6-2.7-.1-1.2-1.1-1.4-1.9-1-.8.3-.8 1.2-.8 2 .2.7.3 1.6 1.1 1.7z"}),n.a.createElement("path",{fill:"#fff",d:"M-204.4 407.5c.7 0 1.7-1.5 1.6-2.7-.1-1.2-1.1-1.4-1.9-1-.8.3-.8 1.2-.8 2 .2.7.3 1.6 1.1 1.7z"}),n.a.createElement("path",{fill:"#fff",d:"M-201.9 407.4c.7 0 1.6-1.5 1.6-2.6-.1-1.1-1-1.3-1.8-1-.8.3-.8 1.1-.7 1.9s0 1.7.9 1.7z"}),n.a.createElement("path",{fill:"#fff",d:"M-199.9 407.4c.6 0 1.6-.8 1.5-2.4-.1-1.1-.6-1.2-1.7-.9-1.1.3-.8 1-.7 1.8.1.6.2 1.5.9 1.5z"}),n.a.createElement("path",{fill:"#fff",d:"M-197.9 407c.6 0 1.6-.7 1.5-2.2-.1-.9-.6-1.1-1.7-.8-1.1.3-.8.9-.7 1.6 0 .7.1 1.4.9 1.4zM-210.7 407.4c-.6 0-1.6-.8-1.5-2.4.1-1.1.6-1.2 1.7-.9 1.1.3.8 1 .7 1.8s-.1 1.4-.9 1.5z"}),n.a.createElement("path",{fill:"#fff",d:"M-213 406.9c-.6 0-1.6-.7-1.5-2.1.1-.9.6-1.1 1.7-.8 1.1.3.8.9.7 1.5-.1.7-.1 1.4-.9 1.4zM-208.9 407.4c.7 0 1.7-.4 1.6-2.6-.1-1.1-1-1.1-1.8-.8-.8.3-.8.9-.7 1.7 0 .8.1 1.7.9 1.7z"}))}},150:function(e,t,a){"use strict";var l=a(0),n=a.n(l),r=a(146),c=a.n(r),i=a(149),u=a(148);a(154);t.a=function(e){e.children;var t=Object(u.c)(),a=t.dark,l=t.themeToggle;return n.a.createElement("nav",{className:"primary-nav bg-parent db dt-l fixed w-100 border-box pa3 ph5-l"},n.a.createElement(c.a,{className:"db dtc-l v-mid link dim w-100 w-25-l tc tl-l mb2 mb0-l",to:"/",title:"Home"},n.a.createElement(i.a,{width:"30"})),n.a.createElement("div",{className:"db f6 dtc-l v-mid w-100 w-25-l tc ttu tr-l"},n.a.createElement("button",{className:"btn "+(a?"-light":"-dark"),onClick:function(){return l()}},a?"Light":"Dark"),n.a.createElement(c.a,{to:"/about",className:"link dim dib mr3"},"About"),n.a.createElement(c.a,{to:"/resume",className:"link dim dib"},"Résumé")))}},151:function(e,t,a){"use strict";a.r(t);a(32);var l=a(0),n=a.n(l),r=a(4),c=a.n(r),i=a(51),u=a(2),s=function(e){var t=e.location,a=u.default.getResourcesForPathnameSync(t.pathname);return n.a.createElement(i.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},t.default=s},152:function(e,t,a){"use strict";var l=a(0),n=a.n(l),r=a(150),c=a(148);t.a=function(e){var t=e.children;return n.a.createElement(c.b,null,n.a.createElement(c.a.Consumer,null,function(e){return n.a.createElement("div",{className:"wrapper "+(e.dark?"-dark":"-light")},n.a.createElement(r.a,null),t)}))}},153:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return h}),a.d(t,"StaticQueryContext",function(){return f}),a.d(t,"StaticQuery",function(){return m});var l=a(0),n=a.n(l),r=a(4),c=a.n(r),i=a(146),u=a.n(i);a.d(t,"Link",function(){return u.a}),a.d(t,"withPrefix",function(){return i.withPrefix}),a.d(t,"navigate",function(){return i.navigate}),a.d(t,"push",function(){return i.push}),a.d(t,"replace",function(){return i.replace}),a.d(t,"navigateTo",function(){return i.navigateTo});var s=a(147),d=a.n(s);a.d(t,"PageRenderer",function(){return d.a});var o=a(33);a.d(t,"parsePath",function(){return o.a});var f=n.a.createContext({}),m=function(e){return n.a.createElement(f.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):n.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:c.a.object,query:c.a.string.isRequired,render:c.a.func,children:c.a.func}}}]);
//# sourceMappingURL=component---src-templates-post-js-2d9fef724cea1691738d.js.map