// Function to initialize or load questions from local storage
function initializeQuiz() {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  renderQuestions(questions);
}

// Function to render questions on the page
function renderQuestions(questions) {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";

  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Question Text
    const questionText = document.createElement("p");
    questionText.classList.add("question-text");
    questionText.textContent = question.text;
    questionDiv.appendChild(questionText);

    // Answer Choices
    question.answers.forEach((answer, ansIndex) => {
      const answerDiv = document.createElement("div");
      answerDiv.classList.add("answer");

      // Highlight correct answers
      if (ansIndex === question.correctAnswer) {
        answerDiv.classList.add("correct-answer");
      }

      answerDiv.innerHTML = `<input type="radio" name="q${index}" value="${ansIndex}"> ${answer}`;
      questionDiv.appendChild(answerDiv);
    });

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editQuestion(index));
    questionDiv.appendChild(editBtn);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteQuestion(index));
    questionDiv.appendChild(deleteBtn);

    quizContainer.appendChild(questionDiv);
  });

  const addQuestionBtn = document.getElementById("add-question-btn");
  addQuestionBtn.addEventListener("click", addQuestion);

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener("click", submitAnswers);
}

// Function to add a new question
function addQuestion() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const newQuestion = {
    text: prompt("Enter the question text:"),
    answers: [
      prompt("Enter answer 1:"),
      prompt("Enter answer 2:"),
      prompt("Enter answer 3:"),
      prompt("Enter answer 4:"),
    ],
    correctAnswer:
      parseInt(prompt("Enter the correct answer index (1-4):")) - 1,
  };

  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));
  renderQuestions(questions);
}

// Function to edit a question
function editQuestion(index) {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const questionToEdit = questions[index];

  questionToEdit.text = prompt("Edit the question text:", questionToEdit.text);
  questionToEdit.answers.forEach((answer, ansIndex) => {
    questionToEdit.answers[ansIndex] = prompt(
      `Edit answer ${ansIndex + 1}:`,
      answer
    );
  });

  questionToEdit.correctAnswer =
    parseInt(prompt("Enter the correct answer index (1-4):")) - 1;

  localStorage.setItem("questions", JSON.stringify(questions));
  renderQuestions(questions);
}

// Function to delete a question
function deleteQuestion(index) {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  questions.splice(index, 1);

  localStorage.setItem("questions", JSON.stringify(questions));
  renderQuestions(questions);
}

// Function to submit answers and display feedback
function submitAnswers() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  let score = 0;

  questions.forEach((question, index) => {
    const selectedAnswer = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    if (selectedAnswer) {
      const userAnswerIndex = parseInt(selectedAnswer.value);
      if (userAnswerIndex === question.correctAnswer) {
        score++;
      }
    }
  });

  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;
}

// Initialize the quiz
initializeQuiz();
