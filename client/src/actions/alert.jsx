import { SET_ALERT,REMOVE_ALERT } from "./types";
// import uuid from "uuid";
import { v4 as uuidv4 } from 'uuid';
export const setAlert=(msg,alertType,timeout=5000)=>dispatch => {
    /// uuid generates random universal id;
    const id=uuidv4();
    // const id=uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload:{msg, alertType,id}
    });

   setTimeout(()=> dispatch({type:REMOVE_ALERT,payload:id}),timeout);
};

