export interface IPost {
	author: number;
	date: string;
	excerpt: {
		protected: boolean;
		rendered: string;
	}
	featured_media: number;
	id: number;
	link: string;
	slug: string;
	title: {
		rendered: string;
	}
	type: string
	wordCount: Record<string, number>
	_links: Record<string, Record<string, any>[]>
}

export interface IAppProps {
	children?: any;
}

export interface IAppState {
	posts: IPost[];
	modalOpen: boolean;
}
