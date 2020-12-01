'use strict';

// import {question} from "./question.js"
(() => {
    const API_KEY = "83853936bbc3546d9a97b185b48b6449";
    const COORDS = "coords";
    const USER_LS = "currentUser";
    const TODO_LS = "todo-list'";
    const WISE_SAYING = {
        spring: ["인간의 감정은 누군가를 만날 때와 헤어질 때 가장 순수하면 가장 빛난다.",
                "나이가 성숙을 보장하지 않는다.",
                "어떤 것을 완전히 알려든 그것을 다른 이에게 가르쳐라!",
                "말 적은 이가 제일 좋은 사람이다.",
                "실수는 발견의 시작이다.",
                "올바른 원칙을 아기만 하는 자는 그것을 사랑하는 자와 같지 않으니라!",
                "나만이 내 인생을 바꿀 수 있다. 아무도 날 대신해 해줄수 없다.",
                "세상 모든 일은 여러분이 무엇을 생각하느냐에 따라 일어난다.",
                "교육은 배운 것이 잊혀졌을 때 살아 남는 것이다.",
                "세상은 오직 성공한 자의 자랑에만 관대하다.",
                "우리는 너무 많이 생각하고 너무 적게 느긴다.",
                "모든 문제에는 인내가 최고의 해법이다.",
                "용기의 핵심 부분은 신중함이다."],
        summer: ["산다는 것, 그것은 치열한 전투다.",
                "미래는 주저하면서 다가오고, 현재는 화살같이 날아가고, 과거는 영원히 정지하고 있다.",
                "성공한 사람이 아니라 가치 있는 사람이 되려고 힘써라.",
                "목표 안에서도 삶을 살고 즐길 수 있다.",
                "성공의 커다란 비결은 결코 지치지 않는 인간으로 인생을 살아가는 것이다.",
                "가슴 뛰는 꿈은 없다. 작은 꿈을 만나 내 가슴이 뛸 대까지 노력하는 것",
                "인생은 곱셈과 같다. 찬스가 오더라도 내가 제로이면 아무런 의미가 없다.",
                "술이 생각해 내는 것은 아무것도 없다. 그저 떠들어댈 뿐이다.",
                "이 세상은 한편의 아름다운 책이다. 그러나 그 책을 읽지 않으면 아무 쓸모가 없게 된다.",
            ],
        attum:  ["자신감은 아름답고 강력하다.",
                "눈가에 주름이 생긴다고 해도 웃는게 좋다.",
                "당신의 삶은 그 누구의 기대, 취향, 희망, 꿈에도 맞추지 마라",
                "원한은 품을 만한게 못된다.",
                "수고를 들여 다른 사람을 기쁘게 해주면 절대 후회하지 않는다.",
                "누가 날 생각해주고 기억해 주는건 좋은 일이다.",
                "가끔은 옳은 일이기 때문에 해야 하는 일도 있다.",
                "뻔히 존재하는 문제를 무시하면 안된다.",
                "숙면은 하늘이 내린 선물이고 모든 것을 바꿀 수 있다.",
                "변화를 받아들이고 포옹하며 환영하라.",
                "위험을 감수하고 배짱있게 기회를 잡아라. 다시 오지 않을수도 있으니까",
                "당신 내면을 다른 사람들의 외면과 비교하지마라",
            ],
        winter: ["남자는 늙어감에 따라 감정이 나이를 먹고 여자는 늙어감에 따라 얼굴에 나이를 먹는다.",
                "노년, 무지한 사람에게 그것은 겨울, 배운 자에게 그것은 수확의 시기.",
                "노년(老年)은 죽음에 둘러싸인 섬이로다.",
                "노인은 존경을 강요하지 말아야 한다. 그 대신 그는 얼굴의 주름살은 경험의 중요성과 인격의 견고성을 상징하는 것이여야 한다.",
                "노인은 죽음의 공포 떄문에 청년의 쾌락을 금하는 폭군이다.",
                "누구나 이후 1년을 더 살수 있을지 의문일 정도로 늙은 사람은 없다.",
                "노인이 되는 것은 비참한 사람이 되는 것이 아니다. 자기의 나이답게 살 수 없는 사람만이 비참한 사람이다.",
                "늙은 말의 지혜는 쓸만하다.",
                "늙은이는 얼굴보다 마음에 더 많은 주름이 있다.",
                "늙어가는 법을 안다는 것은 지혜의 걸작으로, 위대한 삶의 예술 가운데서도 가장 어려운 장에 속한다.",
                "사람이 뭔가를 추구하고 있는 한 절대로 노인이 아니다.",
                "지혜를 낳는 것은 백발(白髮)이 아니다"],
    };
    let scene = 0;
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
                feed: '',
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
            tip: document.querySelector('.todo-tip'),
            wiseSaying: document.querySelector('.wise-saying'),
            todoBtn: document.querySelector('.todo-btn'),
            backBtn: document.querySelector('.back-btn'),
        },              
                    },
        {
            objs: {
                modalOpenBtn: document.querySelector('.feed-back__btn'),
                feedModal: document.querySelector('.feed-back__modal'),
                content: document.querySelector('.modal-wrap'),
                title: document.querySelector('.feed-back__title'),
                textarea: document.querySelector('textarea'),
                tip: document.querySelector('.feed-back-tip'),
            },
            values: {
                feedBack: {
                    grade: '',
                    text: '',
                },
                color: ['#4399ff','#58d8d9','#ffce78','#ffa056','#ff8080']
            }
        }];

    /*Question */
    function registerName(name) {
         sceneInfo[0].values.userInfo.name = name;
         saveUserInfo();
    }
    function registerAge(age) {
         sceneInfo[0].values.userInfo.age = age;
         saveUserInfo();
    }
    function saveUserInfo() {
        const userInfo = sceneInfo[0].values.userInfo;
        localStorage.setItem(USER_LS,JSON.stringify(userInfo));
    }

    function nextPage() {
        sceneInfo[0].objs.content.style.transition = 'opacity .5s ease';
        sceneInfo[0].objs.content.style.opacity = 0;
        if(scene === 0){
            sceneInfo[0].objs.content.addEventListener('transitionend',ageQuestionPage);
        }else {
            sceneInfo[0].objs.content.addEventListener('transitionend',mainPage);
        }
    }
    function ageQuestionPage() {
        const userName = sceneInfo[0].values.userInfo.name;
        sceneInfo[0].objs.label.innerText = `How old are you, ${userName}?`;
        sceneInfo[0].objs.inputQuestion.dataset.question = 'age';
        sceneInfo[0].objs.inputQuestion.style.width = `${sceneInfo[0].objs.label.offsetWidth}px`;
        sceneInfo[0].objs.tip.innerText = `Sorry, doesn't seem to be a valid age. Please try again.`;
        sceneInfo[0].objs.content.style.opacity = 1;
    }
    function mainPage() {
        document.querySelector('body').classList.remove('before-question');
        wiseSaying();
    }

    function questionHandler() {
        const question = this.dataset.question;
        switch(question) {
            case "name": 
                if(this.value){
                    registerName(this.value);
                    this.nextElementSibling.classList.remove('active');
                    nextPage();
                    greeting();
                    }
                else {
                    this.nextElementSibling.classList.add('active');
                }
                break;
            case "age": 
                if (!/[^0-9]/g.test(this.value) && this.value > 0 && this.value < 100) {
                    registerAge(this.value);
                    scene++;           
                    nextPage();       
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
    function todoClickHandler() {
        document.querySelector('body').classList.add('todoPage');
    }
    function backClickHadnelr() {
        document.querySelector('body').classList.remove('todoPage');
    }

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
            return x.id !== parseInt(li.id);
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
        li.classList.add('todo-list__list__item')
        li.addEventListener('click',(event) => {
            let target = event.target;
            if(target.nodeName === 'SPAN'){
                target = target.parentNode;
            }
            if(target.id === li.id){
                toggleDiv.classList.toggle('show');
                const liArr = document.querySelectorAll('.todo-list__list__item');
                for (const li of liArr) {
                    if(target.id !== li.id)
                        li.querySelector('.todo-toggle').classList.remove('show');
                }
            }
            
        })
        memoStyleCycle(li);
        sceneInfo[1].objs.memoContainer.appendChild(li);
        const toDoObj = {
            id: newId,
            text: text,
            state: state === undefined ? '' : state,
            timeStamp: new Date().getDate(),
        }
        toDos.push(toDoObj);
        saveToDos();   
    }

    function memoStyleCycle(element) {
        const randomNum = Math.floor(Math.random() * 11 + 1);
        element.style.backgroundImage = `url(./src/assets/sticker/memo_${randomNum}.png)`;
    }

    function todoSubmit(){
        const value = this.value;
        if(toDos.length >= 40){
            sceneInfo[1].objs.tip.classList.add('active');
            this.value = '';
            return;
        }
        paintToDo(value);
        sceneInfo[1].objs.tip.classList.remove('active');
        this.value = '';
    }
    
    function loadToDos() {
        const date = new Date().getDate();
        const loadedToDos = localStorage.getItem(TODO_LS);
        if(loadedToDos !== null) {
            const parseToDos = JSON.parse(loadedToDos);
            for (const obj of parseToDos) {
                if(obj.timeStamp === date)
                    paintToDo(obj.text, obj.state);
            }
        }
    };
    /*Wise Saying */
    function wiseSaying() {
        const age = parseInt(sceneInfo[0].values.userInfo.age);
        const saying =  getWiseSaying(age);
        sceneInfo[1].objs.wiseSaying.innerText = saying;
    }
    function getWiseSaying(age) {
        let season = '';
        if(age < 20) {
            season = 'spring';
        }else if(age < 30){
            season = 'summer';
        }else if(age < 50) {
            season = 'attum';
        }else {
            season = 'winter';
        }
        return randomSaying(season);

        function randomSaying(season) {
            const ranNum = Math.floor(Math.random() * WISE_SAYING[season].length);
            return WISE_SAYING[season][ranNum];
        }
    }

    /*feed-back Modal */
    sceneInfo[2].objs.modalOpenBtn.addEventListener('click', feedModalOpen);
    sceneInfo[2].objs.feedModal.addEventListener('click', feedModalClickHandler);

    function checkFeedback() {
        if(sceneInfo[0].values.userInfo.feed)
            sceneInfo[2].objs.modalOpenBtn.classList.add('complete');
    }

    function feedModalOpen() {
        if(!sceneInfo[0].values.userInfo.feed){
            sceneInfo[2].objs.feedModal.classList.toggle('show');
        }
    }
    function feedModalClickHandler(event) {
        const colorArr = sceneInfo[2].values.color;
        let target = event.target;
        console.log(target);

        if(target.classList.contains('eval-btn')) {
            switch(target.dataset.eval) {
                case 'best':
                    sceneInfo[2].objs.title.style.color = `${colorArr[0]}`;
                    setGrade(target.dataset.eval);
                    break;
                case 'good':
                    sceneInfo[2].objs.title.style.color = `${colorArr[1]}`;
                    setGrade(target.dataset.eval);
                    break;
                case 'soso':
                    sceneInfo[2].objs.title.style.color = `${colorArr[2]}`;
                    setGrade(target.dataset.eval);
                    break;
                case 'bad':
                    sceneInfo[2].objs.title.style.color = `${colorArr[3]}`;
                    setGrade(target.dataset.eval);
                    break;
                case 'worst':
                    sceneInfo[2].objs.title.style.color = `${colorArr[4]}`;
                    setGrade(target.dataset.eval);
                    break;
            }
        }
        if(target.classList.contains('submit-btn')) {
            setText(sceneInfo[2].objs.textarea.value);
            if(!sceneInfo[2].values.feedBack.text || !sceneInfo[2].values.feedBack.grade){
                if(!sceneInfo[2].values.feedBack.grade) {
                    sceneInfo[2].objs.tip.innerText = `↑ Please select an evaluation grade.`;
                    sceneInfo[2].objs.tip.classList.add('active');
                }else if(!sceneInfo[2].values.feedBack.text) {
                    sceneInfo[2].objs.tip.innerText = `↓ Please leave your feedback.`;
                    sceneInfo[2].objs.tip.classList.add('active');

                }
                sceneInfo[2].objs.content.classList.add('error');
                sceneInfo[2].objs.content.addEventListener('animationend', () => {
                    sceneInfo[2].objs.content.classList.remove('error');
                })
                return;
            }
            sendFeedback();
            sceneInfo[2].objs.modalOpenBtn.classList.add('complete');
            
        }
        if(target.classList.contains('cancle-btn')) {
            cancleFeedback();
        }
    }

    function setGrade(grade) {
        sceneInfo[2].values.feedBack.grade = grade;
    }
    function setText(text) {
        sceneInfo[2].values.feedBack.text = text;
    }
    function cancleFeedback() {
        sceneInfo[2].values.feedBack.grade = '';
        sceneInfo[2].values.feedBack.text = '';
        sceneInfo[2].objs.textarea.value = '';
        sceneInfo[2].objs.title.style.color = 'inherit';
        sceneInfo[2].objs.feedModal.classList.remove('show');
        sceneInfo[2].objs.tip.classList.remove('active');
    }
    /*emailjs */

    function sendFeedback(){
        const grade = sceneInfo[2].values.feedBack.grade;
        const text = sceneInfo[2].values.feedBack.text;
        const obj = {
            to_name: 'Woong',
            from_name: sceneInfo[0].values.userInfo.name,
            message: `grade: ${grade}, message: ${text}`,
        };

    emailjs.send('service_ggvpk9f','template_4liun4k', obj)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            sceneInfo[0].values.userInfo.feed = 'OK';
            sceneInfo[2].objs.feedModal.classList.remove('show');
            saveUserInfo();
        }, function(error) {
            console.log('FAILED...', error);
        });
    }

    function setUserInfo() {
        const currentUser = localStorage.getItem(USER_LS);
        if(currentUser !== null)
            sceneInfo[0].values.userInfo = JSON.parse(currentUser);
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
    });

    sceneInfo[1].objs.inputTodo.addEventListener('keydown', function(event) {
        if(event.keyCode === 13) {
            todoSubmit.call(this);
        }
    });
    sceneInfo[1].objs.inputTodo.addEventListener('focuseout', function(){
        if (matchMedia("screen and (min-width: 768px)").matches) {
            todoSubmit.call(this);
        }
    })

    sceneInfo[1].objs.todoBtn.addEventListener('click', todoClickHandler);
    sceneInfo[1].objs.backBtn.addEventListener('click', backClickHadnelr);
    window.addEventListener('resize', () => {
        if (matchMedia("screen and (min-width: 768px)").matches) {

        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        const loadedUserInfo = localStorage.getItem(USER_LS);
        getCurrentTime();      
        setInterval(getCurrentTime, 1000);
        setUserInfo();
        loadCoords();
        loadToDos();
        if(loadedUserInfo !== null) {
            const parseUserInfo = JSON.parse(loadedUserInfo);
            sceneInfo[0].values.userInfo = parseUserInfo;
            greeting();
            wiseSaying();
            checkFeedback();
            if(!parseUserInfo.age){
                ageQuestionPage();
                return;
            }
            document.body.removeChild(sceneInfo[0].objs.container);
            document.querySelector('body').classList.remove('before-question'); 
        }
        
    })

})();