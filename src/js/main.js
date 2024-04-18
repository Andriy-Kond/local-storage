import throttle from "lodash.throttle";

const refs = {
  inputField: document.querySelector('[name="formInput"]'),
  textareaField: document.querySelector('[name="formTextarea"]'),
  form: document.querySelector("[name='form']"),

  btn: document.querySelector(".btnSubmit"),
};

refs.form.addEventListener("input", throttle(typeMessageForm, 250));
refs.form.addEventListener("submit", submitForm);

const FORM_DATA_KEY = "formData";
let formData = {};
uploadMessage();

function uploadMessage() {
  const formDataString = localStorage.getItem(FORM_DATA_KEY);

  if (formDataString) {
    const formDataParsed = JSON.parse(formDataString);
    formData = formDataParsed;
    setFields(formDataParsed);
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
