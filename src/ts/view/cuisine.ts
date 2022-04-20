import 'CSS/cuisine.css';

import cuisineTemplate from 'Page/cuisine.hbs';

import { CuisineDataType, AbstractViewType } from 'Type/commonType';

import { pushRouter } from 'TS/router';
import { timeModal, dataToShowBookmark } from 'Util/index';
import { HTTPLocal } from 'Util/constantValue';
import { addToCartIcon, removeToCartIcon } from 'Icon/iconCollection';

export interface Cuisine extends AbstractViewType {
	urls: string[];
	cuisineAllInfomation: CuisineDataType[];
	readonly ScrollLeftTenPX: 10;
	readonly visibilityOpacity: '1';
	readonly nonVisibilityOpacity: '0';
	fetchCuisineInfomation: (ingredientesList: string[], passDOM: HTMLDivElement) => Promise<void>;
	renderMain: (containerWrapDOM: HTMLDivElement) => void;
	renderPrev: (ingredientesList: string[]) => void;
	pushCuisineRoute: (target: HTMLElement) => void;
}

const Cuisine: Cuisine = {
	urls: JSON.parse(sessionStorage.getItem(JSON.parse(sessionStorage.getItem('login' || '') || '{}').id) || '[]'),

	cuisineAllInfomation: [],

	ScrollLeftTenPX: 10,

	visibilityOpacity: '1',

	nonVisibilityOpacity: '0',

	async showRenderView() {
		return cuisineTemplate();
	},

	async renderAfter() {
		const $containerWrap = document.querySelector('.container-wrap') as HTMLDivElement;
		const $backBtn = document.querySelector('.cuisine-back-btn') as HTMLButtonElement;
		const $preview = document.querySelector('.preview') as HTMLDivElement;
		const ingredientesData: string[] = JSON.parse(sessionStorage.getItem('ingredientes') || '[]');

		this.fetchCuisineInfomation(ingredientesData, $containerWrap);
		this.renderPrev(ingredientesData);
		$preview.scrollLeft += this.ScrollLeftTenPX;

		// back btn route 연결하기
		$backBtn.onclick = () => {
			pushRouter('/ingredient');
		};

		$containerWrap.onclick = (e) => {
			e.preventDefault();

			const target = e.target as HTMLElement;

			if (!target.matches('.fa-bookmark') && !target.matches('.bookmark') && !target.closest('svg')) {
				this.pushCuisineRoute(target);
			} else {
				const userData = JSON.parse(sessionStorage.getItem('login') || '{}');
				const correctAnchor = target.closest('.bookmark');
				const addToCartElement = correctAnchor?.firstElementChild as SVGAElement;

				if (correctAnchor) {
					const routeName = correctAnchor.getAttribute('route');

					if (!correctAnchor.matches('.addToCart')) {
						this.urls = [...new Set([...this.urls, routeName || ''])];
						correctAnchor?.classList.add('addToCart');
						addToCartElement.style.opacity = this.visibilityOpacity;

						timeModal('add');
					} else if (correctAnchor.matches('.addToCart')) {
						this.urls = this.urls.filter((routeURLName) => routeURLName !== routeName);
						correctAnchor?.classList.remove('addToCart');
						addToCartElement.style.opacity = this.nonVisibilityOpacity;

						timeModal('remove');
					}
				}

				sessionStorage.setItem(userData.id, JSON.stringify(this.urls));
			}
		};
	},

	async fetchCuisineInfomation(ingredientesList, passDOM) {
		try {
			const data = await fetch(`${HTTPLocal}/cuisine`);
			this.cuisineAllInfomation = await data.json();

			this.cuisineAllInfomation = this.cuisineAllInfomation.filter(({ ingredient }) => {
				for (let matter of ingredientesList) {
					if (ingredient.includes(matter)) return true;
				}
			});

			this.renderMain(passDOM);
		} catch (e) {
			console.error(e);
		}
	},

	renderMain(containerWrapDOM) {
		let html = '';
		if (this.cuisineAllInfomation.length) {
			const overlapIdList = dataToShowBookmark(this.cuisineAllInfomation);

			this.cuisineAllInfomation.forEach(({ id, name, img, difficulty }) => {
				html += `<div class='cuisine-container'>
					<figure class='cuisine'>
						<a class="cuisine-wrapper" href='#' route='/recipe:${id}'>
							<div class='cuisine-img-wrapper'>
								<img src="${img}" alt="${name}" />
								<span class='difficulty'>${difficulty}</span>
							</div>
							<figcaption class='cuisine-img-name'>${name}</figcaption>
						</a>
						<a class='bookmark ${overlapIdList.includes(String(id)) && 'addToCart'}' href='#' route='/recipe:${id}'>
							${addToCartIcon.html[0] + removeToCartIcon.html[0]}
						</a>
					</figure>
				</div>`;
			});
		} else {
			containerWrapDOM.classList.add('no-data-container-wrap');

			html += `<div class='no-data-container'>
				<p>선택하신 재료에 관련된 RECIPE가 없습니다.<br />다른 재료를 선탣해주세요.🍕</p>
				
			</div>`;
		}

		containerWrapDOM.innerHTML = html;
	},

	renderPrev(ingredientesList) {
		const $previewList = document.querySelector('.preview-list') as HTMLUListElement;
		let PrevListElement = '';

		ingredientesList.forEach((item) => {
			PrevListElement += `<li class="preview-item">${item}</li>`;
		});
		$previewList.innerHTML = PrevListElement;
	},

	pushCuisineRoute(target) {
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

			pushRouter(pathName, queryId, 'cuisine');
		}
	},
};

export default Cuisine;
