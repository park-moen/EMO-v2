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
const $icon = document.querySelector('.fa-bell');
const $superStuffList = document.querySelector('.super-stuff > ul');
const $recipe = document.querySelector('.recipe');
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

const getLocation = () => JSON.parse(window.sessionStorage.getItem('ingredientes'));

// const setLocation = () => window.sessionStorage.setItem('ingredientes', JSON.stringify(changeLocal));

// const setLocal = target => {
//   changeLocal = getLocation();
//   changeLocal = [...changeLocal, target];
//   setLocation();
// };

// const getMemoId = res => {
//   console.log(res);
//   return res.length ? Math.max(res.map(elem => elem.id.substring(9)) + 1) : 1;
// };

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

// const fetchStuffList = async target => {
//   try {
//     const ReadData = await fetch('/cartmemos');
//     const res = await ReadData.json();
//     const dataInfo = res.map(elem => elem.content);
//     let contents = '';
//     dataInfo.forEach(moveItem => {
//       if (moveItem === target.textContent) return;
//       contents = target.textContent;
//     });

//     const dataId = res.length ? Math.max(...res.map(data => data.id.substring(9))) + 1 : 1;
//     console.log(dataId);
//     const createData = await fetch('/cartmemos', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: `cart-item${dataId}`, content: contents, completed: false })
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

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
  console.log(target.textContent);
  const ReadData = await fetch(`/cartmemos?content=\\b${target.textContent}\\b`);
  const res = await ReadData.json();
  console.log(res);
  // const dataInfo = res.map(elem => elem.content);
  // console.log(dataInfo);
  // memoState.push(target.textContent);
  // memoState = [...new Set(memoState)];

  // const dataId = res.length ? Math.max(...res.map(data => data.id.substring(9))) + 1 : 1;

  // memoState.forEach(async item => {
  //   const createData = await fetch('/cartmemos', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ id: `cart-item${dataId}`, content: item, completed: false })
  //   });
  // });
};
