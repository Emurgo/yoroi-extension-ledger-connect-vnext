(window["webpackJsonpmy-app"]=window["webpackJsonpmy-app"]||[]).push([[0],{28:function(e,n,a){e.exports=a(44)},35:function(e,n,a){},40:function(e,n,a){},41:function(e,n,a){},44:function(e,n,a){"use strict";a.r(n);var r=a(0),t=a.n(r),o=a(11),c=a.n(o),i=a(25),u=a(9),l=a(7);var s=a(4),E=s.a.model("UserStore",{id:s.a.identifier,name:s.a.string,lastName:s.a.string,age:s.a.number,xp:s.a.number}).views(function(e){return{get fullName(){return"".concat(e.name," ").concat(e.lastName)}}}).actions(function(e){return{changeName:function(n){e.name=n},changeLastName:function(n){e.lastName=n},increaseXp:function(n){e.xp+=n}}}),g={CHANGE_SPANISH:"Cambiar a Espa\xf1ol",CHANGE_ENGLISH:"Cambiar a Ingl\xe9s",CHANGE_KOREAN:"Cambiar a Coreano",USER_TITLE:"Usuario",XP_TITLE:"Experiencia",AGE_TITLE:"Age",APP_DESCRIPTION:"React Create App con React Router y MobX e Internacionalizaci\xf3n.",ACTIONS:{INCREASE_XP:"Incrementa Puntos de Experiencia!",CHANGE_NAME:"Cambia mi nombre!",CHANGE_LASTNAME:"Cambia mi apellido!"}},m={CHANGE_SPANISH:"Change to Spanish",CHANGE_ENGLISH:"Change to English",CHANGE_KOREAN:"Change to Korean",USER_TITLE:"User",XP_TITLE:"Experience",AGE_TITLE:"Age",APP_DESCRIPTION:"React Create App with React Router and MobX and Internationalization.",ACTIONS:{INCREASE_XP:"Increase Experience Points!",CHANGE_NAME:"Change My Name!",CHANGE_LASTNAME:"Change My Last Name!"}},d=s.a.model("LanguageStore",{language:s.a.string}).views(function(e){return{get currentLanguage(){return e.language},get resource(){switch(e.language){case"en":return m;case"es":return g;default:return m}}}}).actions(function(e){return{changeLanguageTo:function(n){e.language=n}}}),N=s.a.model("UIStore",{borderRadius:s.a.number,textColor:s.a.string}).views(function(e){return{}}).actions(function(e){return{changeBorderRadius:function(n){e.borderRadius=n},changeTextColor:function(n){e.textColor=n}}}),C=Object(l.b)("language")(Object(l.c)(function(e){var n=e.language,a=e.resource;return-1!==a.indexOf(".")?t.a.createElement("span",null,n.resource[a.split(".")[0]][a.split(".")[1]]):t.a.createElement("span",null,n.resource[a])})),p=(a(35),Object(l.b)("language")(Object(l.c)(function(e){var n=e.language;return t.a.createElement("div",{id:"Header"},t.a.createElement("div",{className:"es"===n.currentLanguage?"element current":"element",onClick:function(){return n.changeLanguageTo("es")}},t.a.createElement(C,{resource:"CHANGE_SPANISH"})),t.a.createElement("div",{className:"en"===n.currentLanguage?"element current":"element",onClick:function(){return n.changeLanguageTo("en")}},t.a.createElement(C,{resource:"CHANGE_ENGLISH"})))}))),f=a(20);function A(){var e=Object(f.a)(["\n  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);\n  border-radius: ","px;\n  border: 0;\n  outline: none;\n  color: ",";\n  text-transform: uppercase;\n  padding: 10px 15px;\n  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);\n  transition: all 1s ease-in-out;\n  margin-bottom: 5px;\n  &:hover{\n    background: linear-gradient(45deg, #ed6482 30%, #e98049 90%);\n  }\n  &:active{\n    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);\n  }\n"]);return A=function(){return e},e}var b=a(21).a.button(A(),function(e){return e.radius},function(e){return e.color?e.color:"white"}),v=(a(40),Object(l.b)("user","ui")(Object(l.c)(function(e){var n=e.user,a=e.ui;return t.a.createElement("div",{id:"user"},t.a.createElement("div",{className:"container"},t.a.createElement("div",{className:"info"},t.a.createElement("div",{className:"name"},n.fullName,", ",t.a.createElement("small",null,n.age)),t.a.createElement("div",{className:"xp"},t.a.createElement(C,{resource:"XP_TITLE"}),":"," ",t.a.createElement("span",{style:{color:n.xp>=1e3?"#FF8E53":"#000000"}},n.xp)),t.a.createElement("div",{className:"description"},t.a.createElement("p",null,t.a.createElement(C,{resource:"APP_DESCRIPTION"})))),t.a.createElement("div",{className:"actions"},t.a.createElement(b,{radius:a.borderRadius,onClick:function(){return n.increaseXp(100)}},t.a.createElement(C,{resource:"ACTIONS.INCREASE_XP"})),t.a.createElement(b,{radius:a.borderRadius,color:a.textColor,onClick:function(){return n.changeName("John")}},t.a.createElement(C,{resource:"ACTIONS.CHANGE_NAME"})),t.a.createElement(b,{radius:a.borderRadius,color:a.textColor,onClick:function(){return n.changeLastName("Doe")}},t.a.createElement(C,{resource:"ACTIONS.CHANGE_LASTNAME"})),t.a.createElement(b,{radius:a.borderRadius,color:a.textColor,onClick:function(){return a.changeBorderRadius(50)}},"CHANGE BORDER RADIUS: ",a.borderRadius))))}))),I=(a(41),function(){return t.a.createElement("div",{id:"app"},t.a.createElement(p,null),t.a.createElement(v,null))});"serviceWorker"in navigator&&window.addEventListener("load",function(){var e="".concat("/yoroi-extension-ledger-connect","/service-worker.js");navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})});var h={user:E.create({id:"1",name:"Alex",lastName:"Casillas",age:27,xp:0}),language:d.create({language:"en"}),ui:N.create({borderRadius:3,textColor:"white"})},x=t.a.createElement(l.a,h,t.a.createElement(i.a,null,t.a.createElement(u.a,{exact:!0,path:"/",component:I})));c.a.render(x,document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.dcb1b537.chunk.js.map