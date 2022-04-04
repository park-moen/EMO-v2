import 'CSS/ingredient.css';

let ingredientes: any = [];
let ingredientName = '';

//Dom
const $ingredientes = document.querySelector('.ingredientes') as HTMLUListElement;
// const $ingreItem = document.querySelector('.ingre-item');
const $ingreItemContainer = document.querySelector('.ingre-item-container') as HTMLUListElement;
const $refresh = document.querySelector('.refresh') as HTMLDivElement;
const $cookEnter = document.querySelector('.cookEnter') as HTMLDivElement;
// const $category = document.querySelector('.category');
// const $ingredient = document.querySelector('.ingredient');

//fn
// const render = () => {
// 	let html = '';
// 	ingredientes.forEach((ingredient: any) => {
// 		html = `<li class="ingre-item"><span>${ingredient}</span><button class="remove-ingre-item">X</button></li>` + html;
// 	});
// 	$ingreItemContainer.innerHTML = html;
// };

// $ingredientes.addEventListener('click', (e) => {
// 	if (!e.target.matches('.category')) return;
// 	e.target.children[0].classList.toggle('active');
// 	e.target.nextElementSibling.classList.toggle('view');
// });

// $ingredientes.onclick = (e) => {
// 	if (!e.target.matches('.ingredient > ul > li')) return;
// 	ingredientName = e.target.textContent;
// 	$ingreItemContainer.classList.add('active');
// 	$refresh.classList.add('active');
// 	$cookEnter.classList.add('active');

// 	e.target.classList.toggle('active');

// 	if (e.target.matches('.active')) {
// 		ingredientes = ingredientes.concat(ingredientName);
// 	} else if (!e.target.matches('.active')) {
// 		ingredientes = ingredientes.filter((btnTextContent) => btnTextContent !== ingredientName);
// 	}
// 	emptyArrFilter();
// 	render();
// };

// $ingreItemContainer.onclick = (e) => {
// 	if (!e.target.matches('.remove-ingre-item')) return;
// 	$ingreItemContainer.removeChild(e.target.parentNode);

// 	const ingredientAdded = e.target.previousSibling.textContent;
// 	ingredientes = ingredientes.filter((item) => item !== ingredientAdded);
// 	emptyArrFilter();
// };

// const emptyArrFilter = () => {
// 	if (!ingredientes.length) {
// 		$ingreItemContainer.classList.remove('active');
// 		$refresh.classList.remove('active');
// 		$cookEnter.classList.remove('active');
// 		window.sessionStorage.clear();

// 		[...document.querySelectorAll('.ingredient')].forEach((nodeItem) => {
// 			nodeItem.classList.remove('view');
// 		});
// 		[...document.querySelectorAll('.fa-chevron-down')].forEach((nodeBtn) => {
// 			nodeBtn.classList.remove('active');
// 		});
// 		[...document.querySelectorAll('.ingredient > ul > li')].forEach((nodeBtn) => {
// 			nodeBtn.classList.remove('active');
// 		});
// 	}
// };

// const fetchIngre = async () => {
// 	try {
// 		const cuisineDb = await fetch('/cuisine');
// 		const ingreData = cuisineDb.json();
// 		console.log(ingreData);
// 	} catch (e) {
// 		console.error(e);
// 	}
// };

// fetchIngre();

// $cookEnter.onclick = (e) => {
// 	window.sessionStorage.setItem('ingredientes', JSON.stringify(ingredientes));
// 	window.location.assign('/cuisine.html');
// };

// $refresh.onclick = (e) => {
// 	[...$ingreItemContainer.children].forEach((itemNode) => itemNode.remove());
// 	ingredientes = [];

// 	$ingreItemContainer.classList.remove('active');
// 	$refresh.classList.remove('active');
// 	$cookEnter.classList.remove('active');
// 	window.sessionStorage.clear();

// 	[...document.querySelectorAll('.ingredient')].forEach((nodeItem) => {
// 		nodeItem.classList.remove('view');
// 	});
// 	[...document.querySelectorAll('.fa-chevron-down')].forEach((nodeBtn) => {
// 		nodeBtn.classList.remove('active');
// 	});

// 	emptyArrFilter();
// };
