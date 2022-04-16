import 'CSS/recipe.css';

import recipeTemplate from 'Page/recipe.hbs';

import imageTemp from 'Image/김치볶음밥.jpg';

import { timeModal } from 'JS/utils';

type FoodListData = {
	id: number;
	name: string;
	img: string;
	difficulty: string;
	ingredient: string[];
	recipe: string[];
};

type Recipe = {
	foodList: FoodListData;
	showRenderView: () => Promise<string>;
	renderAfter: () => Promise<void>;
	filterData: (ingredient: string[]) => void;
	fetchFoodList: () => Promise<void>;
	renderFetchView: ({ ingredient, recipe }: { ingredient: string[]; recipe: string[] }) => void;
};

const Recipe: Recipe = {
	foodList: { id: 0, name: '', img: '', difficulty: '', ingredient: [], recipe: [] },

	async showRenderView() {
		return recipeTemplate();
	},

	async renderAfter() {
		const $backBtn = document.querySelector('.back-btn') as HTMLButtonElement;
		const $stuffList = document.querySelector('.stuff-list') as HTMLUListElement;
		const $bookMark = document.querySelector('.book-mark') as HTMLAnchorElement;

		await this.fetchFoodList();

		// back button
		$backBtn.onclick = () => {
			console.log('recipe 뒤로가기');
		};

		$stuffList.onclick = (e) => {
			const target = e.target as HTMLUListElement;

			if (!target.matches('.stuff-list > li')) return;
			target.classList.remove('not-stuff');
		};

		$bookMark.onclick = (e) => {
			e.preventDefault();

			const url = window.location.pathname;
			const userId = JSON.parse(window.sessionStorage.getItem('login') || '').id;
			const bookmarks = JSON.parse(window.sessionStorage.getItem(userId || '') || '[]');

			window.sessionStorage.setItem(userId, JSON.stringify([...new Set([...bookmarks, url])]));

			timeModal();
		};
	},

	renderFetchView({ ingredient, recipe }) {
		const $stuffList = document.querySelector('.stuff-list') as HTMLUListElement;
		const $recipe = document.querySelector('.recipe') as HTMLUListElement;

		let stuffHtml = '';
		let recipeHtml = '';

		ingredient.forEach(($list) => {
			stuffHtml += `<li>${$list}</li>`;
		});
		recipe.forEach(($list) => {
			recipeHtml += `<li>${$list}</li>`;
		});

		$stuffList.innerHTML = stuffHtml;
		$recipe.innerHTML = recipeHtml;
	},

	async fetchFoodList() {
		try {
			const $mainImage = document.querySelector('.main-image > img') as HTMLImageElement;
			const $foodName = document.querySelector('.food-name') as HTMLHeadingElement;
			const $lastSpan = document.querySelector('.food-title span:nth-child(3)') as HTMLSpanElement;
			const queryId = location.pathname.split(':')[1];
			const data = await fetch(`http://localhost:8080/cuisine/${queryId}`);
			const result = await data.json();

			this.foodList = result;

			$foodName.textContent = this.foodList.name;
			$lastSpan.textContent = this.foodList.difficulty;
			$mainImage.setAttribute('src', imageTemp);

			this.renderFetchView(result);
			this.filterData(result.ingredient);
		} catch (e) {
			console.error(`error: ${e}`);
		}
	},

	filterData(ingredient) {
		const $stuffList = document.querySelector('.stuff-list') as HTMLUListElement;
		const getLocation = JSON.parse(window.sessionStorage.getItem('ingredientes') || '');
		const data = ingredient.filter((_, i) => !getLocation.includes(ingredient[i]));

		[...$stuffList.children].forEach((li) => {
			if (data.includes(li.textContent || '')) li.classList.add('not-stuff');
		});
	},
};

export default Recipe;
