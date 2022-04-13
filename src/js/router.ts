// import memoTemplate from 'Page/memo.hbs';

import Login from 'View/login';
import Ingredient from 'View/ingredient';
import Cuisine from 'View/cuisine';
import Memo from 'View/memo';
import Recipe from 'View/recipe';
import Myinfo from 'View/myinfo';

import { conditionDisplayNav } from 'View/navigationBar';

const $rouutEl = document.getElementById('app') as HTMLDivElement;

// const Memo = memoTemplate();

const routes: any = {
	'/': Login,
	'/login': Login,
	'/ingredient': Ingredient,
	'/cuisine': Cuisine,
	'/recipe': Recipe,
	'/memo': Memo,
	'/myinfo': Myinfo,
};

export async function initialRoutes() {
	$rouutEl.innerHTML = await routes['/'].showRenderView();
	await routes['/'].renderAfter();

	history.pushState({}, '/login', location.origin + '/login');
}

export async function pushRouter(pathName: string, qureyId?: string) {
	if (pathName === '/' || pathName === '/login') {
		conditionDisplayNav(false);
	} else {
		conditionDisplayNav(true);
	}

	if (qureyId) {
		history.pushState({}, pathName, location.origin + `${pathName}:${qureyId}`);
	} else {
		history.pushState({}, pathName, location.origin + `${pathName}`);
	}

	$rouutEl.innerHTML = await routes[pathName].showRenderView();
	await routes[pathName].renderAfter();
}
