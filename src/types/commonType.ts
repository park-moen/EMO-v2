export type CuisineDataType = {
	id: number;
	name: string;
	img: string;
	difficulty: string;
	ingredient: string[];
	recipe: string[];
};

export type UserDataType = {
	id: string;
	password: string;
	nickname: string;
};

export interface AbstractViewType {
	showRenderView: () => Promise<string>;
	renderAfter: () => Promise<void>;
}
