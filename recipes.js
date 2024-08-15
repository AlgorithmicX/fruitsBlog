const questions = [
    {
        question: "Which fruit is the primary ingredient in the production of the Japanese delicacy \"umeboshi,\" a salty and sour pickled dish?",
        answers: [
            {text: "Plum", correct: true},
            {text: "Persimmon", correct: false},
            {text: "Cherry", correct: false},
            {text: "Yuzu", correct: false},
        ]
    },
    {
        question: "What fruit is associated with the world's most expensive fruit auction, where a pair of the fruit once sold for over $45,000?",
        answers: [
            {text: "Yubari King Melon", correct: true},
            {text: "Ruby Roman Grapes", correct: false},
            {text: "Densuke Watermelon", correct: false},
            {text: "Taiyo no Tamago Mango", correct: false},
        ]
    },
    {
        question: "Which fruit, known as the \"king of fruits,\" is banned in many public places in Southeast Asia due to its strong odor?",
        answers: [
            {text: "Mangosteen", correct: false},
            {text: "Durian", correct: true},
            {text: "Soursop", correct: false},
            {text: "Rambutan", correct: false},
        ]
    },
    {
        question: "Which fruit is known for having the highest oil content of any fruit, sometimes exceeding 60%, making it a significant source of vegetable oil?",
        answers: [
            {text: "Olive", correct: false},
            {text: "Coconut", correct: false},
            {text: "Avocado", correct: false},
            {text: "Palm Fruit", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestCount = 0;
let score = 0;

function startQuiz(){
    currentQuestCount = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestCount];
    let questionNo = currentQuestCount + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion
        .question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("buttons");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)

    });

}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestCount++;
    if(currentQuestCount < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestCount < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();