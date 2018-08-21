/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookie(item, itemValue) {
    let obj = {};

    if (!item && !itemValue) {
        obj = document.cookie.split('; ').reduce((prev, current) => {
            let [name, value] = current.split('=');

            prev[name] = value

            return prev;
        }, {})
    } else if (item && !itemValue) {
        obj = document.cookie.split('; ').reduce((prev, current) => {
            let [name, value] = current.split('=');

            if ((name === item) || (value === itemValue)) {
                prev[name] = value;
            }

            return prev;
        }, {});
    } else if (!item && itemValue) {
        obj = document.cookie.split('; ').reduce((prev, current) => {
            let [name, value] = current.split('=');

            if ((name === item) || (value === itemValue)) {
                prev[name] = value;
            }

            return prev;
        }, {});
    }

    return obj;
}

function isMatching(full, chunk) {
    let isTrue = (full.toLocaleUpperCase().indexOf(chunk.toLocaleUpperCase()) != -1) ? true : false;

    return isTrue;
}

function setCookie(name, value) {
    let cookieObject = getCookie();

    if (name in cookieObject) {
        deleteCookie(name);
        document.cookie = `${name}=${value}`;
    } else {
        document.cookie = `${name}=${value}`;
    }
}

function deleteCookie(name) {
    let date = new Date(0);

    document.cookie = `${name}=; path=/; expires=` + date.toUTCString();
}

function getCookieList (itemName = null, itemValue = null) {
    let cookie = getCookie(itemName, itemValue);

    for (let item in cookie) {
        if (cookie.hasOwnProperty(item)) {
            let tr = document.createElement('tr');
            let th = document.createElement('th');
            let deleteButton = document.createElement('button');

            deleteButton.addEventListener('click', () => {
                deleteCookie(item);
                listTable.innerHTML = '';
                if (document.cookie != '') {
                    getCookieList();
                }

            })
            deleteButton.textContent = 'Delete';
            tr.innerHTML = `<th>${item}</th><th>${cookie[item]}</th>`;
            tr.appendChild(th.appendChild(deleteButton));
            listTable.appendChild(tr);
        }
    }
}

function filtredCookie() {
    if (filterNameInput.value === '') {
        listTable.innerHTML = '';
        getCookieList();
    } else {
        let object = getCookie();

        // listTable.innerHTML = '';
        for (let item in object) {
            if (object.hasOwnProperty(item)) {
                if (isMatching(item, filterNameInput.value)) {
                    getCookieList(item, null);
                } else if (isMatching(object[item], filterNameInput.value)) {
                    getCookieList(null, object[item]);
                }
            }
        }
    }
}

getCookieList();
filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    listTable.innerHTML = '';
    filtredCookie();
});
addButton.addEventListener('click', () => {
    setCookie(addNameInput.value, addValueInput.value);
    listTable.innerHTML = '';
    filtredCookie();
});
