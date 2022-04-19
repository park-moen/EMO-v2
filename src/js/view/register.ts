import 'CSS/register.css';
import { pushRouter } from 'JS/router';

import registerTemplate from 'Page/register.hbs';

import { UserDataType, AbstractViewType } from 'Type/commonType';
import { HTTPLocal } from 'Util/constantValue';

interface Register extends AbstractViewType {
	fetchUsers: (signReg: RegExp) => Promise<void>;
	postFetchUser: (userInfo: UserDataType) => Promise<void>;
}

const Register: Register = {
	async showRenderView() {
		return registerTemplate();
	},

	async renderAfter() {
		const signReg = /^$|[A-Za-z0-9]{6,12}$/g;
		const nameReg = /^$|[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|*]{2,10}$/;

		const $userPw = document.querySelector('#user-pw') as HTMLInputElement;
		const $pwCheck = document.querySelector('#user-pw-check') as HTMLInputElement;
		const $nickname = document.querySelector('#user-nickname') as HTMLInputElement;
		const $pwReg = document.querySelector('.alert-pwReg') as HTMLSpanElement;
		const $pwSame = document.querySelector('.alert-pw') as HTMLSpanElement;
		const $nameReg = document.querySelector('.alert-name') as HTMLSpanElement;
		const $form = document.querySelector('.signup-form') as HTMLFormElement;
		const $signupBtn = document.querySelector('.sign-up') as HTMLButtonElement;
		const $fallbackBtnContainer = document.querySelector('.register-fallback-popup') as HTMLDivElement;
		const $fallbackBtn = document.querySelector('.fallback-btn-ok') as HTMLButtonElement;
		const $popupOkBtn = document.querySelector('.register-popup') as HTMLDivElement;
		const $overlay = document.querySelector('.overlay') as HTMLDivElement;
		const $spans = document.querySelectorAll('span');
		const $userId = document.querySelector('#user-id') as HTMLInputElement;

		if ($signupBtn.disabled) {
			$popupOkBtn.style.display = 'none';
			$fallbackBtnContainer.style.display = 'none';
			$overlay.style.display = 'none';
		}

		await this.fetchUsers(signReg);

		$userPw.addEventListener('focusout', () => {
			$signupBtn.removeAttribute('disabled');

			if (signReg.test($userPw.value)) {
				$pwReg.classList.remove('block');
			} else if (signReg.test($userPw.value) === false) {
				$pwReg.classList.add('block');
			}
		});

		$pwCheck.addEventListener('focusout', () => {
			$signupBtn.removeAttribute('disabled');

			if ($userPw.value === $pwCheck.value) {
				$pwSame.classList.remove('block');
			} else if ($userPw.value !== $pwCheck.value) {
				$pwSame.classList.add('block');
			}
			if (!$pwCheck.value) {
				$pwSame.classList.remove('block');
			}
		});

		$nickname.addEventListener('keyup', () => {
			$signupBtn.removeAttribute('disabled');

			if (nameReg.test($nickname.value) === false) {
				$nameReg.classList.add('block');
			} else if (nameReg.test($nickname.value) === true) {
				$nameReg.classList.remove('block');
			}
		});

		$popupOkBtn.addEventListener('click', () => {
			const userInfo: UserDataType = {
				id: $userId.value,
				password: $userPw.value,
				nickname: $nickname.value,
			};

			this.postFetchUser(userInfo);

			pushRouter('/login');
		});

		$fallbackBtn.addEventListener('click', () => {
			$fallbackBtnContainer.style.display = 'none';
			$overlay.style.display = 'none';
		});

		$form.onsubmit = (e) => {
			e.preventDefault();

			let count = 0;
			[...$spans].forEach((span) => {
				if (span.classList.contains('block')) {
					++count;

					if (count >= 1) {
						$signupBtn.setAttribute('disabled', 'disabled');
						$overlay.style.display = 'block';
						$fallbackBtnContainer.style.display = 'block';

						return;
					}
				}
			});

			if (count === 0) {
				$overlay.style.display = 'block';
				$popupOkBtn.style.display = 'block';
			}
		};
	},

	async fetchUsers(signReg) {
		const $userId = document.querySelector('#user-id') as HTMLInputElement;
		const $idSame = document.querySelector('.alert-id') as HTMLSpanElement;
		const $idReg = document.querySelector('.alert-idReg') as HTMLSpanElement;

		const data = await fetch(`${HTTPLocal}/users`);
		const users: UserDataType[] = await data.json();
		const userId = users.map((user) => user.id);

		$userId.addEventListener('focusout', () => {
			if (signReg.test($userId.value)) {
				$idReg.classList.remove('block');
				if (userId.includes($userId.value)) {
					$idSame.classList.add('block');
				} else if (userId.includes($userId.value) === false) {
					$idSame.classList.remove('block');
				}
			} else if (signReg.test($userId.value) === false) {
				$idSame.classList.remove('block');
				$idReg.classList.add('block');
			}
		});
	},

	async postFetchUser(userInfo) {
		await fetch(`${HTTPLocal}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userInfo),
		});
	},
};

export default Register;
