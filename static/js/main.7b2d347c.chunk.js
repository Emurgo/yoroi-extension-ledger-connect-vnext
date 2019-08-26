(window["webpackJsonpmy-app"]=window["webpackJsonpmy-app"]||[]).push([[0],{32:function(e,n,a){e.exports=a(47)},43:function(e,n,a){},45:function(e,n,a){},46:function(e,n,a){},47:function(e,n,a){"use strict";a.r(n);var t=a(0),r=a.n(t),o=a(7),c=a(18),i=a(6);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u=a(5),l=u.a.model("UserStore",{id:u.a.identifier,name:u.a.string,lastName:u.a.string,age:u.a.number,xp:u.a.number}).views(function(e){return{get fullName(){return"".concat(e.name," ").concat(e.lastName)}}}).actions(function(e){return{changeName:function(n){e.name=n},changeLastName:function(n){e.lastName=n},increaseXp:function(n){e.xp+=n}}}),s={CHANGE_SPANISH:"Cambiar a Espa\xf1ol",CHANGE_ENGLISH:"Cambiar a Ingl\xe9s",CHANGE_KOREAN:"Cambiar a Coreano",USER_TITLE:"Usuario",XP_TITLE:"Experiencia",AGE_TITLE:"Age",APP_DESCRIPTION:"React Create App con React Router y MobX e Internacionalizaci\xf3n.",ACTIONS:{INCREASE_XP:"Incrementa Puntos de Experiencia!",CHANGE_NAME:"Cambia mi nombre!",CHANGE_LASTNAME:"Cambia mi apellido!"}},E={CHANGE_SPANISH:"Change to Spanish",CHANGE_ENGLISH:"Change to English",CHANGE_KOREAN:"Change to Korean",USER_TITLE:"User",XP_TITLE:"Experience",AGE_TITLE:"Age",APP_DESCRIPTION:"React Create App with React Router and MobX and Internationalization.",ACTIONS:{INCREASE_XP:"Increase Experience Points!",CHANGE_NAME:"Change My Name!",CHANGE_LASTNAME:"Change My Last Name!"}},m=u.a.model("LanguageStore",{language:u.a.string}).views(function(e){return{get currentLanguage(){return e.language},get resource(){switch(e.language){case"en":return E;case"es":return s;default:return E}}}}).actions(function(e){return{changeLanguageTo:function(n){e.language=n}}}),g=u.a.model("UIStore",{borderRadius:u.a.number,textColor:u.a.string}).views(function(e){return{}}).actions(function(e){return{changeBorderRadius:function(n){e.borderRadius=n},changeTextColor:function(n){e.textColor=n}}}),d=Object(i.b)("language")(Object(i.c)(function(e){var n=e.language,a=e.resource;return-1!==a.indexOf(".")?r.a.createElement("span",null,n.resource[a.split(".")[0]][a.split(".")[1]]):r.a.createElement("span",null,n.resource[a])})),N=(a(43),Object(i.b)("language")(Object(i.c)(function(e){var n=e.language;return r.a.createElement("div",{id:"Header"},r.a.createElement("div",{className:"es"===n.currentLanguage?"element current":"element",onClick:function(){return n.changeLanguageTo("es")}},r.a.createElement(d,{resource:"CHANGE_SPANISH"})),r.a.createElement("div",{className:"en"===n.currentLanguage?"element current":"element",onClick:function(){return n.changeLanguageTo("en")}},r.a.createElement(d,{resource:"CHANGE_ENGLISH"})))}))),C=a(26);function p(){var e=Object(C.a)(["\n  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);\n  border-radius: ","px;\n  border: 0;\n  outline: none;\n  color: ",";\n  text-transform: uppercase;\n  padding: 10px 15px;\n  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);\n  transition: all 1s ease-in-out;\n  margin-bottom: 5px;\n  &:hover{\n    background: linear-gradient(45deg, #ed6482 30%, #e98049 90%);\n  }\n  &:active{\n    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);\n  }\n"]);return p=function(){return e},e}var A=a(27).a.button(p(),function(e){return e.radius},function(e){return e.color?e.color:"white"}),b=(a(45),Object(i.b)("user","ui")(Object(i.c)(function(e){var n=e.user,a=e.ui;return r.a.createElement("div",{id:"user"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"info"},r.a.createElement("div",{className:"name"},n.fullName,", ",r.a.createElement("small",null,n.age)),r.a.createElement("div",{className:"xp"},r.a.createElement(d,{resource:"XP_TITLE"}),":"," ",r.a.createElement("span",{style:{color:n.xp>=1e3?"#FF8E53":"#000000"}},n.xp)),r.a.createElement("div",{className:"description"},r.a.createElement("p",null,r.a.createElement(d,{resource:"APP_DESCRIPTION"})))),r.a.createElement("div",{className:"actions"},r.a.createElement(A,{radius:a.borderRadius,onClick:function(){return n.increaseXp(100)}},r.a.createElement(d,{resource:"ACTIONS.INCREASE_XP"})),r.a.createElement(A,{radius:a.borderRadius,color:a.textColor,onClick:function(){return n.changeName("John")}},r.a.createElement(d,{resource:"ACTIONS.CHANGE_NAME"})),r.a.createElement(A,{radius:a.borderRadius,color:a.textColor,onClick:function(){return n.changeLastName("Doe")}},r.a.createElement(d,{resource:"ACTIONS.CHANGE_LASTNAME"})),r.a.createElement(A,{radius:a.borderRadius,color:a.textColor,onClick:function(){return a.changeBorderRadius(50)}},"CHANGE BORDER RADIUS: ",a.borderRadius))))}))),f=(a(46),function(){return r.a.createElement("div",{id:"app"},r.a.createElement(N,null),r.a.createElement(b,null))}),I={user:l.create({id:"1",name:"Alex",lastName:"Casillas",age:27,xp:0}),language:m.create({language:"en"}),ui:g.create({borderRadius:3,textColor:"white"})},h=r.a.createElement(i.a,I,r.a.createElement(c.a,null,r.a.createElement(c.b,{exact:!0,path:"/",component:f})));Object(o.render)(h,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,1,2]]]);
//# sourceMappingURL=main.7b2d347c.chunk.js.map