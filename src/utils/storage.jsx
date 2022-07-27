function getStorage() {
    let storage = JSON.parse(localStorage.getItem('state'));

    if (!storage) {
        storage = [
            [10, true, 'Написать код'],
            [20, false, 'Выпить кофе'],
            [30, true, 'Протестировать код'],
            [40, false, 'Залить на гит'],
            [50, false, 'Отправить ментору'],
            [60, true, 'Отрефакторить'],
            [70, false, 'Смержить'],
        ]

        setStorage(storage);
    }

    return storage;
}

function setStorage(obj) {
    localStorage.setItem('state', JSON.stringify(obj));

    return obj;
}

export {getStorage, setStorage};
