(this["webpackJsonpread-the-room"]=this["webpackJsonpread-the-room"]||[]).push([[0],{39:function(e,t,c){},63:function(e,t,c){"use strict";c.r(t);var n=c(0),s=c(1),a=c.n(s),i=c(17),r=c.n(i),l=(c(39),c(2)),d=c(8),o=function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{className:"sr-only",children:"Welcome to Read the Room!"}),Object(n.jsx)("div",{children:"Pick one of these to get started:"}),Object(n.jsxs)("div",{className:"row",children:[Object(n.jsx)("div",{className:"col-lg-6",children:Object(n.jsx)("div",{className:"large-button",children:Object(n.jsxs)(d.b,{to:"/teacher",children:[Object(n.jsx)("div",{children:"\ud83d\udc69\u200d\ud83c\udfeb"}),Object(n.jsx)("div",{children:"Teacher"}),Object(n.jsx)("div",{children:"Host a session"})]})})}),Object(n.jsx)("div",{className:"col-lg-6",children:Object(n.jsx)("div",{className:"large-button",children:Object(n.jsxs)(d.b,{to:"/student",children:[Object(n.jsx)("div",{children:"\ud83d\udc68\u200d\ud83c\udf93"}),Object(n.jsx)("div",{children:"Student"}),Object(n.jsx)("div",{children:"Join a session"})]})})})]})]})},j=c(10),b=c(11),h=c(14),m=c(13),x=c(30),A=function(e){Object(h.a)(c,e);var t=Object(m.a)(c);function c(e){return Object(j.a)(this,c),t.call(this,e)}return Object(b.a)(c,[{key:"render",value:function(){return Object(n.jsx)("div",{children:Object(n.jsx)(x.PieChart,{data:[{title:"Absent",value:5,color:"#696773"},{title:"Present",value:26,color:"#009fb7"},{title:"Away",value:2,color:" #fed766"}],radius:40,label:function(e){return e.dataEntry.title},labelStyle:{fontSize:"0.25rem",textAlign:"right"}})})}}]),c}(a.a.Component),O=c(33),v=function(e){Object(h.a)(c,e);var t=Object(m.a)(c);function c(e){return Object(j.a)(this,c),t.call(this,e)}return Object(b.a)(c,[{key:"render",value:function(){for(var e={"\ud83d\ude21 Anger":1,"\ud83d\ude12 Contempt":1,"\ud83e\udd22 Disgust":2,"\ud83d\ude28 Fear":0,"\ud83d\ude04 Happiness":8,"\ud83d\ude42 Neutral":15,"\ud83d\ude25 Sadness":1,"\ud83d\ude2e Surprise":0},t=0,c=0,s=Object.entries(e);c<s.length;c++){var a=Object(O.a)(s[c],2),i=(a[0],a[1]);t+=i}var r=Object.keys(e).map((function(t){return[t,e[t]]}));return r.sort((function(e,t){return t[1]-e[1]})),console.log(r),Object(n.jsx)("div",{children:Object(n.jsx)("ul",{className:"emotion-leaderboard",children:r.map((function(e,c){return Object(n.jsxs)("li",{className:"mb-3",style:{fontSize:Math.min(Math.max(5,e[1]),15)/t*6+"rem"},children:[e[0]," (",e[1],")"]})}))})})}}]),c}(a.a.Component),g=function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("div",{className:"text-center mb-3 mb-lg-5",children:[Object(n.jsx)("h1",{children:"Class: Algebra 28/01/2021"}),Object(n.jsx)("div",{children:"Session key: silly-ferret-feet"})]}),Object(n.jsxs)("div",{class:"row",children:[Object(n.jsxs)("div",{class:"col-lg-6",children:[Object(n.jsx)("h2",{children:"Emotional Engagement"}),Object(n.jsx)("div",{children:"See what emotions your students are showing"}),Object(n.jsx)(v,{})]}),Object(n.jsxs)("div",{class:"col-lg-6 mt-5 mt-lg-0",children:[Object(n.jsx)("h2",{children:"Attendance"}),Object(n.jsx)("div",{children:"Check the class attendance"}),Object(n.jsx)(A,{})]})]})]})},u=c(31),p=c.n(u),N=c(32);var y=function(e){var t=!1;return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("button",{id:e.id,className:"btn btn-primary speech-button",disabled:t,onClick:function(c){c.preventDefault(),t=!0;var n=document.getElementById(e.id);n.disabled=!0,setTimeout((function(){n.disabled=!1}),3e3)},children:e.text})})};var f=function(){var e=a.a.createRef(),t=null;navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}}).then((function(c){e.current.srcObject=c;var n=c.getVideoTracks()[0],s=new N.a(n);t=function(e){return setInterval((function(){e.takePhoto().then((function(e){p()({method:"post",url:"./image_analysis",headers:{"content-type":"application/octet-stream"},data:e}).then((function(e){console.log(JSON.stringify(e))})).catch((function(e){console.log(JSON.stringify(e))}))}))}),3e3)}(s)})).catch((function(e){console.log(e),console.log("Something went wrong 2!")})),Object(s.useEffect)((function(){return function(){null!=t&&(console.log("Unmounting"),clearInterval(t))}}),[]);return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{className:"text-center mb-3 mb-lg-5",children:"Class: Algebra 28/01/2021"}),Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("div",{className:"row",children:[Object(n.jsxs)("div",{className:"col-lg-6",children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:"bg-secondary p-2",children:"Only you can see this video stream"}),Object(n.jsx)("div",{id:"container",children:Object(n.jsx)("video",{autoPlay:!0,playsInline:!0,id:"videoElement",className:"webcam-feed bg-dark",ref:e})})]}),Object(n.jsx)("select",{className:"form-select form-select-lg",children:["Front camera","Back camera"].map((function(e,t){return Object(n.jsx)("option",{children:e})}))})]}),Object(n.jsxs)("div",{className:"col-lg-6 mt-3 mt-lg-0",children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("h2",{children:"Your data"}),Object(n.jsx)("div",{children:"This is the data being anonymously sent to your teacher which will be aggregated with everyone from your class"}),Object(n.jsxs)("div",{className:"row mt-4 mb-5",children:[Object(n.jsx)("div",{className:"col-6",children:Object(n.jsxs)("div",{className:"data-item",children:[Object(n.jsx)("div",{className:"data__title",children:"Attendance"}),Object(n.jsx)("div",{className:"data__value",children:"\u2714 Present"})]})}),Object(n.jsx)("div",{className:"col-6",children:Object(n.jsxs)("div",{className:"data-item",children:[Object(n.jsx)("div",{className:"data__title",children:"Emotion"}),Object(n.jsx)("div",{className:"data__value",children:"\ud83d\ude10 Neutral"})]})})]})]}),Object(n.jsxs)("div",{className:"mt-3 divider-top pt-4",children:[Object(n.jsx)("h2",{children:"Raise an issue"}),Object(n.jsx)("div",{className:"pb-4",children:"Let your teacher know something is wrong"}),Object(n.jsx)(y,{id:"SB1",text:"You're on mute"}),Object(n.jsx)(y,{id:"SB2",text:"I'm really confused"}),Object(n.jsx)(y,{id:"SB3",text:"Please slow down"}),Object(n.jsx)(y,{id:"SB4",text:"There's a bad internet connection"}),Object(n.jsx)(y,{id:"SB5",text:"I can't see the slides"})]})]})]})})]})},D=function(){return Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)(l.c,{children:[" ",Object(n.jsx)(l.a,{exact:!0,path:"/",component:o}),Object(n.jsx)(l.a,{exact:!0,path:"/teacher",component:g}),Object(n.jsx)(l.a,{exact:!0,path:"/student",component:f})]})})},S=function(){return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("div",{className:"navbar bg-dark py-3 mb-4",children:Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)(d.b,{to:"/",className:"navbar__brand",children:[Object(n.jsx)("img",{className:"navbar__logo",src:"data:image/png;base64,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",alt:"Read the Room logo"}),Object(n.jsx)("span",{className:"navbar__title px-3",children:"Read the Room"})]})})})})};var Q=function(){return Object(n.jsx)(d.a,{children:Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)(S,{}),Object(n.jsx)(D,{})]})})},Z=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,64)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),s(e),a(e),i(e)}))};r.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(Q,{})}),document.getElementById("root")),Z()}},[[63,1,2]]]);
//# sourceMappingURL=main.7d1f1ebd.chunk.js.map