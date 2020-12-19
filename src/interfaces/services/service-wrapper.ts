import { Dispatch } from "redux";

interface IServiceWrapper {
    Search(dispatch: Dispatch<any>, query: string, limit: number)
}

export default IServiceWrapper;