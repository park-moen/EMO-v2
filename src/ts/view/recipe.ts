import 'CSS/recipe.css';

import recipeTemplate from 'Page/recipe.hbs';

import { AbstractViewType, CuisineDataType } from 'Type/commonType';

import { pushRouter } from 'TS/router';
import { timeModal } from 'Util/index';
import { HTTPLocal } from 'Util/constantValue';
import { addToCartIcon, removeToCartIcon } from 'Icon/iconCollection';

type isAddToCartReturnValue = {
	checkAddToCart: boolean;
	bookmarks: string[];
	url: string;
	userId: string;
};

interface Recipe extends AbstractViewType {
	foodList: CuisineDataType;
	readonly visibilityOpacity: '1';
	readonly nonVisibilityOpacity: '0';
	filterData: () => void;
	fetchFoodList: (passageDOM: HTMLAnchorElement) => Promise<void>;
	renderFetchView: (bookmarkDOM: HTMLAnchorElement) => void;
	relatedIconData: () => Readonly<isAddToCartReturnValue>;
}

const Recipe: Recipe = {
	foodList: { id: 0, name: '', img: '', difficulty: '', ingredient: [], recipe: [] },

	visibilityOpacity: '1',

	nonVisibilityOpacity: '0',

	async showRenderView() {
		return recipeTemplate();
	},

	async renderAfter() {
		const $backBtn = document.querySelector('.back-btn') as HTMLButtonElement;
		const $bookMark = document.querySelector('.book-mark') as HTMLAnchorElement;

		await this.fetchFoodList($bookMark);

		// back button
		$backBtn.onclick = () => {
			if (history.state.backPageType === 'cuisine') {
				pushRouter('/cuisine');
			} else {
				pushRouter('/recommend');
			}
		};

		$bookMark.onclick = (e) => {
			e.preventDefault();

			const { url, userId, bookmarks, checkAddToCart } = this.relatedIconData();
			const addToCartSVG = $bookMark.firstElementChild as SVGAElement;

			if (checkAddToCart) {
				const removeAddtoCart = bookmarks.filter((haveUrl) => haveUrl !== url);

				timeModal('remove');
				sessionStorage.setItem(userId, JSON.stringify(removeAddtoCart));
				addToCartSVG.style.opacity = this.nonVisibilityOpacity;
			} else {
				timeModal('add');
				sessionStorage.setItem(userId, JSON.stringify([...new Set([...bookmarks, url])]));

				addToCartSVG.style.opacity = this.visibilityOpacity;
			}
		};
	},

	async fetchFoodList(passageDOM) {
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
			$mainImage.setAttribute('src', this.foodList.img);

			this.renderFetchView(passageDOM);
			this.filterData();
		} catch (e) {
			console.error(`error: ${e}`);
		}
	},

	renderFetchView(bookmarkDOM) {
		const $stuffList = document.querySelector('.stuff-list') as HTMLUListElement;
		const $recipe = document.querySelector('.recipe') as HTMLUListElement;
		const { checkAddToCart } = this.relatedIconData();
		const { ingredient, recipe } = this.foodList;

		let stuffHtml = '';
		let recipeHtml = '';

		ingredient.forEach(($list) => {
			stuffHtml += `<li>${$list}</li>`;
		});
		recipe.forEach(($list) => {
			recipeHtml += `<li>${$list}</li>`;
		});

		bookmarkDOM.append(addToCartIcon.node[0], removeToCartIcon.node[0]);
		$stuffList.innerHTML = stuffHtml;
		$recipe.innerHTML = recipeHtml;

		const addToCartElement = bookmarkDOM.firstElementChild as SVGAElement;

		if (checkAddToCart) {
			addToCartElement.style.opacity = this.visibilityOpacity;
		} else {
			addToCartElement.style.opacity = this.nonVisibilityOpacity;
		}
	},

	relatedIconData() {
		const url = window.location.pathname;
		const userId = JSON.parse(window.sessionStorage.getItem('login') || '{}').id;
		const bookmarks: string[] = JSON.parse(window.sessionStorage.getItem(userId || '') || '[]');

		return { checkAddToCart: bookmarks.includes(url), bookmarks, url, userId };
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
