import 'CSS/login.css';

import loginTemplate from 'Page/login.hbs';

import { pushRouter } from 'Router/router';

const Login = {
	showRenderView: async () => loginTemplate(),

	renderAfter: async () => {
		const $idInput = document.getElementById('idInput') as HTMLInputElement;
		const $pwInput = document.getElementById('pwInput') as HTMLInputElement;
		const $submitBtn = document.querySelector('.submitBtn') as HTMLInputElement;
		const $loginForm = document.querySelector('.login-form') as HTMLFormElement;
		const $checkInput = document.querySelector('label[for="checkInput"]') as HTMLLabelElement;
		const $intro = document.querySelector('.intro') as HTMLDivElement;
		const $joinBtn = document.querySelector('.joinBtn') as HTMLAnchorElement;

		try {
			const res = await fetch('http://localhost:8080/users');
			const userChecks = await res.json();

			$loginForm.onkeyup = (e) => {
				if (e.key !== 'Enter' || $idInput.value === '') return;
				Checksusers();
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
					// $pwInput.focus();
					return;
				}
			});

			$idInput.onkeyup = () => {
				if (!$idInput.value) return;
				$checkInput.textContent = '';
				if ($idInput.value.length === 0) {
					$checkInput.textContent = '비밀번호를 입력해주세요';
				}
			};

			$pwInput.onkeyup = () => {
				if (!$pwInput.value) return;
				$checkInput.textContent = '';
				if ($pwInput.value.length === 0) {
					$checkInput.textContent = '비밀번호를 입력해주세요';
				}
			};

			$submitBtn.onclick = (e) => {
				e.preventDefault();
				// if (!e.target.matches('.btn-wrap > .submitBtn')) return;
				Checksusers();
			};

			// 초기화 목록
			$loginForm.onsubmit = (e) => {
				e.preventDefault();
			};

			$joinBtn.onclick = (e) => {
				e.preventDefault();
			};

			$intro.classList.add('play');

			const Checksusers = () => {
				const pathName = $submitBtn.getAttribute('route') as string;
				const newitem = [...userChecks].find(({ id, password }) => {
					return id === $idInput.value && password === $pwInput.value;
				});

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
					console.log('로그인 확인');
				} else {
					$checkInput.textContent = '아이디/비밀번호를 확인해주세요';
					$checkInput.style.display = 'block';
				}
			};
		} catch (err) {
			console.log(err);
		}
	},
};

export default Login;
