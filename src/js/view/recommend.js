// DOMs
const $containerWrap = document.querySelector('.container-wrap');

const randomId = obj => {
  let array = [];
  obj.map(() => {
    if (array.length === 3) return;
    const random = Math.floor((Math.random() * obj.length + 1), 1);
    array.push(random === 0 ? random + 1 : random);
    array = [...new Set(array)];
    // return array;
  });
  getFatch(array);

  array = [];
};

const fetchAll = async () => {
  try {
    const data = await fetch('/cuisine');
    const res = await data.json();

    randomId(res);
  } catch (e) {
    console.error(e);
  }
};

const render = cuisines => {
  if (cuisines.length !== 3) return;
  let html = '';
  cuisines.forEach(cuisine => {
    html += `<div class="cuisine-container">
    <a href="http://localhost:5000/recipe.html?id=${cuisine.id}">
    <figure class="cuisine">
      <div class="img-wrapper">
        <img src="${cuisine.img}" alt="${cuisine.name}" />
        <span class="difficulty">${cuisine.difficulty}</span>
      </div>
      <figcaption>${cuisine.name}</figcaption>
      <i class="fas fa-bookmark"></i>
    </figure>
    </a>
  </div>`;
  });

  $containerWrap.innerHTML = html;
};

const getFatch = datas => {
  const cuisines = [];
  datas.forEach(async data => {
    try {
      const result = await fetch(`/cuisine/${data}`);
      const res = await result.json();

      cuisines.push(res);
      render(cuisines);
    } catch (e) {
      console.error(e);
    }
  });
};

window.onload = () => fetchAll();
