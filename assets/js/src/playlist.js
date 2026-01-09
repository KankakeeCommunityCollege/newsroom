// ======================================================== //
// Fetch videos from a YouTube playlist and build them into //
//  a video player using the YouTube API.                   //
// ======================================================== //
const API_KEY = 'AIzaSyCDtQhcIZrqG_uw3OAJvQ5zhtLYWvInZV4';
const PLAYLIST_ID = 'PLEnNvZd4X-lVFQK8Ke8jkpr7NvdTSI5W9';

const player = document.getElementById('yt_player');
const list = document.getElementById('yt_list');

async function getVideos(playlist_id) {
  const limit = 8;
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  const paramObj = {
    part: "snippet",
    playlistId: playlist_id,
    maxResults: limit,
    key: API_KEY
  }

  url.search = new URLSearchParams(paramObj);

  const response = await fetch(url);

  if (!response.ok) {
    console.error('Error fetching videos');
  }

  return await response.json();
}

// Custom YouTube playlist used on videos.html page
function playlist() {
  const more = `<div class="playlist__more-btn--wrapper">
  <a class="btn btn-danger playlist__more-btn buttons__custom-danger" href="https://www.youtube.com/channel/UCpolj7IezPpI0zv6tFcmEJw?sub_confirmation=1" target="_blank" rel="noopener">
    <img src="https://news.kcc.edu/assets/img/youtube-white.svg" class="buttons__yt-subscribe" alt="">&nbsp;Subscribe
  </a>&nbsp;<a class="btn btn-primary playlist__more-btn" href="https://www.youtube.com/playlist?list=PLEnNvZd4X-lVFQK8Ke8jkpr7NvdTSI5W9" target="_blank" rel="noopener">
    More Newsroom Videos
  </a>
</div>`;

  getVideos(PLAYLIST_ID)
    .then(response => {
      const firstVideoId = response.items[0].snippet.resourceId.videoId;

      player.setAttribute(
        'src',
        `https://youtube.com/embed/${firstVideoId}?controls=1&showinfo=0&rel=0`
      );
      player.setAttribute('allow', 'autoplay; encrypted-media');
      [...response.items].forEach((item, i) => {
        const counter = `<span id="count${i + 1}" class="latest-news-widget__latest__tease__number playlist__count">${i + 1}</span>`;
        const title = `<h3 class="playlist__title playlist__title--shift">${item.snippet.title}</h3>`;
        const thumb = `<img src="${item.snippet.thumbnails.medium.url}" alt="Thumbnail for ${item.snippet.title} video">`;
        const video_id = item.snippet.resourceId.videoId;
        const holder = `<div class='yt-item'>
  ${counter}
  ${thumb}
  ${title}
</div>`;
        const link = `<a data-videoid="${video_id}" class="video-link" href="#">
  ${holder}
</a>`;
        list.insertAdjacentHTML('beforeend', link);
      });
      list.insertAdjacentHTML('beforeend', more);
    });

  list.addEventListener('click', e => {
    e.preventDefault();

    if (!e.target.matches('div.yt-item'))
      return;

    const videoId = e.target.parentNode.dataset.videoid;
    const iframePlay = `https://youtube.com/embed/${videoId}?controls=1&showinfo=0&rel=0&autoplay=1`;
    
    player.setAttribute('src', iframePlay);
  })
}

export default playlist;
