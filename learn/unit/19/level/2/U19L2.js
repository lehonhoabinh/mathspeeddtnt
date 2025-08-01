import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải phương trình:  
            2x² + 6x = 0
        `,
        answers: [
            `x = 0 hoặc x = -3`,
            `x = 0 hoặc x = 3`,
            `x = -3`,
            `x = 3`,
        ],
        explain: `
            - Phương trình 2x² + 6x = 0.  
            - Đặt nhân tử chung: 2x(x + 3) = 0.  
            - Khi 2x = 0 thì x = 0.  
            - Khi x + 3 = 0 thì x = -3.  
            - Vậy nghiệm của phương trình là x = 0 hoặc x = -3.
        `
    }, {
        question: `
            Giải phương trình:  
            x² - 5x = 0
        `,
        answers: [
            `x = 0 hoặc x = 5`,
            `x = 0 hoặc x = -5`,
            `x = 5`,
            `x = -5`,
        ],
        explain: `
            - Phương trình x² - 5x = 0.  
            - Đặt nhân tử chung: x(x - 5) = 0.  
            - Khi x = 0 hoặc x - 5 = 0 thì x = 5.  
            - Vậy nghiệm của phương trình là x = 0 hoặc x = 5.
        `
    }, {
        question: `
            Giải phương trình:  
            3x² + 9x = 0
        `,
        answers: [
            `x = 0 hoặc x = -3`,
            `x = 0 hoặc x = 3`,
            `x = -3`,
            `x = 3`,
        ],
        explain: `
            - Phương trình 3x² + 9x = 0.  
            - Đặt nhân tử chung: 3x(x + 3) = 0.  
            - Khi 3x = 0 thì x = 0.  
            - Khi x + 3 = 0 thì x = -3.  
            - Vậy nghiệm của phương trình là x = 0 hoặc x = -3.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[18].levels[2].state = 'unlock';
        localStorage.setItem('units', JSON.stringify(units));
        alert("Bạn đã hoàn thành tất cả câu hỏi!");
        document.location.href = '../../../../';
    }

    const { question, answers, explain } = lesson[0];
    const correctAnswer = answers[0];
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

    // DOM elements
    const questionElement = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options-container');
    const explainElement = document.querySelector('.explain');
    const checkButton = document.querySelector('.check-btn');
    const continueButton = document.querySelector('.continue-btn');

    // Reset UI
    questionElement.innerHTML = question;
    optionsContainer.innerHTML = '';
    explainElement.innerHTML = '';
    continueButton.classList.add('hide');

    // Track selected option
    let selectedOption = null;

    // Render options
    shuffledAnswers.forEach(answer => {
        const option = document.createElement('div');
        option.className = 'option';
        option.innerHTML = answer;

        option.addEventListener('click', () => {
            if (selectedOption) {
                selectedOption.classList.remove('selected');
            }
            option.classList.add('selected');
            selectedOption = option;
        });

        optionsContainer.appendChild(option);
    });

    // Set up event for "Check" button
    checkButton.replaceWith(checkButton.cloneNode(true));
    const newCheckButton = document.querySelector('.check-btn');

newCheckButton.style.pointerEvents = 'auto';





    newCheckButton.addEventListener('click', () => {
        if (!selectedOption) {
            alert("Vui lòng chọn một đáp án!");
            return;
        }
        console.log(selectedOption.innerHTML);
        console.log(correctAnswer);
        const isCorrect = selectedOption.innerHTML === correctAnswer;
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            point++;
            lesson.shift();
            updateProgressBar(point, maxPoint);
            if (explain)
                explainElement.innerHTML = 
                    `<p class="highlight">Giải thích<p>` + explain;
        } else {
            const currentQuestion = lesson.shift();
            lesson.push(currentQuestion);
            explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
        }

        // Sound Effect
        const audio = new Audio(`../../../../assets/sounds/${isCorrect}.mp3`);
        audio.play();

        // Disable options and check button
        optionsContainer.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        newCheckButton.disabled = true;

        



        

                newCheckButton.style.pointerEvents = "none";

        // Show continue button
        continueButton.classList.remove('hide');
    });
}

function setContinueButton() {
    const continueButton = document.querySelector('.continue-btn');
    continueButton.addEventListener('click', displayQuestion);
}

// Initialize quiz
setContinueButton();
displayQuestion();
