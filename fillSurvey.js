const answer = {};

const submitButton = document.querySelector(".submit-button");
const survey_options = document.getElementById("survey_options");
const uid = sessionStorage.getItem("uid");
const surveyID = sessionStorage.getItem("surveyid");

const url = `https://nodejs-survey-app.herokuapp.com/get_survey/${surveyID}`;
const postUrl = `https://nodejs-survey-app.herokuapp.com/submit_survey/${surveyID}/${uid}`;

async function getSurvey() {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const survey = await res.json();
  return survey;
}

getSurvey().then((survey) => {
  //console.log(survey);
  for (const value of Object.values(survey)) {
    let newField = document.createElement("p");
    newField.setAttribute("type", "text");
    newField.setAttribute("name", "survey_options[]");
    newField.setAttribute("class", "survey_options");
    newField.setAttribute("siz", 50);
    newField.innerHTML = value;
    survey_options.appendChild(newField);

    newField = document.createElement("input");
    newField.setAttribute("type", "text");
    newField.setAttribute("name", "survey_options[]");
    newField.setAttribute("class", "survey_options");
    newField.setAttribute("siz", 50);
    newField.setAttribute("placeholder", "Enter Answer");
    survey_options.appendChild(newField);
  }
});

submitButton.addEventListener("click", function () {
  const inputElements = survey_options.querySelectorAll("input");
  //console.log("print");
  for (const [key, field] of inputElements.entries()) {
    if (field.value) answer[key] = field.value;
  }
  //console.log(answer);
  fetch(postUrl, {
    method: "POST",
    body: JSON.stringify(answer),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((data) => alert(data))
    .catch((error) => console.log("ERROR", error));
});
