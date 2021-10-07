"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[95944],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return f}});var n=r(67294);function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){p(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,p=function(e,t){if(null==e)return{};var r,n,p={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(p[r]=e[r]);return p}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(p[r]=e[r])}return p}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,p=e.mdxType,a=e.originalType,c=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),m=i(r),f=p,d=m["".concat(c,".").concat(f)]||m[f]||s[f]||a;return r?n.createElement(d,o(o({ref:t},l),{},{components:r})):n.createElement(d,o({ref:t},l))}));function f(e,t){var r=arguments,p=t&&t.mdxType;if("string"==typeof e||p){var a=r.length,o=new Array(a);o[0]=m;var u={};for(var c in t)hasOwnProperty.call(t,c)&&(u[c]=t[c]);u.originalType=e,u.mdxType="string"==typeof e?e:p,o[1]=u;for(var i=2;i<a;i++)o[i]=r[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},51914:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return u},contentTitle:function(){return c},metadata:function(){return i},toc:function(){return l},default:function(){return m}});var n=r(87462),p=r(63366),a=(r(67294),r(3905)),o=["components"],u={},c=void 0,i={unversionedId:"puppeteer.page.focus",id:"puppeteer.page.focus",isDocsHomePage:!1,title:"puppeteer.page.focus",description:"Home &gt; puppeteer &gt; Page &gt; focus",source:"@site/docs/puppeteer.page.focus.md",sourceDirName:".",slug:"/puppeteer.page.focus",permalink:"/puppeteer/docs/next/puppeteer.page.focus",editUrl:"https://github.com/facebook/puppeteer/edit/main/website/docs/puppeteer.page.focus.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"puppeteer.page.exposefunction",permalink:"/puppeteer/docs/next/puppeteer.page.exposefunction"},next:{title:"puppeteer.page.frames",permalink:"/puppeteer/docs/next/puppeteer.page.frames"}},l=[{value:"Page.focus() method",id:"pagefocus-method",children:[]},{value:"Parameters",id:"parameters",children:[]},{value:"Remarks",id:"remarks",children:[]}],s={toc:l};function m(e){var t=e.components,r=(0,p.Z)(e,o);return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/puppeteer/docs/next/index"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/puppeteer/docs/next/puppeteer"},"puppeteer")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/puppeteer/docs/next/puppeteer.page"},"Page")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/puppeteer/docs/next/puppeteer.page.focus"},"focus")),(0,a.kt)("h2",{id:"pagefocus-method"},"Page.focus() method"),(0,a.kt)("p",null,"This method fetches an element with ",(0,a.kt)("inlineCode",{parentName:"p"},"selector")," and focuses it. If there's no element matching ",(0,a.kt)("inlineCode",{parentName:"p"},"selector"),", the method throws an error."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"focus(selector: string): Promise<void>;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"selector"),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"A ",(0,a.kt)("a",{parentName:"td",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors"},"selector")," of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.")))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"Promise","<","void",">"),(0,a.kt)("p",null,"Promise which resolves when the element matching selector is successfully focused. The promise will be rejected if there is no element matching selector."),(0,a.kt)("h2",{id:"remarks"},"Remarks"),(0,a.kt)("p",null,"Shortcut for ",(0,a.kt)("a",{parentName:"p",href:"/puppeteer/docs/next/puppeteer.frame.focus"},"page.mainFrame().focus(selector)"),"."))}m.isMDXComponent=!0}}]);