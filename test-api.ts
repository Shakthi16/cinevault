
import { tmdb } from "./src/lib/tmdb.ts";

async function testApi() {
    console.log("Testing TMDB API with Bearer Token...");
    try {
        const trending = await tmdb.getTrending("movie", "day");
        console.log("Trending movies count:", trending.length);
        if (trending.length > 0) {
            console.log("First movie:", trending[0].title);
            console.log("Backdrop path:", trending[0].backdrop_path);
        } else {
            console.log("No trending movies found.");
        }
    } catch (error) {
        console.error("API Test Failed:", error);
    }
}

testApi();
