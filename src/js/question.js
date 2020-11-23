


export const question = {
        obj: {
            form: document.querySelector('.prepare-form'),
            inputName: document.querySelector('#input--name'),
            createBtn: document.querySelector('.continue-btn'),
        },
        registerName(storageName,name) {
            localStorage.setItem(storageName,name);
        },
    }
    




