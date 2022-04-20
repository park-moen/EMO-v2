// import 'CSS/recommend.css';

import recommendTempale from 'Page/recommend.hbs';

import { AbstractViewType, CuisineDataType } from 'Type/commonType';

import { pushRouter } from 'TS/router';
import { timeModal, dataToShowBookmark } from 'Util/index';
import { HTTPLocal } from 'Util/constantValue';
import { addToCartIcon, removeToCartIcon } from 'Icon/iconCollection';

export interface Recommend extends AbstractViewType {
	cuisineAllInfomation: CuisineDataType[];
	urls: string[];
	readonly visibilityOpacity: '1';
	readonly nonVisibilityOpacity: '0';
	fatchNecessaryInfomation: (randomIdList: number[]) => void;
	fetchAllInfomation: () => void;
	renderPrev: (cuisines: CuisineDataType[]) => void;
	randomId: () => void;
	pushCuisineRoute: (target: HTMLElement) => void;
}

const Recommend: Recommend = {
	cuisineAllInfomation: [],

	urls: JSON.parse(sessionStorage.getItem(JSON.parse(sessionStorage.getItem('login' || '') || '{}').id) || '[]'),

	visibilityOpacity: '1',

	nonVisibilityOpacity: '0',

	async showRenderView() {
		return recommendTempale();
	},

	async renderAfter() {
		const $containerWrap = document.querySelector('.container-wrap') as HTMLDivElement;

		this.fetchAllInfomation();

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

	async fetchAllInfomation() {
		try {
			const data = await fetch(`${HTTPLocal}/cuisine`);
			this.cuisineAllInfomation = await data.json();

			this.randomId();
		} catch (e) {
			console.error(e);
		}
	},

	fatchNecessaryInfomation(randomIdList) {
		const cuisines: CuisineDataType[] = [];

		try {
			randomIdList.forEach(async (id) => {
				const data = await fetch(`${HTTPLocal}/cuisine/${id}`);
				const result = await data.json();

				cuisines.push(result);
				this.renderPrev(cuisines);
			});
		} catch (err) {
			console.error(err);
		}
	},

	renderPrev(cuisines) {
		const $containerWrap = document.querySelector('.container-wrap') as HTMLDivElement;
		let html = '';
		const overlapIdList = dataToShowBookmark(cuisines);

		if (cuisines.length !== 3) return;

		cuisines.forEach(({ id, name, img, difficulty }) => {
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

		$containerWrap.innerHTML = html;
	},

	randomId() {
		const { length: stateLength } = this.cuisineAllInfomation;

		let randomCuisineIdList: number[] = [];

		for (const _ of this.cuisineAllInfomation) {
			if (randomCuisineIdList.length === 3) break;
			const random = Math.floor(Math.random() * stateLength + 1);

			randomCuisineIdList.push(random === 0 ? random + 1 : random);
			randomCuisineIdList = [...new Set(randomCuisineIdList)];
		}

		this.fatchNecessaryInfomation(randomCuisineIdList);
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

			pushRouter(pathName, queryId, 'recommend');
		}
	},
};

export default Recommend;
