import throttle from "lodash.throttle";

const refs = {
  inputField: document.querySelector('[name="formInput"]'),
  textareaField: document.querySelector('[name="formTextarea"]'),
  form: document.querySelector("[name='form']"),

  btn: document.querySelector(".btnSubmit"),
};

refs.form.addEventListener("input", throttle(typeMessageForm, 1000));
refs.form.addEventListener("submit", submitForm);

const FORM_DATA_KEY = "formData";
const formData = {};
uploadMessage();

function uploadMessage() {
  const formData = localStorage.getItem(FORM_DATA_KEY);

  if (formData) {
    setFields(JSON.parse(formData));
  }
}

function setFields(data) {
  Object.keys(data).map(key => {
    refs.form[key].value = data[key];
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
}
