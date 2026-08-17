const form = document.getElementById("signup-form"),
  userName = document.getElementById("user-name"),
  userEmail = document.getElementById("user-email"),
  userAge = document.getElementById("user-age"),
  userPersonalNumber = document.getElementById("personal-number"),
  userMobileNumber = document.getElementById("mobile-number"),
  userJobDescription = document.getElementById("job-description");

const dialog = document.querySelector("dialog"),
  closeDialog = dialog.querySelector(".close");

closeDialog.addEventListener("click", () => {
  dialog.close();
  dialog.querySelector("h2").innerText = "";
  dialog.querySelector("p").innerText = "";
  window.location.href = "profile.html";
});

function showDialog(title, description) {
  dialog.querySelector("h2").innerText = title;
  dialog.querySelector("p").innerText = description;
  dialog.showModal();
}

function removeError(inputEl) {
  inputEl.closest(".form-group").classList.remove("error");
  inputEl.closest(".form-group").querySelector(".message").textContent = "";
}

function showError(inputEl, message) {
  inputEl.closest(".form-group").classList.add("error");
  inputEl.closest(".form-group").querySelector(".message").textContent =
    message;
}

function checkUserNameValidity() {
  if (userName.validity.valueMissing) {
    showError(userName, "user name is required");
    return false;
  } else if (userName.validity.tooShort || userName.validity.tooLong) {
    showError(userName, "user name must be 5 character");
    return false;
  } else {
    removeError(userName);
    return true;
  }
}

function checkUserAgeValidity() {
  const userAgeValue = Number(userAge.value);
  if (!userAgeValue) {
    showError(userAge, "user age is required");
    return false;
  } else if (userAgeValue < 10 || userAgeValue > 50) {
    showError(userAge, "user age must be between 10 and 50");
    return false;
  } else {
    removeError(userAge);
    return true;
  }
}

function checkUserPersonalNumberValidity() {
  const value = userPersonalNumber.value.trim();
  if (!value) {
    showError(userPersonalNumber, "personal number is required");
    return false;
  } else if (!/^\d+$/.test(value)) {
    showError(userPersonalNumber, "personal number must contain only digits");
    return false;
  } else if (value.length !== 11) {
    showError(userPersonalNumber, "personal number must be 11 digits");
    return false;
  } else {
    removeError(userPersonalNumber);
    return true;
  }
}

function checkUserMobileNumberValidity() {
  const value = userMobileNumber.value.trim();
  if (!value) {
    showError(userMobileNumber, "mobile number is required");
    return false;
  } else if (!/^\d+$/.test(value)) {
    showError(userMobileNumber, "mobile number must contain only digits");
    return false;
  } else if (value.length !== 9) {
    showError(userMobileNumber, "mobile number must be 9 digits");
    return false;
  } else {
    removeError(userMobileNumber);
    return true;
  }
}

function checkUserJobDescriptionValidity() {
  const value = userJobDescription.value.trim();
  if (value.length > 50) {
    showError(
      userJobDescription,
      "job description must be less than 50 characters",
    );
    return false;
  } else {
    removeError(userJobDescription);
    return true;
  }
}

userName.addEventListener("input", checkUserNameValidity);
userAge.addEventListener("input", checkUserAgeValidity);
userPersonalNumber.addEventListener("input", checkUserPersonalNumberValidity);
userMobileNumber.addEventListener("input", checkUserMobileNumberValidity);
userJobDescription.addEventListener("input", checkUserJobDescriptionValidity);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isUserNameValid = checkUserNameValidity();
  const isUserAgeValid = checkUserAgeValidity();
  const isPersonalNumberValid = checkUserPersonalNumberValidity();
  const isMobileNumberValid = checkUserMobileNumberValidity();
  const isJobDescriptionValid = checkUserJobDescriptionValidity();

  if (
    isUserNameValid &&
    isUserAgeValid &&
    isPersonalNumberValid &&
    isMobileNumberValid &&
    isJobDescriptionValid
  ) {
    const userInfo = {
      name: userName.value,
      age: userAge.value,
      email: userEmail.value,
      personalNumber: userPersonalNumber.value,
      mobileNumber: userMobileNumber.value,
      jobDescription: userJobDescription.value,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    form.reset();
    showDialog("sign up", "user registered successfuly");
  }
});
