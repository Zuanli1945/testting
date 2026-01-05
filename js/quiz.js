// Function untuk generate soal random
function generateQuestion() {
    const operations = ['+', '-', '×', '÷', '√'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question = '';
    let correctAnswer = 0;
    
    switch(operation) {
        case '+':
            const add1 = Math.floor(Math.random() * 50) + 1;
            const add2 = Math.floor(Math.random() * 50) + 1;
            question = `Berapa hasil dari ${add1} + ${add2}?`;
            correctAnswer = add1 + add2;
            break;
            
        case '-':
            const sub1 = Math.floor(Math.random() * 50) + 30;
            const sub2 = Math.floor(Math.random() * 30) + 1;
            question = `Berapa hasil dari ${sub1} - ${sub2}?`;
            correctAnswer = sub1 - sub2;
            break;
            
        case '×':
            const mul1 = Math.floor(Math.random() * 12) + 2;
            const mul2 = Math.floor(Math.random() * 12) + 2;
            question = `Berapa hasil dari ${mul1} × ${mul2}?`;
            correctAnswer = mul1 * mul2;
            break;
            
        case '÷':
            const div2 = Math.floor(Math.random() * 10) + 2;
            const div1 = div2 * (Math.floor(Math.random() * 10) + 2);
            question = `Berapa hasil dari ${div1} ÷ ${div2}?`;
            correctAnswer = div1 / div2;
            break;
            
        case '√':
            const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225];
            const square = perfectSquares[Math.floor(Math.random() * perfectSquares.length)];
            question = `Berapa hasil dari √${square}?`;
            correctAnswer = Math.sqrt(square);
            break;
    }
    
    return { question, correctAnswer };
}

// Function untuk generate jawaban (3 salah, 1 benar)
function generateAnswers(correctAnswer) {
    const answers = [correctAnswer];
    
    while(answers.length < 4) {
        let wrongAnswer;
        const diff = Math.floor(Math.random() * 10) + 1;
        
        if(Math.random() > 0.5) {
            wrongAnswer = correctAnswer + diff;
        } else {
            wrongAnswer = correctAnswer - diff;
        }
        
        // Pastikan jawaban salah positif dan unik
        if(wrongAnswer > 0 && !answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }
    
    // Acak urutan jawaban
    return answers.sort(() => Math.random() - 0.5);
}

// Variables
let currentQuestion = 0;
let score = 0;
let answered = false;
let questions = [];
const totalQuestions = 10;

// Elements
const questionEl = document.getElementById('question');
const answerBtns = document.querySelectorAll('.answer-btn');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const resultModal = document.getElementById('resultModal');
const finalScoreEl = document.getElementById('finalScore');
const resultMessageEl = document.getElementById('resultMessage');
const retryBtn = document.getElementById('retryBtn');
const homeBtn = document.getElementById('homeBtn');

// Initialize quiz
function initQuiz() {
    // Generate semua soal di awal
    questions = [];
    for(let i = 0; i < totalQuestions; i++) {
        const q = generateQuestion();
        const answers = generateAnswers(q.correctAnswer);
        questions.push({
            question: q.question,
            answers: answers,
            correct: answers.indexOf(q.correctAnswer)
        });
    }
    
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = 0;
    totalEl.textContent = totalQuestions;
    loadQuestion();
    nextBtn.disabled = true;
}

// Load question
function loadQuestion() {
    answered = false;
    nextBtn.disabled = true;
    
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    currentEl.textContent = currentQuestion + 1;
    
    answerBtns.forEach((btn, index) => {
        btn.textContent = question.answers[index];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
}

// Check answer
function checkAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const question = questions[currentQuestion];
    
    answerBtns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        }
    });
    
    if (selectedIndex === question.correct) {
        score++;
        scoreEl.textContent = score;
    } else {
        answerBtns[selectedIndex].classList.add('wrong');
    }
    
    nextBtn.disabled = false;
}

// Next question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    finalScoreEl.textContent = score;
    
    let message = '';
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
        message = 'Sempurna! Kamu jenius! 🌟';
    } else if (percentage >= 80) {
        message = 'Luar biasa! Hasil yang bagus! 🎉';
    } else if (percentage >= 60) {
        message = 'Bagus! Terus tingkatkan! 👍';
    } else if (percentage >= 40) {
        message = 'Cukup baik, terus belajar! 📚';
    } else {
        message = 'Jangan menyerah, coba lagi! 💪';
    }
    
    resultMessageEl.textContent = message;
    resultModal.classList.add('active');
}

// Retry quiz
function retryQuiz() {
    resultModal.classList.remove('active');
    initQuiz();
}

// Go home
function goHome() {
    window.location.href = 'Landing_page.html';
}

// Event listeners
answerBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => checkAnswer(index));
});

nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', retryQuiz);
homeBtn.addEventListener('click', goHome);

// Start quiz
initQuiz();