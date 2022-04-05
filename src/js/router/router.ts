import loginTemplate from 'Page/login.hbs';
import ingredientTemplate from 'Page/ingredient.hbs';

type RoutesType = {
	[key: string]: string;
};

const $rouutEl = document.getElementById('app') as HTMLDivElement;

const Login = loginTemplate();
const Ingredient = ingredientTemplate();

const routes: RoutesType = {
	'/': Login,
	'/login': Login,
	'/ingredient': Ingredient,
};

function renderHTML(route: string) {
	$rouutEl.innerHTML = route;
}

export async function initialRoutes() {
	renderHTML(routes['/']);

	const loginImport = await import('View/login');
	const loginController = loginImport;

	loginController.default();
	window.onpopstate = () => renderHTML(location.pathname);
}

export async function pushIngredientRouter(pathName: string) {
	renderHTML(routes[pathName]);
	await import('View/ingredient');
	// case '/cuisine':
	// await import('View//cuisine');

	history.pushState({}, pathName, location.origin + pathName);
}
