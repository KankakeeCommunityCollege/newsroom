"use strict";(self.webpackChunkkcc_newsroom=self.webpackChunkkcc_newsroom||[]).push([[575],{575:function(t,e,s){s.r(e);const n=document.getElementById("yt_player"),a=document.getElementById("yt_list");e.default=function(){(async function(){const t=new URL("https://www.googleapis.com/youtube/v3/playlistItems"),e={part:"snippet",playlistId:"PLEnNvZd4X-lVFQK8Ke8jkpr7NvdTSI5W9",maxResults:8,key:"AIzaSyCDtQhcIZrqG_uw3OAJvQ5zhtLYWvInZV4"};t.search=new URLSearchParams(e);const s=await fetch(t);return s.ok||console.error("Error fetching videos"),await s.json()})().then((t=>{const e=t.items[0].snippet.resourceId.videoId;n.setAttribute("src",`https://youtube.com/embed/${e}?controls=1&showinfo=0&rel=0`),n.setAttribute("allow","autoplay; encrypted-media"),[...t.items].forEach(((t,e)=>{const s=`<span id="count${e+1}" class="latest-news-widget__latest__tease__number playlist__count">${e+1}</span>`,n=`<h3 class="playlist__title playlist__title--shift">${t.snippet.title}</h3>`,o=`<img src="${t.snippet.thumbnails.medium.url}">`,r=`<a data-videoid="${t.snippet.resourceId.videoId}" class="video-link" href="#">\n  <div class='yt-item'>\n  ${s}\n  ${o}\n  ${n}\n</div>\n</a>`;a.insertAdjacentHTML("beforeend",r)})),a.insertAdjacentHTML("beforeend",'<div class="playlist__more-btn--wrapper">\n  <a class="btn btn-danger playlist__more-btn buttons__custom-danger" href="https://www.youtube.com/channel/UCpolj7IezPpI0zv6tFcmEJw?sub_confirmation=1" target="_blank" rel="noopener">\n    <img src="https://news.kcc.edu/assets/img/youtube-white.svg" class="buttons__yt-subscribe" alt="">&nbsp;Subscribe\n  </a>&nbsp;<a class="btn btn-primary playlist__more-btn" href="https://www.youtube.com/playlist?list=PLEnNvZd4X-lVFQK8Ke8jkpr7NvdTSI5W9" target="_blank" rel="noopener">\n    More Newsroom Videos\n  </a>\n</div>')})),a.addEventListener("click",(t=>{if(t.preventDefault(),!t.target.matches("div.yt-item"))return;const e=`https://youtube.com/embed/${t.target.parentNode.dataset.videoid}?controls=1&showinfo=0&rel=0&autoplay=1`;n.setAttribute("src",e)}))}}}]);