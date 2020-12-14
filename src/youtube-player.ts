class YouTubePlayer {
    player: any;

    constructor() {
        this.player = null;
    }
    setPlayer(player: any) {
        this.player = player;
    }
}
const ytPlayer = new YouTubePlayer();

export default ytPlayer;