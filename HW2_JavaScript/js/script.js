//Music player
//Brandon Calvario
// JS code to search for an artist, and sort based on name, user can click on artist and display and play music, 

// Sources:
// Bob Marley picture: https://www.imdb.com/name/nm0002490/
// Blue Öyster Cult Picture: https://recordcollectormag.com/articles/blue-oyster-cult
// Modjo picture: https://www.deezer.com/us/artist/1545

// Album Covers: Wikipedia
// Music: Physically sourced. 

const musicLibrary = [

    {title: "Lady (Hear Me Tonight)",artist: "Modjo", genre: "Electronic", file:"music/Modjo - Lady (Hear Me Tonight).flac",img:"css/images/Modjoalbumcover.jpg"},
    {title: "You Could Be Loved",artist:"Bob Marley", genre:"Reggae",file:"music/Bob Marley & The Wailers - Could You Be Loved.flac",img:"css/images/BobMarley&theWailersUprising.jpg"},
    {title: "Morning Final",artist:"Blue Oyster Cult", genre:"Rock",file:"/music/Blue Öyster Cult - Morning Final.m4a",img:"css/images/BlueOysterCultAgentsofFortune.jpg"},
    {title: "Example Song",artist:"Blue Oyster Cult", genre:"Rock",file:"",img:"css/images/audioexample.png"},
    {title: "Example Song",artist:"Kaskade", genre:"Electronic",file:"",img:"css/images/audioexample.png"},
    {title: "Example Song",artist:"AC/DC", genre:"Rock",file:"",img:"css/images/audioexample.png"},
    {title: "Example Song",artist:"Gerardo Ortiz", genre:"Banda",file:"",img:"css/images/audioexample.png"},
    {title: "Example Song",artist:"Bruce Springsteen", genre:"Rock",file:"",img:"css/images/audioexample.png"},
    {title: "Example Song",artist:"Tiesto", genre:"Electronic",file:"",img:"css/images/audioexample.png"},
    {title: "Example Song",artist:"Pink Floyd", genre:"Rock",file:"",img:"css/images/audioexample.png"}


];
const artistPhotos = {
  "Bob Marley":"css/images/bob_marley.jpg",
  "Blue Oyster Cult": "css/images/blueoystercult.jpg",
  "Modjo":"css/images/modjo.jpg",
  "Gerardo Ortiz":"css/images/randomuser.jpg",
  "Pink Floyd":"css/images/randomuser.jpg",
  "AC/DC":"css/images/randomuser.jpg",
  "Bruce Springsteen":"css/images/randomuser.jpg",
  "Kaskade":"css/images/randomuser.jpg",
  "Tiesto":"css/images/randomuser.jpg"


};

const artistView= document.getElementById("artistView");
const trackView= document.getElementById("trackView");
const artistSearch = document.getElementById("artistSearch");
const artistClearBtn= document.getElementById("artistClearBtn");
const artistGrid = document.getElementById("artistGrid");
const artistStatus= document.getElementById("artistStatus");
const trackGrid = document.getElementById("trackGrid");
const trackStatus = document.getElementById("trackStatus");
const backBtn= document.getElementById("backBtn");
const bannerImg= document.getElementById("artistBannerImg");
const bannerName = document.getElementById("artistBannerName");
const bannerCount = document.getElementById("artistBannerCount");

// get list of artists music from array
function getArtists() {
  const seen = [];
  const artists = [];

  for (let i = 0; i < musicLibrary.length; i++) {
    const name = musicLibrary[i].artist;
    if (!seen.includes(name)) {
      seen.push(name);
      artists.push(name);
    }
  }
  return artists;
}
// card for artist name and inforamtion
function buildArtistCard(artistName) {
  const tracks = musicLibrary.filter(t => t.artist === artistName);
  //card where artists profile will appear
  const card = document.createElement("div");
  card.className = "artist-card";
  //element for the profile picture
  const img = document.createElement("img");
  img.src = artistPhotos[artistName];
  img.alt = artistName;

  const info = document.createElement("div");
  info.className = "artist-card-info";

  const name = document.createElement("p");
  name.className = "artist-card-name";
  name.textContent = artistName;

  const count = document.createElement("p");
  count.className = "artist-card-count";
  count.textContent = tracks.length + " track" + (tracks.length !== 1 ? "s" : "");

  info.appendChild(name);
  info.appendChild(count);
  card.appendChild(img);
  card.appendChild(info);

  card.addEventListener("click", () => {
    showTrackView(artistName);
  });

  return card;
}

//Inner track card, displays after artist is selected. follows
//similar struture as artist card
function buildTrackCard(track) {
  const card = document.createElement("div");
  card.className = "track-card";

  const img = document.createElement("img");
  img.src = track.img;
  img.alt = track.title + " cover";

  const info = document.createElement("div");
  info.className = "track-info";

  const title = document.createElement("p");
  title.className = "track-title";
  title.textContent = track.title;

  const genre = document.createElement("p");
  genre.className = "track-genre";
  genre.textContent = track.genre;

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = track.file;
  info.appendChild(title);
  info.appendChild(genre);
  info.appendChild(audio);
  card.appendChild(img);
  card.appendChild(info);

  return card;
}
//search artists, show green if there are artists or orange if not
function renderArtists(query = "") {
  artistGrid.innerHTML = "";
  const q = query.trim().toLowerCase();
  const allArtists = getArtists();

  const filtered = allArtists.filter(name => {
    if (q === "") return true;
    return name.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    artistStatus.textContent = `No artists found for "${query}".`;
    artistStatus.style.color = "orange";
  } else {
    artistStatus.textContent =
      q === ""? `Showing all ${filtered.length} artists.`:`${filtered.length} artist(s) found for "${query}".`;
    artistStatus.style.color = "green";
    for (let i = 0; i < filtered.length; i++) {
      artistGrid.appendChild(buildArtistCard(filtered[i]));
    }
  }
}

function showTrackView(artistName) {
  const tracks = musicLibrary.filter(t => t.artist === artistName);
  bannerImg.src= artistPhotos[artistName];
  bannerImg.alt= artistName;
  bannerName.textContent  = artistName;
  bannerCount.textContent = tracks.length + " track" + (tracks.length !== 1 ? "s" : "");
  trackGrid.innerHTML = "";
  for (let i = 0; i < tracks.length; i++) {
    trackGrid.appendChild(buildTrackCard(tracks[i]));
  }
  trackStatus.textContent = "";
  artistView.classList.add("hidden");
  trackView.classList.remove("hidden");
}

function showArtistView() {
  trackView.classList.add("hidden");
  artistView.classList.remove("hidden");
}

artistSearch.addEventListener("input", () => {
  renderArtists(artistSearch.value);
});

backBtn.addEventListener("click", () => {
  showArtistView();
});

artistClearBtn.addEventListener("click", () => {
  artistSearch.value = "";
  renderArtists();
});

renderArtists();