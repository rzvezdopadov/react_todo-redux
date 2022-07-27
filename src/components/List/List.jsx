import React, { useEffect } from 'react';
import Item from "../Item/Item";
import './List.css';
import { store } from '../../utils/store';

export default function Items() {
    const {items, itemChangeId, filterItems} = store.getState();

    useEffect(()=>{
        const activeInput = document.querySelector('.item-input-phrase' && '.visibility-visible');

        if (activeInput) {
            activeInput.focus();
        }
    }, [itemChangeId]);

    return (
        <ul className='list'>
            {
                items
                .filter(([, complete])=>{
                    return (
                        (filterItems !== 'Active') && (complete === true)) ||
                            ((filterItems !== 'Completed') && (complete !== true)
                        )
                })
                .map(([id, complete, value]) => {
                    return <Item
                        key={id + value}
                        id={id}
                        complete={complete}
                        value={value}
                        itemChangeId={itemChangeId}
                    />
                })
            }
        </ul>
    )
}
