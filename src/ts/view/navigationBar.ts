import 'CSS/navigationBar.css';

import navigationTemplate from 'Page/navigationBar.hbs';

import { AbstractViewType } from 'Type/commonType';

import { pushRouter } from 'TS/router';

interface NavBar extends AbstractViewType {}

const NavBar: NavBar = {
	async showRenderView() {
		return navigationTemplate();
	},

	async renderAfter() {
		const $navList = document.querySelector('.nav-list') as HTMLUListElement;

		$navList.onclick = (e) => {
			e.preventDefault();

			if (e.target instanceof HTMLLIElement) {
				pushRouter(e.target.children[0].getAttribute('route') as string);
			}
			if (e.target instanceof HTMLAnchorElement) pushRouter(e.target.getAttribute('route') as string);
		};
	},
};

export default NavBar;
