import 'CSS/myinfo.css';

import myinfoTemplate from 'Page/myinfo.hbs';

import imageTemplate from 'Image/my-recipe1.jpg';

import { AbstractViewType, CuisineDataType } from 'Type/commonType';
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
	renderImg: (bookmarkIds: string[]) => void;
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
		const $myInfoCategory = document.querySelector('.my-info-category') as HTMLUListElement;

		await this.fetchUsersInfomation();
		await this.fetchImgInfomation();

		$myInfoCategory.onclick = (e) => {
			const target = e.target as HTMLUListElement;

			if (target.matches('#tab1,#tab2,#tab3')) {
				document.querySelectorAll('.tab').forEach(($tab) => {
					$tab.classList.toggle('active', target.id === $tab.classList[1]);
				});
			}
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
			const bookmarkIds = bookmarks.map((bookmark) => bookmark.split('?')[1]);

			try {
				const data = await fetch(`${HTTPLocal}/cuisine`);
				this.addToCart = await data.json();

				this.renderImg(bookmarkIds);
			} catch (e) {
				console.error(e);
			}
		}
	},

	renderName() {
		const $myName = document.querySelector('.my-name') as HTMLSpanElement;

		$myName.textContent = this.users.nickname;
	},

	renderImg(bookmarkIds) {
		const $likeRecipe = document.querySelector('.like-recipe-content') as HTMLUListElement;
		let html = '';

		bookmarkIds.forEach((id) => {
			html += `
      <li>
        <a href="#">
          <img src=${imageTemplate}>
        </a>
      </li>`;
		});

		$likeRecipe.innerHTML = html;
	},
};

export default Myinfo;
