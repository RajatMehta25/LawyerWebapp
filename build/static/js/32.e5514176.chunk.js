(this.webpackJsonpthoolie=this.webpackJsonpthoolie||[]).push([[32],{1224:function(e,t,n){},1414:function(e,t,n){"use strict";n.r(t);var a=n(10),i=n.n(a),r=n(94),o=n(703),c=n(241),l=n(0),s=n.n(l),u=n(813),d=n(4),m=n.n(d),p=n(730),f=n(719),g=(n(810),n(701)),h=n(722),v=n.n(h),b=n(133),x=n(83),w=n(713),y=n(932),N=n.n(y),j=n(815),O=n(718),E=n(736),_=n(707),R=n(706);function q(){var e=Object(_.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n"]);return q=function(){return e},e}function k(){var e=Object(_.a)(["\n    width: 70%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n"]);return k=function(){return e},e}function T(){var e=Object(_.a)(["\n    border: none;\n    outline: none;\n    background-color: #0294b3;\n    color: white;\n    border-radius: 5px;\n    padding: 0.3rem 1.2rem;\n    font-size: 1rem;\n"]);return T=function(){return e},e}function C(){var e=Object(_.a)(["\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-top: 1rem;\n"]);return C=function(){return e},e}function D(){var e=Object(_.a)(["\n    height: auto;\n    width: 100%;\n    text-align: left;\n    font: 400 15px/23px Nunito;\n    letter-spacing: 0px;\n    color: #656565;\n    background-color: #FFFFFF;\n    border: 1px solid #BBBBBB;\n    border-radius: 5px;\n    opacity: 1;\n    padding: 10px;\n    font-size: 0.9rem;\n    outline: none;\n"]);return D=function(){return e},e}function S(){var e=Object(_.a)(["\n    width: 100%;\n    font-size: 0.8rem;\n    font-weight: 700;\n    display: flex;\n    flex-direction: column;\n    /* justify-content: left; */\n"]);return S=function(){return e},e}function I(){var e=Object(_.a)(["\n    width: 100%;\n    font-size: 1rem;\n    font-weight: 700;\n    display: flex;\n    margin-bottom: 0.3rem;\n    justify-content: left;\n"]);return I=function(){return e},e}function P(){var e=Object(_.a)(["\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    margin-bottom: 0.5rem;\n"]);return P=function(){return e},e}function F(){var e=Object(_.a)(["\n    height: auto;\n    width: 60%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    /* background-color: lightgray; */\n    padding: 1rem;\n"]);return F=function(){return e},e}function z(){var e=Object(_.a)(["\n    height: auto;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    "]);return z=function(){return e},e}var H=R.c.div(z()),M=R.c.div(F()),A=R.c.div(P()),B=R.c.div(I()),L=R.c.div(S()),V=R.c.textarea(D()),W=R.c.div(C()),G=R.c.button(T()),U=R.c.div(k()),J=R.c.div(q()),$=(n(1224),n(711)),Y=Object(u.a)((function(e){return{root:{flexWrap:"wrap"},margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)},paperHeading:{padding:"1rem 0rem"},table:{minWidth:650},textMiddle:{verticalAlign:"middle !important"},iconMargin:{margin:"0.5rem",color:"#696969",backgroundColor:"#fff"},iconcolor:{margin:"0.5rem",color:"#fff",backgroundColor:"#0294b3 !important"},headingButton:{display:"flex",flexDirection:"row",justifyContent:"space-around",padding:"10px"},headingAlignment:Object(c.a)({display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"},"@media (max-width:780px)",{flexDirection:"column",width:"100%",gap:"1rem",justifyContent:"center",textAlign:"center"}),addNewCategory:Object(c.a)({display:"flex",alignItems:"center",flexWrap:"wrap"},"@media (max-width:780px)",{flexDirection:"column",width:"100%",gap:"1rem",justifyContent:"center",textAlign:"center"}),addNewCategoryHeading:Object(c.a)({textAlign:"center",flex:1,paddingBottom:"0 !important"},"@media (max-width:780px)",{flexDirection:"column",width:"100%",gap:"1rem",justifyContent:"center",textAlign:"center"}),MarginControl:Object(c.a)({},"@media (max-width:780px)",{margin:"0 !important"}),Marginbutton:{margin:"0.5rem"},container:{maxHeight:"58vh"},paperPaddingRightLeft:{padding:"0rem 1rem"}}}));t.default=function(e){var t=Y(),n=e.location.state,a=Object(l.useRef)(null),c=Object(l.useState)(Object(w.get)(n,"image","")),u=Object(o.a)(c,2),d=u[0],h=u[1],y=Object(l.useState)(!1),_=Object(o.a)(y,2),R=_[0],q=_[1],k=Object(l.useState)({clientName:Object(w.get)(n,"clientName",""),image:Object(w.get)(n,"image",""),description:Object(w.get)(n,"description",""),location:Object(w.get)(n,"location",""),_id:Object(w.get)(n,"_id","")}),T=Object(o.a)(k,2),C=T[0],D=(T[1],function(){var t=Object(r.a)(i.a.mark((function t(n){var a,r,o,c,l;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(n),q(!0),a={clientName:n.clientName,image:n.image,description:n.description,location:n.location,_id:n._id},!n._id){t.next=21;break}return t.prev=4,t.next=7,b.a.post("/admin/updateTestimonial",a);case 7:r=t.sent,o=r.data,console.log(o),x.b.success(o.message,{position:x.b.POSITION.TOP_RIGHT}),q(!1),e.history.push("/testimonial-management"),t.next=19;break;case 15:t.prev=15,t.t0=t.catch(4),q(!1),x.b.error("".concat(t.t0.data.data.message),{position:x.b.POSITION.TOP_RIGHT});case 19:t.next=34;break;case 21:return t.prev=21,t.next=24,b.a.post("/admin/createTestimonial",{clientName:n.clientName,image:n.image,description:n.description,location:n.location});case 24:c=t.sent,l=c.data,console.log(l),x.b.success(l.message,{position:x.b.POSITION.TOP_RIGHT}),e.history.push("/testimonial-management"),t.next=34;break;case 31:t.prev=31,t.t1=t.catch(21),x.b.error("".concat(t.t1.data.data.message),{position:x.b.POSITION.TOP_RIGHT});case 34:case"end":return t.stop()}}),t,null,[[4,15],[21,31]])})));return function(e){return t.apply(this,arguments)}}());return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"page-content"},s.a.createElement("div",{className:t.root},s.a.createElement(p.a,null,s.a.createElement("div",{className:t.paperPaddingRightLeft},s.a.createElement("div",{className:"py-4"},s.a.createElement(p.a,{elevation:0,className:m()(t.paperHeading,t.addNewCategory)},s.a.createElement("div",{className:t.headingSellerDetails},s.a.createElement(g.a,{variant:"outlined","aria-label":"add",className:t.iconMargin,onClick:function(){window.confirm("Leave without saving changes?")&&e.history.push({pathname:"/testimonial-management"})}},s.a.createElement(v.a,null))),s.a.createElement("div",{className:m()(t.addNewCategoryHeading)}," ",s.a.createElement("h3",{className:m()(t.MarginControl),style:{marginBottom:"-0.5rem",marginLeft:"-135px"}},console.log(n),n?"Edit Testimonial":"Add New Testimonial"))),s.a.createElement(f.d,{enableReinitialize:!0,initialValues:C,validate:function(e){return Object(E.m)(e)},validateOnChange:!0,onSubmit:D},(function(e){return s.a.createElement(f.c,{className:t.formStyleOnly},s.a.createElement(H,null,s.a.createElement(M,null,s.a.createElement(A,null,s.a.createElement(B,null,"Client Name:"),s.a.createElement(L,null,s.a.createElement(f.b,{name:"clientName"},(function(t){var n=t.field;return s.a.createElement(O.a,Object.assign({},n,{type:"text",value:e.values.clientName,onChange:function(t){e.setFieldValue("clientName",t.target.value)},error:e.touched.clientName&&e.errors.clientName?e.errors.clientName:null,className:"form-control",placeholder:"Client Name"}))})))),s.a.createElement(A,null,s.a.createElement(U,null,s.a.createElement(J,null,s.a.createElement(B,null,"Image :")),s.a.createElement(J,{className:"col-4"},s.a.createElement("input",{ref:a,name:"file1",hidden:!0,type:"file",accept:"image/png, image/jpeg , image/jpg",onChange:function(){var t=Object(r.a)(i.a.mark((function t(n){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(j.a)(n.target.files[0]);case 2:a=t.sent,console.log(a),e.setFieldValue("image",a),h(a);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}),s.a.createElement(G,{type:"button",onClick:function(){a.current.click()}},"Upload")),s.a.createElement(J,null,""===d&&s.a.createElement(N.a,{style:{height:"100px",width:"100px",objectFit:"cover",borderRadius:"5px"}}),""!==d&&s.a.createElement("img",{src:d,alt:"...",style:{width:"100px",height:"100px",objectFit:"cover",borderRadius:"5px"}}))),s.a.createElement(L,null,e.errors.image&&e.touched.image?s.a.createElement("p",{style:{paddingTop:5,fontSize:13,color:"red"}},e.errors.image):null)),s.a.createElement(A,null,s.a.createElement(B,null,"Description (",s.a.createElement("spans",{style:{fontSize:"0.8rem",display:"flex",alignItems:"center"}},"Max 500 Characters"),"):"),s.a.createElement(L,null,s.a.createElement(f.b,{name:"description"},(function(t){var n=t.field;return s.a.createElement(V,Object.assign({},n,{type:"text",value:e.values.description,onChange:function(t){e.setFieldValue("description",t.target.value)},error:e.touched.description&&e.errors.description?e.errors.description:null,className:"form-control",placeholder:"Description"}))})),e.errors.description&&e.touched.description?s.a.createElement("p",{style:{paddingTop:5,fontSize:13,color:"red"}},e.errors.description):null)),s.a.createElement(A,null,s.a.createElement(B,null,"Location:"),s.a.createElement(L,null,s.a.createElement(f.b,{name:"location"},(function(t){var n=t.field;return s.a.createElement(O.a,Object.assign({},n,{type:"text",value:e.values.location,onChange:function(t){e.setFieldValue("location",t.target.value)},error:e.touched.location&&e.errors.location?e.errors.location:null,className:"form-control",placeholder:"Location"}))})))),s.a.createElement(W,null,s.a.createElement(G,{type:"submit"},"Save")))))}))))))),R&&s.a.createElement($.a,null))}},711:function(e,t,n){"use strict";var a=n(707),i=n(0),r=n.n(i),o=n(706);function c(){var e=Object(a.a)(["\n  border: 3px solid ",";\n  border-top: 3px solid #fff;\n  border-radius: 50%;\n  margin: auto;\n  width: 60px;\n  height: 60px;\n  animation: "," 0.6s linear infinite;\n  transition: 0.2s;\n"]);return c=function(){return e},e}function l(){var e=Object(a.a)(["\n0% { transform: rotate(0deg) }\n100% {transform: rotate(360deg) }\n"]);return l=function(){return e},e}var s=o.c.div((function(e){return"\n    display: flex;\n    flex-direction: ".concat(e.direction||"column",";\n    justify-content: ").concat(e.justifyContent||"flex-start",";\n    align-items: ").concat(e.alignItems||"flex-start",";\n    position:").concat(e.position?e.position:"fixed"," ;\n    width: 100%;\n    height: ").concat(e.viewheight?e.viewheight:"fixed",";\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color:").concat(e.backgroundColor||"rgba(0, 0, 0, 0.5)",";\n    z-index: 9999;\n    cursor: pointer;\n")})),u=Object(o.d)(l()),d=o.c.div(c(),(function(e){return e.theme.primary}),u);t.a=function(e){var t=e.position,n=e.direction,a=e.backgroundColor,i=e.viewheight;return r.a.createElement(s,{position:t,direction:n,backgroundColor:a,viewheight:i},r.a.createElement(d,null))}},718:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(0),i=n.n(a);function r(e){var t=e.error;return i.a.createElement(i.a.Fragment,null,i.a.createElement("input",Object.assign({},e,{className:"form-control",style:{color:"black"}})),t?i.a.createElement("p",{style:{paddingTop:5,fontSize:13,color:"red"}},t):null)}},722:function(e,t,n){"use strict";var a=n(239),i=n(386);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(0)),o=(0,a(n(387)).default)(r.createElement("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");t.default=o},730:function(e,t,n){"use strict";var a=n(26),i=n(3),r=n(0),o=(n(1),n(30)),c=n(82),l=r.forwardRef((function(e,t){var n=e.classes,c=e.className,l=e.component,s=void 0===l?"div":l,u=e.square,d=void 0!==u&&u,m=e.elevation,p=void 0===m?1:m,f=e.variant,g=void 0===f?"elevation":f,h=Object(a.a)(e,["classes","className","component","square","elevation","variant"]);return r.createElement(s,Object(i.a)({className:Object(o.a)(n.root,c,"outlined"===g?n.outlined:n["elevation".concat(p)],!d&&n.rounded),ref:t},h))}));t.a=Object(c.a)((function(e){var t={};return e.shadows.forEach((function(e,n){t["elevation".concat(n)]={boxShadow:e}})),Object(i.a)({root:{backgroundColor:e.palette.background.paper,color:e.palette.text.primary,transition:e.transitions.create("box-shadow")},rounded:{borderRadius:e.shape.borderRadius},outlined:{border:"1px solid ".concat(e.palette.divider)}},t)}),{name:"MuiPaper"})(l)},736:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"g",(function(){return o})),n.d(t,"j",(function(){return c})),n.d(t,"m",(function(){return l})),n.d(t,"f",(function(){return s})),n.d(t,"d",(function(){return u})),n.d(t,"i",(function(){return d})),n.d(t,"h",(function(){return m})),n.d(t,"e",(function(){return p})),n.d(t,"l",(function(){return f})),n.d(t,"k",(function(){return g})),n.d(t,"b",(function(){return h}));n(12);var a="Field is required.",i=function(e){var t={};return e.email||(t.email="Email is Required"),e.password||(t.password="Old Password is Required"),e.newPassword||(t.newPassword="New Password is Required"),t},r=function(e){console.log(e);var t={};return e.name||(t.name="Template Name is Required"),e.upload_docs||(t.upload_docs="Upload Docs is Required"),e.price<1&&(t.price="Price must be greater than 0"),e.price||(t.price="Price is Required"),e.service_details||(t.service_details="Service Details is Required"),e.description||(t.description="Description is Required"),e.sign_fee<1&&(t.sign_fee="Sign Fee must be greater than 0"),e.sign_fee||(t.sign_fee="Sign Fee is Required"),t},o=function(e){console.log(e);var t={};return 1==e.first_Name_check&&(e.first_Name||(t.first_Name=a)),1==e.last_Name_check&&(e.last_Name||(t.last_Name=a)),1==e.user_email_check&&(e.user_email||(t.user_email=a)),1==e.mobile_Number_check&&(e.mobile_Number||(t.mobile_Number=a)),1==e.user_business_logo_check&&(e.user_business_logo||(t.user_business_logo=a)),1==e.user_firm_name_check&&(e.user_firm_name||(t.user_firm_name=a)),t},c=function(e){var t={};return e.yearDate||(t.yearDate="Year is Required"),e.title?e.title.length>40&&(t.title="Title can't be exceed more than 40 characters"):t.title="Title is Required",e.description||(t.description="Description is Required"),t},l=function(e){var t={};return e.clientName?e.clientName.length>40&&(t.clientName="Client Name can't be exceed more than 40 characters"):t.clientName="Client Name is Required",e.image[0]||(t.image="Upload image"),e.description||(t.description="Description is Required"),e.description.length>250&&(t.description="Description can't be exceed more than 250 characters"),e.location||(t.location="Lcation is Required"),t},s=function(e){console.log(e);var t={};return e.catName?e.catName.length>40&&(t.catName="Name can't be exceed more than 40 characters"):t.catName="Name is Required",e.desciption?e.desciption.length>250&&(t.desciption="Description can't be exceed more than 250 characters"):t.desciption="Description is Required",t},u=function(e){console.log(e);var t={};return e.fieldType?"Dropdown"==e.fieldType&&0==e.valueInArray.length&&(t.valueInArray="Options is Required"):t.fieldType="Type is Required",e.title||(t.title="Title is Required"),e.placeholder||(t.placeholder="Placeholder is Required"),t},d=function(e){var t={};return e.option_name||(t.option_name="Name is Required"),t},m=function(e){var t={};return e.title?e.title.length>40&&(t.title="Title can't be exceed more than 40 characters"):t.title="Title is Required",e.description?e.description.length>250&&(t.description="Description can't be exceed more than 250 characters"):t.description="Description is Required",console.log(e),t},p=function(e){console.log(e);var t={};return e.title?e.title.length>40&&(t.title="Title can't be exceed more than 40 characters"):t.title="Title is Required",e.short_description||(t.short_description="Short Description is Required"),e.details_description||(t.details_description="Detailed Description is Required"),0==e.image.length&&(t.image="Select Image"),t},f=function(e){console.log(e);var t={};return e.email?e.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)||(t.email="Invalid Email"):t.email="Email is Required",t},g=function(e){var t={};return e.roll_name||(t.roll_name="Role Name is Required"),0===e.roll_access.length&&(t.panel="Select One Panel"),t},h=function(e){console.log(e);var t={};return e.email?e.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)||(t.email="Invalid Email"):t.email="Email is Required",e.roll_access_id||(t.role="Select One Role"),t}},815:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(10),i=n.n(a),r=n(94),o=n(133),c=function(){var e=Object(r.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("media",t),e.next=4,o.a.post("/admin/uploadDocument",n).then((function(e){return console.log(e.data.data.path),e.data.data.path})).catch((function(e){}));case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},932:function(e,t,n){"use strict";var a=n(239),i=n(386);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(0)),o=(0,a(n(387)).default)(r.createElement("path",{d:"M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"}),"Wallpaper");t.default=o}}]);
//# sourceMappingURL=32.e5514176.chunk.js.map