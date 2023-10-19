!function(e,n){"function"==typeof define&&define.amd?define([],n.bind(this,e,e.videojs)):"undefined"!=typeof module&&module.exports?module.exports=n(e,e.videojs):n(e,e.videojs)}(window,function(e,n){"use strict";function l(e,l,t){t=(n.mergeOptions||n.util.mergeOptions)({nextTitle:"Up Next",offset:30},t||{});var i,a,r,d,o=!1,s=!1,c=t.nextTitle,u=t.offset,v=0;if(e.upnext.title=function(e){e.length>1&&(c=e)},e.upnext.offset=function(e){parseInt(e)>1&&(u=e)},!Array.isArray(l)&&l.title&&(l.sources||l.url)&&l.poster){var p=[];p[0]=l,l=p}if(Array.isArray(l)){for(var h=[],m=0;m<l.length;m++)if(l[m].title&&(l[m].sources||l[m].url)&&l[m].poster){var f=j("img");f.src=l[m].poster,l[m].img=f,h.push(l[m])}h.length>1?(a=h[1],v=1):a=h[0];var g=null,C=null,x=null,y=null;if(0!=h.length){n.dom.addClass(e.el(),"vjs-up-next"),e.on("timeupdate",function(){n.dom.hasClass(e.el(),"vjs-ad-playing")||n.dom.hasClass(e.el(),"vjs-dai")||h.length<1||h.length>1&&v==h.length-1||e.duration()===1/0||"8"===n.browser.IOS_VERSION&&0===e.duration()||(!0!==o&&e.currentTime()>0&&e.duration()-e.currentTime()<u&&function(){if(!o&&!s){g=j("div","vjs-upnext");var l=a.img;if(l.setAttribute("alt",a.title),g.appendChild(l),a.duration){var t=j("div","next-dur",a.duration);g.appendChild(t)}var i=j("span","upnext-right",'<span class="nextup">'+c+'</span><span class="vjs-up-title">'+a.title+"</span>");if(g.appendChild(i),a.nextURL){var r=j("a");r.href=a.nextURL,r.target="_blank",a.target?r.target=a.target:r.target="_blank",g.appendChild(r)}e.el().appendChild(g),setTimeout(()=>{g.className="vjs-upnext vjs-upnext-show"},500),o=!0,g.onclick=function(){h[0].nextURL?r&&r.click():(e.changeSource(a),g.onclick=null,e.el().removeChild(g),g=null,e.play(),1==h.length?(s=!0,n.dom.removeClass(e.el(),"vjs-up-next"),h.splice(0,1)):v<h.length-1&&(a=h[++v]))}}}(),o&&e.duration()-e.currentTime()>u&&(g&&(g.onclick=null,g.parentNode.removeChild(g),g=null),o=!1))}),e.on("ended",function(){n.dom.hasClass(e.el(),"vjs-ad-playing")||n.dom.hasClass(e.el(),"vjs-dai")||function(){if(0==h.length)return;n.dom.addClass(e.controlBar.el_,"vjs-hidden"),n.dom.addClass(e.el(),"vjs-up-next"),1==h.length&&(s=!0);g&&(g.onclick=null,g.parentNode.removeChild(g),g=null);x=j("div","vjs-nextup");var l=j("div","next-close");l.innerHTML="&#9447;",x.appendChild(l);var t=j("div","next-header","<span>"+e.localize("Up Next")+"</span>");x.appendChild(t),C=j("div","vjs-fullnext"),x.appendChild(C);var o=j("div","respo");if((r=j("div","img")).style.backgroundImage="url("+a.poster+")",o.appendChild(r),C.appendChild(o),a.duration){var c=j("div","full-dur",a.duration);C.appendChild(c)}var u=j("div","next-title",a.title);C.appendChild(u),1==h.length&&a.nextURL&&((d=j("a")).href=a.nextURL,a.target?d.target=a.target:d.target="_blank",C.appendChild(d));var p,m=j("div","progress");m.innerHTML='<svg viewBox="0 0 84 84" preserveAspectRatio="xMinYMin meet"><circle class="circle1" cx="40" cy="40" r="40"></circle><circle id="circle2" class="circle2" cx="40" cy="40" r="40"></circle><g style="transform: translate(77%,26%) rotate(90deg) scale(3, 3);fill: #fff;"><path d="M3 12.2V3.8c0-.8.8-1.3 1.5-.9l7.1 4.2c.6.4.6 1.3 0 1.7L4.5 13c-.7.5-1.5 0-1.5-.8z"></path></g></svg>',C.appendChild(m),o.onclick=function(){1==h.length&&d?d.click():(a=h[v],T())},l.onclick=function(){clearInterval(f),C.onclick=null,x&&(x.parentNode.removeChild(x),x=null),y&&(y.parentNode.removeChild(y),y=null),e.play(),e.one("playing",function(l){n.dom.removeClass(e.el(),"vjs-up-next"),n.dom.removeClass(e.controlBar.el_,"vjs-hidden"),s=!0,1==h.length&&(s=!0,h.splice(0,1),a=null)})},y=j("div","next-overlay");var f,k=2*Math.PI*170;if(e.el().appendChild(y),e.el().appendChild(x),h.length>1){var b="vjs-nav-prev",I="vjs-nav-next";0===v&&(b="vjs-nav-prev disabled"),v===h.length-1&&(I="vjs-nav-next disabled");var A=j("div",b,'<div class="icon"></div>'),N=j("div",I,'<div class="icon"></div>');function L(e,l){var t=j("div","img");t.style.backgroundImage="url("+h[e].poster+")",t.style.left="next"==l?"100%":"-100%";var i,a=100,d=-100;o.appendChild(t),i="next"==l?requestAnimationFrame(function e(){a-=3;if(a<=0)return cancelAnimationFrame(i),t.style.left=0,r.parentNode.removeChild(r),r=t,void(t=null);a>0&&(t.style.left=a+"%");i=requestAnimationFrame(e)}):requestAnimationFrame(function e(){d+=3;if(d>=0)return cancelAnimationFrame(i),t.style.left=0,r.parentNode.removeChild(r),r=t,void(t=null);d<0&&(t.style.left=d+"%");i=requestAnimationFrame(e)}),u.innerHTML=h[e].title,h[e].duration&&c?(c.innerHTML=h[e].duration,n.dom.removeClass(c,"vjs-hidden")):c&&n.dom.addClass(c,"vjs-hidden")}y.appendChild(A),y.appendChild(N),N.onclick=function(){++v>h.length-1?v=h.length-1:(v===h.length-1&&n.dom.addClass(N,"disabled"),n.dom.removeClass(A,"disabled"),clearInterval(f),p&&p.removeAttribute("stroke-dasharray"),L(v,"next"))},A.onclick=function(){--v<0?v=0:(clearInterval(f),p&&p.removeAttribute("stroke-dasharray"),0===v&&n.dom.addClass(A,"disabled"),n.dom.removeClass(N,"disabled"),L(v,"prev"))}}i=0,(v!=h.length-1||1==h.length)&&(f=setInterval(function(){p=document.getElementById("circle2"),i<.25?(p.setAttribute("stroke-dasharray",k*i+" "+k*(1-i)),i+=.001):(clearInterval(f),1==h.length&&d?d.click():T())},25));function T(){clearInterval(f),C.onclick=null,x&&(x.parentNode.removeChild(x),x=null),y&&(y.parentNode.removeChild(y),y=null),e.changeSource(a),e.play(),e.one("playing",function(l){n.dom.removeClass(e.el(),"vjs-up-next"),n.dom.removeClass(e.controlBar.el_,"vjs-hidden"),1==h.length&&(s=!0,h.splice(0,1),a=null)}),h.length>1&&v<h.length-1&&(a=h[++v])}}()});return e.on("dispose",function n(){g&&(g.onclick=null,g.parentNode.removeChild(g)),C&&(C.onclick=null,C.parentNode.removeChild(C)),clearInterval(progressInterval),e.off("dispose",n)}),this}}else console.log("Error: Upnext - Invalid list array");function j(e,n,l){var t=document.createElement(e);return n&&(t.className=n),l&&(t.innerHTML=l),t}}e.videojs_upnext={version:"0.1"};(n.registerPlugin||n.plugin)("upnext",function(e,n){this.ready(function(){l(this,e,n)})})});