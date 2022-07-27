import { getStorage } from "./storage";

// Item Reduser
const ITEM_ADD = "ITEM_ADD";
const ITEM_TOGGLED = "ITEM_TOGGLED";
const ITEM_CHANGE = "ITEM_CHANGE";
const ITEM_DELETE = "ITEM_DELETE";
const ITEM_DELETE_COMPLETE = "ITEM_DELETE_COMPLETE";
const ITEM_ARROW_CLICK = "ITEM_ARROW_CLICK";

export const itemAdd = (value) => ({
    type: ITEM_ADD,
    payload: value,
})

export const itemToogled = (id) => ({
    type: ITEM_TOGGLED,
    payload: id,
})

export const itemChange = (id, newValue) => ({
    type: ITEM_CHANGE,
    payload: {id, newValue},
})

export const itemDelete = (id) => ({
    type: ITEM_DELETE,
    payload: id,
})

export const itemDeleteComplete = () => ({
    type: ITEM_DELETE_COMPLETE,
})

export const itemArrowClick = () => ({
    type: ITEM_ARROW_CLICK,
})

export const itemsReducer = (state = getStorage(), action) => {
    switch (action.type) {
        case ITEM_ADD: {
            const value = action.payload;
            const items = [...state];

            if (value) {
                items.push([Date.now(), false, value]);
            }

            return items
        }   

        case ITEM_TOGGLED: {
            const id = action.payload;
            const items = [...state];

            for (let i = 0; i < items.length; i++) {
                const [idItem, completeItem, valueItem] = items[i];
    
                if (idItem === id) {
                    if (completeItem) {
                        items.splice(i, 1, [idItem, false, valueItem]);
                    } else {
                        items.splice(i, 1, [idItem, true, valueItem]);
                    }
                    
                    break;
                }
            }

            return items
        }
        
        case ITEM_CHANGE: {
            const {id, newValue} = action.payload;
            const items = [...state];

            for (let i = 0; i < items.length; i++) {
                const [idItem, completeItem] = items[i];
    
                if (id === idItem) {
                    items.splice(i, 1, [idItem, completeItem, newValue]);

                    break;
                }
            }

            return items
        }
        
        case ITEM_DELETE: {
            const id = action.payload;
            const items = [...state];

            for (let i = 0; i < items.length; i++) {
                const [idItem] = items[i];
    
                if (idItem === id) {
                    items.splice(i, 1);

                    break;
                }
            }

            return items
        } 

        case ITEM_DELETE_COMPLETE: {
            const items = [...state];
            const itemsNew = items.filter(([, complete]) => complete === false);

            return itemsNew
        } 

        case ITEM_ARROW_CLICK: {
            const items = [...state];
            let flagCompleteItem = true;

            for (let i = 0; i < items.length; i++) {
                const [, complete] = items[i];

                if (complete === false) {
                    flagCompleteItem = false;

                    break;
                }
            }

            if (flagCompleteItem) {
                items.forEach((value, i) => {
                    const [idItem, , valueItem] = value;

                    items.splice(i, 1, [idItem, false, valueItem]);
                })
            } else {
                items.forEach((value, i) => {
                    const [idItem, , valueItem] = value;

                    items.splice(i, 1, [idItem, true, valueItem]);
                })
            }

            return items
        }

        default: return state
    }
} 

// filter 

export const FILTER_ITEM_ALL = "All";
export const FILTER_ITEM_ACTIVE = "Active";
export const FILTER_ITEM_COMPLETED = "Completed";

const FILTER_CHANGE = "FILTER_CHANGE";

export const filterItemsChange = (filter) => ({
    type: FILTER_CHANGE,
    payload: filter,
})

export const filterItemsReducer = (state = FILTER_ITEM_ALL, action) => {
    switch (action.type) {
        case FILTER_CHANGE: 
            return action.payload
        default: return state
    }
}
 
// item change id

const ITEM_CHANGE_ID = "ITEM_CHANGE_ID";

export const itemChangeIdAction = (id) => ({
    type: ITEM_CHANGE_ID,
    payload: id,
})

export const itemChangeIdReducer = (state = 0, action) => {
    switch (action.type) {
        case ITEM_CHANGE_ID: 
            return action.payload;
        default: return state
    }
}

// item change old value

const ITEM_CHANGE_OLD_VALUE = "ITEM_CHANGE_OLD_VALUE";

export const itemChangeOldValueAction = (value) => ({
    type: ITEM_CHANGE_OLD_VALUE,
    payload: value,
})

export const itemChangeOldValueReducer = (state = '', action) => {
    switch (action.type) {
        case ITEM_CHANGE_OLD_VALUE: 
            return action.payload;
        default: return state
    }
}
