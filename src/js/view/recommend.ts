// import 'CSS/recommend.css';

import recommendTempale from 'Page/recommend.hbs';

import imageTemplate from 'Image/감자짜글이.jpg';

import { AbstractViewType, CuisineDataType } from 'Type/commonType';
import { HTTPLocal } from 'Util/constantValue';

interface Recommend extends AbstractViewType {
	cuisineAllInfomation: CuisineDataType[];

	fatchNecessaryInfomation: (randomIdList: number[]) => void;
	fetchAllInfomation: () => void;
	renderPrev: (cuisines: CuisineDataType[]) => void;
	randomId: () => void;
}

const Recommend: Recommend = {
	cuisineAllInfomation: [],

	async showRenderView() {
		return recommendTempale();
	},

	async renderAfter() {
		this.fetchAllInfomation();
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

		if (cuisines.length !== 3) return;
		// <a href="http://localhost:5000/recipe.html?id=${cuisine.id}">
		// /Image//image/%EA%B3%A0%EC%B6%94%EC%9E%A5%EC%B0%8C%EA%B0%9C.jpg

		cuisines.forEach((cuisine) => {
			html += `<div class='cuisine-container'>
					<figure class='cuisine'>
						<a href='#' route='/recipe?${cuisine.id}'>
							<div class='cuisine-img-wrapper'>
								<img src="${imageTemplate}" alt="${cuisine.name}" />
								<span class='difficulty'>${cuisine.difficulty}</span>
							</div>
							<figcaption class='cuisine-img-name'>${cuisine.name}</figcaption>
						</a>
						<a class='bookmark' href='#'>📌<i class='fas fa-bookmark'></i></a>
					</figure>
				</div>`;
		});

		$containerWrap.innerHTML = html;

		// const $routeTargetDom = document.querySelector('.recommend-container > ');
		// console.log($routeTargetDom);
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
};

export default Recommend;
