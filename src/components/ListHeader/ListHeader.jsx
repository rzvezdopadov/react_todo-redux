import React from "react";
import "./ListHeader.css"
import { setStorage } from "../../utils/storage";
import { store } from "../../utils/store";
import { itemAdd, itemArrowClick } from "../../utils/reducers";

export default function ItemHeader() {
    const {items} = store.getState();

    function handleArrowClick() {
        store.dispatch(itemArrowClick());

        setStorage(store.getState().items);
    }

    function handleAddNewItem(e) {
        if (['Enter', 'NumpadEnter'].includes(e.code)) {
            store.dispatch(itemAdd(e.target.value));

            setStorage(store.getState().items);

            e.target.value = '';
        }
    }

    const itemsLeft = items.reduce((previousValue, [, complete]) => previousValue + complete, 0);
    const itemsAll = items.length;
    const arrowSymbol = itemsLeft !== itemsAll ? ' list-header-arrow-down' : ' list-header-arrow-up';

    return (
        <div className='list-header'>
            <label className={'list-header-arrow' + arrowSymbol}
                onClick = {handleArrowClick}
            ></label>

            <input className='list-header-input'
                onKeyPress = {handleAddNewItem}
            ></input>
        </div>
    )
}
