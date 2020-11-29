// DOMs
const $likeRecipe = document.querySelector('.like-recipe-content');
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

const renderImg = (imgId, res) => {
  let html = '';

  imgId.forEach(id => {
    html += `
    <li>
    <a href="http://localhost:5000/recipe.html?id=${id}">
    <img src='${res[id - 1].img}'>
    </a>
    </li>`;
  });

  $likeRecipe.innerHTML = html;
};

const fetchImg = () => {
  const parse = JSON.parse(window.sessionStorage.getItem('login'));
  const imgArray = JSON.parse(window.sessionStorage.getItem(parse.id));
  const imgId = [];
  imgArray.forEach(img => {
    const num = img.split('=');
    imgId.push(num[num.length - 1]);
  });
  window.sessionStorage.setItem(parse.id, JSON.stringify([...new Set(imgId)]));

  const getfetch = (async () => {
    try {
      const data = await fetch('/cuisine');
      const res = await data.json();

      renderImg([...new Set(imgId)], res);
    } catch (e) {
      console.error(e);
    }
  })();
};

window.onload = () => {
  fetchUsers();
  fetchImg();
};
