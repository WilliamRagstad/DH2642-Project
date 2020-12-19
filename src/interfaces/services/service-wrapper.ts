import { Dispatch } from "redux";

interface IServiceWrapper {
    Search(dispatch: Dispatch<any>, query: string, limit: number, onDone: () => void)
}

export default IServiceWrapper;