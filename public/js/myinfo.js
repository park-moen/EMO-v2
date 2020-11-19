let users = '';
const $myName = document.querySelector('.my-name');

// 닉네임으로 렌더하기
const fetchUsers = async () => {
  try {
    const getLoginData = sessionStorage.getItem('login');
    const loginResponse = JSON.parse(getLoginData);
    const loginNick = loginResponse.id;

    const res = await fetch(`/users/${loginNick}`);
    users = await res.json();
    render();
  } catch (err) {
    console.error(err);
  }
};

const render = () => {
  $myName.textContent = users.nickName;
};

window.onload = fetchUsers;

// const getQueryString = (url) => {
//   const str = url.split('=');
//   const qureyId = str[str.length - 1];
//   return qureyId;
// };

// console.log(getQueryString(window.location.href));
