// State
const ingredient = ['목살', '마늘', '설탕', '김치'];
// import ingredient from './my-ref.js'

let result = [];

// DOMs
const $containerWrap = document.querySelector('.container-wrap');

const render = res => {
  let html = '';

  res.forEach(({ name, img, difficulty }) => {
    html += `<div class="cuisine-container">
    <figure class="cuisine">
      <div class="img-wrapper">
        <img src="${img}" alt="${name}" />
        <span class="difficulty">${difficulty}</span>
      </div>
      <figcaption>${name}</figcaption>
      <i class="fas fa-bookmark"></i>
    </figure>
  </div>`;
  });

  $containerWrap.innerHTML = html;
};

const fetchIng = async () => {
  try {
    const data = await fetch('/cuisine');
    const res = await data.json();

    res.forEach(cuisine => {
      for (let i = 0; i < cuisine.ingredient.length; i++) {
        // console.log(cuisine.ingredient[i]);
        if (cuisine.ingredient.includes(ingredient[i])) {
          result.push(cuisine);
        }
      }

      render([...new Set(result)]);
    });
  } catch (e) {
    console.error(e);
  }
};

window.onload = fetchIng;
