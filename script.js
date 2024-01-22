document.addEventListener("DOMContentLoaded", function () {
  // Réinitialiser les choix de radio au chargement de la page
  resetRadioChoices();

  let questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    let options = question.querySelectorAll('input[type="radio"]');
    options.forEach(function (option) {
      option.addEventListener("click", function () {
        // Réinitialiser la couleur de fond à la couleur violette initiale
        question.style.backgroundColor = "#a983cd";
      });
    });
  });
});

function validateQuiz() {
  let correctAnswers = [
    "Napoleon BONAPARTE",
    "4 juillet 1776",
    "15 après.J-C",
    "Ljublajana",
    "4,9 million",
  ];
  let score = 0;

  // vert bonne reponse et rouge mauvaise reponse
  for (let i = 1; i <= 5; i++) {
    let selectedAnswer = document.querySelector(
      'input[name="q' + i + '"]:checked'
    );
    let questionElement = document.getElementsByClassName("question")[i - 1];

    if (selectedAnswer) {
      let userAnswer = selectedAnswer.value;

      if (userAnswer === correctAnswers[i - 1]) {
        // Réponse correcte
        questionElement.style.backgroundColor = "#8FED8F";
        score++;
      } else {
        // Réponse incorrecte
        questionElement.style.backgroundColor = "#FF8F8F";

        // Ajouter la classe shake uniquement aux questions incorrectes
        questionElement.classList.add("shake");
        setTimeout(function () {
          questionElement.classList.remove("shake");
        }, 300);
      }
    }
  }

  displayResultMessage(score);
}

function resetRadioChoices() {
  let radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(function (radio) {
    // Cocher le premier choix par défaut
    radio.checked = radio.hasAttribute("checked");
  });
}

// Touts les messages d'erreurs.
function displayResultMessage(score) {
  let resultMessageElement = document.getElementById("result-message");
  let scoreElement = document.getElementById("score");
  let emoji = "";
  let encouragement = "";

  if (score === 0 || score === 1) {
    emoji = "&#x1F922;";
    encouragement = "Tu es à terre ! ";
  } else if (score === 2) {
    emoji = "&#x1F480";
    encouragement = "Nul nul nul nul !";
  } else if (score === 3) {
    emoji = "&#x1F57A";
    encouragement = "Tu peux mieux faire !";
  } else if (score === 4) {
    emoji = "&#x1F576";
    encouragement = "tu est trop fort";
  } else if (score === 5) {
    emoji = "&#x1F47D";
    encouragement = "Sans faute, je te tire mon chapeau !";
  }

  let additionalPhrase =
    score >= 0 && score < 5
      ? "<br><br>Retente une autre réponse dans les cases rouges, puis re-valide !"
      : "";

  resultMessageElement.innerHTML = `${emoji} ${encouragement} ${emoji}${additionalPhrase}`;
  scoreElement.textContent = `${score}/5`;

  let resultContainer = document.getElementById("result-container");
  resultContainer.classList.add("result-submitted"); // Ajoute la classe
}
