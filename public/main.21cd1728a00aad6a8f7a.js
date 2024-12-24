/*! For license information please see main.21cd1728a00aad6a8f7a.js.LICENSE.txt */
(()=>{"use strict";var t,e,r,n={5022:(t,e,r)=>{var n=r(2746),o=r(3109),i=(r(7573),r(2288)),a=r(2416),c=r(1784),s=r(7069),u=r(6641),l=(r(6569),r(6348),r(1564)),f={class:"toast-container position-fixed bottom-0 start-50 translate-middle-x p-3"},h={class:"toast-header"},d={class:"me-auto"},p={class:"toast-body text-white"};const v={__name:"NotificationSnackbar",setup:function(t){var e=(0,l.i)();return(0,i.wB)((function(){return e.show}),(function(t){t&&e.timeout>0&&setTimeout((function(){e.clearNotification()}),e.timeout)})),function(t,r){return(0,i.uX)(),(0,i.CE)("div",f,[(0,a.R1)(e).show?((0,i.uX)(),(0,i.CE)("div",{key:0,class:(0,c.C4)(["toast show",{"bg-success":"success"===(0,a.R1)(e).type,"bg-danger":"error"===(0,a.R1)(e).type,"bg-warning":"warning"===(0,a.R1)(e).type,"bg-info":"info"===(0,a.R1)(e).type}]),role:"alert","aria-live":"assertive","aria-atomic":"true"},[(0,i.Lk)("div",h,[(0,i.Lk)("i",{class:(0,c.C4)(["bi me-2",{"bi-check-circle-fill text-success":"success"===(0,a.R1)(e).type,"bi-x-circle-fill text-danger":"error"===(0,a.R1)(e).type,"bi-exclamation-triangle-fill text-warning":"warning"===(0,a.R1)(e).type,"bi-info-circle-fill text-info":"info"===(0,a.R1)(e).type}])},null,2),(0,i.Lk)("strong",d,(0,c.v_)((0,a.R1)(e).type.charAt(0).toUpperCase()+(0,a.R1)(e).type.slice(1)),1),(0,i.Lk)("button",{type:"button",class:"btn-close",onClick:r[0]||(r[0]=function(){var t;return(0,a.R1)(e).clearNotification&&(t=(0,a.R1)(e)).clearNotification.apply(t,arguments)}),"aria-label":"Close"})]),(0,i.Lk)("div",p,(0,c.v_)((0,a.R1)(e).message),1)],2)):(0,i.Q3)("",!0)])}}},m=(0,r(7433).A)(v,[["__scopeId","data-v-d4d0b338"]]);var y={class:"min-vh-100 d-flex flex-column"},g={class:"navbar navbar-expand-lg navbar-dark bg-primary"},b={class:"container-fluid"},w={class:"collapse navbar-collapse",id:"navbarNav"},k={class:"navbar-nav ms-auto"},L={class:"nav-item"},x={class:"nav-item"},E={class:"nav-item"},_={key:1,class:"nav-item"},N={class:"flex-grow-1"},O={class:"bg-light py-3 mt-auto"},A={class:"container text-center"},C={class:"text-muted"};const j={__name:"App",setup:function(t){var e=(0,u.n)(),r=(0,s.rd)(),o=function(){e.logout(),r.push("/")};return(0,i.sV)((function(){e.initAuth()})),function(t,r){var u=(0,i.g2)("router-link");return(0,i.uX)(),(0,i.CE)("div",y,[(0,i.Lk)("nav",g,[(0,i.Lk)("div",b,[r[4]||(r[4]=(0,i.Lk)("a",{class:"navbar-brand",href:"#"},[(0,i.Lk)("i",{class:"bi bi-calendar-event me-2"}),(0,i.eW)(" Termin-Buchungssystem ")],-1)),r[5]||(r[5]=(0,i.Lk)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav"},[(0,i.Lk)("span",{class:"navbar-toggler-icon"})],-1)),(0,i.Lk)("div",w,[(0,i.Lk)("ul",k,[(0,i.Lk)("li",L,[(0,i.bF)(u,{class:"nav-link",to:"/"},{default:(0,i.k6)((function(){return r[0]||(r[0]=[(0,i.Lk)("i",{class:"bi bi-house-door me-1"},null,-1),(0,i.eW)(" Home ")])})),_:1})]),(0,a.R1)(e).isAuthenticated?((0,i.uX)(),(0,i.CE)(i.FK,{key:0},[(0,i.Lk)("li",x,[(0,i.bF)(u,{class:"nav-link",to:"/admin"},{default:(0,i.k6)((function(){return r[1]||(r[1]=[(0,i.Lk)("i",{class:"bi bi-calendar-plus me-1"},null,-1),(0,i.eW)(" Admin ")])})),_:1})]),(0,i.Lk)("li",E,[(0,i.Lk)("a",{class:"nav-link",href:"#",onClick:(0,n.D$)(o,["prevent"])},r[2]||(r[2]=[(0,i.Lk)("i",{class:"bi bi-box-arrow-right me-1"},null,-1),(0,i.eW)(" Logout ")]))])],64)):((0,i.uX)(),(0,i.CE)("li",_,[(0,i.bF)(u,{class:"nav-link",to:"/login"},{default:(0,i.k6)((function(){return r[3]||(r[3]=[(0,i.Lk)("i",{class:"bi bi-box-arrow-in-right me-1"},null,-1),(0,i.eW)(" Login ")])})),_:1})]))])])])]),(0,i.Lk)("main",N,[(0,i.bF)((0,a.R1)(s.Tp))]),(0,i.Lk)("footer",O,[(0,i.Lk)("div",A,[(0,i.Lk)("span",C,(0,c.v_)((new Date).getFullYear())+" Termin-Buchungssystem ",1)])]),(0,i.bF)(m)])}}},S=j;r(3873),r(2315),r(630),r(865),r(1011),r(7010);var T=[{path:"/",name:"Home",component:function(){return Promise.all([r.e(372),r.e(247)]).then(r.bind(r,474))}},{path:"/login",name:"Login",component:function(){return r.e(23).then(r.bind(r,8023))}},{path:"/admin",name:"Admin",component:function(){return Promise.all([r.e(372),r.e(880)]).then(r.bind(r,3009))},meta:{requiresAuth:!0}},{path:"/confirmation/:id",name:"Confirmation",component:function(){return r.e(994).then(r.bind(r,2994))}},{path:"/:pathMatch(.*)*",name:"NotFound",component:function(){return Promise.all([r.e(372),r.e(247)]).then(r.bind(r,474))}}],P=(0,s.aE)({history:(0,s.LA)("/"),routes:T,scrollBehavior:function(t,e,r){return r||{top:0}}});P.beforeEach((function(t,e,r){var n=(0,u.n)();t.matched.some((function(t){return t.meta.requiresAuth}))?n.isAuthenticated?r():r({path:"/login",query:{redirect:t.fullPath}}):r()}));const F=P;r(8195);var R=(0,n.Ef)(S);R.use((0,o.Ey)()),R.use(F),R.mount("#app")},6641:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return e};var t,e={},r=Object.prototype,i=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},s=c.iterator||"@@iterator",u=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),c=new T(n||[]);return a(i,"_invoke",{value:A(t,r,c)}),i}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var p="suspendedStart",v="suspendedYield",m="executing",y="completed",g={};function b(){}function w(){}function k(){}var L={};f(L,s,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(P([])));E&&E!==r&&i.call(E,s)&&(L=E);var _=k.prototype=b.prototype=Object.create(L);function N(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,a,c,s){var u=d(t[o],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==n(f)&&i.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,c,s)}),(function(t){r("throw",t,c,s)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,s)}))}s(u.arg)}var o;a(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function A(e,r,n){var o=p;return function(i,a){if(o===m)throw Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var s=C(c,n);if(s){if(s===g)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=m;var u=d(e,r,n);if("normal"===u.type){if(o=n.done?y:v,u.arg===g)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=y,n.method="throw",n.arg=u.arg)}}}function C(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,C(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=d(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[s];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(i.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(n(e)+" is not iterable")}return w.prototype=k,a(_,"constructor",{value:k,configurable:!0}),a(k,"constructor",{value:w,configurable:!0}),w.displayName=f(k,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,f(t,l,"GeneratorFunction")),t.prototype=Object.create(_),t},e.awrap=function(t){return{__await:t}},N(O.prototype),f(O.prototype,u,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new O(h(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},N(_),f(_,l,"Generator"),f(_,s,(function(){return this})),f(_,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(S),!e)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var s=i.call(a,"catchLoc"),u=i.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function i(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}r.d(e,{n:()=>a}),r(8070),r(3510),r(4007),r(2432),r(9392),r(9620),r(3873),r(6082),r(6569),r(8094),r(3277),r(8794),r(1806),r(3795),r(5668),r(2380),r(1280),r(630),r(865),r(1011),r(8867),r(7010);var a=(0,r(3109).nY)("auth",{state:function(){return{isAuthenticated:!1,token:null,error:null,loading:!1}},actions:{login:function(t,e){var r,n=this;return(r=o().mark((function r(){var i,a;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.loading=!0,n.error=null,r.prev=2,r.next=5,fetch("http://localhost:3000/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:e})});case 5:return i=r.sent,r.next=8,i.json();case 8:if(a=r.sent,i.ok){r.next=11;break}throw new Error(a.error||"Login fehlgeschlagen");case 11:n.token=a.token,n.isAuthenticated=!0,localStorage.setItem("token",a.token),r.next=20;break;case 16:throw r.prev=16,r.t0=r.catch(2),n.error=r.t0.message,r.t0;case 20:return r.prev=20,n.loading=!1,r.finish(20);case 23:case"end":return r.stop()}}),r,null,[[2,16,20,23]])})),function(){var t=this,e=arguments;return new Promise((function(n,o){var a=r.apply(t,e);function c(t){i(a,n,o,c,s,"next",t)}function s(t){i(a,n,o,c,s,"throw",t)}c(void 0)}))})()},logout:function(){this.isAuthenticated=!1,this.token=null,this.error=null,localStorage.removeItem("token")},initAuth:function(){var t=localStorage.getItem("token");t&&(this.token=t,this.isAuthenticated=!0)},getAuthHeader:function(){return this.token?{Authorization:"Bearer ".concat(this.token)}:{}}}})},1564:(t,e,r)=>{r.d(e,{i:()=>n}),r(6348);var n=(0,r(3109).nY)("notification",{state:function(){return{message:"",type:"info",show:!1,timeout:3e3}},actions:{showNotification:function(t){var e=this,r=t.message,n=t.type,o=void 0===n?"info":n,i=t.timeout,a=void 0===i?3e3:i;this.message=r,this.type=o,this.timeout=a,this.show=!0,setTimeout((function(){e.clearNotification()}),a)},clearNotification:function(){this.show=!1,this.message=""},success:function(t){this.showNotification({message:t,type:"success"})},error:function(t){this.showNotification({message:t,type:"error",timeout:5e3})},info:function(t){this.showNotification({message:t,type:"info"})},warning:function(t){this.showNotification({message:t,type:"warning",timeout:4e3})}}})}},o={};function i(t){var e=o[t];if(void 0!==e)return e.exports;var r=o[t]={exports:{}};return n[t].call(r.exports,r,r.exports,i),r.exports}i.m=n,t=[],i.O=(e,r,n,o)=>{if(!r){var a=1/0;for(l=0;l<t.length;l++){for(var[r,n,o]=t[l],c=!0,s=0;s<r.length;s++)(!1&o||a>=o)&&Object.keys(i.O).every((t=>i.O[t](r[s])))?r.splice(s--,1):(c=!1,o<a&&(a=o));if(c){t.splice(l--,1);var u=n();void 0!==u&&(e=u)}}return e}o=o||0;for(var l=t.length;l>0&&t[l-1][2]>o;l--)t[l]=t[l-1];t[l]=[r,n,o]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.f={},i.e=t=>Promise.all(Object.keys(i.f).reduce(((e,r)=>(i.f[r](t,e),e)),[])),i.u=t=>t+"."+{23:"38b593cc0c58b34b3094",247:"f47974cc3e7515b3bf4b",372:"306cf5e1090d4c2696f5",880:"0dc44e46662e119bdc0f",994:"42947558d4c2724adc98"}[t]+".js",i.miniCssF=t=>t+"."+{23:"68ecab2fd55ea127e1a3",247:"b939edfd208108b54d3b",880:"aded21f0c2acea1fe8e5",994:"e8cb9de1f88f4b7a348b"}[t]+".css",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),e={},r="frontend:",i.l=(t,n,o,a)=>{if(e[t])e[t].push(n);else{var c,s;if(void 0!==o)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var f=u[l];if(f.getAttribute("src")==t||f.getAttribute("data-webpack")==r+o){c=f;break}}c||(s=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.setAttribute("data-webpack",r+o),c.src=t),e[t]=[n];var h=(r,n)=>{c.onerror=c.onload=null,clearTimeout(d);var o=e[t];if(delete e[t],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((t=>t(n))),r)return r(n)},d=setTimeout(h.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=h.bind(null,c.onerror),c.onload=h.bind(null,c.onload),s&&document.head.appendChild(c)}},i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.p="/",(()=>{if("undefined"!=typeof document){var t={792:0};i.f.miniCss=(e,r)=>{t[e]?r.push(t[e]):0!==t[e]&&{23:1,247:1,880:1,994:1}[e]&&r.push(t[e]=(t=>new Promise(((e,r)=>{var n=i.miniCssF(t),o=i.p+n;if(((t,e)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=(a=r[n]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===t||o===e))return a}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){var a;if((o=(a=i[n]).getAttribute("data-href"))===t||o===e)return a}})(n,o))return e();((t,e,r,n,o)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",i.nc&&(a.nonce=i.nc),a.onerror=a.onload=r=>{if(a.onerror=a.onload=null,"load"===r.type)n();else{var i=r&&r.type,c=r&&r.target&&r.target.href||e,s=new Error("Loading CSS chunk "+t+" failed.\n("+i+": "+c+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=c,a.parentNode&&a.parentNode.removeChild(a),o(s)}},a.href=e,document.head.appendChild(a)})(t,o,0,e,r)})))(e).then((()=>{t[e]=0}),(r=>{throw delete t[e],r})))}}})(),(()=>{var t={792:0};i.f.j=(e,r)=>{var n=i.o(t,e)?t[e]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise(((r,o)=>n=t[e]=[r,o]));r.push(n[2]=o);var a=i.p+i.u(e),c=new Error;i.l(a,(r=>{if(i.o(t,e)&&(0!==(n=t[e])&&(t[e]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;c.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",c.name="ChunkLoadError",c.type=o,c.request=a,n[1](c)}}),"chunk-"+e,e)}},i.O.j=e=>0===t[e];var e=(e,r)=>{var n,o,[a,c,s]=r,u=0;if(a.some((e=>0!==t[e]))){for(n in c)i.o(c,n)&&(i.m[n]=c[n]);if(s)var l=s(i)}for(e&&e(r);u<a.length;u++)o=a[u],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(l)},r=self.webpackChunkfrontend=self.webpackChunkfrontend||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})();var a=i.O(void 0,[155],(()=>i(5022)));a=i.O(a)})();