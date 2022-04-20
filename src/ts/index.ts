import 'CSS/reset.css';
import 'CSS/normalize.css';

import imageAllUpload from 'Image/index';

import NavBar from 'TS/view/navigationBar';
import { initialRoutes } from 'TS/router';
import { conditionDisplayNav } from 'TS/util/index';

const $footer = document.getElementById('static-footer') as HTMLElement;

imageAllUpload();

sessionStorage.setItem('pageStack', '/login');

window.onload = async () => {
	$footer.innerHTML = await NavBar.showRenderView();

	await NavBar.renderAfter();

	conditionDisplayNav(false);
	initialRoutes();
};

window.onpopstate = () => {
	console.log('app.ts에서 pop 이벤트 발생');
};
