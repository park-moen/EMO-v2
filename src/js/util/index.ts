export const timeModal = () => {
	const $popup = document.querySelector('.popup') as HTMLDivElement;
	const $overlay = document.querySelector('.overlay') as HTMLDivElement;

	$popup.style.display = 'flex';
	$overlay.style.display = 'block';
	setTimeout(() => {
		$popup.style.display = 'none';
		$overlay.style.display = 'none';
	}, 1250);
};

export function conditionDisplayNav(isNav: boolean) {
	const $nav = document.querySelector('nav') as HTMLElement;

	if (isNav) {
		$nav.style.display = 'block';
	} else {
		$nav.style.display = 'none';
	}
}
