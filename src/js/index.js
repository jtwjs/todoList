'use strict';

// import {question} from "./question.js"
(() => {
    const API_KEY = "83853936bbc3546d9a97b185b48b6449";
    const COORDS = "coords";
    const USER_LS = "currentUser";
    const TODO_LS = "todo-list'";
    let toDos = [];
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
    },
                    {
        objs:{
            weatherIcon: document.querySelector('.weather__icon'),
            temperature: document.querySelector('.temperature'),
            local: document.querySelector('.local__name'),
            clock: document.querySelector('.clock'),
            greeting: document.querySelector('.greeting'),
            inputTodo: document.querySelector('#input--todo'),
            memoContainer: document.querySelector('.todo-list__list'),
        }
                        
                    }];

    /*Question */
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
        sceneInfo[0].objs.content.style.transition = 'opacity .5s ease';
        sceneInfo[0].objs.content.style.opacity = 0;
        sceneInfo[0].objs.content.addEventListener('transitionend',ageQuestion);
    }
    function ageQuestion() {
        const userName = sceneInfo[0].values.userInfo.name;
        sceneInfo[0].objs.label.innerText = `How old are you, ${userName}?`;
        sceneInfo[0].objs.inputQuestion.dataset.question = 'age';
        sceneInfo[0].objs.inputQuestion.style.width = `${sceneInfo[0].objs.label.offsetWidth}px`;
        sceneInfo[0].objs.tip.innerText = `Sorry, doesn't seem to be a valid age. Please try again.`;
        sceneInfo[0].objs.content.style.opacity = 1;
    }

    function questionHandler() {
        const question = this.dataset.question;
        switch(question) {
            case "name": 
                if(this.value){
                    registerName(this.value);
                    this.nextElementSibling.classList.remove('active');
                    nextQuestion();
                    greeting();
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

    /*Weather */
    function getWeather(lat, lng) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                const icon = json.weather[0].icon;
                const temperature = Math.round(json.main.temp);
                const place = json.name;
                const index = place.indexOf("-");
                sceneInfo[1].objs.weatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${icon}@2x.png)`;
                sceneInfo[1].objs.temperature.innerText = temperature;
                sceneInfo[1].objs.local.innerText = place.slice(0,index);
            });       
    }

    function saveCoords(coordsObj) {
        localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    }

    function handleGeoSuccess(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
            latitude,
            longitude,
        };
        saveCoords(coordsObj);
        getWeather(latitude, longitude);
    }

    function askForCords() {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess);
    }

    function loadCoords() {
        const loadedCoords = localStorage.getItem(COORDS);
        if (loadedCoords === null) {
            askForCords();
        } else {
            const parseCoords = JSON.parse(loadedCoords);
            getWeather(parseCoords.latitude, parseCoords.longitude);
        }
    }

    /*Clock */
    function getCurrentTime() {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        sceneInfo[1].objs.clock.innerText = 
            `${hour >= 10 ? hour:'0'+hour}:${minute >= 10 ? minute:'0'+minute}`;
    }
    /*Greeting */
    function greeting() {
        const hour = new Date().getHours();
        let byTimeStr = '';
        if(hour <= 12) {
            byTimeStr = 'morning';
            greetingByTime(byTimeStr);
        } else if(hour < 13) {
            byTimeStr = 'afternoon';
            greetingByTime(byTimeStr);
        } else if(hour <= 18) {
            byTimeStr = 'evening';
            greetingByTime(byTimeStr);
        } else if(hour <= 23) {
            byTimeStr = 'night';
            greetingByTime(byTimeStr);
        }

        function greetingByTime(str) {
            sceneInfo[1].objs.greeting.innerText = 
                `Good ${str}, ${sceneInfo[0].values.userInfo.name}`;
                console.log(sceneInfo[0].values.userInfo.name)
        }
    }

    /*Todo */

    function todoToggleClickHandler(event) {
        const target = event.target;
        if(target.classList.contains('memo-delBtn')) {
            deleteToDo(target);
        }else if(target.classList.contains('memo-clearBtn')){
            clearToDo(target);
        }else if(target.classList.contains('memo-modifyBtn')){
            modifyToDo(target);
        }
        
    }


    function modifyToDo(target) {
        const li = target.parentNode.parentNode;
            if(li.querySelector('input')) {
                const input = li.querySelector('input');
                li.classList.remove('modify');
                li.removeChild(input);
            return;
        }
        const span = li.querySelector('span');
        const value = span.innerText;
        const input = document.createElement('input');
        li.classList.add('modify');
        input.classList.add('inputToDo');
        input.value = value;
        input.addEventListener('keydown', function(event){
            if(event.keyCode === 13) {
               const changeValue = this.value;
                toDos.forEach(x => {
                    if(x.id === parseInt(li.id)) {
                        x.text = changeValue;
                    }
                });
                saveToDos();
                span.innerText = changeValue;
                li.classList.remove('modify');
                li.removeChild(input);
            }

        })
        li.appendChild(input);
        li.querySelector('input').focus();
        
    }

    function clearToDo(target) {
        const li = target.parentNode.parentNode;
        const span = li.querySelector('span');
        span.classList.toggle('clearToDo');

        if(!span.classList.contains('clearToDo')){
            unclearToDo(li);    
            return;
        }
         toDos.forEach(x => {
            if(x.id === parseInt(li.id)) {
                x.state = 'clear';
            }
        });
        saveToDos();

        function unclearToDo(element) {
            toDos.forEach(x => {
                if(x.id === parseInt(element.id)) {
                    x.state = '';
                }
            });
            saveToDos();
        }
    }
    

    function deleteToDo(target){
        const li = target.parentNode.parentNode;
        sceneInfo[1].objs.memoContainer.removeChild(li);
        const cleanToDos = toDos.filter(x => {
            x.id !== parseInt(li.id);
        });

        toDos = cleanToDos;
        saveToDos();
    }

    

    function saveToDos() {
        localStorage.setItem(TODO_LS, JSON.stringify(toDos));
    }

    function paintToDo(text, state) {
        const li = document.createElement('li');
        const toggleDiv = document.createElement('div');
        const delBtn = document.createElement('button');
        const clearBtn = document.createElement('button');
        const modifyBtn = document.createElement('button');
        const span = document.createElement('span');
        const newId = toDos.length + 1;
        toggleDiv.classList.add('todo-toggle');
        delBtn.classList.add('memo-delBtn');
        delBtn.classList.add('button');
        clearBtn.classList.add('memo-clearBtn');
        clearBtn.classList.add('button');
        modifyBtn.classList.add('memo-modifyBtn');
        modifyBtn.classList.add('button');
        toggleDiv.appendChild(clearBtn);
        toggleDiv.appendChild(modifyBtn);
        toggleDiv.appendChild(delBtn);
        toggleDiv.addEventListener('click', todoToggleClickHandler);
        span.innerText = text;
        if(state) {
            span.classList.add('clearToDo');
        }
        li.appendChild(span);
        li.appendChild(toggleDiv);
        li.id = newId;
        li.addEventListener('click',(event) => {
            let target = event.target;
            if(target.nodeName === 'SPAN'){
                target = target.parentNode;
            }
            if(target.id === li.id)
                toggleDiv.classList.toggle('show');
        })
        memoStyleCycle();
        sceneInfo[1].objs.memoContainer.appendChild(li);
        const toDoObj = {
            id: newId,
            text: text,
            state: state === undefined ? '' : state,
        }
        toDos.push(toDoObj);
        saveToDos();

        function memoStyleCycle() {
            const randomNum = Math.floor(Math.random() * 11 + 1);
            li.style.backgroundImage = `url(./assets/sticker/memo_${randomNum}.png)`;
        }
    }

    function todoSubmit(){
        const value = this.value;
        paintToDo(value);
        this.value = '';
    }
    
    function loadToDos() {
        const loadedToDos = localStorage.getItem(TODO_LS);
        if(loadedToDos !== null) {
            const parseToDos = JSON.parse(loadedToDos);
            for (const obj of parseToDos) {
                paintToDo(obj.text, obj.state);
            }
        }
    };

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
    });

    sceneInfo[1].objs.inputTodo.addEventListener('keydown', function(event) {
        if(event.keyCode === 13) {
            todoSubmit.call(this);
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        const loadedUserInfo = localStorage.getItem(USER_LS);
        getCurrentTime();      
        setInterval(getCurrentTime, 1000);
        loadCoords();
        loadToDos();
        if(loadedUserInfo !== null) {
            const parseUserInfo = JSON.parse(loadedUserInfo);
            sceneInfo[0].values.userInfo = parseUserInfo;
            greeting();
            if(!parseUserInfo.age){
                ageQuestion();
                return;
            }
            document.body.removeChild(sceneInfo[0].objs.container);
            document.querySelector('body').classList.remove('before-question'); 
        }
        
    })

})();