import 'CSS/ingredient.css';

import ingredientTemplate from 'Page/ingredient.hbs';

import { AbstractViewType } from 'Type/commonType';
import { pushRouter } from 'JS/router';

type EmptyArrFilterParmas = {
	ingredientesDOM: HTMLUListElement;
	ingreItemContainerDOM: HTMLUListElement;
	containerBtnWrapDOM: HTMLDivElement;
	refreshDOM: HTMLDivElement;
	cookEnterDOM: HTMLDivElement;
};

interface Ingredient extends AbstractViewType {
	selectedIngredientes: string[];
	readonly changedIngredientesListHeigth: '250px';
	readonly zeroPaddingPX: '0px';

	renderPrev: (containerDOM: HTMLUListElement) => void;
	emptyArrFilter: (EmptyArrFilterParmas: EmptyArrFilterParmas) => void;
}

const Ingredient: Ingredient = {
	selectedIngredientes: [],

	changedIngredientesListHeigth: '250px',

	zeroPaddingPX: '0px',

	async showRenderView() {
		return ingredientTemplate();
	},

	async renderAfter() {
		const $ingredientes = document.querySelector('.ingredientes') as HTMLUListElement;
		const $ingreItemContainer = document.querySelector('.ingre-item-container') as HTMLUListElement;
		const $containerBtnWrap = document.querySelector('.container-btn-wrap') as HTMLDivElement;
		const $refresh = document.querySelector('.refresh') as HTMLDivElement;
		const $cookEnter = document.querySelector('.cookEnter') as HTMLDivElement;

		const IngredientDOMCollection = {
			ingredientesDOM: $ingredientes,
			ingreItemContainerDOM: $ingreItemContainer,
			containerBtnWrapDOM: $containerBtnWrap,
			refreshDOM: $refresh,
			cookEnterDOM: $cookEnter,
		};

		$ingredientes.addEventListener('click', (e) => {
			const target = e.target as HTMLButtonElement;

			if (!target.matches('.category')) return;
			target.children[0].classList.toggle('active');
			target.nextElementSibling?.classList.toggle('view');
		});

		$ingredientes.onclick = (e) => {
			const target = e.target as HTMLHeadElement;
			let ingredientName = '';

			if (!target.matches('.ingredient > ul > li')) return;

			ingredientName = target.textContent || '';

			$ingredientes.style.paddingBottom = this.changedIngredientesListHeigth;

			$ingreItemContainer.classList.add('active');
			$containerBtnWrap.classList.add('active');
			$refresh.classList.add('active');
			$cookEnter.classList.add('active');
			target.classList.toggle('active');

			if (target.matches('.active')) {
				this.selectedIngredientes = this.selectedIngredientes.concat(ingredientName);
			} else if (!target.matches('.active')) {
				this.selectedIngredientes = this.selectedIngredientes.filter(
					(btnTextContent: string) => btnTextContent !== ingredientName
				);
			}
			this.emptyArrFilter(IngredientDOMCollection);
			this.renderPrev($ingreItemContainer);
		};

		$ingreItemContainer.onclick = (e) => {
			const target = e.target as HTMLUListElement;
			if (!target.matches('.remove-ingre-item')) return;

			if (target.parentNode && target.previousSibling) {
				const ingredientAdded = target.previousSibling.textContent;

				$ingreItemContainer.removeChild(target.parentNode);
				this.selectedIngredientes = this.selectedIngredientes.filter((item: string) => item !== ingredientAdded);
			}

			this.emptyArrFilter(IngredientDOMCollection);
		};

		$cookEnter.onclick = async () => {
			const pathName = $cookEnter.getAttribute('route');
			window.sessionStorage.setItem('ingredientes', JSON.stringify(this.selectedIngredientes));

			this.selectedIngredientes = [];

			if (pathName) pushRouter(pathName);
		};

		$refresh.onclick = () => {
			this.selectedIngredientes = [];

			$ingredientes.style.paddingBottom = this.zeroPaddingPX;
			$ingreItemContainer.classList.remove('active');
			$containerBtnWrap.classList.remove('active');
			$refresh.classList.remove('active');
			$cookEnter.classList.remove('active');

			[...$ingreItemContainer.children].forEach((itemNode) => itemNode.remove());
			[...document.querySelectorAll('.ingredient')].forEach((nodeItem) => {
				nodeItem.classList.remove('view');
			});
			[...document.querySelectorAll('.fa-chevron-down')].forEach((nodeBtn) => {
				nodeBtn.classList.remove('active');
			});

			this.emptyArrFilter(IngredientDOMCollection);
		};
	},

	renderPrev(containerDOM) {
		let html = '';

		this.selectedIngredientes.forEach((ingredientName) => {
			html =
				`<li class="ingre-item"><span>${ingredientName}</span><button class="remove-ingre-item">X</button></li>` + html;
		});
		containerDOM.innerHTML = html;
	},

	emptyArrFilter({ ingredientesDOM, ingreItemContainerDOM, containerBtnWrapDOM, refreshDOM, cookEnterDOM }) {
		const $ingredientListSuperset = [...document.querySelectorAll('.ingredient')];
		const $subTitleIconList = [...document.querySelectorAll('.fa-chevron-down')];
		const $eachIngredientList = [...document.querySelectorAll('.ingredient > ul > li')];

		if (!this.selectedIngredientes.length) {
			ingredientesDOM.style.paddingBottom = this.zeroPaddingPX;
			ingreItemContainerDOM.classList.remove('active');
			containerBtnWrapDOM.classList.remove('active');
			refreshDOM.classList.remove('active');
			cookEnterDOM.classList.remove('active');

			$ingredientListSuperset.forEach((nodeItem) => {
				nodeItem.classList.remove('view');
			});
			$subTitleIconList.forEach((nodeBtn) => {
				nodeBtn.classList.remove('active');
			});
			$eachIngredientList.forEach((nodeBtn) => {
				nodeBtn.classList.remove('active');
			});
		}
	},
};

export default Ingredient;
