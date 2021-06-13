(this["webpackJsonpchess-react"]=this["webpackJsonpchess-react"]||[]).push([[0],{15:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var r=a(0),o=a.n(r),s=a(6),n=a.n(s),c=a(9),l=a(2),i=a(3),h=a(5),d=a(4),u=(a(15),a(10)),p=a.n(u),g=a(1),f=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(l.a)(this,a);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={},e.saveToServer=function(){document.querySelector(".saveButton").disabled=!0;var t={pgn:e.props.chess.pgn(),whiteColor:e.props.whiteColor,blackColor:e.props.blackColor,darkMode:e.props.darkMode?1:0,highlightLastMove:e.props.highlightLastMove?1:0},a=new XMLHttpRequest;a.open("POST","https://api.nf6.io/",!0),a.setRequestHeader("Content-Type","application/json"),a.onload=function(){if(4===a.readyState)if(200===a.status){var t=JSON.parse(a.response);console.log(t),e.props.handleOtherChange(t.id,"fetchedID")}else console.warn("There be errors about here")},a.send(JSON.stringify(t))},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return Object(g.jsxs)("div",{className:"controls",children:[Object(g.jsx)("textarea",{id:"importGame",cols:"30",rows:"10",placeholder:"Input PGN",onChange:function(t){e.props.handlePGN(t.target.value)}}),Object(g.jsxs)("div",{className:"row",children:[Object(g.jsxs)("label",{htmlFor:"whiteColor",children:["White Color",Object(g.jsx)("input",{value:this.props.whiteColor,type:"color",onChange:function(t){e.props.handleOtherChange(t.target.value,"whiteColor")}})]}),Object(g.jsxs)("label",{htmlFor:"blackColor",children:["Black color",Object(g.jsx)("input",{value:this.props.blackColor,type:"color",onChange:function(t){e.props.handleOtherChange(t.target.value,"blackColor")}})]}),Object(g.jsxs)("label",{className:"full",children:["Dark mode?",Object(g.jsxs)("label",{className:"switch",children:[Object(g.jsx)("input",{type:"checkbox",defaultChecked:this.props.darkMode,onChange:function(t){e.props.handleOtherChange(t.target.checked,"darkMode")}}),Object(g.jsx)("span",{className:"slider round"})]})]}),Object(g.jsxs)("label",{className:"full",children:["Highlight Last move?",Object(g.jsxs)("label",{className:"switch",children:[Object(g.jsx)("input",{type:"checkbox",defaultChecked:this.props.highlightLastMove,onChange:function(t){e.props.handleOtherChange(t.target.checked,"highlightLastMove")}}),Object(g.jsx)("span",{className:"slider round"})]})]})]}),Object(g.jsx)("div",{children:Object(g.jsx)("button",{className:"saveButton",onClick:this.saveToServer,children:"Save design!"})})]})}}]),a}(r.Component),b=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(l.a)(this,a);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={},e.copyToClipboard=function(){if(window.navigator.clipboard){var t="https://nf6.io/"+e.props.fetchedID;window.navigator.clipboard.writeText(t).then((function(){console.log("Wrote to clipboard: ".concat(t))}))}},e}return Object(i.a)(a,[{key:"render",value:function(){return Object(g.jsxs)("div",{className:"messageContainer",children:[!this.props.fetchedID&&Object(g.jsxs)("div",{className:"message warn",children:[Object(g.jsx)("span",{className:"material-icons",children:"warning"}),Object(g.jsxs)("p",{children:["Once you press save, you'll be given a unique URL and won't be able to change your design. ",Object(g.jsx)("strong",{children:"Copy your URL before closing the page!"})]})]}),this.props.fetchedID&&Object(g.jsx)("div",{className:"message success",children:Object(g.jsxs)("p",{children:["https://nf6.io/",this.props.fetchedID,Object(g.jsx)("button",{onClick:this.copyToClipboard,children:Object(g.jsx)("span",{className:"material-icons",children:"content_copy"})})]})})]})}}]),a}(r.Component),j=a(8),v=(a(20),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(l.a)(this,a);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={darkMode:!1,whiteColor:"#81ebfd",blackColor:"#d24b4b",highlightLastMove:!0},e.chess=new p.a,e.files={a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7},e.squareColors={normal:{darkSquare:"#888",lightSquare:"#eee"},dark:{darkSquare:"#000",lightSquare:"#4a4a4a"}},e.componentDidMount=function(){e.canvas=document.querySelector("canvas"),e.ctx=e.canvas.getContext("2d"),e.square=e.canvas.width/8,e.ctx.lineWidth=.065*e.square,e.ctx.lineCap="round",e.fillBoard(),document.chess=e.chess;var t=window.location.pathname.slice(1);t&&(console.log("fetching"),e.setState({fetchingGame:!0},(function(){e.fetchFromServer(t)})))},e.fetchFromServer=function(t){fetch("http://localhost:2477/game/"+t).then((function(e){return e.json()})).then((function(t){if(t.err)return e.error("Couldn't find a game with that ID!");console.log(t),e.setState({fetchedGame:t,blackColor:t.blackColor,whiteColor:t.whiteColor,pgn:t.pgn,darkMode:t.darkMode,highlightLastMove:t.highlightLastMove,fetchingGame:!1},(function(){e.chess.load_pgn(e.state.pgn),e.updateBoard(),console.log("fetched")}))})).catch((function(t){e.error("Couldn't find a game with that ID!")}))},e.fillBoard=function(){for(var t=1;t<9;){for(var a=0;a<8;)t%2!==0?a%2===0?(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.darkSquare:e.squareColors.normal.darkSquare,e.ctx.fillRect(a*e.square,e.canvas.height-e.square*t,e.square,e.square)):(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.lightSquare:e.squareColors.normal.lightSquare,e.ctx.fillRect(a*e.square,e.canvas.height-e.square*t,e.square,e.square)):a%2!==0?(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.darkSquare:e.squareColors.normal.darkSquare,e.ctx.fillRect(a*e.square,e.canvas.height-e.square*t,e.square,e.square)):(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.lightSquare:e.squareColors.normal.lightSquare,e.ctx.fillRect(a*e.square,e.canvas.height-e.square*t,e.square,e.square)),a++;t++}},e.drawPath=function(t,a,r){e.ctx.beginPath(),e.ctx.strokeStyle="w"===r?e.state.whiteColor:e.state.blackColor,e.ctx.moveTo(t.x,t.y),e.ctx.lineTo(a.x,a.y),e.ctx.stroke()},e.updateBoard=function(){e.ctx.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillBoard();var t=e.chess.history({verbose:!0}),a=[];t.forEach((function(e){var t={from:e.from,to:e.to,color:e.color},r=[];r.push(t),a=a.concat(r)})),a.forEach((function(t,r){var o=t.from,s=t.to,n=o[0],c=parseInt(o[1])-1,l=e.files[n],i={x:e.square/2+e.square*l,y:e.canvas.height-e.square/2-e.square*c},h=s[0],d=parseInt(s[1])-1,u=e.files[h],p={x:e.square/2+e.square*u,y:e.canvas.height-e.square/2-e.square*d};e.drawPath(i,p,t.color),r===a.length-1&&e.state.highlightLastMove&&(e.ctx.beginPath(),e.ctx.arc(p.x,p.y,e.square/8,0,2*Math.PI),e.ctx.stroke())}));var r=document.querySelector("h1"),o=e.chess.header(),s="";(e.chess.history().forEach((function(e,t){t%2===0&&(s+="<b>"+(Math.ceil(t/2)+1)+".</b>&nbsp;"),s+=e+" "})),s.trim(),document.querySelector("#pgn").innerHTML=s,o.White&&o.Black)&&(r.innerHTML="".concat(o.White," vs ").concat(o.Black).concat(o.Result?" <span class='score'>"+o.Result+"</span>":""),o.Date&&(document.querySelector("#date").innerText="".concat(o.Date)))},e.handlePGN=function(t){e.chess.load_pgn(t)&&e.setState({pgn:t},(function(){e.updateBoard()}))},e.handleOtherChange=function(t,a){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e.setState(Object(c.a)({},a,t),(function(){r&&r(),e.updateBoard()}))},e.error=function(e){j.b.error(e,{position:"bottom-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},e}return Object(i.a)(a,[{key:"render",value:function(){return Object(g.jsxs)("div",{className:"wrapper",children:[Object(g.jsx)("h1",{}),Object(g.jsx)("p",{id:"date"}),Object(g.jsx)("canvas",{width:"560",height:"560",style:{transform:this.state.flipped?"rotate(180deg)":""}}),Object(g.jsx)("p",{id:"pgn"}),!this.state.fetchedGame&&Object(g.jsx)(f,{chess:this.chess,handlePGN:this.handlePGN,handleOtherChange:this.handleOtherChange,fetchedID:this.state.fetchedID,whiteColor:this.state.whiteColor,blackColor:this.state.blackColor,darkMode:this.state.darkMode,highlightLastMove:this.state.highlightLastMove}),!this.state.fetchedGame&&!this.state.fetchingGame&&Object(g.jsx)(b,{fetchedID:this.state.fetchedID}),Object(g.jsx)(j.a,{})]})}}]),a}(r.Component));n.a.render(Object(g.jsx)(o.a.StrictMode,{children:Object(g.jsx)(v,{})}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.72e500e9.chunk.js.map