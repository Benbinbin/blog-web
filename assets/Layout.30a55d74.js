var Ne=Object.defineProperty,De=Object.defineProperties;var Ee=Object.getOwnPropertyDescriptors;var ge=Object.getOwnPropertySymbols;var Re=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable;var _e=(a,e,t)=>e in a?Ne(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,I=(a,e)=>{for(var t in e||(e={}))Re.call(e,t)&&_e(a,t,e[t]);if(ge)for(var t of ge(e))Pe.call(e,t)&&_e(a,t,e[t]);return a},F=(a,e)=>De(a,Ee(e));import{f as H,i as Y,j,k as f,l as X,m as Ae,n as Ie,r as D,h as n,o as r,p as B,w as z,q as w,e as U,t as x,s as me,a as d,v as C,x as Fe,y as W,z as J,A as be,B as ye,b as h,F as M,C as P,D as N,d as L,E as We,G as Oe,T as ke,H as O,I as je,J as V,K as G,L as $e,u as Le,g as R,M as we,N as xe,O as Ce,c as Ue,P as ne,Q,R as Z,S as oe,U as Ve,V as q,W as Ge,X as qe,Y as se,Z as Ke}from"./app.43fe0c63.js";import{N as Ye}from"./Navbar.f1e32f1c.js";import{_ as re}from"./plugin-vue_export-helper.21dcd24c.js";import{F as Xe}from"./Footer.50958d5f.js";const Je=["href","rel","target","aria-label"],Qe=H({inheritAttrs:!1});function Ze(a){const e=a,t=Y(),l=Fe(),{item:s}=j(e),m=f(()=>X(s.value.link)),o=f(()=>Ae(s.value.link)||Ie(s.value.link)),y=f(()=>{if(!o.value){if(s.value.target)return s.value.target;if(m.value)return"_blank"}}),i=f(()=>y.value==="_blank"),u=f(()=>!m.value&&!o.value&&!i.value),c=f(()=>{if(!o.value){if(s.value.rel)return s.value.rel;if(i.value)return"noopener noreferrer"}}),p=f(()=>s.value.ariaLabel||s.value.text),v=f(()=>{const k=Object.keys(l.value.locales);return k.length?!k.some(g=>g===s.value.link):s.value.link!=="/"}),_=f(()=>v.value?t.path.startsWith(s.value.link):!1),b=f(()=>u.value?s.value.activeMatch?new RegExp(s.value.activeMatch).test(t.path):_.value:!1);return(k,g)=>{const $=D("RouterLink"),T=D("OutboundLink");return n(u)?(r(),B($,me({key:0,class:["nav-link",{"router-link-active":n(b)}],to:n(s).link,"aria-label":n(p)},k.$attrs),{default:z(()=>[w(k.$slots,"before"),U(" "+x(n(s).text)+" ",1),w(k.$slots,"after")]),_:3},16,["class","to","aria-label"])):(r(),d("a",me({key:1,class:"nav-link external",href:n(s).link,rel:n(c),target:n(y),"aria-label":n(p)},k.$attrs),[w(k.$slots,"before"),U(" "+x(n(s).text)+" ",1),n(i)?(r(),B(T,{key:0})):C("",!0),w(k.$slots,"after")],16,Je))}}const A=H(F(I({},Qe),{props:{item:{type:Object,required:!0}},setup:Ze})),et=["aria-labelledby"],tt={class:"hero"},at=["src","alt"],nt={key:1,id:"main-title"},ot={key:2,class:"description"},st={key:3,class:"actions"},rt={key:0,class:"features"},lt={class:"theme-default-content custom"},it=["innerHTML"],ct=["textContent"],ut=H({setup(a){const e=W(),t=J(),l=f(()=>e.value.heroImage?be(e.value.heroImage):null),s=f(()=>e.value.heroText===null?null:e.value.heroText||t.value.title||"Hello"),m=f(()=>e.value.heroAlt||s.value||"hero"),o=f(()=>e.value.tagline===null?null:e.value.tagline||t.value.description||"Welcome to your VuePress site"),y=f(()=>ye(e.value.actions)?e.value.actions.map(({text:p,link:v,type:_="primary"})=>({text:p,link:v,type:_})):[]),i=f(()=>ye(e.value.features)?e.value.features:[]),u=f(()=>e.value.footer),c=f(()=>e.value.footerHtml);return(p,v)=>{const _=D("Content");return r(),d("main",{class:"home","aria-labelledby":n(s)?"main-title":void 0},[h("header",tt,[n(l)?(r(),d("img",{key:0,src:n(l),alt:n(m)},null,8,at)):C("",!0),n(s)?(r(),d("h1",nt,x(n(s)),1)):C("",!0),n(o)?(r(),d("p",ot,x(n(o)),1)):C("",!0),n(y).length?(r(),d("p",st,[(r(!0),d(M,null,P(n(y),b=>(r(),B(A,{key:b.text,class:N(["action-button",[b.type]]),item:b},null,8,["class","item"]))),128))])):C("",!0)]),n(i).length?(r(),d("div",rt,[(r(!0),d(M,null,P(n(i),b=>(r(),d("div",{key:b.title,class:"feature"},[h("h2",null,x(b.title),1),h("p",null,x(b.details),1)]))),128))])):C("",!0),h("div",lt,[L(_)]),n(u)?(r(),d(M,{key:1},[n(c)?(r(),d("div",{key:0,class:"footer",innerHTML:n(u)},null,8,it)):(r(),d("div",{key:1,class:"footer",textContent:x(n(u))},null,8,ct))],64)):C("",!0)],8,et)}}}),Se=a=>!X(a)||/github\.com/.test(a)?"GitHub":/bitbucket\.org/.test(a)?"Bitbucket":/gitlab\.com/.test(a)?"GitLab":/gitee\.com/.test(a)?"Gitee":null,dt={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},ht=({docsRepo:a,docsBranch:e,docsDir:t,filePathRelative:l,editLinkPattern:s})=>{const m=Se(a);let o;return s?o=s:m!==null&&(o=dt[m]),o?o.replace(/:repo/,X(a)?a:`https://github.com/${a}`).replace(/:branch/,e).replace(/:path/,We(`${Oe(t)}/${l}`)):null},vt=H({setup(a){const e=l=>{l.style.height=l.scrollHeight+"px"},t=l=>{l.style.height=""};return(l,s)=>(r(),B(ke,{name:"dropdown",onEnter:e,onAfterEnter:t,onBeforeLeave:e},{default:z(()=>[w(l.$slots,"default")]),_:3}))}}),pt=["aria-label"],ft={class:"title"},gt=h("span",{class:"arrow down"},null,-1),_t=["aria-label"],mt={class:"title"},bt={class:"nav-dropdown"},yt={class:"dropdown-subtitle"},kt={key:1},$t={class:"dropdown-subitem-wrapper"},Lt=H({props:{item:{type:Object,required:!0}},setup(a){const e=a,{item:t}=j(e),l=f(()=>t.value.ariaLabel||t.value.text),s=O(!1),m=Y();je(()=>m.path,()=>{s.value=!1});const o=i=>{i.detail===0?s.value=!s.value:s.value=!1},y=(i,u)=>u[u.length-1]===i;return(i,u)=>(r(),d("div",{class:N(["dropdown-wrapper",{open:s.value}])},[h("button",{class:"dropdown-title",type:"button","aria-label":n(l),onClick:o},[h("span",ft,x(n(t).text),1),gt],8,pt),h("button",{class:"mobile-dropdown-title",type:"button","aria-label":n(l),onClick:u[0]||(u[0]=c=>s.value=!s.value)},[h("span",mt,x(n(t).text),1),h("span",{class:N(["arrow",s.value?"down":"right"])},null,2)],8,_t),L(vt,null,{default:z(()=>[V(h("ul",bt,[(r(!0),d(M,null,P(n(t).children,(c,p)=>(r(),d("li",{key:c.link||p,class:"dropdown-item"},[c.children?(r(),d(M,{key:0},[h("h4",yt,[c.link?(r(),B(A,{key:0,item:c,onFocusout:v=>y(c,n(t).children)&&c.children.length===0&&(s.value=!1)},null,8,["item","onFocusout"])):(r(),d("span",kt,x(c.text),1))]),h("ul",$t,[(r(!0),d(M,null,P(c.children,v=>(r(),d("li",{key:v.link,class:"dropdown-subitem"},[L(A,{item:v,onFocusout:_=>y(v,c.children)&&y(c,n(t).children)&&(s.value=!1)},null,8,["item","onFocusout"])]))),128))])],64)):(r(),B(A,{key:1,item:c,onFocusout:v=>y(c,n(t).children)&&(s.value=!1)},null,8,["item","onFocusout"]))]))),128))],512),[[G,s.value]])]),_:1})],2))}}),wt={key:0,class:"navbar-links"},Te=H({setup(a){const e=()=>{const u=$e(),c=Le(),p=J(),v=R();return f(()=>{var $,T;const _=Object.keys(p.value.locales);if(_.length<2)return[];const b=u.currentRoute.value.path,k=u.currentRoute.value.fullPath;return[{text:($=v.value.selectLanguageText)!=null?$:"unkown language",ariaLabel:(T=v.value.selectLanguageAriaLabel)!=null?T:"unkown language",children:_.map(S=>{var ce,ue,de,he,ve,pe;const E=(ue=(ce=p.value.locales)==null?void 0:ce[S])!=null?ue:{},le=(he=(de=v.value.locales)==null?void 0:de[S])!=null?he:{},ie=`${E.lang}`,Be=(ve=le.selectLanguageName)!=null?ve:ie;let K;if(ie===p.value.lang)K=k;else{const fe=b.replace(c.value,S);u.getRoutes().some(Me=>Me.path===fe)?K=fe:K=(pe=le.home)!=null?pe:S}return{text:Be,link:K}})}]})},t=()=>{const u=R(),c=f(()=>u.value.repo),p=f(()=>c.value?Se(c.value):null),v=f(()=>c.value&&!X(c.value)?`https://github.com/${c.value}`:c.value),_=f(()=>v.value?u.value.repoLabel?u.value.repoLabel:p.value===null?"Source":p.value:null);return f(()=>!v.value||!_.value?[]:[{text:_.value,link:v.value}])},l=u=>we(u)?xe(u):u.children?F(I({},u),{children:u.children.map(l)}):u,m=(()=>{const u=R();return f(()=>(u.value.navbar||[]).map(l))})(),o=e(),y=t(),i=f(()=>[...m.value,...o.value,...y.value]);return(u,c)=>n(i).length?(r(),d("nav",wt,[(r(!0),d(M,null,P(n(i),p=>(r(),d("div",{key:p.text,class:"navbar-links-item"},[p.children?(r(),B(Lt,{key:0,item:p},null,8,["item"])):(r(),B(A,{key:1,item:p},null,8,["item"]))]))),128))])):C("",!0)}}),xt=["title"],Ct={class:"icon",focusable:"false",viewBox:"0 0 32 32"},St=Ue('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>',9),Tt=[St],Ht={class:"icon",focusable:"false",viewBox:"0 0 32 32"},zt=h("path",{d:"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",fill:"currentColor"},null,-1),Bt=[zt],Mt=H({setup(a){const e=R(),t=Ce(),l=()=>{t.value=!t.value};return(s,m)=>(r(),d("button",{class:"toggle-dark-button",title:n(e).toggleDarkMode,onClick:l},[V((r(),d("svg",Ct,Tt,512)),[[G,!n(t)]]),V((r(),d("svg",Ht,Bt,512)),[[G,n(t)]])],8,xt))}}),Nt=["title"],Dt=h("div",{class:"icon","aria-hidden":"true"},[h("span"),h("span"),h("span")],-1),Et=[Dt],Rt=H({emits:["toggle"],setup(a){const e=R();return(t,l)=>(r(),d("div",{class:"toggle-sidebar-button",title:n(e).toggleSidebar,"aria-expanded":"false",role:"button",tabindex:"0",onClick:l[0]||(l[0]=s=>t.$emit("toggle"))},Et,8,Nt))}}),Pt=["src","alt"],At=H({emits:["toggle-sidebar"],setup(a){const e=Le(),t=J(),l=R(),s=Ce(),m=O(null),o=O(null),y=f(()=>l.value.home||e.value),i=f(()=>s.value&&l.value.logoDark!==void 0?l.value.logoDark:l.value.logo),u=f(()=>t.value.title),c=O(0),p=f(()=>c.value?{maxWidth:c.value+"px"}:{}),v=f(()=>l.value.darkMode);ne(()=>{const b=719,k=_(m.value,"paddingLeft")+_(m.value,"paddingRight"),g=()=>{var $;window.innerWidth<=b?c.value=0:c.value=m.value.offsetWidth-k-((($=o.value)==null?void 0:$.offsetWidth)||0)};g(),window.addEventListener("resize",g,!1),window.addEventListener("orientationchange",g,!1)});function _(b,k){var T,S,E;const g=(E=(S=(T=b==null?void 0:b.ownerDocument)==null?void 0:T.defaultView)==null?void 0:S.getComputedStyle(b,null))==null?void 0:E[k],$=Number.parseInt(g,10);return Number.isNaN($)?0:$}return(b,k)=>{const g=D("ClientOnly"),$=D("RouterLink"),T=D("NavbarSearch");return r(),d("header",{ref:(S,E)=>{E.navbar=S,m.value=S},class:"navbar"},[L(Rt,{onToggle:k[0]||(k[0]=S=>b.$emit("toggle-sidebar"))}),h("span",{ref:(S,E)=>{E.siteBrand=S,o.value=S}},[L($,{to:n(y)},{default:z(()=>[L(g,null,{default:z(()=>[n(i)?(r(),d("img",{key:0,class:"logo",src:n(be)(n(i)),alt:n(u)},null,8,Pt)):C("",!0)]),_:1}),n(u)?(r(),d("span",{key:0,class:N(["site-name",{"can-hide":n(i)}])},x(n(u)),3)):C("",!0)]),_:1},8,["to"])],512),h("div",{class:"navbar-links-wrapper",style:Q(n(p))},[w(b.$slots,"before"),L(Te,{class:"can-hide"}),w(b.$slots,"after"),n(v)?(r(),B(Mt,{key:0})):C("",!0),L(T)],4)],512)}}}),It={class:"page-meta"},Ft={key:0,class:"meta-item edit-link"},Wt={key:1,class:"meta-item last-updated"},Ot={class:"meta-item-label"},jt={class:"meta-item-info"},Ut={key:2,class:"meta-item contributors"},Vt={class:"meta-item-label"},Gt={class:"meta-item-info"},qt=["title"],Kt=U(", "),Yt=H({setup(a){const e=()=>{const i=R(),u=Z(),c=W();return f(()=>{var T,S,E;if(!((S=(T=c.value.editLink)!=null?T:i.value.editLink)!=null?S:!0))return null;const{repo:v,docsRepo:_=v,docsBranch:b="main",docsDir:k="",editLinkText:g}=i.value;if(!_)return null;const $=ht({docsRepo:_,docsBranch:b,docsDir:k,filePathRelative:u.value.filePathRelative,editLinkPattern:(E=c.value.editLinkPattern)!=null?E:i.value.editLinkPattern});return $?{text:g!=null?g:"Edit this page",link:$}:null})},t=()=>{const i=J(),u=R(),c=Z(),p=W();return f(()=>{var b,k,g,$;return!((k=(b=p.value.lastUpdated)!=null?b:u.value.lastUpdated)!=null?k:!0)||!((g=c.value.git)==null?void 0:g.updatedTime)?null:new Date(($=c.value.git)==null?void 0:$.updatedTime).toLocaleString(i.value.lang)})},l=()=>{const i=R(),u=Z(),c=W();return f(()=>{var v,_,b,k;return((_=(v=c.value.contributors)!=null?v:i.value.contributors)!=null?_:!0)&&(k=(b=u.value.git)==null?void 0:b.contributors)!=null?k:null})},s=R(),m=e(),o=t(),y=l();return(i,u)=>(r(),d("footer",It,[n(m)?(r(),d("div",Ft,[L(A,{class:"meta-item-label",item:n(m)},null,8,["item"])])):C("",!0),n(o)?(r(),d("div",Wt,[h("span",Ot,x(n(s).lastUpdatedText)+": ",1),h("span",jt,x(n(o)),1)])):C("",!0),n(y)&&n(y).length?(r(),d("div",Ut,[h("span",Vt,x(n(s).contributorsText)+": ",1),h("span",Gt,[(r(!0),d(M,null,P(n(y),(c,p)=>(r(),d(M,{key:p},[h("span",{class:"contributor",title:`email: ${c.email}`},x(c.name),9,qt),p!==n(y).length-1?(r(),d(M,{key:0},[Kt],64)):C("",!0)],64))),128))])])):C("",!0)]))}}),Xt={key:0,class:"page-nav"},Jt={class:"inner"},Qt={key:0,class:"prev"},Zt=U(" \u2190 "),ea={key:1,class:"next"},ta=U(" \u2192 "),aa=H({setup(a){const e=i=>i===!1?null:we(i)?xe(i):Ve(i)?i:!1,t=(i,u,c)=>{const p=i.findIndex(v=>v.link===u);if(p!==-1){const v=i[p+c];return(v==null?void 0:v.link)?v:null}for(const v of i)if(v.children){const _=t(v.children,u,c);if(_)return _}return null},l=W(),s=oe(),m=Y(),o=f(()=>{const i=e(l.value.prev);return i!==!1?i:t(s.value,m.path,-1)}),y=f(()=>{const i=e(l.value.next);return i!==!1?i:t(s.value,m.path,1)});return(i,u)=>n(o)||n(y)?(r(),d("nav",Xt,[h("p",Jt,[n(o)?(r(),d("span",Qt,[Zt,L(A,{item:n(o)},null,8,["item"])])):C("",!0),n(y)?(r(),d("span",ea,[L(A,{item:n(y)},null,8,["item"]),ta])):C("",!0)])])):C("",!0)}}),na={class:"page"},oa={class:"theme-default-content"},sa=H({setup(a){return(e,t)=>{const l=D("Content");return r(),d("main",na,[w(e.$slots,"top"),h("div",oa,[L(l)]),L(Yt),L(aa),w(e.$slots,"bottom")])}}}),He=a=>decodeURI(a).replace(/#.*$/,"").replace(/(index)?\.(md|html)$/,""),ra=(a,e)=>{if(e===void 0)return!1;if(a.hash===e)return!0;const t=He(a.path),l=He(e);return t===l},ze=(a,e)=>ra(a,e.link)?!0:e.children?e.children.some(t=>ze(a,t)):!1,la=(a,e)=>a.link?q(A,F(I({},e),{item:a})):q("p",e,a.text),ia=(a,e)=>{var t;return((t=a.children)===null||t===void 0?void 0:t.length)?q("ul",{class:{"sidebar-sub-items":e>0}},a.children.map(l=>q("li",q(ee,{item:l,depth:e+1})))):null},ee=({item:a,depth:e=0})=>{const t=Y(),l=ze(t,a);return[la(a,{class:{"sidebar-heading":e===0,"sidebar-item":!0,active:l}}),ia(a,e)]};ee.displayName="SidebarChild";ee.props={item:{type:Object,required:!0},depth:{type:Number,required:!1}};const ca={class:"sidebar"},ua={class:"sidebar-links"},da=H({setup(a){const e=oe();return(t,l)=>(r(),d("aside",ca,[L(Te),w(t.$slots,"top"),h("ul",ua,[(r(!0),d(M,null,P(n(e),s=>(r(),B(n(ee),{key:s.link||s.text,item:s},null,8,["item"]))),128))]),w(t.$slots,"bottom")]))}}),ha=H({setup(a){const e=Z(),t=W(),l=R(),s=f(()=>t.value.navbar!==!1&&l.value.navbar!==!1),m=oe(),o=O(!1),y=g=>{o.value=typeof g=="boolean"?g:!o.value},i={x:0,y:0},u=g=>{i.x=g.changedTouches[0].clientX,i.y=g.changedTouches[0].clientY},c=g=>{const $=g.changedTouches[0].clientX-i.x,T=g.changedTouches[0].clientY-i.y;Math.abs($)>Math.abs(T)&&Math.abs($)>40&&($>0&&i.x<=80?y(!0):y(!1))},p=f(()=>[{"no-navbar":!s.value,"no-sidebar":!m.value.length,"sidebar-open":o.value},t.value.pageClass]);let v;ne(()=>{v=$e().afterEach(()=>{y(!1)})}),Ge(()=>{v()});const _=qe(),b=_.resolve,k=_.pending;return(g,$)=>(r(),d("div",{class:N(["theme-container",n(p)]),onTouchstart:u,onTouchend:c},[w(g.$slots,"navbar",{},()=>[n(s)?(r(),B(At,{key:0,onToggleSidebar:y},{before:z(()=>[w(g.$slots,"navbar-before")]),after:z(()=>[w(g.$slots,"navbar-after")]),_:3})):C("",!0)]),h("div",{class:"sidebar-mask",onClick:$[0]||($[0]=T=>y(!1))}),w(g.$slots,"sidebar",{},()=>[L(da,null,{top:z(()=>[w(g.$slots,"sidebar-top")]),bottom:z(()=>[w(g.$slots,"sidebar-bottom")]),_:3})]),w(g.$slots,"page",{},()=>[n(t).home?(r(),B(ut,{key:0})):(r(),B(ke,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:n(b),onBeforeLeave:n(k)},{default:z(()=>[L(sa,{key:n(e).path},{top:z(()=>[w(g.$slots,"page-top")]),bottom:z(()=>[w(g.$slots,"page-bottom")]),_:3})]),_:3},8,["onBeforeEnter","onBeforeLeave"]))])],34))}});const te={2:.45,3:.35,4:.25,5:.2,6:.2},va={2:"red-400",3:"green-400",4:"blue-400",5:"gray-400",6:"gray-300"},pa={props:["headings","activeHeading"],setup(a){const e=se({}),t=o=>va[o],l=o=>te[o],s=o=>({width:`${te[o]}rem`,height:`${te[o]}rem`,left:`${-te[o]/2}rem`}),m=j(e);return F(I({},m),{levelColor:t,levelSize:l,dotStyle:s})}},fa={class:"headings-container"},ga={class:"max-w-max m-2 pl-7 xl:pl-16 2xl:pl-20 py-4 opacity-50 hover:opacity-100 transition-all duration-300"},_a=["href"],ma={class:"px-3 py-2 hover:bg-gray-100 rounded"};function ba(a,e,t,l,s,m){return r(),d("div",fa,[h("ul",ga,[(r(!0),d(M,null,P(t.headings,o=>(r(),d("li",{key:o.id,class:"flex justify-start items-center relative"},[h("span",{class:N(["opacity-0 absolute -left-7 text-xs",`text-${l.levelColor(o.level)}`])},x(`H${o.level}`),3),h("div",{class:N(["dot-icon absolute ring-4 opacity-0 ring-opacity-50 rounded-full",`bg-${l.levelColor(o.level)} ring-${l.levelColor(o.level)}`]),style:Q(l.dotStyle(o.level))},null,6),h("a",{href:`#${o.id}`,class:N(["border-l border-dashed border-gray-400 text-sm",{"text-gray-400 dfont-light":o.id!==t.activeHeading,"text-gray-900 font-bold":o.id===t.activeHeading}])},[h("p",ma,x(o.text),1)],10,_a)]))),128))])])}var ya=re(pa,[["render",ba],["__scopeId","data-v-c28348e0"]]);const ae={2:.45,3:.35,4:.25,5:.2,6:.2},ka={2:"red-400",3:"green-400",4:"blue-400",5:"gray-400",6:"gray-300"},$a={props:["headings","activeHeading"],setup(a){const e=se({}),t=o=>ka[o],l=o=>ae[o],s=o=>({width:`${ae[o]}rem`,height:`${ae[o]}rem`,left:`${-ae[o]/2}rem`}),m=j(e);return F(I({},m),{levelColor:t,levelSize:l,dotStyle:s})}},La={class:"headings-container px-2 space-y-2 transition-all duration-300"},wa=["href"];function xa(a,e,t,l,s,m){return r(),d("div",La,[(r(!0),d(M,null,P(t.headings,o=>(r(),d("a",{key:o.id,class:N(["max-w-max p-2 flex justify-start items-center hover:bg-gray-200 rounded space-x-2",{"bg-gray-200":o.id===t.activeHeading}]),style:Q({"margin-left":`${o.level*5}px`}),href:`#${o.id}`},[h("span",{class:N(["text-xs",`text-${l.levelColor(o.level)}`])},x(`H${o.level}`),3),h("span",{class:N(["text-sm",{"text-gray-600 font-light":o.id!==t.activeHeading,"text-gray-900 font-bold":o.id===t.activeHeading}])},x(o.text),3)],14,wa))),128))])}var Ca=re($a,[["render",xa],["__scopeId","data-v-6eed9461"]]);const Sa={H2:2,H3:3,H4:4,H5:5,H6:6},Ta={components:{Layout:ha,Navbar:Ye,Catalog:ya,SideBar:Ca,Footer:Xe},setup(a){const e=se({showCatalog:!0,showSidebar:!1,catalogWidth:0,activeHeading:"",headings:[],toggleSidebar:()=>{}}),t=O(null);ne(()=>{const s=document.getElementsByClassName("theme-default-content")[0],m=s.querySelectorAll("h2, h3, h4, h5, h6"),o=Array.from(m);m.forEach(_=>{e.headings.push({level:Sa[_.nodeName],id:_.id,text:_.textContent.slice(1).trim()||_.id})});const y=()=>{e.catalogWidth=(document.documentElement.clientWidth-s.offsetWidth)/2};y();let i=null;window.onresize=()=>{i&&clearTimeout(i),i=setTimeout(()=>{y(),i=null},300)};const u=()=>window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,c=o[o.length-1],p=()=>{if(o.length===0)return;const _=u();if(_>=c.offsetTop)e.activeHeading=c.id;else{const b=o.find(k=>{if(k.offsetTop&&_<=k.offsetTop)return!0});if(!b)return;e.activeHeading=b.id}};p();let v=null;window.onscroll=()=>{v&&clearTimeout(v),v=setTimeout(()=>{p(),v=null},300)},e.toggleSidebar=()=>{e.showSidebar=!e.showSidebar,e.showSidebar&&Ke(()=>{console.log(t),t.value.focus()})}});const l=j(e);return F(I({},l),{sidebarContainer:t})}},Ha={class:"min-h-screen flex flex-col"},za=h("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-5 h-5",fill:"currentColor",viewBox:"0 0 16 16"},[h("path",{"fill-rule":"evenodd",d:"M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"})],-1),Ba=[za],Ma=h("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-5 h-5",fill:"currentColor",viewBox:"0 0 16 16"},[h("path",{"fill-rule":"evenodd",d:"M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"})],-1),Na=[Ma],Da={class:"relative flex-grow"},Ea={ref:"sidebarContainer",tabindex:"0",class:"sidebar-container fixed inset-y-0 left-0 z-20 lg:hidden opacity-10 hover:opacity-95"};function Ra(a,e,t,l,s,m){const o=D("Navbar"),y=D("Layout",!0),i=D("Catalog"),u=D("SideBar"),c=D("Footer");return r(),d("div",Ha,[L(o,{class:"sticky top-0 z-30 bg-white","navbar-type":"classification"},{left:z(()=>[h("button",{class:N(["catelog-btn p-2 select-none text-sm font-bold hover:text-gray-900 rounded-md lg:hidden",{"text-gray-400 hover:bg-gray-100":!a.showSidebar,"text-gray-900 bg-gray-100 hover:bg-gray-200":a.showSidebar}]),onClick:e[0]||(e[0]=(...p)=>a.toggleSidebar&&a.toggleSidebar(...p))},Ba,2)]),right:z(()=>[h("button",{class:N(["p-2 select-none text-sm font-bold hover:text-gray-900 rounded-md hidden lg:block",{"text-gray-400 hover:bg-gray-100":!a.showCatalog,"text-gray-900 bg-gray-100 hover:bg-gray-200":a.showCatalog}]),onClick:e[1]||(e[1]=p=>a.showCatalog=!a.showCatalog)},Na,2)]),_:1}),h("div",Da,[L(y),V(h("div",{class:"catalog-container absolute top-0 right-0 h-full hidden lg:block",style:Q({width:`${a.catalogWidth}px`})},[L(i,{class:"sticky top-36",headings:a.headings,activeHeading:a.activeHeading},null,8,["headings","activeHeading"])],4),[[G,a.showCatalog]]),V(h("div",Ea,[L(u,{headings:a.headings,activeHeading:a.activeHeading,class:"py-20"},null,8,["headings","activeHeading"])],512),[[G,a.showSidebar]])]),L(c)])}var Oa=re(Ta,[["render",Ra]]);export{Oa as default};
