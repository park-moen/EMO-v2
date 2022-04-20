import 'CSS/myinfo.css';

import myinfoTemplate from 'Page/myinfo.hbs';

import { AbstractViewType, CuisineDataType } from 'Type/commonType';

import { pushRouter } from 'TS/router';
import { HTTPLocal } from 'Util/constantValue';

type UserType = {
	id: string;
	password: string;
	nickname: string;
};

interface Myinfo extends AbstractViewType {
	users: UserType;
	addToCart: CuisineDataType[];
	fetchUsersInfomation: () => Promise<void>;
	fetchImgInfomation: () => Promise<void>;
	renderName: () => void;
	renderImg: () => void;
}

const Myinfo: Myinfo = {
	users: {
		id: '',
		password: '',
		nickname: '',
	},

	addToCart: [
		{
			id: 0,
			name: '',
			img: '',
			difficulty: '',
			ingredient: [],
			recipe: [],
		},
	],

	async showRenderView() {
		return myinfoTemplate();
	},

	async renderAfter() {
		window.scrollTo(0, 0);

		const $myInfoCategory = document.querySelector('.my-info-category') as HTMLUListElement;
		const $tabBtnList = document.querySelectorAll('#tab1,#tab2,#tab3');
		const $logout = document.querySelector('.logout') as HTMLButtonElement;

		await this.fetchUsersInfomation();
		await this.fetchImgInfomation();

		$myInfoCategory.onclick = (e) => {
			const target = e.target as HTMLUListElement;

			[...$tabBtnList].forEach((element) => {
				element.classList.remove('active');
			});

			if (target.matches('#tab1,#tab2,#tab3')) {
				target.classList.add('active');
				document.querySelectorAll('.tab').forEach(($tab) => {
					$tab.classList.toggle('active', target.id === $tab.classList[1]);
				});
			}
		};

		$logout.onclick = () => {
			sessionStorage.clear();
			pushRouter('/login');
		};
	},

	async fetchUsersInfomation() {
		try {
			const getLoginData = sessionStorage.getItem('login');
			const loginResponse = JSON.parse(getLoginData || '');
			const loginNick = loginResponse.id;
			const result = await fetch(`${HTTPLocal}/users/${loginNick}`);

			this.users = await result.json();
			this.renderName();
		} catch (err) {
			console.error(err);
		}
	},

	async fetchImgInfomation() {
		const parse = JSON.parse(sessionStorage.getItem('login') || '{}');
		const bookmarks: string[] = sessionStorage.getItem(parse.id)
			? JSON.parse(sessionStorage.getItem(parse.id) || '[]')
			: '';

		if (bookmarks) {
			const bookmarkIds = bookmarks.map((bookmark) => bookmark.split(':')[1]);

			try {
				const data = await fetch(`${HTTPLocal}/cuisine`);
				const result: CuisineDataType[] = await data.json();
				this.addToCart = result.filter((cuisineData) => bookmarkIds.includes(String(cuisineData.id)));

				this.renderImg();
			} catch (e) {
				console.error(e);
			}
		}
	},

	renderName() {
		const $myName = document.querySelector('.my-name') as HTMLSpanElement;

		$myName.textContent = this.users.nickname;
	},

	renderImg() {
		const $likeRecipe = document.querySelector('.like-recipe-content') as HTMLUListElement;
		let html = '';

		this.addToCart.forEach(({ img }) => {
			html += `
      <li>
        <a href="#">
          <img src=${img}>
        </a>
      </li>`;
		});

		$likeRecipe.innerHTML = html;
	},
};

export default Myinfo;
