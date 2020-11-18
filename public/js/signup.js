// DOMs
const $form = document.querySelector('form');
const $userId = document.querySelector('#user-id');
const $userPw = document.querySelector('#user-pw');
const $userPwCheck = document.querySelector('#user-pw-check');
const $userNickname = document.querySelector('#user-nickname');

// function
const fetchUserAll = async () => {
  const data = await fetch('/users');
  const res = await data.json();
  console.log(res);
};

const fetchSingUp = async () => {
  try {
    await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: $userId.value,
        password: $userPw.value,
        nickName: $userNickname.value
      })
    });
  } catch (e) {
    console.error(e);
  }
};

// Event Binding
window.onload = fetchUserAll;

$userId.addEventListener('focusout', e => {
  console.log(e.target.value);
});
