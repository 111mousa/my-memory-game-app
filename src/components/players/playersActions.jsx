import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playersResult : []
}

const PlayersActions = createSlice({
    name : "players",
    initialState,
    reducers : {
        failedChoice : (state,action)=>{
            const {playerName,choicesCardText} = action.payload;
            state.playersResult.push({"name":playerName,"text":choicesCardText,"result":"failed"})
        },
        successChoice : (state,action)=>{
            const {playerName,choicesCardText} = action.payload;
            state.playersResult.push({"name":playerName,"text":choicesCardText,"result":"success"})
        }
    }
})

export default PlayersActions.reducer;
export const {failedChoice,successChoice} = PlayersActions.actions