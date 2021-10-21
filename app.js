const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const btn = document.getElementById("btn");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const loginArr = document.getElementById("login").querySelectorAll("input");
const registerArr = document
  .getElementById("register")
  .querySelectorAll("input");

const homeURL = document.location.href;

const url = "https://nodejs-survey-app.herokuapp.com/sign-up";
function register() {
  loginForm.style.left = "-400px";
  registerForm.style.left = "50px";
  btn.style.left = "110px";
}

function login() {
  loginForm.style.left = "50px";
  registerForm.style.left = "450px";
  btn.style.left = "0px";
}

function ValidateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

loginButton.addEventListener("click", function () {
  const uid = firebase
    .auth()
    .signInWithEmailAndPassword(loginArr[0].value, loginArr[1].value)
    .then((userCredential) => {
      console.log("signed in");
      //console.log(userCredential.user);
      sessionStorage.setItem("uid", userCredential.user.uid);
      const urlobj = new URL(homeURL);

      if (urlobj.searchParams.get("action") === "submit") {
        sessionStorage.setItem("surveyid", urlobj.searchParams.get("surveyid"));
        document.location.href = "fillForm.html";
      } else {
        document.location.href = "createForm.html";
      }
    })
    .catch((error) => {
      alert("Wrong Email or Password!");
    });
});

registerButton.addEventListener("click", function () {
  if (registerArr[2].value.length <= 6) {
    alert("Password length should be greater than 6 characters");
  }
  const user = {
    name: registerArr[0].value,
    email: registerArr[1].value,
    password: registerArr[2].value,
    gender: registerArr[3].value,
    age: registerArr[4].value,
  };
  if (!ValidateEmail(user.email)) {
    alert("Enter valid email");
  } else {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        alert("Registered Successfully, Log in now!");
      })
      .catch((error) => console.log("ERROR"));
  }
});
