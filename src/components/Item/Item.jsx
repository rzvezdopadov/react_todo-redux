import React from "react";
import './Item.css';
import { setStorage } from "../../utils/storage";
import { store } from "../../utils/store";
import { itemDelete, itemToogled, itemChangeIdAction, itemChangeOldValueAction, itemChange } from "../../utils/reducers";

export default function Item({id, complete, value}) {
    const {
        itemChangeId,
        itemChangeOldValue,
    } = store.getState();

    const itemComplete = complete ? ' item-complete' : '';
    const classVisibilityVisible = id === itemChangeId ? ' visibility-visible' : '';

    function handleToogleItem() {
        store.dispatch(itemToogled(id));

        setStorage(store.getState().items);
    }

    function handleDeleteItem() {
        store.dispatch(itemDelete(id));

        setStorage(store.getState().items);
    }

    function handleDblClickItem(id, value) {
        store.dispatch(itemChangeIdAction(id));
        store.dispatch(itemChangeOldValueAction(value));
    }

    function handleOnBlurItem(e) {
        if (e.target.value === '') {
            e.target.value = itemChangeOldValue;
            store.dispatch(itemChangeIdAction(0));

            return;
        }

        store.dispatch(itemChange(id, e.target.value));
        store.dispatch(itemChangeIdAction(0));
    }

    return (
        <li className='item'>
            <div className='item-main-wrapper'>
                <span className={'item-toggle' + itemComplete}
                   onClick={handleToogleItem}
                >&#10003;</span>

                <label className='item-phrase'
                    onDoubleClick={handleDblClickItem.bind(this, id, value)}
                >{value}</label>

                <button className='item-destroy'
                    onClick={handleDeleteItem}
                >X</button>
            </div>

            <input className={'item-input-phrase' + classVisibilityVisible}
                defaultValue={value}
                onBlur={handleOnBlurItem}
            />
        </li>
    )
}
