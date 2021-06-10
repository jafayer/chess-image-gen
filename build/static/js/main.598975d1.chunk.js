(this["webpackJsonpchess-react"]=this["webpackJsonpchess-react"]||[]).push([[0],{14:function(e,a,t){},19:function(e,a,t){"use strict";t.r(a);var r=t(1),s=t.n(r),c=t(3),o=t.n(c),l=t(4),n=t(5),h=t(6),i=t(9),u=t(8),d=(t(14),t(7)),b=t.n(d),f=t(0),q=function(e){Object(i.a)(t,e);var a=Object(u.a)(t);function t(){var e;Object(n.a)(this,t);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(e=a.call.apply(a,[this].concat(s))).state={darkMode:!1,whiteColor:"#81ebfd",blackColor:"#d24b4b",highlightLastMove:!0},e.chess=new b.a,e.files={a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7},e.squareColors={normal:{darkSquare:"#888",lightSquare:"#eee"},dark:{darkSquare:"#000",lightSquare:"#4a4a4a"}},e.componentDidMount=function(){e.canvas=document.querySelector("canvas"),e.ctx=e.canvas.getContext("2d"),e.square=e.canvas.width/8,e.ctx.lineWidth=.065*e.square,e.ctx.lineCap="round",e.fillBoard(),document.chess=e.chess},e.fillBoard=function(){for(var a=1;a<9;){for(var t=0;t<8;)a%2!==0?t%2===0?(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.darkSquare:e.squareColors.normal.darkSquare,e.ctx.fillRect(t*e.square,e.canvas.height-e.square*a,e.square,e.square)):(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.lightSquare:e.squareColors.normal.lightSquare,e.ctx.fillRect(t*e.square,e.canvas.height-e.square*a,e.square,e.square)):t%2!==0?(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.darkSquare:e.squareColors.normal.darkSquare,e.ctx.fillRect(t*e.square,e.canvas.height-e.square*a,e.square,e.square)):(e.ctx.fillStyle=e.state.darkMode?e.squareColors.dark.lightSquare:e.squareColors.normal.lightSquare,e.ctx.fillRect(t*e.square,e.canvas.height-e.square*a,e.square,e.square)),t++;a++}},e.drawPath=function(a,t,r){e.ctx.beginPath(),e.ctx.strokeStyle="w"===r?e.state.whiteColor:e.state.blackColor,e.ctx.moveTo(a.x,a.y),e.ctx.lineTo(t.x,t.y),e.ctx.stroke()},e.updateBoard=function(){e.ctx.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillBoard();var a=e.chess.history({verbose:!0}),t=[];a.forEach((function(e){var a={from:e.from,to:e.to,color:e.color},r=[];r.push(a),t=t.concat(r)})),t.forEach((function(a,r){var s=a.from,c=a.to,o=s[0],l=parseInt(s[1])-1,n=e.files[o],h={x:e.square/2+e.square*n,y:e.canvas.height-e.square/2-e.square*l},i=c[0],u=parseInt(c[1])-1,d=e.files[i],b={x:e.square/2+e.square*d,y:e.canvas.height-e.square/2-e.square*u};e.drawPath(h,b,a.color),r===t.length-1&&e.state.highlightLastMove&&(e.ctx.beginPath(),e.ctx.arc(b.x,b.y,e.square/8,0,2*Math.PI),e.ctx.stroke())}));var r=document.querySelector("h1"),s=e.chess.header(),c="";(e.chess.history().forEach((function(e,a){a%2===0&&(c+="<b>"+(Math.ceil(a/2)+1)+".</b>&nbsp;"),c+=e+" "})),c.trim(),document.querySelector("#pgn").innerHTML=c,s.White&&s.Black)&&(r.innerHTML="".concat(s.White," vs ").concat(s.Black).concat(s.Result?" <span class='score'>"+s.Result+"</span>":""),s.Date&&(document.querySelector("#date").innerText="".concat(s.Date)))},e.handlePGN=function(a){e.chess.load_pgn(a)&&e.setState({pgn:a},(function(){e.updateBoard()}))},e.handleOtherChange=function(a,t){e.setState(Object(l.a)({},t,a),(function(){e.updateBoard()}))},e}return Object(h.a)(t,[{key:"render",value:function(){var e=this;return Object(f.jsxs)("div",{className:"wrapper",children:[Object(f.jsx)("h1",{}),Object(f.jsx)("p",{id:"date"}),Object(f.jsx)("canvas",{width:"560",height:"560",style:{transform:this.state.flipped?"rotate(180deg)":""}}),Object(f.jsx)("p",{id:"pgn"}),Object(f.jsxs)("div",{className:"controls",children:[Object(f.jsx)("textarea",{id:"importGame",cols:"30",rows:"10",placeholder:"Input PGN",onChange:function(a){e.handlePGN(a.target.value)}}),Object(f.jsxs)("div",{className:"row",children:[Object(f.jsxs)("label",{htmlFor:"whiteColor",children:["White Color",Object(f.jsx)("input",{value:this.state.whiteColor,type:"color",onChange:function(a){e.handleOtherChange(a.target.value,"whiteColor")}})]}),Object(f.jsxs)("label",{htmlFor:"blackColor",children:["Black color",Object(f.jsx)("input",{value:this.state.blackColor,type:"color",onChange:function(a){e.handleOtherChange(a.target.value,"blackColor")}})]}),Object(f.jsxs)("label",{className:"full",children:["Dark mode?",Object(f.jsxs)("label",{className:"switch",children:[Object(f.jsx)("input",{type:"checkbox",defaultChecked:this.state.darkMode,onChange:function(a){e.handleOtherChange(a.target.checked,"darkMode")}}),Object(f.jsx)("span",{className:"slider round"})]})]}),Object(f.jsxs)("label",{className:"full",children:["Highlight Last move?",Object(f.jsxs)("label",{className:"switch",children:[Object(f.jsx)("input",{type:"checkbox",defaultChecked:this.state.highlightLastMove,onChange:function(a){e.handleOtherChange(a.target.checked,"highlightLastMove")}}),Object(f.jsx)("span",{className:"slider round"})]})]})]})]})]})}}]),t}(r.Component);o.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(q,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.598975d1.chunk.js.map