import 'CSS/myinfo.css';

import myinfoTemplate from 'Page/myinfo.hbs';

import imageTemplate from 'Image/my-recipe1.jpg';

type UserType = {
	id: string;
	password: string;
	nickname: string;
};

type CuisinAllListType = {
	id: number;
	name: string;
	img: string;
	difficulty: string;
	ingredient: string[];
	recipe: string[];
};

type Myinfo = {
	users: UserType;
	addToCart: CuisinAllListType[];
	showRenderView: () => Promise<string>;
	renderAfter: () => Promise<void>;
	fetchUsers: () => Promise<void>;
	fetchImg: () => Promise<void>;
	renderName: () => void;
	renderImg: (bookmarkIds: string[]) => void;
};

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

		this.fetchUsers();
		this.fetchImg();

		$myInfoCategory.onclick = (e) => {
			const target = e.target as HTMLUListElement;

			if (target.matches('#tab1,#tab2,#tab3')) {
				document.querySelectorAll('.tab').forEach(($tab) => {
					$tab.classList.toggle('active', target.id === $tab.classList[1]);
				});
				// e.target.nextElementSibling.classList.add('active');
			}
		};
	},

	async fetchUsers() {
		try {
			const getLoginData = sessionStorage.getItem('login');
			const loginResponse = JSON.parse(getLoginData || '');
			const loginNick = loginResponse.id;
			const res = await fetch(`http://localhost:8080/users/${loginNick}`);

			this.users = await res.json();
			this.renderName();
		} catch (err) {
			console.error(err);
		}
	},

	async fetchImg() {
		const parse = JSON.parse(sessionStorage.getItem('login') || '');

		const bookmarks: string[] = sessionStorage.getItem(parse.id)
			? JSON.parse(sessionStorage.getItem(parse.id) || '')
			: '';

		if (bookmarks) {
			const bookmarkIds = bookmarks.map((bookmark) => bookmark.split('?')[1]);

			try {
				const data = await fetch('http://localhost:8080/cuisine');

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
