var questions = [
    {
        "question": "А когда с человеком может произойти дрожемент?",
        "answers": ["Когда он влюбляется", "Когда он идет шопиться", "Когда он слышит смешную шутку", "Когда он боится, пугается"],
        "correctAnswer": "Когда он боится, пугается",
        "hint": "Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят»."
    },
    {
        "question": "Говорят, Антон заовнил всех. Это еще как понимать?",
        "answers": ["Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?", 
        "Антон очень надоедливый и въедливый человек, всех задолбал", 
        "Молодец, Антон, всех победил!", 
        "Нет ничего плохого в том, что Антон тщательно выбирает себе друзей"],
        "correctAnswer": "Молодец, Антон, всех победил!",
        "hint": "Термин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить»."
    },
    {
        "question": "А фразу «заскамить мамонта» как понимать?",
        "answers": ["Разозлить кого-то из родителей", "Увлекаться археологией", "Развести недотепу на деньги", "Оскорбить пожилого человека"],
        "correctAnswer": "Развести недотепу на деньги",
        "hint": "Заскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца."
    },
    {
        "question": "Кто такие бефефе?",
        "answers": ["Вши?", "Милые котики, такие милые, что бефефе", "Лучшие друзья", "Люди, которые не держат слово"],
        "correctAnswer": "Лучшие друзья",
        "hint": "Бефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever."
    }
  ];
  var usedQuestions = [];
  var questionsContainer = document.getElementById("container");
  var questionButtons = [];
  var score = 0;
  document.getElementById("question-button").addEventListener("click", function() {
    var randomQuestion;
    var answerButtons = [];   
    
    if (usedQuestions.length === questions.length) {
        this.disabled = "true";
        var stats = document.createElement("div");
        stats.innerText = "Вопросы закончились!";
        questionsContainer.insertBefore(stats, questionsContainer.firstChild);
        var scoreText = document.createElement("p");
        scoreText.innerText = "Ваш результат: " + score.toString() + "/" + questions.length.toString();
        stats.appendChild(scoreText);
        for(i = 0; i < questionButtons.length; i++){
            questionButtons[i].addEventListener("click", function() {
                var ind = Array.from(this.parentNode.children).indexOf(this) - 1;
                if(document.getElementById("correct") != null){
                    document.getElementById("correct").remove();
                }
                var correct = document.createElement("div");
                correct.id = "correct";
                questions.forEach((question) => {
                    if(questionButtons[ind].innerText.includes(question.question)){
                        correct.innerText = question.correctAnswer;
                    }
                });
                questionButtons[ind].appendChild(correct);
            });
        }
        return
    }

    do {
        randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    } while (usedQuestions.includes(randomQuestion));

    usedQuestions.push(randomQuestion);
    
    var questionDiv = document.createElement("div");
    questionDiv.innerHTML = usedQuestions.length.toString() + ". " + randomQuestion.question;
    questionDiv.classList.add("question-panel");
    questionsContainer.appendChild(questionDiv);
    questionButtons.push(questionDiv);
    this.disabled = "true";

    var options = randomQuestion.answers;
    for (var i = 0; i < options.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.innerText = options[i];
        answerButton.classList.add("answer-button");
        answerButton.addEventListener("click", function() {
            score = checkAnswer(randomQuestion.correctAnswer, this.innerHTML, questionDiv, answerButtons, score);
            this.disabled= "true";
        });
        answerButtons.push(answerButton);
        questionsContainer.appendChild(answerButton);
    }
});

  function checkAnswer(correctAnswer, answer, questionDiv, answerButtons, score) {
    for(i = 0; i < answerButtons.length; i++){
        answerButtons[i].disabled = "true";
    }
    
    var answerImage = document.createElement("img");
    var hint = document.createElement("div");
    answerImage.style.width = "20px";
    answerImage.style.height = "20px";
    if (correctAnswer === answer) {
        score+=1;
        answerImage.src = "/images/test/correct.svg";
        setTimeout(() => {
            questions.forEach((question) => {
                if(questionDiv.innerText.includes(question.question)){
                    hint.innerText = question.hint;
                }
            }); 
            questionDiv.appendChild(hint);
            for(i = 0; i < answerButtons.length; i++){
                if(answerButtons[i].innerHTML != correctAnswer){
                    answerButtons[i].classList.add("move-right")
                }
                else{
                    var correctButton = answerButtons[i];
                    correctButton.classList.add("correct-answer");
                }
            }
        }, 1000); 
    } else {
        answerImage.src = "/images/test/wrong.svg";
        setTimeout(() => {
            for(i = 0; i < answerButtons.length; i++){
                answerButtons[i].classList.add("move-right")
            }
        }, 1000); 
    }
    setTimeout(() => {
        for(i = 0; i < answerButtons.length; i++){
            answerButtons[i].remove();
        }
        document.getElementById("question-button").disabled = false;
        questionDiv.removeChild(hint);
    }, 5000); 
    questionDiv.appendChild(answerImage);
    
    return score;
  }