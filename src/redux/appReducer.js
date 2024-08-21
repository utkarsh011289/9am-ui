import { init } from "./init";
export const appReducer = ( state=init, action ) => {

    switch( action.type ){
        case 'LOGIN':
            return {
                ...state,
                ...action.payload
            }
            case 'STUDENTS':
            return {
                ...state,
                students:action.payload
            }
            case 'MODAL':
                return {
                    ...state,
                    ...action.payload                          //isShowModal: action.payload
                }
            default:
                return state;
    }

}