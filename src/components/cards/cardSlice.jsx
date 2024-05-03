import {createSlice} from "@reduxjs/toolkit" 

const initialState = {
    numberOfMatchedCards : 0,
}

const cardSlice = createSlice({
    name : "cards",
    initialState,
    reducers : {
        matched : (state)=>{
            state.numberOfMatchedCards ++;
        },
    },
})

export default cardSlice.reducer;
export const {matched} = cardSlice.actions