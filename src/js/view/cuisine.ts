import 'CSS/cuisine.css';

type ingredientesDataType = {
	id: number;
	img: string;
	name: string;
	difficulty: string;
	ingredient: string[];
	recipe: string[];
};

// DOMs
const $containerWrap = document.querySelector('.container-wrap') as HTMLDivElement;
const $backBtn = document.querySelector('.back-btn') as HTMLButtonElement;
const $preview = document.querySelector('.preview') as HTMLDivElement;
const $previewList = document.querySelector('.preview-list') as HTMLUListElement;
const $popup = document.querySelector('.popup') as HTMLDivElement;
const $overlay = document.querySelector('.overlay') as HTMLDivElement;

const renderMain = (res: ingredientesDataType[]) => {
	let html = '';

	res.forEach(({ id, name, img, difficulty }) => {
		// 	html += `<div class="cuisine-container">
		//   <a href="http://localhost:5000/recipe.html?id=${id}">
		//   <figure class="cuisine">
		//     <div class="img-wrapper">
		//       <img src="${img}" alt="${name}" />
		//       <span class="difficulty">${difficulty}</span>
		//     </div>
		//     <figcaption>${name}</figcaption>
		//     <a class="bookmark" href="http://localhost:5000/myinfo.html?id=${id}"><i class="fas fa-bookmark"></i></a>
		//   </figure>
		//   </a>
		// </div>`;

		// <a href="http://localhost:5000/recipe.html?id=${id}">
		// <a class="bookmark" href="http://localhost:5000/myinfo.html?id=${id}">하이<i class="fas fa-bookmark"></i></a>

		html += `<div class="cuisine-container">
      <a href="#">
      <figure class="cuisine">
        <div class="img-wrapper">
          <span class="difficulty">${difficulty}</span>
        </div>
        <figcaption>${name}</figcaption>
        <a class="bookmark" href="#">하이<i class="fas fa-bookmark"></i></a>
      </figure>
      </a>
    </div>`;
	});

	$containerWrap.innerHTML = html;
};

const renderPrev = (res: ingredientesDataType[]) => {
	let li = '';

	res.forEach((item) => {
		li += `<li class="preview-item">${item}</li>`;
	});
	$previewList.innerHTML = li;
};

const fetchIng = async (ingredientes: string[]) => {
	let result: ingredientesDataType[] = [];
	try {
		const data = await fetch('http://localhost:8080/cuisine');
		const res = await data.json();

		res.forEach((cuisine: ingredientesDataType) => {
			for (let i = 0; i < cuisine.ingredient.length; i++) {
				if (cuisine.ingredient.includes(ingredientes[i])) {
					result.push(cuisine);
				}
			}
		});

		renderMain([...new Set(result)]);
	} catch (e) {
		console.error(e);
	}
};

// back btn route 연결하기
$backBtn.onclick = () => {
	window.location.assign('/ingredient.html');
};

(function () {
	const unrefinedIngredientesData = sessionStorage.getItem('ingredientes');

	if (unrefinedIngredientesData) {
		const refinedIngredientesData = JSON.parse(unrefinedIngredientesData);

		fetchIng(refinedIngredientesData);
		renderPrev(refinedIngredientesData);
		$preview.scrollLeft += 10;
	}
})();

const urls = [];
$containerWrap.onclick = (e) => {
	const target = e.target as HTMLDivElement;

	e.preventDefault();

	if (!target.matches('.fa-bookmark') && !target.matches('.bookmark')) {
		// id에 맞는 recipe 보여주는 route rogic
	} else {
		urls.push(target.getAttribute('href'));

		const unrefinedUserData = sessionStorage.getItem('login');

		if (unrefinedUserData) {
			const refinedUserData = JSON.parse(unrefinedUserData);
			sessionStorage.setItem(refinedUserData.id, JSON.stringify(target.getAttribute('href')));
		}

		$popup.style.display = 'block';
		$overlay.style.display = 'block';
		setTimeout(() => {
			$popup.style.display = 'none';
			$overlay.style.display = 'none';
		}, 1500);
	}
};
