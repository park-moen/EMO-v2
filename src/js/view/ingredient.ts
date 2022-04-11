import 'CSS/ingredient.css';

import ingredientTemplate from 'Page/ingredient.hbs';

import { pushRouter } from 'Router/router';

const Ingredient = {
	showRenderView: async () => ingredientTemplate(),

	renderAfter: async () => {
		let ingredientes: any = [];

		const $ingredientes = document.querySelector('.ingredientes') as HTMLUListElement;
		const $ingreItemContainer = document.querySelector('.ingre-item-container') as HTMLUListElement;
		const $refresh = document.querySelector('.refresh') as HTMLDivElement;
		const $cookEnter = document.querySelector('.cookEnter') as HTMLDivElement;

		const render = () => {
			let html = '';
			ingredientes.forEach((ingredient: string) => {
				html =
					`<li class="ingre-item"><span>${ingredient}</span><button class="remove-ingre-item">X</button></li>` + html;
			});
			$ingreItemContainer.innerHTML = html;
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

			if (target.textContent) {
				ingredientName = target.textContent;
			}

			$ingreItemContainer.classList.add('active');
			$refresh.classList.add('active');
			$cookEnter.classList.add('active');

			target.classList.toggle('active');

			if (target.matches('.active')) {
				ingredientes = ingredientes.concat(ingredientName);
			} else if (!target.matches('.active')) {
				ingredientes = ingredientes.filter((btnTextContent: string) => btnTextContent !== ingredientName);
			}
			emptyArrFilter();
			render();
		};

		$ingreItemContainer.onclick = (e) => {
			const target = e.target as HTMLUListElement;
			if (!target.matches('.remove-ingre-item')) return;

			if (target.parentNode && target.previousSibling) {
				const ingredientAdded = target.previousSibling.textContent;

				$ingreItemContainer.removeChild(target.parentNode);
				ingredientes = ingredientes.filter((item: string) => item !== ingredientAdded);
			}

			emptyArrFilter();
		};

		const emptyArrFilter = () => {
			const $ingredientListSuperset = [...document.querySelectorAll('.ingredient')];
			const $subTitleIconList = [...document.querySelectorAll('.fa-chevron-down')];
			const $eachIngredientList = [...document.querySelectorAll('.ingredient > ul > li')];

			if (!ingredientes.length) {
				$ingreItemContainer.classList.remove('active');
				$refresh.classList.remove('active');
				$cookEnter.classList.remove('active');
				window.sessionStorage.clear();

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
		};

		$cookEnter.onclick = async () => {
			window.sessionStorage.setItem('ingredientes', JSON.stringify(ingredientes));

			const pathName = $cookEnter.getAttribute('route');

			if (pathName) pushRouter(pathName);
		};

		$refresh.onclick = () => {
			ingredientes = [];

			$ingreItemContainer.classList.remove('active');
			$refresh.classList.remove('active');
			$cookEnter.classList.remove('active');
			window.sessionStorage.clear();

			[...$ingreItemContainer.children].forEach((itemNode) => itemNode.remove());
			[...document.querySelectorAll('.ingredient')].forEach((nodeItem) => {
				nodeItem.classList.remove('view');
			});
			[...document.querySelectorAll('.fa-chevron-down')].forEach((nodeBtn) => {
				nodeBtn.classList.remove('active');
			});

			emptyArrFilter();
		};
	},
};

export default Ingredient;
