import 'CSS/reset.css';
import 'CSS/normalize.css';

import NavBar from 'View/navigationBar';
import { initialRoutes } from 'JS/router';
import { conditionDisplayNav } from 'Util/index';

const $footer = document.getElementById('static-footer') as HTMLElement;

window.onload = async () => {
	$footer.innerHTML = await NavBar.showRenderView();

	await NavBar.renderAfter();

	conditionDisplayNav(false);
	initialRoutes();
};

// window.onpopstate = pop
