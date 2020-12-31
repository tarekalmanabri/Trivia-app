document.body.innerHTML += `
  <div class="main">
    <div>
      <h1>Let's play some Trivia!</h1>
      <p>Try your best to figure out, if you really have no clue, click on the question to reveal the answer...</p>
    </div>
     <div class="questions" id="questions">
</div>
</div>`;

const questions = document.getElementById('questions');

async function trivia() {
  const res = await fetch(
    'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy',
  );
  const json = await res.json();
  let resultArray = json.results;
  resultArray.forEach((element) => {
    const question = document.createElement('p');
    const answer = document.createElement('span');

    question.innerText = decodeHtml(element.question);
    answer.innerText = decodeHtml(element.correct_answer);
    question.classList.add('question');
    answer.classList.add('answer');

    question.addEventListener('click', () => {
      let className = answer.classList;
      let result = className.toggle('hidden');

      if (result) {
        answer.classList.add('hidden');
      } else {
        answer.classList.add('answer');
      }
    });
    questions.appendChild(question);
    questions.appendChild(answer);
  });
  return json;
}
try {
  trivia();
} catch (error) {
  console.log(error);
}
/**
 * https://stackoverflow.com/a/7394787
 *
 * @param {*} html
 */
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
