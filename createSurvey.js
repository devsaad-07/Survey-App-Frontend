const survey = {};

const submitButton = document.querySelector(".submit-button");
const survey_options = document.getElementById("survey_options");
const add_more_fields = document.getElementById("add_more_fields");
const remove_fields = document.getElementById("remove_fields");

const url = "https://nodejs-survey-app.herokuapp.com/create_survey";
const urlMail = "https://nodejs-survey-app.herokuapp.com/send-email";

add_more_fields.onclick = function () {
  const newField = document.createElement("input");
  newField.setAttribute("type", "text");
  newField.setAttribute("name", "survey_options[]");
  newField.setAttribute("class", "survey_options");
  newField.setAttribute("siz", 50);
  newField.setAttribute("placeholder", "Enter Field");
  survey_options.appendChild(newField);
};

remove_fields.onclick = function () {
  const input_tags = survey_options.getElementsByTagName("input");
  if (input_tags.length > 1) {
    survey_options.removeChild(input_tags[input_tags.length - 1]);
  }
};

submitButton.addEventListener("click", function () {
  const inputElements = survey_options.querySelectorAll("input");
  console.log("print");
  for (const [key, field] of inputElements.entries()) {
    if (field.value) survey[key] = field.value;
  }
  //console.log(survey);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(survey),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const dataSeperated = data.split("/");
      const surveyid = dataSeperated[dataSeperated.length - 1];
      //console.log(dataSeperated, surveyid);
      sendMail(surveyid);
      alert("Survey Added!");
    })
    .catch((error) => console.log("ERROR"));
});

function sendMail(data) {
  fetch(urlMail, {
    method: "POST",
    body: JSON.stringify({ id: data }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("ERROR", error));
}
