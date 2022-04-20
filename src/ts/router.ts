// import memoTemplate from 'Page/memo.hbs';

import Login from 'View/login';
import Register from 'View/register';
import Ingredient from 'View/ingredient';
import Cuisine from 'View/cuisine';
import Memo from 'View/memo';
import Recipe from 'View/recipe';
import Myinfo from 'View/myinfo';
import Recommend from 'View/recommend';

import { conditionDisplayNav } from 'Util/index';

const $rouutEl = document.getElementById('app') as HTMLDivElement;

// const Memo = memoTemplate();

const routes: any = {
	'/': Login,
	'/login': Login,
	'/register': Register,
	'/ingredient': Ingredient,
	'/cuisine': Cuisine,
	'/recipe': Recipe,
	'/memo': Memo,
	'/myinfo': Myinfo,
	'/recommend': Recommend,
};

export async function initialRoutes() {
	$rouutEl.innerHTML = await routes['/'].showRenderView();
	await routes['/'].renderAfter();

	history.pushState({}, '/login', location.origin + '/login');
}

export async function pushRouter(pathName: string, qureyId?: string, backPageType?: 'cuisine' | 'recommend') {
	if (pathName === sessionStorage.getItem('pageStack')) {
		return;
	}

	sessionStorage.setItem('pageStack', pathName);

	if (pathName === '/' || pathName === '/login' || pathName === '/register') {
		conditionDisplayNav(false);
	} else {
		conditionDisplayNav(true);
	}

	if (qureyId) {
		history.pushState({ backPageType }, pathName, location.origin + `${pathName}:${qureyId}`);
	} else {
		history.pushState({ isSameRoute: pathName }, pathName, location.origin + `${pathName}`);
	}

	$rouutEl.innerHTML = await routes[pathName].showRenderView();
	await routes[pathName].renderAfter();
}
