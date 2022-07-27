import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './utils/store';

const root = ReactDOM.createRoot(document.getElementById('root'))

let renderEntireTree = () => {
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

renderEntireTree();

store.subscribe(renderEntireTree);
