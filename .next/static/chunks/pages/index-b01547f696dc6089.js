(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(441)}])},8418:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(c){o=!0,i=c}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.default=void 0;var o,i=(o=n(7294))&&o.__esModule?o:{default:o},u=n(6273),a=n(387),c=n(7190);var l={};function f(e,t,n,r){if(e&&u.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[t+"%"+n+(o?"%"+o:"")]=!0}}var s=function(e){var t,n=!1!==e.prefetch,o=a.useRouter(),s=i.default.useMemo((function(){var t=r(u.resolveHref(o,e.href,!0),2),n=t[0],i=t[1];return{href:n,as:e.as?u.resolveHref(o,e.as):i||n}}),[o,e.href,e.as]),d=s.href,p=s.as,v=e.children,h=e.replace,y=e.shallow,b=e.scroll,m=e.locale;"string"===typeof v&&(v=i.default.createElement("a",null,v));var g=(t=i.default.Children.only(v))&&"object"===typeof t&&t.ref,x=r(c.useIntersection({rootMargin:"200px"}),2),w=x[0],C=x[1],E=i.default.useCallback((function(e){w(e),g&&("function"===typeof g?g(e):"object"===typeof g&&(g.current=e))}),[g,w]);i.default.useEffect((function(){var e=C&&n&&u.isLocalURL(d),t="undefined"!==typeof m?m:o&&o.locale,r=l[d+"%"+p+(t?"%"+t:"")];e&&!r&&f(o,d,p,{locale:t})}),[p,d,C,m,n,o]);var _={ref:E,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,i,a,c){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(n))&&(e.preventDefault(),null==a&&r.indexOf("#")>=0&&(a=!1),t[o?"replace":"push"](n,r,{shallow:i,locale:c,scroll:a}))}(e,o,d,p,h,y,b,m)},onMouseEnter:function(e){u.isLocalURL(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),f(o,d,p,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var k="undefined"!==typeof m?m:o&&o.locale,I=o&&o.isLocaleDomain&&u.getDomainLocale(p,k,o&&o.locales,o&&o.domainLocales);_.href=I||u.addBasePath(u.addLocale(p,k,o&&o.defaultLocale))}return i.default.cloneElement(t,_)};t.default=s},7190:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(c){o=!0,i=c}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!u,c=o.useRef(),l=r(o.useState(!1),2),f=l[0],s=l[1],d=o.useCallback((function(e){c.current&&(c.current(),c.current=void 0),n||f||e&&e.tagName&&(c.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=a.get(t);if(n)return n;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return a.set(t,n={id:t,observer:o,elements:r}),n}(n),o=r.id,i=r.observer,u=r.elements;return u.set(e,t),i.observe(e),function(){u.delete(e),i.unobserve(e),0===u.size&&(i.disconnect(),a.delete(o))}}(e,(function(e){return e&&s(e)}),{rootMargin:t}))}),[n,t,f]);return o.useEffect((function(){if(!u&&!f){var e=i.requestIdleCallback((function(){return s(!0)}));return function(){return i.cancelIdleCallback(e)}}}),[f]),[d,f]};var o=n(7294),i=n(9311),u="undefined"!==typeof IntersectionObserver;var a=new Map},441:function(e,t,n){"use strict";n.r(t);var r=n(5893),o=n(1955),i=n(1664),u=n(7294),a=n(1163);t.default=function(){var e=o.Z.get("token");return(0,u.useEffect)((function(){e&&a.default.push("/home/".concat(e))})),(0,r.jsx)(r.Fragment,{children:!e&&(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"mx-auto text-3xl items-center text-center py-10",children:"Make Awesome Portfolio"}),(0,r.jsx)(i.default,{href:"https://github.com/login/oauth/authorize?client_id=3e839812fb5e3a47b1f2&redirect_uri=http://localhost:5000/auth/callback&scope=repo%20user&response_type=code",children:(0,r.jsx)("button",{className:"mx-auto text-xl flex rounded-full items-center text-base focus:outline-none outline-none border-none font-poppins border pl-8 pr-8 py-2 font-semibold bg-green-500",children:"Login with Github"})})]})})}},1664:function(e,t,n){e.exports=n(8418)},1163:function(e,t,n){e.exports=n(387)},1955:function(e,t){"use strict";function n(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var r=function e(t,r){function o(e,o,i){if("undefined"!==typeof document){"number"===typeof(i=n({},r,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var u="";for(var a in i)i[a]&&(u+="; "+a,!0!==i[a]&&(u+="="+i[a].split(";")[0]));return document.cookie=e+"="+t.write(o,e)+u}}return Object.create({set:o,get:function(e){if("undefined"!==typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],r={},o=0;o<n.length;o++){var i=n[o].split("="),u=i.slice(1).join("=");try{var a=decodeURIComponent(i[0]);if(r[a]=t.read(u,a),e===a)break}catch(c){}}return e?r[e]:r}},remove:function(e,t){o(e,"",n({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,n({},this.attributes,t))},withConverter:function(t){return e(n({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});t.Z=r}},function(e){e.O(0,[774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);