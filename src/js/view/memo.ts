import 'CSS/memo.css';

import memoTemplate from 'Page/memo.hbs';

import { AbstractViewType } from 'Type/commonType';
import { HTTPLocal } from 'Util/constantValue';

type MemoDataType = {
	id: string;
	content: string;
	completed: boolean;
};

type RenderMemoViewParams = {
	cartMemoListDOM: HTMLUListElement;
	cartAllBtnsDOM: HTMLDivElement;
};

interface Memo extends AbstractViewType {
	memoAllInfomation: MemoDataType[];
	fetchMemoInfomation: (passDOM: RenderMemoViewParams) => Promise<void>;
	renderMemoView: (
		necessaryDOM: RenderMemoViewParams,
		renderType?: 'add' | 'allDelete',
		newData?: MemoDataType
	) => void;
	autoChangeAllBtn: (cartAllBtnsDOM: HTMLDivElement) => void;
	getnewMemoId: () => number;
}

const Memo: Memo = {
	memoAllInfomation: [],

	async showRenderView() {
		return memoTemplate();
	},

	async renderAfter() {
		const $cartInput = document.querySelector('.cart-memo-input') as HTMLInputElement;
		const $cartMemoList = document.querySelector('.cart-memo-list') as HTMLUListElement;
		const $cartAllBtns = document.querySelector('.cart-all-btns') as HTMLDivElement;
		const $cartAllRemove = document.querySelector('.cart-all-remove') as HTMLButtonElement;

		const renderMemoViewParams = {
			cartMemoListDOM: $cartMemoList,
			cartAllBtnsDOM: $cartAllBtns,
		};

		await this.fetchMemoInfomation(renderMemoViewParams);

		$cartInput.onkeyup = async (e) => {
			const target = e.target as HTMLInputElement;

			if (e.key !== 'Enter' || !target.value) return;
			try {
				const content = target.value;
				const newMemo = { id: `cart-item${this.getnewMemoId()}`, content, completed: false };

				await fetch(`${HTTPLocal}/cartmemos`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newMemo),
				});

				this.renderMemoView(renderMemoViewParams, 'add', newMemo);
			} catch (err) {
				console.error(`[ERROR],${err}`);
			}
			$cartInput.value = '';
		};

		$cartMemoList.onchange = async (e) => {
			const target = e.target as HTMLInputElement;
			const targetId = target.id;

			try {
				await fetch(`${HTTPLocal}/cartmemos/${targetId}`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ completed: target.checked }),
				});

				this.autoChangeAllBtn($cartAllBtns);
			} catch (err) {
				console.error(`[ERROR]:${err}`);
			}
		};

		$cartAllBtns.onchange = async (e) => {
			const target = e.target as HTMLInputElement;

			if (!target.matches('.checkbox')) return;

			try {
				this.memoAllInfomation.forEach(async (mini: MemoDataType) => {
					await fetch(`${HTTPLocal}/cartmemos/${mini.id}`, {
						method: 'PATCH',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ completed: target.checked }),
					});
				});

				this.fetchMemoInfomation(renderMemoViewParams);
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
					const res = await fetch(`${HTTPLocal}/cartmemos/${targetId}`, { method: 'DELETE' });
					this.memoAllInfomation = await res.json();

					this.fetchMemoInfomation(renderMemoViewParams);
				}
			} catch (err) {
				console.error(`[ERROR]:${err}`);
			}
		};

		$cartAllRemove.onclick = async (e) => {
			const target = e.target as HTMLButtonElement;

			if (!target.matches('.cart-all-btns > .cart-all-remove')) return;

			try {
				this.memoAllInfomation.forEach(async (mini: MemoDataType) => {
					await fetch(`${HTTPLocal}/cartmemos/${mini.id}`, { method: 'DELETE' });
				});

				this.autoChangeAllBtn($cartAllBtns);
				this.renderMemoView(renderMemoViewParams, 'allDelete');
			} catch (err) {
				console.error(`[ERROR]:${err}`);
			}
		};
	},

	async fetchMemoInfomation(passDOM) {
		try {
			const res = await fetch(`${HTTPLocal}/cartmemos`);
			const cartMemos = await res.json();

			this.memoAllInfomation = [...cartMemos];

			this.renderMemoView(passDOM);
		} catch (err) {
			console.error(`ERROR:${err}`);
		}
	},

	renderMemoView(necessaryDOM, renderType, newData) {
		let htmlMemos = '';

		if (newData && renderType === 'add') {
			this.memoAllInfomation.push(newData);
		}

		if (renderType === 'allDelete') {
			this.memoAllInfomation = [];
		}

		this.memoAllInfomation.forEach(({ id, content, completed }) => {
			htmlMemos =
				`<li>
						<input id="${id}" class="checkbox" type ="checkbox" ${completed ? 'checked' : ''}>
						<label for="${id}">${content}</label>
						<i class="remove">x</i>
					</li>` + htmlMemos;
		});

		this.autoChangeAllBtn(necessaryDOM.cartAllBtnsDOM);

		necessaryDOM.cartMemoListDOM.innerHTML = htmlMemos;
	},

	autoChangeAllBtn(cartAllBtnsDOM) {
		const isAllChecked = this.memoAllInfomation.length && this.memoAllInfomation.every((memo) => memo.completed);
		const checkedAllBtn = cartAllBtnsDOM.firstElementChild as HTMLInputElement;

		if (isAllChecked) {
			checkedAllBtn.checked = true;
		} else {
			checkedAllBtn.checked = false;
		}
	},

	getnewMemoId() {
		return this.memoAllInfomation.length ? this.memoAllInfomation.length + 1 : 1;
	},
};

export default Memo;
