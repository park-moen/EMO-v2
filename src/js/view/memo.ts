import 'CSS/memo.css';

// "cartmemos": [
// 	{
// 		"id": "cart-item1",
// 		"content": "sdafadsf",
// 		"completed": false
// 	}
// ],

console.log('xxx');

type MemoDataType = {
	id: string;
	content: string;
	completed: boolean;
};

let memoData: MemoDataType[] = [];

const $cartInput = document.querySelector('.cart-memo-input') as HTMLInputElement;
const $cartMemoList = document.querySelector('.cart-memo-list') as HTMLUListElement;
const $cartAllBtns = document.querySelector('.cart-all-btns') as HTMLDivElement;
const $cartAllRemove = document.querySelector('.cart-all-remove') as HTMLButtonElement;

const fetchCartMemo = async () => {
	try {
		const res = await fetch('http://localhost:8080/cartmemos');
		const cartmemos = await res.json();

		memoData = [...cartmemos];
		render();
	} catch (err) {
		console.error(`ERROR:${err}`);
	}
};

const render = (renderType?: 'add' | 'allDelete', newData?: MemoDataType) => {
	let htmlMemos = '';

	if (newData && renderType === 'add') {
		memoData.push(newData);
	}

	if (renderType === 'allDelete') {
		memoData = [];
	}

	memoData.forEach(({ id, content, completed }) => {
		htmlMemos =
			`<li>
    		<input id="${id}" class="checkbox" type ="checkbox" ${completed ? 'checked' : ''}>
    		<label for="${id}">${content}</label>
    		<i class="remove">x</i>
    	</li>` + htmlMemos;
	});

	$cartMemoList.innerHTML = htmlMemos;
};

const getnewMemoId = () => {
	return memoData.length ? memoData.length + 1 : 1;
};

$cartInput.onkeyup = async (e) => {
	const target = e.target as HTMLInputElement;

	if (e.key !== 'Enter' || !target.value) return;
	try {
		const content = target.value;
		const newMemo = { id: `cart-item${getnewMemoId()}`, content, completed: false };
		await fetch('http://localhost:8080/cartmemos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newMemo),
		});
		// render()
		render('add', newMemo);
	} catch (err) {
		console.error(`[ERROR],${err}`);
	}
	$cartInput.value = '';
};

$cartMemoList.onchange = async (e) => {
	const target = e.target as HTMLInputElement;
	const targetId = target.id;

	try {
		await fetch(`http://localhost:8080/cartmemos/${targetId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ completed: target.checked }),
		});
	} catch (err) {
		console.error(`[ERROR]:${err}`);
	}
};

$cartAllBtns.onchange = async (e) => {
	const target = e.target as HTMLInputElement;

	if (!target.matches('.checkbox')) return;

	try {
		// const doThis = await fetch('http://localhost:8080/cartmemos');
		// const minis = await doThis.json();

		memoData.forEach(async (mini: MemoDataType) => {
			await fetch(`http://localhost:8080/cartmemos/${mini.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ completed: target.checked }),
			});
		});

		fetchCartMemo();
	} catch (err) {
		console.error(`[ERROR]:${err}`);
	}
};

$cartMemoList.onclick = async (e) => {
	const target = e.target as HTMLElement;

	if (!target.matches('.cart-memo-list > li > i')) return;

	try {
		if (target.parentNode?.firstElementChild) {
			const targetId = target.parentNode.firstElementChild.id;
			const res = await fetch(`http://localhost:8080/cartmemos/${targetId}`, { method: 'DELETE' });
			memoData = await res.json();

			fetchCartMemo();
		}
	} catch (err) {
		console.error(`[ERROR]:${err}`);
	}
};

$cartAllRemove.onclick = async (e) => {
	const target = e.target as HTMLButtonElement;

	if (!target.matches('.cart-all-btns > .cart-all-remove')) return;

	try {
		memoData.forEach(async (mini: MemoDataType) => {
			await fetch(`http://localhost:8080/cartmemos/${mini.id}`, { method: 'DELETE' });
		});

		render('allDelete');
	} catch (err) {
		console.error(`[ERROR]:${err}`);
	}
};

fetchCartMemo();
