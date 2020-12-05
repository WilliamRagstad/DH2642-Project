import IService from './service';

interface ISpotify extends IService {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

export default ISpotify;