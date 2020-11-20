const $myInfoCategory = document.querySelector('.my-info-category');

$myInfoCategory.onclick = (e) => {
  if (e.target.matches('#tab1,#tab2,#tab3')) {
    document.querySelectorAll('.tab').forEach(($tab) => {
      $tab.classList.toggle('active', e.target.id === $tab.classList[1]);
    });
    // e.target.nextElementSibling.classList.add('active');
  }
};

let users = '';
const $myName = document.querySelector('.my-name');

const render = () => {
  $myName.textContent = users.nickname;
};

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

window.onload = fetchUsers;

// // const getQueryString = (url) => {
// //   const str = url.split('=');
// //   const qureyId = str[str.length - 1];
// //   return qureyId;
// // };

// // console.log(getQueryString(window.location.href));
// >>>>>>> 7fdfbdd0312fa948b76c812dd90711d040d2c26c
