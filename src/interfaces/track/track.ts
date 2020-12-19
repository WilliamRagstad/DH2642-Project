interface ITrack {
    id: string,
    title: string,
    artist?: string,
    album?: any,
    length: string,
    service: 'spotify' | 'youtube',
    albumArtUrl?: string
}

export default ITrack;