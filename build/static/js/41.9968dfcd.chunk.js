(this.webpackJsonpthoolie=this.webpackJsonpthoolie||[]).push([[41],{1375:function(e,t,a){},1417:function(e,t,a){"use strict";a.r(t);var n=a(10),r=a.n(n),l=a(94),o=a(703),i=a(0),c=a.n(i),s=a(297),u=a(298),d=a(299),m=a(133),b=a(1367),p=a(19),f=a(20),v=a(21),h=a(22),g=a(11),E=a(300),x=a(301),j=a(46),y=function(e){Object(v.a)(a,e);var t=Object(h.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"render",value:function(){var e=this,t=this.props.breadcrumbItems.length;return c.a.createElement(c.a.Fragment,null,c.a.createElement(u.a,null,c.a.createElement(d.a,{xs:12},c.a.createElement("div",{className:"page-title-box d-flex align-items-center justify-content-between"},c.a.createElement("h4",{className:"mb-0"},this.props.t(this.props.title)),c.a.createElement("div",{className:"page-title-right"},c.a.createElement(E.a,{listClassName:"m-0"},this.props.breadcrumbItems.map((function(a,n){return n+1===t?c.a.createElement(x.a,{key:n,active:!0},e.props.t(a.title)):c.a.createElement(x.a,{key:n},c.a.createElement(g.b,{to:a.link},e.props.t(a.title)))}))))))))}}]),a}(i.Component),O=Object(j.b)()(y),k=a(317),N=a(318),w=a(322),S=function(e){Object(v.a)(a,e);var t=Object(h.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"render",value:function(){return c.a.createElement(c.a.Fragment,null,this.props.reports.map((function(e,t){return c.a.createElement(d.a,{key:t,md:3},c.a.createElement(k.a,null,c.a.createElement(N.a,null,c.a.createElement(w.a,null,c.a.createElement(w.a,{body:!0,className:"overflow-hidden"},c.a.createElement("p",{className:"text-truncate font-size-14 mb-2"},e.title),c.a.createElement("h4",{className:"mb-0"},e.value)),c.a.createElement("div",{className:"text-primary"},c.a.createElement("i",{className:e.icon+" font-size-24"})))),c.a.createElement(N.a,{className:"border-top py-3"})))})))}}]),a}(i.Component),C=(a(1375),a(711)),T=a(713);t.default=function(){var e,t,a,n=Object(i.useState)([]),p=Object(o.a)(n,2),f=p[0],v=p[1],h=Object(i.useState)([]),g=Object(o.a)(h,2),E=g[0],x=g[1],j=Object(i.useState)(!1),y=Object(o.a)(j,2),k=y[0],N=y[1];Object(i.useEffect)((function(){w()}),[]);var w=function(){var e=Object(l.a)(r.a.mark((function e(){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N(!0),e.prev=1,e.next=4,m.a.get("/admin/dashboard?year=2023");case 4:t=e.sent,a=t.data,v(a.data),x(a.data),N(!1),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),N(!1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}}(),F=[{icon:"ri-user-fill",title:"Total Non-Subscribed User",value:Object(T.get)(f,"totalNonSubscribedUser","")},{icon:"ri-user-fill",title:"Total Number Of User",value:Object(T.get)(f,"totalNumberOfUsers","")},{icon:"ri-user-fill",title:"Total Revenue",value:"$ ".concat((null===(e=f.totalRevenue)||void 0===e?void 0:e.toFixed(2))||"")},{icon:"ri-user-fill",title:"Total Revenue Subscribed Plan",value:"$ ".concat((null===(t=f.totalRevenueFromBuyPlan)||void 0===t?void 0:t.toFixed(2))||"")},{icon:"ri-user-fill",title:"Total Revenue Template Download",value:"$ ".concat((null===(a=f.totalRevenueTemplateDownload)||void 0===a?void 0:a.toFixed(2))||"")},{icon:"ri-user-fill",title:"Total Subscribed User",value:Object(T.get)(f,"totalSubscribedUser","")}],R=E.totalGraph,$=(E.mostSoldProducts,{labels:null===R||void 0===R?void 0:R.map((function(e){return e.nameId})),datasets:[{axis:"y",label:"Total Revenue",data:null===R||void 0===R?void 0:R.map((function(e){return e.total_revenue})),fill:!1,backgroundColor:"red",borderColor:"red",borderWidth:1,scaleLabel:function(e){return" $"+e.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},{axis:"y",label:"Total Subscription Payment",data:null===R||void 0===R?void 0:R.map((function(e){return e.total_subscription_payment})),fill:!1,backgroundColor:"#0294b3",borderColor:"#0294b3",borderWidth:1}]}),U={responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Seller Chart"}},scales:{xAxes:[{ticks:{}}],yAxes:[{ticks:{beginAtZero:!0,userCallback:function(e,t,a){return"$"+(e=(e=(e=e.toString()).split(/(?=(?:...)*$)/)).join("."))}}}]},tooltips:{callbacks:{label:function(e,t){return console.log(e),console.log(t),"$"+e.yLabel.toString()}}}};return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",null,c.a.createElement("div",{className:"page-content"},c.a.createElement(s.a,{fluid:!0},c.a.createElement(O,{title:"Dashboard",breadcrumbItems:[{title:"Thoolie",link:"#"},{title:"Dashboard",link:"#"}]}),c.a.createElement(u.a,null,c.a.createElement(d.a,{xl:12},c.a.createElement(u.a,null,c.a.createElement(S,{reports:F})))))),c.a.createElement("div",{className:"graph-box"},c.a.createElement(b.Line,{options:U,data:$}))),k&&c.a.createElement(C.a,null))}},711:function(e,t,a){"use strict";var n=a(707),r=a(0),l=a.n(r),o=a(706);function i(){var e=Object(n.a)(["\n  border: 3px solid ",";\n  border-top: 3px solid #fff;\n  border-radius: 50%;\n  margin: auto;\n  width: 60px;\n  height: 60px;\n  animation: "," 0.6s linear infinite;\n  transition: 0.2s;\n"]);return i=function(){return e},e}function c(){var e=Object(n.a)(["\n0% { transform: rotate(0deg) }\n100% {transform: rotate(360deg) }\n"]);return c=function(){return e},e}var s=o.c.div((function(e){return"\n    display: flex;\n    flex-direction: ".concat(e.direction||"column",";\n    justify-content: ").concat(e.justifyContent||"flex-start",";\n    align-items: ").concat(e.alignItems||"flex-start",";\n    position:").concat(e.position?e.position:"fixed"," ;\n    width: 100%;\n    height: ").concat(e.viewheight?e.viewheight:"fixed",";\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color:").concat(e.backgroundColor||"rgba(0, 0, 0, 0.5)",";\n    z-index: 9999;\n    cursor: pointer;\n")})),u=Object(o.d)(c()),d=o.c.div(i(),(function(e){return e.theme.primary}),u);t.a=function(e){var t=e.position,a=e.direction,n=e.backgroundColor,r=e.viewheight;return l.a.createElement(s,{position:t,direction:a,backgroundColor:n,viewheight:r},l.a.createElement(d,null))}}}]);
//# sourceMappingURL=41.9968dfcd.chunk.js.map