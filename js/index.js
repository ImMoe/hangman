const questionElement = document.querySelector('.question')
const answerElement = document.querySelector('.answer')
const alphabets = document.querySelectorAll('.word')
const nextQuestion = document.querySelector('.next-question')
const lifeElement = document.querySelector('.life span')
const gameOver = document.querySelector('.gameover')
const success = document.querySelector('.success')

const questions = []
let question = ''
let answer = ''
let guess
let attempts = 5

fetch('data/questions.json')
  .then((response) => response.json())
  .then((response) => {
    questions.push(...response)
    randomWord()
  })

nextQuestion.addEventListener('click', () => {
  answerElement.innerHTML = ''
  randomWord()
})

function randomWord() {
  const random = Math.floor(Math.random() * questions.length)
  question = questions[random].question
  answer = questions[random].answer
  questionElement.innerText = question
  for (let i = 0; i < answer.length; i++) {
    answerElement.innerHTML += `
      <p>_</p>
    `
  }

  alphabets.forEach((alphabet) =>
    alphabet.addEventListener('click', validateAnswer)
  )
}

function validateAnswer(e) {
  const key = e.key || e.target.innerText.toLowerCase()

  // See if game over?
  if (attempts == 1) {
    gameOver.style.display = 'flex'
    setTimeout(() => location.reload(), 2000)
  }
  // If letter is not inside word
  if (!answer.includes(key)) {
    attempts -= 1
    lifeElement.innerText = attempts
    e.target.style.textDecoration = 'line-through'
    e.target.style.opacity = '0.5'
    e.target.style.pointetEvents = 'none'
    return
  }

  // See how many times a letter occurs and its index
  const positions = []
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].toLowerCase() == key.toLowerCase()) {
      positions.push(i)
    }
  }
  // replace dom _ with correct word positions
  const placeholders = answerElement.querySelectorAll('p')
  positions.map((p) => (placeholders[p].innerText = answer[p]))

  const currentAnswerElement = Array.from(answerElement.children)
  guess = currentAnswerElement.map((answer) => answer.innerText)
  if (guess.join('') == answer) {
    success.style.display = 'flex'
    setTimeout(() => location.reload(), 2000)
  }
}
