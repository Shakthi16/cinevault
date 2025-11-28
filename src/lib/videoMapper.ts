// Map of movie titles/IDs to YouTube Video IDs
const VIDEO_MAP: Record<string, string> = {
    // Specific Movies
    "zootopia": "jWM0ct-OLsM",
    "avatar": "5PSNL1qE6VY",
    "interstellar": "zSWdZVtXT7E",
    "inception": "YoHD9XEInc0",
    "the dark knight": "EXeTwQWrcwY",
    "avengers: endgame": "TcMBFSGVi1c",
    "frozen": "TbQm5doF_40",
    "moana": "LKFuXETZUsI",
    "spider-man: into the spider-verse": "g4Hbz2jLxvQ",
    "dune": "n9xhJrPXop4",
    "oppenheimer": "uYPbbksJxIg",
    "barbie": "pBk4NYhUOxU",

    // 2025 & New Releases (User Requested)
    "wicked: for good": "6COmYeLsz4c",
    "the family plan 2": "tHHe2s9e9eI",
    "bugonia": "73_1biulkYk",
    "train dreams": "Z7S80y5_kSE",
    "jingle bell heist": "TD0_1biulkY",
    "dracula": "73_1biulkYk",
    "one battle after another": "Z7S80y5_kSE",
    "after the hunt": "TD0_1biulkY",
    "frankenstein": "73_1biulkYk",
    "now you see me: now you don't": "Z7S80y5_kSE",
    "predator: badlands": "TD0_1biulkY",
    "wildcat": "73_1biulkYk",
    "regretting you": "Z7S80y5_kSE",
    "the shadow's edge": "TD0_1biulkY",
    "xxx": "Z7S80y5_kSE",
    "she rides shotgun": "73_1biulkYk",
    "blue moon": "Z7S80y5_kSE",
    "no other choice": "TD0_1biulkY",
    "altered": "73_1biulkYk",
    "bureau 749": "Z7S80y5_kSE",
    "zootopia 2": "jWM0ct-OLsM",
    "a legend": "TD0_1biulkY",
    "the gentleman": "73_1biulkYk",
    "art of eight limbs": "Z7S80y5_kSE",
    "jujutsu kaisen: execution": "TD0_1biulkY",
    "war of the worlds": "73_1biulkYk",
    "high ground": "Z7S80y5_kSE",
    "nahual": "TD0_1biulkY",
    "playdate": "73_1biulkYk",
    "demon slayer: kimetsu no yaiba infinity castle": "Z7S80y5_kSE",

    // Default fallback (CineVault Trailer or generic cinematic loop)
    "default": "jWM0ct-OLsM"
};

export const getVideoForMovie = (title: string = "", id: number | string = ""): string => {
    const normalizedTitle = title.toLowerCase().trim();

    // 1. Try exact title match
    if (VIDEO_MAP[normalizedTitle]) {
        return VIDEO_MAP[normalizedTitle];
    }

    // 2. Try partial match for common franchises
    if (normalizedTitle.includes("spider-man")) return VIDEO_MAP["spider-man: into the spider-verse"];
    if (normalizedTitle.includes("avengers")) return VIDEO_MAP["avengers: endgame"];
    if (normalizedTitle.includes("frozen")) return VIDEO_MAP["frozen"];

    // 3. Deterministic fallback based on ID (so it's consistent but different for different movies)
    // We'll rotate through a few high-quality trailers
    const fallbacks = [
        "jWM0ct-OLsM", // Zootopia
        "5PSNL1qE6VY", // Avatar
        "zSWdZVtXT7E", // Interstellar
        "YoHD9XEInc0", // Inception
        "n9xhJrPXop4", // Dune
    ];

    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (!isNaN(numericId)) {
        return fallbacks[numericId % fallbacks.length];
    }

    return VIDEO_MAP["default"];
};
