import SpotifyService from "./spotify";
import YouTubeService from "./youtube";
import { APIKey } from "./youtube-credentials";

export const ServiceProvider = {
    Spotify: new SpotifyService(undefined),
    YouTube: new YouTubeService(APIKey)
}