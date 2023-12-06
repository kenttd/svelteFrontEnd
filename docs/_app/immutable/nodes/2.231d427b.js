import{s as Y,A as J,f as h,g as _,h as L,d,B as R,i as H,y as K,C as U,D as te,a as p,l as se,c as v,E as O,m as ae,j as V,x as f}from"../chunks/scheduler.9eecf671.js";import{S as Z,i as ee,b as x,d as b,m as w,a as y,t as k,e as D}from"../chunks/index.45c832e4.js";import"../chunks/paths.bca797c5.js";import{c as W,g as ne,B as re,t as le,S as ie,M as oe}from"../chunks/index.48d32360.js";import{S as X}from"../chunks/separator.eeea55c3.js";function me(u){let e,l,t=[{class:l=W("animate-pulse rounded-md bg-muted",u[0])},u[1]],r={};for(let s=0;s<t.length;s+=1)r=J(r,t[s]);return{c(){e=h("div"),this.h()},l(s){e=_(s,"DIV",{class:!0}),L(e).forEach(d),this.h()},h(){R(e,r)},m(s,o){H(s,e,o)},p(s,[o]){R(e,r=ne(t,[o&1&&l!==(l=W("animate-pulse rounded-md bg-muted",s[0]))&&{class:l},o&2&&s[1]]))},i:K,o:K,d(s){s&&d(e)}}}function ce(u,e,l){const t=["class"];let r=U(e,t),{class:s=void 0}=e;return u.$$set=o=>{e=J(J({},e),te(o)),l(1,r=U(e,t)),"class"in o&&l(0,s=o.class)},[s,r]}class G extends Z{constructor(e){super(),ee(this,e,ce,me,Y,{class:0})}}function fe(u){let e,l,t,r,s,o="Toggle theme",m;return e=new ie({props:{class:"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}}),t=new oe({props:{class:"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}}),{c(){x(e.$$.fragment),l=p(),x(t.$$.fragment),r=p(),s=h("span"),s.textContent=o,this.h()},l(n){b(e.$$.fragment,n),l=v(n),b(t.$$.fragment,n),r=v(n),s=_(n,"SPAN",{class:!0,"data-svelte-h":!0}),O(s)!=="svelte-ntgole"&&(s.textContent=o),this.h()},h(){V(s,"class","sr-only")},m(n,c){w(e,n,c),H(n,l,c),w(t,n,c),H(n,r,c),H(n,s,c),m=!0},p:K,i(n){m||(y(e.$$.fragment,n),y(t.$$.fragment,n),m=!0)},o(n){k(e.$$.fragment,n),k(t.$$.fragment,n),m=!1},d(n){n&&(d(l),d(r),d(s)),D(e,n),D(t,n)}}}function de(u){let e,l,t,r,s='<div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Home</div> <div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Explore</div> <div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Bookmark</div> <div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Profile</div>',o,m,n,c,g,E,z,$,A,M,N,S,q,C,F,I,Q='<div class="flex h-5 items-center">Direct Messages</div>',j;return e=new re({props:{variant:"outline",size:"icon",$$slots:{default:[fe]},$$scope:{ctx:u}}}),e.$on("click",le),m=new X({props:{orientation:"vertical"}}),E=new G({props:{class:"h-20 w-20 rounded-full mt-4"}}),M=new G({props:{class:"h-4 w-[250px] my-4"}}),S=new G({props:{class:"h-4 w-[200px] my-4"}}),C=new X({props:{orientation:"vertical"}}),{c(){x(e.$$.fragment),l=p(),t=h("div"),r=h("div"),r.innerHTML=s,o=p(),x(m.$$.fragment),n=p(),c=h("div"),g=h("div"),x(E.$$.fragment),z=p(),$=h("div"),A=se(`user not found
			  `),x(M.$$.fragment),N=p(),x(S.$$.fragment),q=p(),x(C.$$.fragment),F=p(),I=h("div"),I.innerHTML=Q,this.h()},l(a){b(e.$$.fragment,a),l=v(a),t=_(a,"DIV",{class:!0});var i=L(t);r=_(i,"DIV",{class:!0,"data-svelte-h":!0}),O(r)!=="svelte-fb2kk8"&&(r.innerHTML=s),o=v(i),b(m.$$.fragment,i),n=v(i),c=_(i,"DIV",{class:!0});var T=L(c);g=_(T,"DIV",{class:!0});var P=L(g);b(E.$$.fragment,P),z=v(P),$=_(P,"DIV",{class:!0});var B=L($);A=ae(B,`user not found
			  `),b(M.$$.fragment,B),N=v(B),b(S.$$.fragment,B),B.forEach(d),P.forEach(d),T.forEach(d),q=v(i),b(C.$$.fragment,i),F=v(i),I=_(i,"DIV",{class:!0,"data-svelte-h":!0}),O(I)!=="svelte-1ezb3ll"&&(I.innerHTML=Q),i.forEach(d),this.h()},h(){V(r,"class","justify-end"),V($,"class","space-y-2"),V(g,"class","flex items-center space-x-4"),V(c,"class","space-y-1"),V(I,"class","space-y-1"),V(t,"class","flex space-x-4 text-sm justify-evenly h-screen")},m(a,i){w(e,a,i),H(a,l,i),H(a,t,i),f(t,r),f(t,o),w(m,t,null),f(t,n),f(t,c),f(c,g),w(E,g,null),f(g,z),f(g,$),f($,A),w(M,$,null),f($,N),w(S,$,null),f(t,q),w(C,t,null),f(t,F),f(t,I),j=!0},p(a,[i]){const T={};i&1&&(T.$$scope={dirty:i,ctx:a}),e.$set(T)},i(a){j||(y(e.$$.fragment,a),y(m.$$.fragment,a),y(E.$$.fragment,a),y(M.$$.fragment,a),y(S.$$.fragment,a),y(C.$$.fragment,a),j=!0)},o(a){k(e.$$.fragment,a),k(m.$$.fragment,a),k(E.$$.fragment,a),k(M.$$.fragment,a),k(S.$$.fragment,a),k(C.$$.fragment,a),j=!1},d(a){a&&(d(l),d(t)),D(e,a),D(m),D(E),D(M),D(S),D(C)}}}class he extends Z{constructor(e){super(),ee(this,e,null,de,Y,{})}}export{he as component};