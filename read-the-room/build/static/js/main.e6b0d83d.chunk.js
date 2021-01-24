(this["webpackJsonpread-the-room"]=this["webpackJsonpread-the-room"]||[]).push([[0],{39:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(1),c=n.n(a),i=n(17),r=n.n(i),o=(n(39),n(2)),l=n(8),d=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h1",{children:"Welcome to Read the Room!"}),Object(s.jsx)("div",{children:"Read the room lets students anonymously share their emotional responses with their teacher, to help improve remote learning for everyone"}),Object(s.jsx)("div",{className:"mt-4",children:"Pick one of these to get started:"}),Object(s.jsxs)("div",{className:"row mt-3",children:[Object(s.jsx)("div",{className:"col-lg-6",children:Object(s.jsxs)(l.b,{to:"/teacher",title:"Host a session",className:"btn btn-primary large-button",children:[Object(s.jsx)("div",{className:"large-button__icon",children:"\ud83c\udf4e"}),Object(s.jsx)("div",{className:"large-button__title",children:"Teacher"}),Object(s.jsx)("div",{children:"Host a session"})]})}),Object(s.jsx)("div",{className:"col-lg-6 mt-4 mt-lg-0",children:Object(s.jsxs)(l.b,{to:"/student",title:"Join a session",className:"btn btn-primary large-button",children:[Object(s.jsx)("div",{className:"large-button__icon",children:"\ud83c\udf93"}),Object(s.jsx)("div",{className:"large-button__title",children:"Student"}),Object(s.jsx)("div",{children:"Join a session"})]})})]})]})},j=n(9),h=n(10),m=n(13),b=n(12),g=n(31),u=function(e){Object(m.a)(n,e);var t=Object(b.a)(n);function n(e){return Object(j.a)(this,n),t.call(this,e)}return Object(h.a)(n,[{key:"render",value:function(){return Object(s.jsx)("div",{children:Object(s.jsx)(g.PieChart,{data:[{title:"Absent",value:5,color:"#696773"},{title:"Present",value:26,color:"#009fb7"},{title:"Away",value:2,color:" #fed766"}],radius:40,label:function(e){return e.dataEntry.title},labelStyle:{fontSize:"0.25rem",textAlign:"right"}})})}}]),n}(c.a.Component),x=n(33),v=function(e){Object(m.a)(n,e);var t=Object(b.a)(n);function n(e){return Object(j.a)(this,n),t.call(this,e)}return Object(h.a)(n,[{key:"render",value:function(){for(var e={"\ud83d\ude21 Anger":1,"\ud83d\ude12 Contempt":1,"\ud83e\udd22 Disgust":2,"\ud83d\ude28 Fear":0,"\ud83d\ude04 Happiness":8,"\ud83d\ude42 Neutral":15,"\ud83d\ude25 Sadness":1,"\ud83d\ude2e Surprise":0},t=0,n=0,a=Object.entries(e);n<a.length;n++){var c=Object(x.a)(a[n],2),i=(c[0],c[1]);t+=i}var r=Object.keys(e).map((function(t){return[t,e[t]]}));return r.sort((function(e,t){return t[1]-e[1]})),console.log(r),Object(s.jsx)("div",{children:Object(s.jsx)("ul",{className:"emotion-leaderboard",children:r.map((function(e,n){return Object(s.jsxs)("li",{className:"mb-3",style:{fontSize:Math.min(Math.max(5,e[1]),15)/t*6+"rem"},children:[e[0]," (",e[1],")"]})}))})})}}]),n}(c.a.Component),A=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("div",{className:"text-center mb-3 mb-lg-5",children:[Object(s.jsx)("h1",{children:"Class: Algebra 28/01/2021"}),Object(s.jsx)("div",{children:"Session key: silly-ferret-feet"})]}),Object(s.jsxs)("div",{class:"row",children:[Object(s.jsxs)("div",{class:"col-lg-6",children:[Object(s.jsx)("h2",{children:"Emotional Engagement"}),Object(s.jsx)("div",{children:"See what emotions your students are showing"}),Object(s.jsx)(v,{})]}),Object(s.jsxs)("div",{class:"col-lg-6 mt-5 mt-lg-0",children:[Object(s.jsx)("h2",{children:"Attendance"}),Object(s.jsx)("div",{children:"Check the class attendance"}),Object(s.jsx)(u,{})]})]})]})},O=n(20),p=n.n(O),f=n(32);var S=function(e){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("button",{id:e.id,className:"btn btn-primary speech-button",disabled:!e.isActive,onClick:function(t){t.preventDefault(),e.flipState();var n=document.getElementById(e.id);n.disabled=!0,setTimeout((function(){e.flipState(),n.disabled=!1}),3e3)},children:e.text})})},N=function(e){Object(m.a)(n,e);var t=Object(b.a)(n);function n(e){var s;return Object(j.a)(this,n),(s=t.call(this,e)).videoRef=c.a.createRef(),s.sendIntervalObject=null,s.userId=Math.floor(1e4*Math.random()),s.sendCurrentData=function(){var e={main_emotion:s.state.maxEmotion,id:s.userId};!0===s.state.muteMessage?e.active_command="muted":!0===s.state.cannotSeeSlidesMessage?e.active_command="no_slides":!0===s.state.internetConnectionMessage?e.active_command="slow_internet":!0===s.state.slowDownMessage?e.active_command="slow_down":!0===s.state.confusedMessage&&(e.active_command="confused"),p()({method:"post",data:e,url:"./send_data"}).then((function(e){console.log(JSON.stringify(e))}))},s.sendFaceAtIntervals=function(e){var t=document.createElement("canvas");return setInterval((function(){e.grabFrame().then((function(e){return console.log(e),new Promise((function(n){t.width=e.width,t.height=e.height;var s=t.getContext("bitmaprenderer");s?s.transferFromImageBitmap(e):t.getContext("2d").drawImage(e,0,0),t.toBlob(n)}))})).then((function(e){p()({method:"post",url:"./image_analysis",headers:{"content-type":"application/octet-stream"},data:e}).then((function(e){console.log(JSON.stringify(e)),s.setState({maxEmotion:e.data.max_emotion}),s.sendCurrentData()}))}))}),3e3)},s.flipState=function(e){return function(){var t={};t[e]=!s.state[e],s.setState(t)}},s.state={maxEmotion:"absent",muteMessage:!1,confusedMessage:!1,slowDownMessage:!1,internetConnectionMessage:!1,cannotSeeSlidesMessage:!1},s}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}}).then((function(t){e.videoRef.current.srcObject=t;var n=t.getVideoTracks()[0],s=new f.a(n);e.sendIntervalObject=e.sendFaceAtIntervals(s)})).catch((function(e){console.log(e),console.log("Something went wrong 2!")}))}},{key:"componentWillUnmount",value:function(){null!=this.sendIntervalObject&&(console.log("Unmounting"),this.videoRef.current.srcObject.getTracks().forEach((function(e){return e.stop()})),clearInterval(this.sendIntervalObject))}},{key:"render",value:function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h1",{className:"text-center mb-3 mb-lg-5",children:"Class: Algebra 28/01/2021"}),Object(s.jsx)("div",{className:"container",children:Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"col-lg-6",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("div",{className:"bg-secondary p-2",children:"Only you can see this video stream"}),Object(s.jsx)("div",{id:"container",children:Object(s.jsx)("video",{autoPlay:!0,playsInline:!0,id:"videoElement",className:"webcam-feed bg-dark",ref:this.videoRef})})]}),Object(s.jsx)("select",{className:"form-select form-select-lg",children:["Front camera","Back camera"].map((function(e,t){return Object(s.jsx)("option",{children:e})}))})]}),Object(s.jsxs)("div",{className:"col-lg-6 mt-3 mt-lg-0",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Your data"}),Object(s.jsx)("div",{children:"This is the data being anonymously sent to your teacher which will be aggregated with everyone from your class"}),Object(s.jsxs)("div",{className:"row mt-4 mb-5",children:[Object(s.jsx)("div",{className:"col-6",children:Object(s.jsxs)("div",{className:"data-item",children:[Object(s.jsx)("div",{className:"data__title",children:"Attendance"}),Object(s.jsx)("div",{className:"data__value",children:"absent"===this.state.maxEmotion?"\ud83d\udc7b Lost":"\u2714 Present"})]})}),Object(s.jsx)("div",{className:"col-6",children:Object(s.jsxs)("div",{className:"data-item",children:[Object(s.jsx)("div",{className:"data__title",children:"Emotion"}),Object(s.jsx)("div",{className:"data__value",children:{neutral:"\ud83d\ude42 Neutral",anger:"\ud83d\ude21 Anger",contempt:"\ud83d\ude12 Contempt",disgust:"\ud83e\udd22 Disgust",fear:"\ud83d\ude28 Fear",happiness:"\ud83d\ude04 Happiness",sadness:"\ud83d\ude22 Sadness",surprise:"\ud83d\ude2e Surprise",absent:"Unknown"}[this.state.maxEmotion]})]})})]})]}),Object(s.jsxs)("div",{className:"mt-3 divider-top pt-4",children:[Object(s.jsx)("h2",{children:"Raise an issue"}),Object(s.jsx)("div",{className:"pb-4",children:"Let your teacher know something is wrong"}),Object(s.jsx)(S,{id:"SB1",text:"You're on mute",isActive:!this.state.muteMessage,flipState:this.flipState("muteMessage")}),Object(s.jsx)(S,{id:"SB2",text:"I'm really confused",isActive:!this.state.confusedMessage,flipState:this.flipState("confusedMessage")}),Object(s.jsx)(S,{id:"SB3",text:"Please slow down",isActive:!this.state.slowDownMessage,flipState:this.flipState("slowDownMessage")}),Object(s.jsx)(S,{id:"SB4",text:"There's a bad internet connection",isActive:!this.state.internetConnectionMessage,flipState:this.flipState("internetConnectionMessage")}),Object(s.jsx)(S,{id:"SB5",text:"I can't see the slides",isActive:!this.state.cannotSeeSlidesMessage,flipState:this.flipState("cannotSeeSlidesMessage")})]})]})]})})]})}}]),n}(c.a.Component),y=function(){return Object(s.jsx)("div",{className:"container pb-3",children:Object(s.jsxs)(o.c,{children:[" ",Object(s.jsx)(o.a,{exact:!0,path:"/",component:d}),Object(s.jsx)(o.a,{exact:!0,path:"/teacher",component:A}),Object(s.jsx)(o.a,{exact:!0,path:"/student",component:N})]})})},M=function(){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{className:"navbar bg-dark py-3 mb-4",children:Object(s.jsx)("div",{className:"container",children:Object(s.jsxs)(l.b,{to:"/",className:"navbar__brand",children:[Object(s.jsx)("img",{className:"navbar__logo",src:"data:image/png;base64,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",alt:"Read the Room logo"}),Object(s.jsx)("span",{className:"navbar__title px-3",children:"Read the Room"})]})})})})};var D=function(){return Object(s.jsx)(l.a,{children:Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(M,{}),Object(s.jsx)(y,{})]})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),s(e),a(e),c(e),i(e)}))};r.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(D,{})}),document.getElementById("root")),w()}},[[63,1,2]]]);
//# sourceMappingURL=main.e6b0d83d.chunk.js.map