const homeworkContainer = document.querySelector('#homework-container');
const loadingBlock = homeworkContainer.querySelector('#loading-block');
const filterResult = homeworkContainer.querySelector('#filter-result');

function createCityList(atribute) {
    let fragment = document.createDocumentFragment();

    for (var i = 0; i < atribute.length; i++) {
        let item = document.createElement('li');

        item.classList.add('item');
        item.textContent = atribute[i].name;
        fragment.appendChild(item);
    }
    loadingBlock.innerHTML = '';
    loadingBlock.appendChild(fragment);
}

// ====================

function createErrorButton(fn) {
    let erorrButton = document.createElement('button');

    erorrButton.textContent = 'Повторить';
    loadingBlock.innerHTML = '';
    loadingBlock.appendChild(erorrButton);
    erorrButton.addEventListener('click', () => {
        fn();
    })
    alert("Что то пошло не так, попробуйте еще раз");
}

// ====================

function createElementResult(attribute) {
    let item = document.createElement('li');

    item.textContent = attribute;
    filterResult.appendChild(item);
}

export {
    createErrorButton,
    createElementResult,
    createCityList
};
