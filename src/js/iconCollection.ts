import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faBookmark as fullFaBookmark, faXmark, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as EmptyFaBookmark } from '@fortawesome/free-regular-svg-icons';

library.add(fullFaBookmark, EmptyFaBookmark, faXmark, faChevronUp, faChevronDown);

export const addToCartIcon = icon({ prefix: 'fas', iconName: 'bookmark' }).html[0];
export const removeToCartIcon = icon({ prefix: 'far', iconName: 'bookmark' }).html[0];
export const cancelIcon = icon({ prefix: 'fas', iconName: 'xmark' }).html[0];
export const upIcon = icon({ prefix: 'fas', iconName: 'chevron-up' }).html[0];
export const downIcon = icon({ prefix: 'fas', iconName: 'chevron-down' }).html[0];
