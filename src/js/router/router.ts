import loginTemplate from 'Page/login.hbs';
import ingredientTemplate from 'Page/ingredient.hbs';
import cuisineTemplate from 'Page/cuisine.hbs';
import memoTemplate from 'Page/memo.hbs';

import { conditionDisplayNav } from 'View/navigationBar';

type RoutesType = {
	[key: string]: string;
};

type NarrowRouteType = 'ingredient' | 'cuisine' | 'recipe' | 'myinfo' | 'meno' | 'recommend';

const $rouutEl = document.getElementById('app') as HTMLDivElement;

const Login = loginTemplate();
// const Logout = logoutTemplate();
const Ingredient = ingredientTemplate();
const Cuisine = cuisineTemplate();
// const Recipe = recipeTemplate();
// const Myinfo = myinfoTemplate();
const Memo = memoTemplate();

const routes: RoutesType = {
	'/': Login,
	'/login': Login,
	// '/logout': Logout,
	'/ingredient': Ingredient,
	'/cuisine': Cuisine,
	// '/recipe': Recipe,
	// '/myinfo': Myinfo,
	'/memo': Memo,
};

function renderHTML(route: string, isNav: boolean) {
	conditionDisplayNav(isNav);
	$rouutEl.innerHTML = route;
}

// commonPopBtn 구현
export function popPriviousPage(type: NarrowRouteType) {
	console.log(type);
}

export async function initialRoutes() {
	renderHTML(routes['/'], false);

	const loginImport = await import('View/login');
	const loginController = loginImport;

	loginController.default();

	window.onpopstate = () => renderHTML(location.pathname, true);
}

export async function pushNavRouter(pathName: string) {
	renderHTML(routes[pathName], true);

	switch (pathName) {
		case '/ingredient':
			await import('View/ingredient');
			break;
		case '/memo':
			await import('View/memo');
			break;
		case '/recommend':
			console.log('recommend');
			break;
		case '/myinfo':
			console.log('myinfo');
			break;
	}

	history.pushState({}, pathName, location.origin + pathName);
}

export async function pushIngredientRouter(pathName: string) {
	renderHTML(routes[pathName], true);
	await import(`View/ingredient`);

	history.pushState({}, pathName, location.origin + pathName);
}

// ingredient Page에서 뒤로가기하면 로그아웃 모달 뜨면서 알림을 보내는 logic
export async function popIngredientRouterToLogout() {}

export async function pushCuisineRouter(pathName: string) {
	renderHTML(routes[pathName], true);
	await import('View/cuisine');

	history.pushState({}, pathName, location.origin + pathName);
}
