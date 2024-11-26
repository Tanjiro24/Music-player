let Progressed = document.getElementById("progressed");
let Progressbar = document.getElementById("progress-bar");
let song = document.getElementById("song");
let Icon = document.getElementById("Icon");
let playpause = document.getElementById("playpause");
let img = document.getElementById("img");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let total_currentTime = document.getElementById("current-time");
let total_duration = document.getElementById("end-time");

//Here we PlayPause function for music with icon change//
function playPause() {
  if (Icon.classList.contains("fa-pause")) {
    song.pause();
    Icon.classList.add("fa-play");
    Icon.classList.remove("fa-pause");
  } else {
    song.play();
    Icon.classList.remove("fa-play");
    Icon.classList.add("fa-pause");
  }
}
playpause.addEventListener("click", playPause);

//Here we control the progressbar for playing and pasuing the music.//
song.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  Progressed.style.width = `${progress_time}%`;

  // song duration update//

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  if (sec_duration < 10) {
    sec_duration = `0${sec_duration}`;
  }
  let tot_duration = `${min_duration}:${sec_duration}`;
  if (duration) {
    total_duration.textContent = `${tot_duration}`;
  }

  //Current duration update//

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  total_currentTime.textContent = `${tot_currentTime}`;

  if (tot_currentTime == tot_duration) {
    nextSong();
  }
});

Progressbar.onclick = function (e) {
  song.currentTime = (e.offsetX / Progressbar.offsetWidth) * song.duration;
  song.play();
  Icon.classList.remove("fa-play");
  Icon.classList.add("fa-pause");
};

//Change the music data//

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  song.src = "songs/" + songs.name + ".mp3";
  img.src = "img/" + songs.name + ".jpg";
};

songIndex = 0;
// loadSong(songs[1]);

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  song.play();
  Icon.classList.remove("fa-play");
  Icon.classList.add("fa-pause");
};
const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  song.play();
  Icon.classList.remove("fa-play");
  Icon.classList.add("fa-pause");
};

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

//list of songs//

