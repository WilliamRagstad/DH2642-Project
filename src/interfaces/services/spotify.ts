import IService from './service';

interface ISpotify extends IService {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export default ISpotify;