/**
 * CINEWAVE - Core Application Logic
 * Features:
 * - Dynamic Movie Catalog & Filters
 * - Video Player Controls & Time scrubbing
 * - Interactive 5-Star Rating System with dynamic score recalculation
 * - Comment & Review Feed with Spoiler Reveal Protection & Likes
 * - Real-time Movie Upload Modal & Instant Live Injection
 * - Watchlist Management (Stored in localStorage)
 * - Live Instant Search
 */

// ==========================================
// 1. INITIAL MOVIE DATA
// ==========================================
const INITIAL_MOVIES = [
  {
    id: "movie-1",
    title: "Cyberpunk: Neon Horizon",
    genre: "Sci-Fi",
    secondaryGenres: ["Cyberpunk", "Action"],
    year: 2025,
    duration: 134,
    ageRating: "17+",
    director: "Aris Thorne",
    cast: "Elena Rostova, Jax Vance, Kenji Sato",
    uploader: "NeoStudio Productions",
    synopsis: "Di metropolis megastruktur masa depan di mana ingatan manusia dapat diperjualbelikan, seorang detektif cybernetics terpaksa membongkar konspirasi digital yang mengancam kepunahan kesadaran manusia.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ratings: [5, 5, 4, 5, 5, 4, 5],
    comments: [
      {
        id: "c-1",
        author: "Rian Pratama",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        time: "2 jam yang lalu",
        text: "Visual efek neon dan scoring synthwave-nya benar-benar luar biasa! Wajib tonton di layar besar!",
        isSpoiler: false,
        likes: 18,
        isReviewer: true
      },
      {
        id: "c-2",
        author: "Jessica Tania",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        time: "5 jam yang lalu",
        text: "Plot twist di menit ke-90 saat sang detektif menyadari memorinya sendiri ternyata hasil fabrikasi AI sungguh mencengangkan!",
        isSpoiler: true,
        likes: 9,
        isReviewer: false
      },
      {
        id: "c-3",
        author: "Dimas Anggara",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        time: "1 hari yang lalu",
        text: "Satu karya sci-fi terbaik tahun ini. Karakter Jax Vance sangat mendalam.",
        isSpoiler: false,
        likes: 24,
        isReviewer: true
      }
    ]
  },
  {
    id: "movie-2",
    title: "Echoes of the Abyss",
    genre: "Action",
    secondaryGenres: ["Action", "Sci-Fi"],
    year: 2024,
    duration: 118,
    ageRating: "13+",
    director: "Sarah Lin",
    cast: "Mark Bradley, Clara Higgins",
    uploader: "DeepOcean Cinema",
    synopsis: "Ekspedisi eksplorasi palung laut terdalam menemukan struktur peradaban purba terendam air yang mulai mengaktifkan sinyal misterius ke atmosfer bumi.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    ratings: [4, 4, 5, 4, 3, 5],
    comments: [
      {
        id: "c-4",
        author: "Budi Santoso",
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        time: "1 hari yang lalu",
        text: "Suasana bawah airnya bikin deg-degan dari awal sampai akhir!",
        isSpoiler: false,
        likes: 7,
        isReviewer: false
      }
    ]
  },
  {
    id: "movie-3",
    title: "Tales of the Forest Realm",
    genre: "Animation",
    secondaryGenres: ["Animation", "Fantasy"],
    year: 2025,
    duration: 95,
    ageRating: "Semua Umur (SU)",
    director: "Hayato Miyazaki",
    cast: "Voice: Aoi Tanaka, Ryu Evans",
    uploader: "Animatrix Studio",
    synopsis: "Kisah magis seorang bocah desa yang menemukan anak naga purba yang terluka dan memulai perjalanan melintasi lembah terlarang demi mengembalikannya ke habitat aslinya.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ratings: [5, 5, 5, 4, 5],
    comments: [
      {
        id: "c-5",
        author: "Nabila Aurelia",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        time: "3 hari yang lalu",
        text: "Sangat menghangatkan hati! Animasi yang begitu memanjakan mata dan penuh pesan moral keluarga.",
        isSpoiler: false,
        likes: 31,
        isReviewer: true
      }
    ]
  },
  {
    id: "movie-4",
    title: "Silent Horizon: Mars 2088",
    genre: "Sci-Fi",
    secondaryGenres: ["Sci-Fi", "Drama"],
    year: 2026,
    duration: 142,
    ageRating: "13+",
    director: "Cillian Zhao",
    cast: "Maya Laurent, David Kim",
    uploader: "Cosmo Vision Media",
    synopsis: "Ketika badai matahari menghancurkan stasiun komunikasi koloni Mars pertama, dua astronom yang tersisa harus bertahan hidup dengan cadangan oksigen yang semakin menipis.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ratings: [4, 5, 4, 4, 5],
    comments: [
      {
        id: "c-6",
        author: "Fajar Wicaksono",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        time: "4 hari yang lalu",
        text: "Kombinasi sains yang akurat dan ketegangan psikologis yang sangat mantap.",
        isSpoiler: false,
        likes: 12,
        isReviewer: false
      }
    ]
  },
  {
    id: "movie-5",
    title: "Shadows in the Mist",
    genre: "Drama",
    secondaryGenres: ["Drama", "Mystery"],
    year: 2024,
    duration: 105,
    ageRating: "17+",
    director: "Giacomo Rossi",
    cast: "Lucas Gray, Sofia Bianchi",
    uploader: "IndieFest Cinema",
    synopsis: "Di sebuah kota terpencil di pegunungan Alpen, serangkaian surat anonim menguak rahasia kelam dari sebuah keluarga terpandang yang telah terkubur selama tiga dekade.",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    ratings: [4, 4, 3, 5, 4],
    comments: []
  },
  {
    id: "movie-6",
    title: "Chronicles of Elaria",
    genre: "Fantasy",
    secondaryGenres: ["Fantasy", "Action"],
    year: 2025,
    duration: 150,
    ageRating: "13+",
    director: "Rowan Sterling",
    cast: "Aidan Ward, Lilian Thorne",
    uploader: "DragonForge Pictures",
    synopsis: "Pertempuran dahsyat antara klan pemburu kristal sihir dan para penjaga gerbang dimensi kuno di kerajaan langit Elaria.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ratings: [5, 4, 5, 5, 4, 4],
    comments: []
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let movies = JSON.parse(localStorage.getItem("cinewave_movies")) || INITIAL_MOVIES;
let watchlist = JSON.parse(localStorage.getItem("cinewave_watchlist")) || ["movie-1"];
let currentMovie = movies[0];
let selectedRatingValue = 0;
let activeGenreFilter = "all";
let activeSortFilter = "popular";
let currentCommentSort = "newest";

// ==========================================
// 3. DOM ELEMENTS
// ==========================================
const movieGrid = document.getElementById("movieGrid");
const watchlistGrid = document.getElementById("watchlistGrid");
const watchlistCountBadge = document.getElementById("watchlistCount");
const sidebarRecommendList = document.getElementById("sidebarRecommendList");
const genreFilterBar = document.getElementById("genreFilterBar");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// Hero Elements
const heroBackdrop = document.getElementById("heroBackdrop");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const heroRating = document.getElementById("heroRating");
const heroGenres = document.getElementById("heroGenres");
const heroPlayBtn = document.getElementById("heroPlayBtn");
const heroWatchlistBtn = document.getElementById("heroWatchlistBtn");
const heroInfoBtn = document.getElementById("heroInfoBtn");

// Player Elements
const mainVideoPlayer = document.getElementById("mainVideoPlayer");
const videoSource = document.getElementById("videoSource");
const nowPlayingTitle = document.getElementById("nowPlayingTitle");
const playPauseBtn = document.getElementById("playPauseBtn");
const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");
const muteBtn = document.getElementById("muteBtn");
const volumeSlider = document.getElementById("volumeSlider");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");
const progressBarFill = document.getElementById("progressBarFill");
const progressBarHover = document.getElementById("progressBarHover");
const progressScrubber = document.getElementById("progressScrubber");
const progressBarContainer = document.getElementById("progressBarContainer");
const speedBtn = document.getElementById("speedBtn");
const speedMenu = document.getElementById("speedMenu");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const theaterToggleBtn = document.getElementById("theaterToggleBtn");
const videoWrapper = document.getElementById("videoWrapper");

// Cinema Modal Overlay Elements
const cinemaModal = document.getElementById("cinemaModal");
const closeCinemaBtn = document.getElementById("closeCinemaBtn");
const closeCinemaCrossBtn = document.getElementById("closeCinemaCrossBtn");
const cinemaNavTitle = document.getElementById("cinemaNavTitle");

// Hub Details & Review Elements
const playerMovieTitle = document.getElementById("playerMovieTitle");
const playerMovieTags = document.getElementById("playerMovieTags");
const playerMovieSynopsis = document.getElementById("playerMovieSynopsis");
const playerDirector = document.getElementById("playerDirector");
const playerCast = document.getElementById("playerCast");
const playerUploader = document.getElementById("playerUploader");
const activeWatchlistBtn = document.getElementById("activeWatchlistBtn");
const shareBtn = document.getElementById("shareBtn");

const commentCountBadge = document.getElementById("commentCountBadge");
const averageScoreText = document.getElementById("averageScoreText");
const scoreStarsVisual = document.getElementById("scoreStarsVisual");
const totalVotesText = document.getElementById("totalVotesText");

const userStarSelector = document.getElementById("userStarSelector");
const starBtns = document.querySelectorAll(".star-btn");
const selectedStarValueText = document.getElementById("selectedStarValue");
const commentTextInput = document.getElementById("commentTextInput");
const isSpoilerCheck = document.getElementById("isSpoilerCheck");
const submitCommentBtn = document.getElementById("submitCommentBtn");
const commentsListContainer = document.getElementById("commentsListContainer");
const sortNewestCommentsBtn = document.getElementById("sortNewestComments");
const sortTopCommentsBtn = document.getElementById("sortTopComments");

// Modal & Local Upload Elements
const openUploadModalBtn = document.getElementById("openUploadModalBtn");
const closeUploadModalBtn = document.getElementById("closeUploadModalBtn");
const cancelUploadBtn = document.getElementById("cancelUploadBtn");
const uploadModal = document.getElementById("uploadModal");
const uploadMovieForm = document.getElementById("uploadMovieForm");
const videoDropZone = document.getElementById("videoDropZone");
const videoFileInput = document.getElementById("videoFileInput");
const chosenVideoName = document.getElementById("chosenVideoName");
const videoMetaBadge = document.getElementById("videoMetaBadge");
const posterFileInput = document.getElementById("posterFileInput");
const posterUrlInput = document.getElementById("posterUrlInput");
const posterPreviewBox = document.getElementById("posterPreviewBox");

// Poster Tab Buttons & Panels
const tabAutoThumb = document.getElementById("tabAutoThumb");
const tabLocalImg = document.getElementById("tabLocalImg");
const tabUrlImg = document.getElementById("tabUrlImg");
const panelAutoThumb = document.getElementById("panelAutoThumb");
const panelLocalImg = document.getElementById("panelLocalImg");
const panelUrlImg = document.getElementById("panelUrlImg");

const toastContainer = document.getElementById("toastContainer");

// ==========================================
// 4. INDEXEDDB LOCAL STORAGE ENGINE (NO DATABASE SERVER)
// ==========================================
const DB_NAME = "CineWaveLocalStore";
const DB_VERSION = 1;
const STORE_NAME = "local_movies";

function openLocalDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

async function saveMovieToIndexedDB(movie) {
  try {
    const db = await openLocalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(movie);
      req.onsuccess = () => resolve(true);
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn("IndexedDB gagal menyimpan, menggunakan memori sesi:", err);
  }
}

async function loadAllLocalMoviesFromIndexedDB() {
  try {
    const db = await openLocalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const localList = req.result || [];
        localList.forEach(m => {
          if (m.videoBlob) {
            m.videoUrl = URL.createObjectURL(m.videoBlob);
          }
        });
        resolve(localList);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn("IndexedDB load error:", err);
    return [];
  }
}

async function deleteMovieFromIndexedDB(id) {
  try {
    const db = await openLocalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn("IndexedDB delete error:", err);
  }
}

// ==========================================
// 5. INITIALIZATION
// ==========================================
async function initApp() {
  updateWatchlistBadge();

  // Load any local movies previously saved in IndexedDB
  const localMovies = await loadAllLocalMoviesFromIndexedDB();
  if (localMovies && localMovies.length > 0) {
    const localIds = new Set(localMovies.map(m => m.id));
    movies = [...localMovies, ...movies.filter(m => !localIds.has(m.id))];
  }

  loadHeroMovie(movies[0]);
  loadPlayerMovie(movies[0], false);
  renderCatalogGrid();
  renderWatchlistGrid();
  renderSidebarRecommendations();
  setupEventListeners();
  setupVideoPlayer();
}

// ==========================================
// 6. HELPER UTILITIES
// ==========================================
function saveMovies() {
  // Hanya simpan film non-lokal ke localStorage agar tidak melebihi kuota 5MB
  const nonLocalMovies = movies.filter(m => !m.isLocal);
  localStorage.setItem("cinewave_movies", JSON.stringify(nonLocalMovies));

  // Simpan update ulasan/rating untuk film lokal di IndexedDB
  if (currentMovie && currentMovie.isLocal) {
    saveMovieToIndexedDB(currentMovie);
  }
}

function saveWatchlist() {
  localStorage.setItem("cinewave_watchlist", JSON.stringify(watchlist));
  updateWatchlistBadge();
  renderWatchlistGrid();
  updateWatchlistButtonStates();
}

function updateWatchlistBadge() {
  watchlistCountBadge.textContent = watchlist.length;
}

function calculateAverageRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, curr) => acc + curr, 0);
  return (sum / ratings.length).toFixed(1);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "fa-circle-check" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(120%)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 6. HERO & MOVIE PLAYER PRESENTATION
// ==========================================
function loadHeroMovie(movie) {
  heroBackdrop.style.backgroundImage = `url('${movie.backdrop || movie.poster}')`;
  heroTitle.textContent = movie.title;
  heroDesc.textContent = movie.synopsis;
  heroRating.textContent = calculateAverageRating(movie.ratings);

  heroGenres.innerHTML = movie.secondaryGenres.map(g => `<span class="genre-pill">${g}</span>`).join("");
}

function closeCinemaModal() {
  cinemaModal.classList.remove("show");
  document.body.style.overflow = "";
  mainVideoPlayer.pause();
  updatePlayPauseIcon(false);
}

function loadPlayerMovie(movie, autoPlay = true, openOverlay = false) {
  currentMovie = movie;

  if (openOverlay) {
    cinemaModal.classList.add("show");
    document.body.style.overflow = "hidden";
    if (cinemaNavTitle) {
      cinemaNavTitle.innerHTML = `<i class="fa-solid fa-play"></i> ${movie.title}`;
    }
  }

  // Update UI Elements
  nowPlayingTitle.textContent = `Sedang Ditonton: ${movie.title}`;
  playerMovieTitle.textContent = movie.title;
  playerMovieSynopsis.textContent = movie.synopsis;
  playerDirector.textContent = movie.director || "Tidak Diketahui";
  playerCast.textContent = movie.cast || "Berbagai Pemeran";
  playerUploader.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${movie.uploader || "Komunitas CineWave"}`;

  if (movie.isLocal && movie.videoBlob && (!movie.videoUrl || movie.videoUrl === "")) {
    movie.videoUrl = URL.createObjectURL(movie.videoBlob);
  }

  playerMovieTags.innerHTML = `
    <span class="genre-pill">${movie.genre}</span>
    <span class="meta-dot">•</span>
    <span>${movie.year}</span>
    <span class="meta-dot">•</span>
    <span>${movie.duration} Menit</span>
    <span class="meta-dot">•</span>
    <span class="quality-tag">1080p HD</span>
    ${movie.isLocal ? '<span class="badge-local"><i class="fa-solid fa-laptop"></i> File Lokal (Offline)</span>' : ''}
  `;

  // Video source switch
  mainVideoPlayer.poster = movie.backdrop || movie.poster;
  if (videoSource.src !== movie.videoUrl) {
    videoSource.src = movie.videoUrl;
    mainVideoPlayer.load();
    if (autoPlay) {
      mainVideoPlayer.play().catch(e => console.log("Autoplay dicegah oleh browser:", e));
      updatePlayPauseIcon(true);
    } else {
      updatePlayPauseIcon(false);
    }
  }

  updateWatchlistButtonStates();
  renderRatingAndComments();
  renderSidebarRecommendations();
}

function updateWatchlistButtonStates() {
  const isBookmarked = watchlist.includes(currentMovie.id);
  const heroIsBookmarked = watchlist.includes(movies[0].id);

  if (isBookmarked) {
    activeWatchlistBtn.classList.add("btn-primary");
    activeWatchlistBtn.classList.remove("btn-secondary");
    activeWatchlistBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> <span>Tersimpan di Watchlist</span>`;
  } else {
    activeWatchlistBtn.classList.remove("btn-primary");
    activeWatchlistBtn.classList.add("btn-secondary");
    activeWatchlistBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i> <span>Simpan ke Watchlist</span>`;
  }

  if (heroIsBookmarked) {
    heroWatchlistBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Tersimpan di Watchlist`;
    heroWatchlistBtn.classList.add("btn-primary");
  } else {
    heroWatchlistBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i> Tambah ke Watchlist`;
    heroWatchlistBtn.classList.remove("btn-primary");
  }
}

// ==========================================
// 7. VIDEO PLAYER LOGIC & CONTROLS
// ==========================================
function setupVideoPlayer() {
  // Play/Pause Click
  playPauseBtn.addEventListener("click", togglePlayPause);
  mainVideoPlayer.addEventListener("click", togglePlayPause);

  function togglePlayPause() {
    if (mainVideoPlayer.paused) {
      mainVideoPlayer.play();
      updatePlayPauseIcon(true);
    } else {
      mainVideoPlayer.pause();
      updatePlayPauseIcon(false);
    }
  }

  // Time Updates
  mainVideoPlayer.addEventListener("timeupdate", () => {
    const cur = mainVideoPlayer.currentTime;
    const dur = mainVideoPlayer.duration;
    currentTimeEl.textContent = formatTime(cur);

    if (!isNaN(dur) && dur > 0) {
      const pct = (cur / dur) * 100;
      progressBarFill.style.width = `${pct}%`;
      progressScrubber.style.left = `${pct}%`;
    }
  });

  mainVideoPlayer.addEventListener("loadedmetadata", () => {
    durationTimeEl.textContent = formatTime(mainVideoPlayer.duration);
  });

  mainVideoPlayer.addEventListener("ended", () => {
    updatePlayPauseIcon(false);
  });

  // Rewind / Forward 10s
  rewindBtn.addEventListener("click", () => {
    mainVideoPlayer.currentTime = Math.max(0, mainVideoPlayer.currentTime - 10);
  });
  forwardBtn.addEventListener("click", () => {
    mainVideoPlayer.currentTime = Math.min(mainVideoPlayer.duration, mainVideoPlayer.currentTime + 10);
  });

  // Volume & Mute
  volumeSlider.addEventListener("input", (e) => {
    mainVideoPlayer.volume = e.target.value;
    mainVideoPlayer.muted = (e.target.value == 0);
    updateVolumeIcon();
  });

  muteBtn.addEventListener("click", () => {
    mainVideoPlayer.muted = !mainVideoPlayer.muted;
    if (mainVideoPlayer.muted) {
      muteBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    } else {
      updateVolumeIcon();
    }
  });

  function updateVolumeIcon() {
    if (mainVideoPlayer.muted || mainVideoPlayer.volume === 0) {
      muteBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    } else if (mainVideoPlayer.volume < 0.5) {
      muteBtn.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
    } else {
      muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
  }

  // Progress Bar Seek
  progressBarContainer.addEventListener("click", (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    mainVideoPlayer.currentTime = pos * mainVideoPlayer.duration;
  });

  progressBarContainer.addEventListener("mousemove", (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    progressBarHover.style.width = `${pos * 100}%`;
  });

  progressBarContainer.addEventListener("mouseleave", () => {
    progressBarHover.style.width = `0%`;
  });

  // Playback Speed
  speedBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    speedMenu.classList.toggle("show");
  });

  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      const speed = parseFloat(e.target.dataset.speed);
      mainVideoPlayer.playbackRate = speed;
      speedBtn.textContent = `${speed}x`;

      document.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
      e.target.classList.add("active");
      speedMenu.classList.remove("show");
    });
  });

  document.addEventListener("click", () => {
    speedMenu.classList.remove("show");
  });

  // Fullscreen
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen().catch(err => {
        alert(`Error fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  // Theater Mode
  theaterToggleBtn.addEventListener("click", () => {
    videoWrapper.classList.toggle("theater-wide");
    showToast("Mode theater disesuaikan!", "info");
  });

  // Keyboard Shortcuts (Space: Play/Pause, F: Fullscreen, Left/Right: Seek)
  window.addEventListener("keydown", (e) => {
    if (["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())) {
      return; // Ignore inside form inputs
    }
    if (e.code === "Space") {
      e.preventDefault();
      togglePlayPause();
    } else if (e.code === "KeyF") {
      e.preventDefault();
      fullscreenBtn.click();
    } else if (e.code === "ArrowLeft") {
      rewindBtn.click();
    } else if (e.code === "ArrowRight") {
      forwardBtn.click();
    }
  });
}

function updatePlayPauseIcon(isPlaying) {
  if (isPlaying) {
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    videoWrapper.classList.remove("paused");
  } else {
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    videoWrapper.classList.add("paused");
  }
}

// ==========================================
// 8. RATING & REVIEW SYSTEM
// ==========================================
function renderRatingAndComments() {
  const avg = calculateAverageRating(currentMovie.ratings);
  const totalVotes = currentMovie.ratings ? currentMovie.ratings.length : 0;
  const comments = currentMovie.comments || [];

  averageScoreText.textContent = avg;
  totalVotesText.textContent = `Berdasarkan ${totalVotes} voting penonton`;
  commentCountBadge.textContent = `(${comments.length} Ulasan)`;

  // Render Visual Stars
  const numAvg = parseFloat(avg);
  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (numAvg >= i) {
      starsHtml += `<i class="fa-solid fa-star"></i>`;
    } else if (numAvg >= i - 0.5) {
      starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else {
      starsHtml += `<i class="fa-regular fa-star"></i>`;
    }
  }
  scoreStarsVisual.innerHTML = starsHtml;

  // Render Comments List
  renderCommentsList();
}

function renderCommentsList() {
  let list = [...(currentMovie.comments || [])];

  if (currentCommentSort === "top") {
    list.sort((a, b) => b.likes - a.likes || b.rating - a.rating);
  }

  if (list.length === 0) {
    commentsListContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-comment-dots"></i>
        <p>Belum ada ulasan untuk film ini. Jadilah yang pertama memberikan penilaian!</p>
      </div>
    `;
    return;
  }

  commentsListContainer.innerHTML = list.map(c => {
    let starsStr = "";
    for (let i = 1; i <= 5; i++) {
      starsStr += `<i class="${i <= c.rating ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
    }

    const spoilerIndicator = c.isSpoiler 
      ? `<div class="spoiler-indicator-banner" onclick="toggleSpoilerBlur('${c.id}')">
           <i class="fa-solid fa-eye"></i> Klik untuk Buka Spoiler
         </div>`
      : '';

    const textClass = c.isSpoiler ? 'comment-text spoiler-hidden' : 'comment-text';

    return `
      <div class="comment-item" id="comment-box-${c.id}">
        <img src="${c.avatar}" alt="${c.author}" class="comment-avatar">
        <div class="comment-body">
          <div class="comment-header">
            <div>
              <span class="user-name-tag">
                ${c.author} 
                ${c.isReviewer ? '<span class="badge-reviewer"><i class="fa-solid fa-award"></i> Reviewer</span>' : ''}
              </span>
              <div class="comment-stars">${starsStr}</div>
            </div>
            <span class="comment-time">${c.time}</span>
          </div>
          ${spoilerIndicator}
          <p class="${textClass}" id="text-${c.id}" onclick="toggleSpoilerBlur('${c.id}')">${c.text}</p>
          <div class="comment-actions">
            <button class="btn-like" onclick="likeComment('${c.id}')">
              <i class="fa-regular fa-thumbs-up"></i>
              <span id="likes-count-${c.id}">${c.likes}</span> Bermanfaat
            </button>
            <span class="meta-dot">•</span>
            <span>Balas</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Toggle spoiler reveal
window.toggleSpoilerBlur = function(commentId) {
  const textEl = document.getElementById(`text-${commentId}`);
  if (textEl && textEl.classList.contains("spoiler-hidden")) {
    textEl.classList.remove("spoiler-hidden");
    showToast("Peringatan spoiler dibuka", "info");
  }
};

// Like comment
window.likeComment = function(commentId) {
  const c = currentMovie.comments.find(item => item.id === commentId);
  if (c) {
    c.likes += 1;
    const span = document.getElementById(`likes-count-${commentId}`);
    if (span) span.textContent = c.likes;
    saveMovies();
    showToast("Terima kasih atas voting ulasan!", "success");
  }
};

// Interactive Star Selector
starBtns.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    const val = parseInt(btn.dataset.value);
    highlightStars(val);
  });

  btn.addEventListener("click", () => {
    selectedRatingValue = parseInt(btn.dataset.value);
    selectedStarValueText.textContent = `${selectedRatingValue} / 5 Bintang`;
    highlightStars(selectedRatingValue);
  });
});

userStarSelector.addEventListener("mouseleave", () => {
  highlightStars(selectedRatingValue);
});

function highlightStars(val) {
  starBtns.forEach(b => {
    const starVal = parseInt(b.dataset.value);
    if (starVal <= val) {
      b.classList.remove("fa-regular");
      b.classList.add("fa-solid", "active");
    } else {
      b.classList.remove("fa-solid", "active");
      b.classList.add("fa-regular");
    }
  });
}

// Submit Comment
submitCommentBtn.addEventListener("click", () => {
  const text = commentTextInput.value.trim();

  if (selectedRatingValue === 0) {
    showToast("Silakan pilih rating bintang terlebih dahulu!", "warning");
    return;
  }
  if (!text) {
    showToast("Tuliskan ulasan atau komentar kamu terlebih dahulu!", "warning");
    return;
  }

  const newComment = {
    id: `c-${Date.now()}`,
    author: "Anda (Penonton)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: selectedRatingValue,
    time: "Baru saja",
    text: text,
    isSpoiler: isSpoilerCheck.checked,
    likes: 0,
    isReviewer: true
  };

  currentMovie.comments.unshift(newComment);
  currentMovie.ratings.push(selectedRatingValue);
  saveMovies();

  // Reset form
  commentTextInput.value = "";
  isSpoilerCheck.checked = false;
  selectedRatingValue = 0;
  highlightStars(0);
  selectedStarValueText.textContent = `0 / 5`;

  renderRatingAndComments();
  showToast("Ulasan & rating kamu berhasil dipublikasikan!", "success");
});

// Sort comments toggle
sortNewestCommentsBtn.addEventListener("click", () => {
  currentCommentSort = "newest";
  sortNewestCommentsBtn.classList.add("active");
  sortTopCommentsBtn.classList.remove("active");
  renderCommentsList();
});

sortTopCommentsBtn.addEventListener("click", () => {
  currentCommentSort = "top";
  sortTopCommentsBtn.classList.add("active");
  sortNewestCommentsBtn.classList.remove("active");
  renderCommentsList();
});

// ==========================================
// 9. CATALOG RENDERING & FILTERING
// ==========================================
function renderCatalogGrid() {
  let filtered = [...movies];

  // Genre filter
  if (activeGenreFilter !== "all") {
    filtered = filtered.filter(m => 
      m.genre.toLowerCase() === activeGenreFilter.toLowerCase() ||
      (m.secondaryGenres && m.secondaryGenres.some(sg => sg.toLowerCase() === activeGenreFilter.toLowerCase()))
    );
  }

  // Search filter
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(m => 
      m.title.toLowerCase().includes(query) ||
      m.genre.toLowerCase().includes(query) ||
      (m.cast && m.cast.toLowerCase().includes(query)) ||
      (m.director && m.director.toLowerCase().includes(query))
    );
  }

  // Sort
  if (activeSortFilter === "highest") {
    filtered.sort((a, b) => parseFloat(calculateAverageRating(b.ratings)) - parseFloat(calculateAverageRating(a.ratings)));
  } else if (activeSortFilter === "newest") {
    filtered.sort((a, b) => b.year - a.year);
  } else {
    // Popular: based on ratings count
    filtered.sort((a, b) => b.ratings.length - a.ratings.length);
  }

  if (filtered.length === 0) {
    movieGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-film"></i>
        <p>Tidak ada film yang cocok dengan filter atau kata kunci "${query}".</p>
      </div>
    `;
    return;
  }

  movieGrid.innerHTML = filtered.map(movie => createMovieCardHtml(movie)).join("");
}

function createMovieCardHtml(movie) {
  const isBookmarked = watchlist.includes(movie.id);
  const avg = calculateAverageRating(movie.ratings);

  return `
    <div class="movie-card" onclick="selectMovieToPlay('${movie.id}')">
      <div class="card-poster-wrapper">
        <img src="${movie.poster}" alt="${movie.title}" class="card-poster" loading="lazy">
        <span class="card-badge-rating"><i class="fa-solid fa-star"></i> ${avg}</span>
        ${movie.isLocal ? `<span class="badge-local" style="position: absolute; top: 10px; left: 10px; z-index: 5;"><i class="fa-solid fa-laptop"></i> File Lokal</span>` : ''}
        
        <div class="card-quick-actions" onclick="event.stopPropagation()">
          <button class="btn-card-action" onclick="selectMovieToPlay('${movie.id}')" title="Putar Sekarang">
            <i class="fa-solid fa-play"></i>
          </button>
          <button class="btn-card-action btn-card-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
                  onclick="toggleWatchlist('${movie.id}')" 
                  title="${isBookmarked ? 'Hapus dari Watchlist' : 'Tambah ke Watchlist'}">
            <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
          </button>
          ${movie.isLocal ? `
            <button class="btn-card-action btn-card-delete" onclick="deleteLocalMovie('${movie.id}')" title="Hapus Film Lokal">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          ` : ''}
        </div>
      </div>
      
      <div class="card-details">
        <h4 class="card-movie-title" title="${movie.title}">${movie.title}</h4>
        <div class="card-movie-meta">
          <span>${movie.genre}</span>
          <span class="meta-dot">•</span>
          <span>${movie.year}</span>
          <span class="meta-dot">•</span>
          <span>${movie.duration}m</span>
        </div>
      </div>
    </div>
  `;
}

window.deleteLocalMovie = async function(movieId) {
  if (!confirm("Apakah kamu yakin ingin menghapus film lokal ini dari penyimpanan browser?")) return;
  await deleteMovieFromIndexedDB(movieId);
  movies = movies.filter(m => m.id !== movieId);
  if (watchlist.includes(movieId)) {
    watchlist = watchlist.filter(id => id !== movieId);
    saveWatchlist();
  }
  if (currentMovie && currentMovie.id === movieId) {
    loadPlayerMovie(movies[0], false);
  }
  renderCatalogGrid();
  renderWatchlistGrid();
  renderSidebarRecommendations();
  showToast("Film lokal telah dihapus dari browser.", "info");
};

window.selectMovieToPlay = function(movieId) {
  const target = movies.find(m => m.id === movieId);
  if (target) {
    loadPlayerMovie(target, true, true);
    showToast(`Memutar: ${target.title}`, "info");
  }
};

// ==========================================
// 10. WATCHLIST LOGIC
// ==========================================
window.toggleWatchlist = function(movieId) {
  const index = watchlist.indexOf(movieId);
  if (index > -1) {
    watchlist.splice(index, 1);
    showToast("Film dihapus dari Watchlist", "warning");
  } else {
    watchlist.push(movieId);
    showToast("Film berhasil ditambahkan ke Watchlist!", "success");
  }
  saveWatchlist();
  renderCatalogGrid();
};

function renderWatchlistGrid() {
  const savedMovies = movies.filter(m => watchlist.includes(m.id));

  if (savedMovies.length === 0) {
    watchlistGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-bookmark"></i>
        <p>Watchlist kamu masih kosong. Klik ikon bookmark pada film untuk menyimpannya di sini!</p>
      </div>
    `;
    return;
  }

  watchlistGrid.innerHTML = savedMovies.map(movie => createMovieCardHtml(movie)).join("");
}

// ==========================================
// 11. SIDEBAR RECOMMENDATIONS
// ==========================================
function renderSidebarRecommendations() {
  const related = movies.filter(m => m.id !== currentMovie.id).slice(0, 4);

  sidebarRecommendList.innerHTML = related.map(m => `
    <div class="sidebar-movie-card" onclick="selectMovieToPlay('${m.id}')">
      <img src="${m.poster}" alt="${m.title}" class="sidebar-poster">
      <div class="sidebar-info">
        <h5 class="sidebar-movie-title">${m.title}</h5>
        <div class="sidebar-movie-meta">
          <span>${m.genre}</span>
          <span class="meta-dot">•</span>
          <span class="sidebar-star"><i class="fa-solid fa-star"></i> ${calculateAverageRating(m.ratings)}</span>
        </div>
        <span class="quality-tag" style="align-self: flex-start;">${m.duration} Menit</span>
      </div>
    </div>
  `).join("");
}

// ==========================================
// 12. VIDEO FRAME & THUMBNAIL EXTRACTOR
// ==========================================
function extractVideoThumbnailAndDuration(file) {
  return new Promise((resolve) => {
    const tempVideo = document.createElement("video");
    tempVideo.preload = "metadata";
    tempVideo.muted = true;
    tempVideo.playsInline = true;
    const blobUrl = URL.createObjectURL(file);
    tempVideo.src = blobUrl;

    tempVideo.onloadedmetadata = () => {
      const dur = tempVideo.duration || 0;
      tempVideo.currentTime = Math.min(2.0, dur > 2 ? 2 : 0);
    };

    tempVideo.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = tempVideo.videoWidth || 640;
        canvas.height = tempVideo.videoHeight || 360;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        const thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        const durationMin = Math.max(1, Math.round(tempVideo.duration / 60));
        URL.revokeObjectURL(blobUrl);
        resolve({ durationMin, thumbnailDataUrl });
      } catch (e) {
        URL.revokeObjectURL(blobUrl);
        resolve({ durationMin: 120, thumbnailDataUrl: null });
      }
    };

    tempVideo.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      resolve({ durationMin: 120, thumbnailDataUrl: null });
    };
  });
}

// ==========================================
// 13. UPLOAD MODAL & LOCAL MOVIE CREATION
// ==========================================
function setupUploadModal() {
  let selectedLocalVideoFile = null;
  let autoGeneratedPosterUrl = null;
  let selectedLocalPosterData = null;
  let activePosterMode = "auto"; // "auto" | "local" | "url"

  openUploadModalBtn.addEventListener("click", () => {
    uploadModal.classList.add("show");
  });

  const closeModal = () => {
    uploadModal.classList.remove("show");
  };

  closeUploadModalBtn.addEventListener("click", closeModal);
  cancelUploadBtn.addEventListener("click", closeModal);

  uploadModal.addEventListener("click", (e) => {
    if (e.target === uploadModal) closeModal();
  });

  // Poster Tab Switching
  tabAutoThumb.addEventListener("click", () => {
    activePosterMode = "auto";
    tabAutoThumb.classList.add("active");
    tabLocalImg.classList.remove("active");
    tabUrlImg.classList.remove("active");
    panelAutoThumb.style.display = "block";
    panelLocalImg.style.display = "none";
    panelUrlImg.style.display = "none";

    if (autoGeneratedPosterUrl) {
      posterPreviewBox.style.backgroundImage = `url('${autoGeneratedPosterUrl}')`;
      posterPreviewBox.innerHTML = "";
    } else {
      posterPreviewBox.style.backgroundImage = "none";
      posterPreviewBox.innerHTML = "<span>Pilih video untuk auto-generate poster</span>";
    }
  });

  tabLocalImg.addEventListener("click", () => {
    activePosterMode = "local";
    tabLocalImg.classList.add("active");
    tabAutoThumb.classList.remove("active");
    tabUrlImg.classList.remove("active");
    panelLocalImg.style.display = "block";
    panelAutoThumb.style.display = "none";
    panelUrlImg.style.display = "none";

    if (selectedLocalPosterData) {
      posterPreviewBox.style.backgroundImage = `url('${selectedLocalPosterData}')`;
      posterPreviewBox.innerHTML = "";
    }
  });

  tabUrlImg.addEventListener("click", () => {
    activePosterMode = "url";
    tabUrlImg.classList.add("active");
    tabAutoThumb.classList.remove("active");
    tabLocalImg.classList.remove("active");
    panelUrlImg.style.display = "block";
    panelAutoThumb.style.display = "none";
    panelLocalImg.style.display = "none";

    const url = posterUrlInput.value.trim();
    if (url) {
      posterPreviewBox.style.backgroundImage = `url('${url}')`;
      posterPreviewBox.innerHTML = "";
    }
  });

  // Local Poster File Selection
  posterFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        selectedLocalPosterData = evt.target.result;
        posterPreviewBox.style.backgroundImage = `url('${selectedLocalPosterData}')`;
        posterPreviewBox.innerHTML = "";
      };
      reader.readAsDataURL(file);
    }
  });

  // Poster URL preview
  posterUrlInput.addEventListener("input", (e) => {
    const url = e.target.value.trim();
    if (url && activePosterMode === "url") {
      posterPreviewBox.style.backgroundImage = `url('${url}')`;
      posterPreviewBox.innerHTML = "";
    }
  });

  // Local Video File Processing
  function handleVideoFile(file) {
    if (!file) return;
    selectedLocalVideoFile = file;

    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    chosenVideoName.textContent = `File terpilih: ${file.name} (${sizeMb} MB)`;
    videoMetaBadge.style.display = "inline-flex";
    videoMetaBadge.innerHTML = `<i class="fa-solid fa-laptop"></i> File Lokal (${sizeMb} MB) • 100% Offline`;

    // Auto-fill Title from filename if empty
    const titleInput = document.getElementById("uploadTitle");
    if (!titleInput.value.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      titleInput.value = cleanName;
    }

    // Auto-extract thumbnail frame and duration
    posterPreviewBox.innerHTML = `<span><i class="fa-solid fa-spinner fa-spin"></i> Mengekstrak frame video...</span>`;
    extractVideoThumbnailAndDuration(file).then(({ durationMin, thumbnailDataUrl }) => {
      const durInput = document.getElementById("uploadDuration");
      if (durationMin && !durInput.value) {
        durInput.value = durationMin;
      }
      if (thumbnailDataUrl) {
        autoGeneratedPosterUrl = thumbnailDataUrl;
        if (activePosterMode === "auto") {
          posterPreviewBox.style.backgroundImage = `url('${thumbnailDataUrl}')`;
          posterPreviewBox.innerHTML = "";
        }
      } else {
        if (activePosterMode === "auto") {
          posterPreviewBox.innerHTML = `<span>Preview Sampul</span>`;
        }
      }
    });
  }

  // Drop zone clicks and drag-and-drop
  videoDropZone.addEventListener("click", () => videoFileInput.click());
  videoFileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleVideoFile(e.target.files[0]);
    }
  });

  videoDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    videoDropZone.classList.add("dragover");
  });

  videoDropZone.addEventListener("dragleave", () => {
    videoDropZone.classList.remove("dragover");
  });

  videoDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    videoDropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      videoFileInput.files = e.dataTransfer.files;
      handleVideoFile(e.dataTransfer.files[0]);
    }
  });

  // Submit Upload Form (100% Local / No Database)
  uploadMovieForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("uploadTitle").value.trim();
    const genre = document.getElementById("uploadGenre").value;
    const year = parseInt(document.getElementById("uploadYear").value) || 2026;
    const duration = parseInt(document.getElementById("uploadDuration").value) || 110;
    const ageRating = document.getElementById("uploadAgeRating").value;
    const director = document.getElementById("uploadDirector").value.trim() || "Kreator Anda";
    const synopsis = document.getElementById("uploadSynopsis").value.trim();

    // Determine Video Source
    let finalVideoUrl = "";
    let finalVideoBlob = null;
    let isLocal = false;

    if (selectedLocalVideoFile) {
      finalVideoUrl = URL.createObjectURL(selectedLocalVideoFile);
      finalVideoBlob = selectedLocalVideoFile;
      isLocal = true;
    } else {
      const manualUrl = document.getElementById("videoUrlInput") ? document.getElementById("videoUrlInput").value.trim() : "";
      if (manualUrl) {
        finalVideoUrl = manualUrl;
      } else {
        finalVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
      }
    }

    // Determine Poster Source
    let finalPoster = "";
    if (activePosterMode === "auto" && autoGeneratedPosterUrl) {
      finalPoster = autoGeneratedPosterUrl;
    } else if (activePosterMode === "local" && selectedLocalPosterData) {
      finalPoster = selectedLocalPosterData;
    } else if (posterUrlInput && posterUrlInput.value.trim()) {
      finalPoster = posterUrlInput.value.trim();
    } else {
      finalPoster = autoGeneratedPosterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";
    }

    const newMovie = {
      id: `local-movie-${Date.now()}`,
      title,
      genre,
      secondaryGenres: [genre, isLocal ? "Lokal" : "Indie"],
      year,
      duration,
      ageRating,
      director,
      cast: isLocal ? "Koleksi Pribadi Lokal" : "Pemeran Kreator",
      uploader: isLocal ? "Penyimpanan Browser (Offline)" : "Kreator CineWave",
      synopsis,
      poster: finalPoster,
      backdrop: finalPoster,
      videoUrl: finalVideoUrl,
      videoBlob: finalVideoBlob,
      isLocal: isLocal,
      ratings: [5],
      comments: [
        {
          id: `c-local-${Date.now()}`,
          author: "Sistem Offline CineWave",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          rating: 5,
          time: "Baru saja",
          text: `Film "${title}" berhasil dimuat dari komputer kamu dan disimpan di penyimpanan browser lokal (IndexedDB). Tidak memerlukan server database!`,
          isSpoiler: false,
          likes: 1,
          isReviewer: true
        }
      ]
    };

    // Save to IndexedDB if local file
    if (isLocal) {
      await saveMovieToIndexedDB(newMovie);
    }

    movies.unshift(newMovie);
    saveMovies();

    // Reset Form State
    uploadMovieForm.reset();
    selectedLocalVideoFile = null;
    autoGeneratedPosterUrl = null;
    selectedLocalPosterData = null;
    chosenVideoName.textContent = "Belum ada file dipilih";
    videoMetaBadge.style.display = "none";
    posterPreviewBox.style.backgroundImage = "none";
    posterPreviewBox.innerHTML = "<span>Preview Sampul / Poster</span>";
    tabAutoThumb.click();
    closeModal();

    renderCatalogGrid();
    loadPlayerMovie(newMovie, true, true);
    showToast(`Sukses! Film lokal "${newMovie.title}" berhasil dimuat dan siap ditonton!`, "success");
  });
}

// ==========================================
// 14. EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // Cinema Modal Close
  if (closeCinemaBtn) {
    closeCinemaBtn.addEventListener("click", closeCinemaModal);
  }
  if (closeCinemaCrossBtn) {
    closeCinemaCrossBtn.addEventListener("click", closeCinemaModal);
  }

  // Hero CTA
  heroPlayBtn.addEventListener("click", () => {
    loadPlayerMovie(movies[0], true, true);
  });

  heroWatchlistBtn.addEventListener("click", () => {
    toggleWatchlist(movies[0].id);
  });

  heroInfoBtn.addEventListener("click", () => {
    loadPlayerMovie(movies[0], false, true);
  });

  // Active Player Watchlist
  activeWatchlistBtn.addEventListener("click", () => {
    toggleWatchlist(currentMovie.id);
  });

  // Share button
  shareBtn.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({
        title: currentMovie.title,
        text: `Tonton film keren "${currentMovie.title}" di CineWave!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Tautan film berhasil disalin ke clipboard!", "success");
    }
  });

  // Clear Watchlist
  document.getElementById("clearWatchlistBtn").addEventListener("click", () => {
    if (watchlist.length === 0) return;
    if (confirm("Apakah kamu yakin ingin mengosongkan seluruh daftar watchlist?")) {
      watchlist = [];
      saveWatchlist();
      renderCatalogGrid();
      showToast("Daftar Watchlist telah dikosongkan.", "info");
    }
  });

  // Genre Filters
  genreFilterBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-chip")) {
      document.querySelectorAll("#genreFilterBar .filter-chip").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      activeGenreFilter = e.target.dataset.genre;
      renderCatalogGrid();
    }
  });

  // Sort Selector
  sortSelect.addEventListener("change", (e) => {
    activeSortFilter = e.target.value;
    renderCatalogGrid();
  });

  // Instant Search
  searchInput.addEventListener("input", (e) => {
    clearSearchBtn.style.display = e.target.value ? "block" : "none";
    renderCatalogGrid();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    renderCatalogGrid();
    searchInput.focus();
  });

  // Setup Upload
  setupUploadModal();
}

// Start App on DOM Ready
document.addEventListener("DOMContentLoaded", initApp);
