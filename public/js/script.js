!function e(n,t,o){function r(i,c){if(!t[i]){if(!n[i]){var u="function"==typeof require&&require;if(!c&&u)return u(i,!0);if(s)return s(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var d=t[i]={exports:{}};n[i][0].call(d.exports,function(e){var t=n[i][1][e];return r(t?t:e)},d,d.exports,e,n,t,o)}return t[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,n,t){"use strict";function o(e){for(var n=[],t=0,o=e.length;t<o;t++)for(var r=e.item(t),s=0,i=e.length;s<i;s++){var c=r.item(s);n.push(c.transcript)}return n}function r(e){var n=document.createElement("p");n.innerText=e,c.appendChild(n)}var s=window.SpeechRecognition||window.webkitSpeechRecognition,i=document.getElementById("btn-start"),c=document.getElementById("output"),u=!1,a=new SpeechSynthesisUtterance;a.text="こんにちは",a.lang="ja-JP",a.addEventListener("end",function(e){console.log(e.utterance.text),r("me: "+e.utterance.text),d.start()});var d=new s;d.lang="ja",d.continuous=!0,d.interimResults=!1,d.addEventListener("start",function(){console.log("start"),d.continuous=!0,u=!0,i.innerText="STOP"}),d.addEventListener("end",function(){console.log("end"),u=!1,i.innerText="START"}),d.addEventListener("nomatch",function(e){console.log("nomatch")}),d.addEventListener("soundstart",function(e){console.log("soundstart")}),d.addEventListener("soundend",function(e){console.log("soundend")}),d.addEventListener("speechstart",function(e){console.log("speechstart"),d.continuous=!1}),d.addEventListener("speechend",function(e){console.log("speechend")}),d.addEventListener("audiostart",function(e){console.log("audiostart")}),d.addEventListener("audioend",function(e){console.log("audioend")}),d.addEventListener("result",function(e){console.log("result"),d.stop();var n=o(e.results),t=n.join("、");console.log(n),r("you: "+t),a.text=t+"、と言いましたね",speechSynthesis.speak(a)}),i.addEventListener("click",function(){u?d.stop():(a.text="こんにちは",speechSynthesis.speak(a))},!1)},{}]},{},[1]);