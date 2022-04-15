// import 'CSS/recommend.css';

import recommendTempale from 'Page/recommend.hbs';

import imageTemplate from 'Image/감자짜글이.jpg';

type CuisineDataType = {
	id: number;
	img: string;
	name: string;
	difficulty: string;
	ingredient: string[];
	recipe: string[];
};

type Recommend = {
	showRenderView: () => Promise<string>;
	renderAfter: () => Promise<void>;
	getFatch: (randomIdList: number[]) => void;
	fetchAll: () => void;
	randomId: (data: CuisineDataType[]) => void;
	renderPrev: (cuisines: CuisineDataType[]) => void;
};

const Recommend: Recommend = {
	async showRenderView() {
		return recommendTempale();
	},

	async renderAfter() {
		this.fetchAll();
	},

	async fetchAll() {
		try {
			const data = await fetch('http://localhost:8080/cuisine');
			const res = await data.json();

			this.randomId(res);
		} catch (e) {
			console.error(e);
		}
	},

	getFatch(dataes) {
		const cuisines: CuisineDataType[] = [];

		try {
			dataes.forEach(async (data) => {
				const result = await fetch(`http://localhost:8080/cuisine/${data}`);
				const res = await result.json();

				cuisines.push(res);
				this.renderPrev(cuisines);
			});
		} catch (err) {
			console.error(err);
		}
	},

	randomId(cuisineDataes) {
		let randomCuisineList: number[] = [];

		for (const _ of cuisineDataes) {
			if (randomCuisineList.length === 3) break;
			const random = Math.floor(Math.random() * cuisineDataes.length + 1);

			randomCuisineList.push(random === 0 ? random + 1 : random);
			randomCuisineList = [...new Set(randomCuisineList)];
		}

		this.getFatch(randomCuisineList);
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

			console.log(html);
		});

		$containerWrap.innerHTML = html;

		// const $routeTargetDom = document.querySelector('.recommend-container > ');
		// console.log($routeTargetDom);
	},
};

export default Recommend;
