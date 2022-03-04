// status
let foodList = [];
let changeLocal = [];
let memoState = [];
// DOMs
const $backBtn = document.querySelector('.back-btn');
const $mainImage = document.querySelector('.main-image > img');
const $foodName = document.querySelector('.food-name');
const $lastSpan = document.querySelector('.food-title span:nth-child(3)');
const $stuffList = document.querySelector('.stuff-list');
const $superStuffList = document.querySelector('.super-stuff > ul');
const $recipe = document.querySelector('.recipe');
const $bookMark = document.querySelector('.book-mark');


// function
const render = ({ ingredient, recipe }) => {
  let stuffHtml = '';
  let recipeHtml = '';
  ingredient.forEach($list => {
    stuffHtml += `<li>${$list}</li>`;
  });
  recipe.forEach($list => {
    recipeHtml += `<li>${$list}</li>`;
  });
  $superStuffList.innerHTML = stuffHtml;
  $recipe.innerHTML = recipeHtml;
};

const getQueryString = url => {
  const str = url.split('=');
  const qureyId = str[str.length - 1];
  return qureyId;
};

const getLocation = () => JSON.parse(window.sessionStorage.getItem('ingredientes'));

const filterData = ingredient => {
  const data = ingredient.filter((_, i) => !getLocation().includes(ingredient[i]));
  [...$superStuffList.children].forEach(li => {
    if (data.includes(li.textContent)) li.classList.add('not-stuff');
  });
};

const fetchFoodList = async () => {
  try {
    const data = await fetch(`/cuisine/${getQueryString(window.location.href)}`);
    const res = await data.json();
    foodList = res;
    $foodName.textContent = foodList.name;
    $lastSpan.textContent = foodList.difficulty;
    $mainImage.setAttribute('src', `${foodList.img}`);
    render(res);
    filterData(res.ingredient);
  } catch (e) {
    console.error(`error: ${e}`);
  }
};

// Event Binding
window.onload = () => {
  fetchFoodList();
};
$backBtn.onclick = () => {
  window.location.assign('cuisine.html');
};
$stuffList.onclick = async ({ target }) => {
  if (!target.matches('.stuff-list > li')) return;
  target.classList.remove('not-stuff');
};

$bookMark.onclick = e => {
  e.preventDefault();
  const url = window.location.href;
  const userId = JSON.parse(window.sessionStorage.getItem('login'));
  window.sessionStorage.setItem(userId.id, JSON.stringify(url));
};
