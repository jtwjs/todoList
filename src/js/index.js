'use strict';

// import {prepare} from "./prepare.js"
(() => {
    const USER_LS = "currentUser";
    const sceneInfo = [{
        objs: {
            container: document.querySelector('.question'),
            form: document.querySelector('.question-form'),
            inputName: document.querySelector('#input--name'),
            createBtn: document.querySelector('.continue-btn'),
        },
    }];




    registerName(name) {
        localStorage.setItem(USER_LS,name);
    }

    sceneInfo[0].objs.form.addEventListener('submit', () => {
        if(sceneInfo.objs.inputName.value)
            registerName(sceneInfo.objs.inputName.value);
        
    });
    sceneInfo[0].objs.createBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if(sceneInfo.objs.inputName.value)
            registerName(sceneInfo.objs.inputName.value);
    });
})();