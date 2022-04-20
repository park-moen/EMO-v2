// import { Cuisine } from 'JS/view/cuisine';
// import { Recommend } from 'JS/view/recommend';
import { CuisineDataType } from 'Type/commonType';

export const timeModal = (type: 'add' | 'remove') => {
	const $popup = document.querySelector('.popup') as HTMLDivElement;
	const $popdown = document.querySelector('.popdown') as HTMLDivElement;
	const $overlay = document.querySelector('.overlay') as HTMLDivElement;

	if (type === 'add') {
		$popup.style.display = 'flex';
		$overlay.style.display = 'block';
		setTimeout(() => {
			$popup.style.display = 'none';
			$overlay.style.display = 'none';
		}, 1250);
	} else {
		$popdown.style.display = 'flex';
		$overlay.style.display = 'block';
		setTimeout(() => {
			$popdown.style.display = 'none';
			$overlay.style.display = 'none';
		}, 1250);
	}
};

export function conditionDisplayNav(isNav: boolean) {
	const $nav = document.querySelector('nav') as HTMLElement;

	if (isNav) {
		$nav.style.display = 'block';
	} else {
		$nav.style.display = 'none';
	}
}

// export function eachCuisineEventHandler(this: Cuisine | Recommend, event: Event) {
// 	const target = event.target as HTMLElement;
// 	console.log(event, this);

// 	if (!target.matches('.fa-bookmark') && !target.matches('.bookmark') && !target.closest('svg')) {
// 		this.pushCuisineRoute(target);
// 	} else {
// 		const userData = JSON.parse(sessionStorage.getItem('login') || '{}');
// 		const correctAnchor = target.closest('.bookmark');
// 		const addToCartElement = correctAnchor?.firstElementChild as SVGAElement;

// 		if (correctAnchor) {
// 			const routeName = correctAnchor.getAttribute('route');

// 			if (!correctAnchor.matches('.addToCart')) {
// 				this.urls = [...new Set([...this.urls, routeName || ''])];
// 				correctAnchor?.classList.add('addToCart');
// 				addToCartElement.style.opacity = '1';

// 				timeModal('add');
// 			} else if (correctAnchor.matches('.addToCart')) {
// 				this.urls = this.urls.filter((routeURLName) => routeURLName !== routeName);
// 				correctAnchor?.classList.remove('addToCart');
// 				addToCartElement.style.opacity = '0';

// 				timeModal('remove');
// 			}
// 		}

// 		sessionStorage.setItem(userData.id, JSON.stringify(this.urls));
// 	}
// }

export function dataToShowBookmark(cuisines: Readonly<CuisineDataType[]>) {
	const userInfoes = JSON.parse(window.sessionStorage.getItem('login') || '{}').id;
	const bookmarks: string[] = JSON.parse(window.sessionStorage.getItem(userInfoes) || '[]');
	const extractBookmarkIds = bookmarks.map((data) => data.split(':')[1]);
	const extractDatasId = cuisines.map((data) => String(data.id));
	const overlapIdList = extractBookmarkIds.filter((bookmarkId) =>
		extractDatasId.some((userInfoId) => bookmarkId === userInfoId)
	);

	return overlapIdList;
}
