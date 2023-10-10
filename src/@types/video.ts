export interface SearchResults {
	videos: Video[];
}

export interface Video {
	id?: string;
	title?: string;
	link?: string;
	thumbnail?: string;
	channel?: Channel;
	description?: string;
	views?: number;
	uploaded?: string;
	duration?: number;
	durationString?: string;
}

interface Channel {
	id?: string;
	name?: string;
	link?: string;
	handle?: string | null;
	verified?: boolean;
	thumbnail?: string;
}
