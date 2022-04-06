import loginTemplate from 'Page/login.hbs';
import ingredientTemplate from 'Page/ingredient.hbs';
import cuisineTemplate from 'Page/cuisine.hbs';
import navigationBarTemplate from 'Page/navigationBar.hbs';

type RoutesType = {
	[key: string]: string;
};

type popPageRouteType = 'ingredient' | 'cuisine' | 'recipe' | 'myinfo';

const $rouutEl = document.getElementById('app') as HTMLDivElement;

const Login = loginTemplate();
const Ingredient = ingredientTemplate();
const Cuisine = cuisineTemplate();
const navigationBar = navigationBarTemplate();

const routes: RoutesType = {
	'/': Login,
	'/login': Login,
	'/ingredient': Ingredient,
	'/cuisine': Cuisine,
};

function renderHTML(route: string, isNav?: boolean) {
	if (isNav) {
		$rouutEl.innerHTML = route + navigationBar;
	} else {
		$rouutEl.innerHTML = route;
	}
}

export async function initialRoutes() {
	renderHTML(routes['/']);

	const loginImport = await import('View/login');
	const loginController = loginImport;

	loginController.default();

	window.onpopstate = () => renderHTML(location.pathname);
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

// commonPopBtn 구현
export function popPriviousPage(type: popPageRouteType) {
	console.log(type);
}
