import 'CSS/navigationBar.css';

import navigationTemplate from 'Page/navigationBar.hbs';

import { pushNavRouter } from 'Router/router';

export async function connectNavToStaticFooter() {
	const $staticFooter = document.querySelector('.static-footer') as HTMLElement;

	$staticFooter.innerHTML = navigationTemplate();

	handleMoveNav();
}

export function conditionDisplayNav(isNav: boolean) {
	const $nav = document.querySelector('nav') as HTMLElement;

	if (isNav) {
		$nav.style.display = 'block';
	} else {
		$nav.style.display = 'none';
	}
}

function handleMoveNav() {
	const $navList = document.querySelector('.nav-list') as HTMLUListElement;

	$navList.onclick = (e) => {
		e.preventDefault();

		if (e.target instanceof HTMLLIElement) {
			console.log(e.target.children[0].getAttribute('route'));

			pushNavRouter(e.target.children[0].getAttribute('route') as string);
		}
		if (e.target instanceof HTMLAnchorElement) pushNavRouter(e.target.getAttribute('route') as string);
	};
}
