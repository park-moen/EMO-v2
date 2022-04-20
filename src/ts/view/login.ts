import 'CSS/login.css';

import loginTemplate from 'Page/login.hbs';

import { AbstractViewType, UserDataType } from 'Type/commonType';

import { pushRouter } from 'TS/router';
import { HTTPLocal } from 'Util/constantValue';

interface Login extends AbstractViewType {
	userAllInfomation: UserDataType[];
	fetchUserInfomation: () => Promise<void>;
	checksUsers: () => void;
}

const Login: Login = {
	userAllInfomation: [],

	async showRenderView() {
		return loginTemplate();
	},

	async renderAfter() {
		const $idInput = document.getElementById('idInput') as HTMLInputElement;
		const $pwInput = document.getElementById('pwInput') as HTMLInputElement;
		const $submitBtn = document.querySelector('.submitBtn') as HTMLInputElement;
		const $loginForm = document.querySelector('.login-form') as HTMLFormElement;
		const $checkInput = document.querySelector('label[for="checkInput"]') as HTMLLabelElement;
		const $intro = document.querySelector('.intro') as HTMLDivElement;
		const $joinBtn = document.querySelector('.joinBtn') as HTMLAnchorElement;

		await this.fetchUserInfomation();

		try {
			$loginForm.onkeyup = (e) => {
				if (e.key !== 'Enter' || $idInput.value === '') return;

				this.checksUsers();
			};

			$idInput.addEventListener('focusout', () => {
				if ($idInput.value === '') {
					$checkInput.textContent = '아이디를 입력해주세요';
					$checkInput.style.display = 'block';
					$idInput.focus();

					return;
				}
			});

			$pwInput.addEventListener('focusout', () => {
				if ($pwInput.value === '') {
					$checkInput.textContent = '비밀번호를 입력해주세요';
					$checkInput.style.display = 'block';

					return;
				}
			});

			$idInput.onkeyup = () => {
				if (!$idInput.value) return;

				if ($idInput.value.length === 0) $checkInput.textContent = '비밀번호를 입력해주세요';

				$checkInput.textContent = '';
			};

			$pwInput.onkeyup = () => {
				if (!$pwInput.value) return;

				if ($pwInput.value.length === 0) $checkInput.textContent = '비밀번호를 입력해주세요';

				$checkInput.textContent = '';
			};

			$submitBtn.onclick = (e) => {
				e.preventDefault();

				this.checksUsers();
			};

			// 초기화 목록
			$loginForm.onsubmit = (e) => {
				e.preventDefault();
			};

			$joinBtn.onclick = (e) => {
				e.preventDefault();

				const pathName = $joinBtn.getAttribute('route') || '';
				pushRouter(pathName);
			};

			$intro.classList.add('play');
		} catch (err) {
			console.error(err);
		}
	},

	async fetchUserInfomation() {
		try {
			const result = await fetch(`${HTTPLocal}/users`);
			this.userAllInfomation = await result.json();
		} catch (err) {
			console.error(err);
		}
	},

	checksUsers() {
		const $idInput = document.getElementById('idInput') as HTMLInputElement;
		const $pwInput = document.getElementById('pwInput') as HTMLInputElement;
		const $submitBtn = document.querySelector('.submitBtn') as HTMLInputElement;
		const $checkInput = document.querySelector('label[for="checkInput"]') as HTMLLabelElement;

		const pathName = $submitBtn.getAttribute('route') || '';
		const newitem = [...this.userAllInfomation].find(
			({ id, password }) => id === $idInput.value && password === $pwInput.value
		);

		if (newitem) {
			window.sessionStorage.setItem(
				'login',
				JSON.stringify({
					id: newitem.id,
					password: newitem.password,
					nickname: newitem.nickname,
				})
			);

			pushRouter(pathName);
		} else {
			$checkInput.textContent = '아이디/비밀번호를 확인해주세요';
			$checkInput.style.display = 'block';
		}
	},
};

export default Login;
