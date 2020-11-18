// status
let foodList = [];
// DOMs
const $backBtn = document.querySelector('.back-btn');
const $mainImage = document.querySelector('.main-image > img');
const $foodName = document.querySelector('.food-name');
const $lastSpan = document.querySelector('.food-title span:nth-child(3)');
const $superStuffList = document.querySelector('.super-stuff > ul');
const $recipe = document.querySelector('.recipe');
// const $subStuffList = document.querySelector('.sub-stuff > ul');
// function
const render = ({ ingredient, recipe }) => {
  let stuffHtml = '';
  let recipeHtml = '';
  ingredient.forEach(($list) => {
    stuffHtml += `<li>${$list}</li>`;
  });
  recipe.forEach(($list) => {
    recipeHtml += `<li>${$list}</li>`;
  });
  $superStuffList.innerHTML = stuffHtml;
  $recipe.innerHTML = recipeHtml;
};
const getQueryString = (url) => {
  const str = url.split('=');
  const qureyId = str[str.length - 1];
  return qureyId;
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
