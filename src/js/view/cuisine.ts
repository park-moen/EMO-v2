import 'CSS/cuisine.css';

import cuisineTemplate from 'Page/cuisine.hbs';

import imageTemplage from 'Image/깍두기볶음밥.jpg';

import { pushRouter } from 'JS/router';
import { timeModal } from 'JS/utils';

type ingredientesDataType = {
	id: number;
	img: string;
	name: string;
	difficulty: string;
	ingredient: string[];
	recipe: string[];
};

type Cuisine = {
	urls: string[];
	showRenderView: () => Promise<string>;
	renderAfter: () => Promise<void>;
	pushCuisineRoute: (target: HTMLElement) => void;
};

const Cuisine: Cuisine = {
	urls: [],
	async showRenderView() {
		return cuisineTemplate();
	},

	async renderAfter() {
		const $containerWrap = document.querySelector('.container-wrap') as HTMLDivElement;
		const $backBtn = document.querySelector('.cuisine-back-btn') as HTMLButtonElement;
		const $preview = document.querySelector('.preview') as HTMLDivElement;
		const $previewList = document.querySelector('.preview-list') as HTMLUListElement;

		const renderMain = (res: ingredientesDataType[]) => {
			let html = '';

			res.forEach(({ id, name, img, difficulty }) => {
				html += `<div class='cuisine-container'>
					<figure class='cuisine'>
						<a class="cuisine-wrapper" href='#' route='/recipe:${id}'>
							<div class='cuisine-img-wrapper'>
								<img src="${imageTemplage}" alt="${name}" />
								<span class='difficulty'>${difficulty}</span>
							</div>
							<figcaption class='cuisine-img-name'>${name}</figcaption>
						</a>
						<a class='bookmark' href='#' route='/recipe:${id}'>📌<i class='fas fa-bookmark'></i></a>
					</figure>
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
			console.log('뒤로가기');
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

		$containerWrap.onclick = (e) => {
			const target = e.target as HTMLDivElement;

			e.preventDefault();

			if (!target.matches('.fa-bookmark') && !target.matches('.bookmark')) {
				this.pushCuisineRoute(target);
			} else {
				const userData = JSON.parse(sessionStorage.getItem('login') || '');

				this.urls = [...new Set([...this.urls, target.getAttribute('route') || ''])];

				sessionStorage.setItem(userData.id, JSON.stringify(this.urls));

				timeModal();
			}
		};
	},

	pushCuisineRoute(target: HTMLElement) {
		let fullPathName: string[] | undefined = [];

		if (target.parentElement?.matches('.cuisine-wrapper')) {
			fullPathName = target.parentElement?.getAttribute('route')?.split(':');
		} else if (target.parentElement?.matches('.cuisine-img-wrapper')) {
			fullPathName = target.parentElement?.parentElement?.getAttribute('route')?.split(':');
		} else if (target.matches('.cuisine')) {
			fullPathName = target.firstElementChild?.getAttribute('route')?.split(':');
		}

		if (fullPathName) {
			const pathName = fullPathName[0];
			const queryId = fullPathName[1];

			pushRouter(pathName, queryId);
		}
	},
};

export default Cuisine;
