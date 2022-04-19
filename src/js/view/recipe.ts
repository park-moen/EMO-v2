import 'CSS/recipe.css';

import recipeTemplate from 'Page/recipe.hbs';

import imageTemp from 'Image/김치볶음밥.jpg';

import { timeModal } from 'Util/index';
import { HTTPLocal } from 'Util/constantValue';
import { AbstractViewType, CuisineDataType } from 'Type/commonType';

interface Recipe extends AbstractViewType {
	foodList: CuisineDataType;
	filterData: () => void;
	fetchFoodList: () => Promise<void>;
	renderFetchView: () => void;
}

const Recipe: Recipe = {
	foodList: { id: 0, name: '', img: '', difficulty: '', ingredient: [], recipe: [] },

	async showRenderView() {
		return recipeTemplate();
	},

	async renderAfter() {
		const $backBtn = document.querySelector('.back-btn') as HTMLButtonElement;
		const $bookMark = document.querySelector('.book-mark') as HTMLAnchorElement;

		await this.fetchFoodList();

		// back button
		$backBtn.onclick = () => {
			console.log('recipe 뒤로가기');
		};

		$bookMark.onclick = (e) => {
			$bookMark.classList.add(`route="/recipe:${this.foodList.id}"`);
			e.preventDefault();

			console.log($bookMark);

			const url = window.location.pathname;
			const userId = JSON.parse(window.sessionStorage.getItem('login') || '{}').id;
			const bookmarks = JSON.parse(window.sessionStorage.getItem(userId || '') || '[]');

			console.log(bookmarks);

			timeModal();

			window.sessionStorage.setItem(userId, JSON.stringify([...new Set([...bookmarks, url])]));
		};
	},

	async fetchFoodList() {
		try {
			const $mainImage = document.querySelector('.main-image > img') as HTMLImageElement;
			const $foodName = document.querySelector('.food-name') as HTMLHeadingElement;
			const $lastSpan = document.querySelector('.food-title span:nth-child(3)') as HTMLSpanElement;

			const queryId = location.pathname.split(':')[1];
			const data = await fetch(`${HTTPLocal}/cuisine/${queryId}`);
			const result = await data.json();

			this.foodList = result;

			$foodName.textContent = this.foodList.name;
			$lastSpan.textContent = this.foodList.difficulty;
			$mainImage.setAttribute('src', imageTemp);

			this.renderFetchView();
			this.filterData();
		} catch (e) {
			console.error(`error: ${e}`);
		}
	},

	renderFetchView() {
		const $stuffList = document.querySelector('.stuff-list') as HTMLUListElement;
		const $recipe = document.querySelector('.recipe') as HTMLUListElement;

		const { ingredient, recipe } = this.foodList;

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

	filterData() {
		const { ingredient } = this.foodList;

		const $stuffList = document.querySelector('.stuff-list') as HTMLUListElement;
		const getLocation = JSON.parse(window.sessionStorage.getItem('ingredientes') || '');
		const data = ingredient.filter((_, i) => !getLocation.includes(ingredient[i]));

		[...$stuffList.children].forEach((li) => {
			if (data.includes(li.textContent || '')) li.classList.add('not-stuff');
		});
	},
};

export default Recipe;
