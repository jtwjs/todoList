'use strict';

// import {prepare} from "./prepare.js"
(() => {
    const USER_LS = "currentUser";
    const sceneInfo = [{
        objs: {
            container: document.querySelector('.question'),
            content: document.querySelector('.question-content'),
            label: document.querySelector('.label--question'),
            inputQuestion: document.querySelector('#input--question'),
            continueBtn: document.querySelector('.continue-btn'),
            tip: document.querySelector('.question-tip'),            
        },
        values: {
            userInfo: {
                name: '',
                age: '',
            },
        }
    }];


    function registerName(name) {
        const userInfo = sceneInfo[0].values.userInfo;
         userInfo.name = name;
        localStorage.setItem(USER_LS,JSON.stringify(userInfo));
    }
    function registerAge(age) {
        const userInfo = sceneInfo[0].values.userInfo;
         userInfo.age = age;
         localStorage.setItem(USER_LS,JSON.stringify(userInfo));
    }
    function nextQuestion() {
        const username = sceneInfo[0].values.userInfo.name;
        sceneInfo[0].objs.content.style.transition = 'opacity .5s ease';
        sceneInfo[0].objs.content.style.opacity = 0;
        sceneInfo[0].objs.content.addEventListener('transitionend',() => {
            sceneInfo[0].objs.label.innerText = `How old are you, ${username}?`;
            sceneInfo[0].objs.inputQuestion.dataset.question = 'age';
            sceneInfo[0].objs.inputQuestion.style.width = `${sceneInfo[0].objs.label.offsetWidth}px`;
            sceneInfo[0].objs.tip.innerText = `Sorry, doesn't seem to be a valid age. Please try again.`;
            sceneInfo[0].objs.content.style.opacity = 1;
        });
    }

    function questionHandler() {
        const question = this.dataset.question;
        switch(question) {
            case "name": 
                if(this.value){
                    registerName(this.value);
                    this.nextElementSibling.classList.remove('active');
                    nextQuestion();
                    }
                else {
                    this.nextElementSibling.classList.add('active');
                }
                break;
            case "age": 
                if (!/[^0-9]/g.test(this.value) && this.value > 0 && this.value < 100) {
                    registerAge(this.value);
                    document.querySelector('body').classList.remove('before-question');       
                } 
                else {
                    this.nextElementSibling.classList.add('active');
                    this.value = '';
                }
                break;
        }        
    }

    sceneInfo[0].objs.inputQuestion.addEventListener('keydown', function(event){
        if(event.keyCode === 13) {
            questionHandler.call(this);
            sceneInfo[0].objs.inputQuestion.value = "";
        }
    });
    sceneInfo[0].objs.continueBtn.addEventListener('click', function() {
        const target = sceneInfo[0].objs.inputQuestion;
        questionHandler.call(target);
        sceneInfo[0].objs.inputQuestion.value = "";
    });

    sceneInfo[0].objs.container.addEventListener('transitionend', (e) => {
        if(sceneInfo[0].values.userInfo.age)
        document.body.removeChild(e.currentTarget);
    })

    window.addEventListener('DOMContentLoaded', () => {
        const userInfo = localStorage.getItem(USER_LS);
        if(userInfo) {
           
        }
    })

})();