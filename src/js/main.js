// import throttle from "lodash.throttle";
var _ = require("lodash");
// const throttle = require("lodash.throttle");

const FORM_DATA_KEY = "formData";
let formData = {};

const refs = {
  form: document.querySelector("[name='form']"),
  btn: document.querySelector(".btnSubmit"),
};

refs.form.addEventListener("input", _.throttle(typeMessageForm, 250));
refs.form.addEventListener("submit", submitForm);

uploadMessage();

function uploadMessage() {
  const formDataString = localStorage.getItem(FORM_DATA_KEY);

  if (formDataString) {
    formData = JSON.parse(formDataString);
    setFields(formData);
  }
}

function setFields(dataParsed) {
  Object.keys(dataParsed).map(key => {
    refs.form[key].value = dataParsed[key];
  });
}

function typeMessageForm(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
}

function submitForm(e) {
  e.preventDefault();
  localStorage.removeItem(FORM_DATA_KEY);
  e.currentTarget.reset();
  formData = {};
}
