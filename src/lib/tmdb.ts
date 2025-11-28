// TMDB API Service
const TMDB_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGQwYTQxMGM4YWQ2OTUwMWY3MGI5MTJkNDFkMjFkYiIsIm5iZiI6MTc2NDI2MDc5MS4xNTUsInN1YiI6IjY5Mjg3YmI3MDA5MzI3YTUwYzI0NTljZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cogFG7rbB8Ui5zIJj0wObpcDnnE-t0EFi5g3Hwa-SVk";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
}

// Mock Data for Fallback
const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    vote_average: 8.8,
    release_date: "2010-07-15",
    media_type: "movie"
  },
  {
    id: 2,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniL6E8ahDaNBkRL7aA2dB0.jpg",
    backdrop_path: "/xJHokMBLkbke0um54U7XW32LnrV.jpg",
    vote_average: 8.6,
    release_date: "2014-11-05",
    media_type: "movie"
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    vote_average: 8.5,
    release_date: "2008-07-16",
    media_type: "movie"
  },
  {
    id: 4,
    title: "Avatar",
    overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
    poster_path: "/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    backdrop_path: "/vL5LR6WdxWPjLPFRLe13yWCxVlx.jpg",
    vote_average: 7.6,
    release_date: "2009-12-15",
    media_type: "movie"
  },
  {
    id: 5,
    title: "The Avengers",
    overview: "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster.",
    poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdrop_path: "/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg",
    vote_average: 7.7,
    release_date: "2012-04-25",
    media_type: "movie"
  },
  {
    id: 6,
    title: "Deadpool & Wolverine",
    overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    vote_average: 7.7,
    release_date: "2024-07-24",
    media_type: "movie"
  },
  {
    id: 8,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    vote_average: 8.3,
    release_date: "2024-02-27",
    media_type: "movie"
  }
];

const fetchFromTMDB = async (endpoint: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
    }
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, options);
    if (!response.ok) throw new Error(`TMDB API Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching ${endpoint}, using mock data. Error:`, error);
    // Return mock data structure
    return { results: MOCK_MOVIES };
  }
};

export const tmdb = {
  // Get upcoming movies
  getUpcomingMovies: async (): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB('/movie/upcoming?language=en-US&page=1');
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Get image URL
  getImageUrl: (path: string | null, size: string = "w500"): string => {
    if (!path) return "/placeholder.svg";
    if (path.startsWith("http")) return path; // Handle absolute URLs (e.g. from Unsplash fallback)
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },

  // Trending
  getTrending: async (mediaType: string = "all", timeWindow: string = "week"): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Popular movies
  getPopularMovies: async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/movie/popular?page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Popular TV shows
  getPopularTVShows: async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/tv/popular?page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/movie/top_rated?page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Now playing movies
  getNowPlayingMovies: async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/movie/now_playing?page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Discover by genre
  discoverByGenre: async (
    genreId: number,
    mediaType: string = "movie",
    page: number = 1
  ): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/discover/${mediaType}?with_genres=${genreId}&page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Search
  search: async (query: string, page: number = 1): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Get movie details
  getMovieDetails: async (id: number) => {
    try {
      return await fetchFromTMDB(`/movie/${id}`);
    } catch (error) {
      return null;
    }
  },

  // Get TV show details
  getTVShowDetails: async (id: number) => {
    try {
      return await fetchFromTMDB(`/tv/${id}`);
    } catch (error) {
      return null;
    }
  },

  // Get kids content (G, PG rated)
  getKidsContent: async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/discover/movie?certification_country=US&certification.lte=PG&sort_by=popularity.desc&page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Discover by language
  discoverByLanguage: async (language: string, page: number = 1): Promise<Movie[]> => {
    try {
      const data = await fetchFromTMDB(`/discover/movie?with_original_language=${language}&sort_by=popularity.desc&page=${page}`);
      return data.results || [];
    } catch (error) {
      return [];
    }
  },

  // Get Movie Videos
  getMovieVideos: async (id: number) => {
    try {
      return await fetchFromTMDB(`/movie/${id}/videos`);
    } catch (error) {
      return { results: [] };
    }
  },

  // Get TV Show Videos
  getTVVideos: async (id: number) => {
    try {
      return await fetchFromTMDB(`/tv/${id}/videos`);
    } catch (error) {
      return { results: [] };
    }
  },
};

// Genre IDs for reference
export const GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
};
