import { configureStore } from "@reduxjs/toolkit";
import { filterItemsReducer, itemChangeIdReducer, itemChangeOldValueReducer, itemsReducer } from "./reducers";

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        filterItems: filterItemsReducer,
        itemChangeId: itemChangeIdReducer,
        itemChangeOldValue: itemChangeOldValueReducer,
    }
})
