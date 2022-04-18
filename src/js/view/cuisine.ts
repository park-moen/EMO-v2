import 'CSS/cuisine.css';

import cuisineTemplate from 'Page/cuisine.hbs';

import imageTemplage from 'Image/깍두기볶음밥.jpg';

import { pushRouter } from 'JS/router';
import { timeModal } from 'JS/utils';
import { addToCartIcon, removeToCartIcon } from 'JS/iconCollection';

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
	urls: [], // 초기값을 세션스토리지에서 처음에 받아오면 초기화가 빈 배열로 되지 않음
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
			if (res.length) {
				const userInfoes = JSON.parse(window.sessionStorage.getItem('login') || '{}');
				const bookmarks: string[] = JSON.parse(window.sessionStorage.getItem(userInfoes.id) || '[]');
				const extractBookmarkIds = bookmarks.map((data) => data.split(':')[1]);
				const extractDatasId = res.map((data) => String(data.id));
				const overlapId = extractBookmarkIds.filter((bookmarkId) =>
					extractDatasId.some((userInfoId) => bookmarkId === userInfoId)
				);

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
							${
								overlapId.includes(String(id))
									? `<a class='bookmark addToCart' href='#' route='/recipe:${id}'>${addToCartIcon}</a>`
									: `<a class='bookmark' href='#' route='/recipe:${id}'>${removeToCartIcon}</a>`
							}
							
						</figure>
				</div>`;
				});
			} else {
				$containerWrap.classList.add('no-data-container-wrap');

				html += `<div class='no-data-container'>
					<p>선택하신 재료에 관련된 RECIPE가 없습니다.<br />다른 재료를 선탣해주세요.🍕</p>
					
				</div>`;
			}

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
			const target = e.target as HTMLElement;
			console.log(target);

			e.preventDefault();

			if (!target.matches('.fa-bookmark') && !target.matches('.bookmark') && !target.closest('svg')) {
				this.pushCuisineRoute(target);
			} else {
				const userData = JSON.parse(sessionStorage.getItem('login') || '{}');
				const correctAnchor = target.closest('.bookmark');

				if (correctAnchor) {
					const routeName = correctAnchor.getAttribute('route');

					console.log(routeName);
					if (!correctAnchor.matches('.addToCart')) {
						console.log('add');

						this.urls = [...new Set([...this.urls, routeName || ''])];
						correctAnchor?.classList.add('addToCart');
						correctAnchor.innerHTML = addToCartIcon;

						timeModal();
					} else if (correctAnchor.matches('.addToCart')) {
						console.log('remove');

						this.urls = this.urls.filter((routeURLName) => routeURLName !== routeName);
						correctAnchor?.classList.remove('addToCart');
						correctAnchor.innerHTML = removeToCartIcon;
					}
				}

				sessionStorage.setItem(userData.id, JSON.stringify(this.urls));
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
