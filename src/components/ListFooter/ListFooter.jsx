import React from "react";
import "./ListFooter.css"
import { setStorage } from '../../utils/storage';
import { store } from "../../utils/store";
import { filterItemsChange, itemDeleteComplete } from "../../utils/reducers";

export default function ItemFooter() {
    const {items, filterItems} = store.getState();

    const itemsLeft = items.reduce((previousValue, [, complete]) => previousValue + !complete, 0);
    const itemsRight = items.length - itemsLeft;
    const classVisibilityHidden = itemsRight ? '' : ' visibility-hidden';

    const filterAll = filterItems === 'All' ? ' filter-selected' : '';
    const filterActive = filterItems === 'Active' ? ' filter-selected' : '';
    const filterCompleted = filterItems === 'Completed' ? ' filter-selected' : '';

    function handleClearCompleteItems() {
        store.dispatch(itemDeleteComplete());

        setStorage(store.getState().items);
    }

    return (
        <div className='list-footer'>
            <span className='list-footer-counter'>{itemsLeft} items left</span>
            <ul className='list-footer-filters'>
                <li
                    onClick={() => store.dispatch(filterItemsChange('All'))}
                    className={'list-footer-filters-content' + filterAll}
                >All</li>
                <li
                    onClick={() => store.dispatch(filterItemsChange('Active'))}
                    className={'list-footer-filters-content' + filterActive}
                >Active</li>
                <li
                    onClick={() => store.dispatch(filterItemsChange('Completed'))}
                    className={'list-footer-filters-content' + filterCompleted}
                >Completed</li>
            </ul>

            <button className={'list-footer-item-completed-destroy' + classVisibilityHidden}
                onClick={handleClearCompleteItems}
            >Clear completed</button>
        </div>
    )
}
