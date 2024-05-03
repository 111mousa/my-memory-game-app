import {configureStore} from "@reduxjs/toolkit";
import playersReducer from '../components/players/playersActions'
import cardReducer from '../components/cards/cardSlice'

const store = configureStore({
    reducer : {
        players : playersReducer,
        cards : cardReducer,
    },
})

export default store;