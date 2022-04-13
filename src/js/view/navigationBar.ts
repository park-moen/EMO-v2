import 'CSS/navigationBar.css';

import navigationTemplate from 'Page/navigationBar.hbs';

import { pushRouter } from 'JS/router';

const NavBar = {
	showRenderView: async () => navigationTemplate(),

	renderAfter: async () => {
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

export function conditionDisplayNav(isNav: boolean) {
	const $nav = document.querySelector('nav') as HTMLElement;

	if (isNav) {
		$nav.style.display = 'block';
	} else {
		$nav.style.display = 'none';
	}
}

export default NavBar;
