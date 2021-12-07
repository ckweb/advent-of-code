import "dotenv/config";

// get AOC cookie from .env
const { AOC_COOKIE } = process.env;

export const sessionID = AOC_COOKIE;
