const uploadIconEle = document.querySelector(".upload-icon");
const avatarEle = document.querySelector(".upload label .avatar");
const dragAndDropMsgEle = document.querySelector(".upload-section .drag-drop-msg");
const uploadMsgEle = document.querySelector(".upload-msg p");
const infoIcon = document.querySelector(".upload-msg .info-icon");
const controlAvatarEle = document.querySelector(".upload-section .control-avatar");

function handleInValidUploadImg(errorMsg) {
  infoIcon.classList.add("c-orange-700");
  uploadMsgEle.classList.add("c-orange-700");
  uploadMsgEle.textContent = errorMsg;
}

function handleValidUploadImg() {
  infoIcon.classList.remove("c-orange-700");
  uploadMsgEle.classList.remove("c-orange-700");
  uploadMsgEle.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
}

function showAvatar() {
  uploadIconEle.classList.add("hidden");
  avatarEle.classList.remove("hidden");
}

function hideAvatar() {
  uploadIconEle.classList.remove("hidden");
  avatarEle.classList.add("hidden");
}

function showControlAvatar() {
  dragAndDropMsgEle.classList.add("hidden");
  controlAvatarEle.classList.remove("hidden");
}

function hideControlAvatar() {
  dragAndDropMsgEle.classList.remove("hidden");
  controlAvatarEle.classList.add("hidden");
}

function handleRemoveImgBtn() {
  const removeBtn = document.querySelector(".upload-section .control-avatar .remove");
  removeBtn.addEventListener("pointerup", () => {
    fileInput.value = null;
    avatarEle.removeAttribute("src");
    hideAvatar();
    hideControlAvatar();
    handleValidUploadImg();
  });
}

function handleChangeImgBtn() {
  const changeBtn = document.querySelector(".upload-section .control-avatar .change");
  changeBtn.addEventListener("pointerup", () => fileInput.click());
}

handleRemoveImgBtn();
handleChangeImgBtn();
const fileInput = document.querySelector("input[type='file']");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file.size / 1000 >= 500) return handleInValidUploadImg("File too large. please upload a photo under 500KB.");

  handleValidUploadImg();
  showControlAvatar();
  const url = URL.createObjectURL(file);
  avatarEle.src = url;
  showAvatar();
});

function setTxtContentToEle(ele, data) {
  return (document.querySelector(ele).textContent = data);
}

function generateId() {
  const nums = "0123456789";
  let ticketId = "#";
  for (let i = 0; i < 5; i++) ticketId += nums[Math.trunc(Math.random() * nums.length)];
  document.querySelector(".user-ticket .ticket-id").textContent = ticketId;
}

const userNameEle = document.querySelector("input[name='user-name']");
const userMailEle = document.querySelector("input[name='user-email']");
const userGithubEle = document.querySelector("input[name='user-github']");

userGithubEle.addEventListener("input", () => {
  if (userGithubEle.value.length === 1 && userGithubEle.value !== "@") {
    userGithubEle.value = `@${userGithubEle.value}`;
  }
});

function validateForm() {
  let userNameValidation = false;
  let userMailValidation = false;
  let userGithubValidation = false;
  const userNameError = document.querySelector(".user-info .invalid-field.username");
  const emailError = document.querySelector(".user-info .invalid-field.email");
  const githubError = document.querySelector(".user-info .invalid-field.github");

  if (/^[a-zA-Z][\w.\s]{2,19}$/.test(userNameEle.value)) {
    userNameValidation = true;
    userNameError.classList.add("hidden");
  } else {
    userNameError.classList.remove("hidden");
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userMailEle.value)) {
    userMailValidation = true;
    emailError.classList.add("hidden");
  } else {
    emailError.classList.remove("hidden");
  }

  if (/^@[\w.]{2,19}$/.test(userGithubEle.value)) {
    userGithubValidation = true;
    githubError.classList.add("hidden");
  } else {
    githubError.classList.remove("hidden");
  }

  if (!avatarEle.hasAttribute("src")) {
    handleInValidUploadImg("Please upload your photo");
    return false;
  }

  if (userNameValidation === false || userMailValidation === false || userGithubValidation === false) {
    return false;
  }
}

document.forms[0].onsubmit = (e) => {
  e.preventDefault();

  if (validateForm() === false) return;

  document.querySelector(".sign-in").classList.add("hidden");

  const animationTicket = document.querySelector(".ticket-animation");
  animationTicket.classList.remove("hidden");
  setTimeout(() => animationTicket.classList.remove("opacity-0"), 150);
  document.querySelector(".user-ticket .user-info > img").src = avatarEle.src;

  setTxtContentToEle(".ticket-ready .title h1 span", userNameEle.value);
  setTxtContentToEle(".ticket-ready .title .desc span", userMailEle.value);
  setTxtContentToEle(".user-ticket .user-acc h2", userNameEle.value);
  setTxtContentToEle(".user-ticket .user-acc .github-name", userGithubEle.value);
  generateId();

  setTimeout(() => {
    animationTicket.querySelector("h2").textContent = "Your ticket is ready";
    setTimeout(() => {
      document.querySelector(".ticket-ready").classList.remove("hidden");
      setTimeout(() => {
        document.querySelector(".ticket-ready").classList.remove("opacity-0");
        document.querySelector(".ticket-ready").classList.remove("trans-y-15");
      }, 200);
      animationTicket.classList.add("hidden");
    }, 2000);
  }, 3000);
};
