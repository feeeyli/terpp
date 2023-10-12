import { MagnifyingGlass, SpinnerGap } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";
import { useRef, useState } from "react";
import axios from "axios";
import { SearchResults, Video } from "@/@types/video";
import { VideoResult } from "../video-result";
import { ScrollArea } from "../ui/scroll-area";
import { SEARCH_RESULT_PLACEHOLDER } from "@/SEARCH_RESULT_PLACEHOLDER";

export const FromSearch = () => {
	const urlInputRef = useRef<HTMLInputElement>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [searchResult, setSearchResult] = useState<Video[]>(
		SEARCH_RESULT_PLACEHOLDER
	);

	const handleSearch = () => {
		if (!urlInputRef.current?.value) return;

		setIsSearching(true);

		const options = {
			method: "GET",
			url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
			params: { q: urlInputRef.current.value },
			headers: {
				"X-RapidAPI-Key":
					"3e82b4b5aemsh6e0735361837025p1e67a2jsne58c9bf1f8c8",
				"X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
			},
		};

		axios<SearchResults>(options)
			.then((res) => {
				// console.log(
				// 	res.data.items.map((vi) => ({
				// 		title: vi.title,
				// 		author: vi.author.name,
				// 		duration: vi.duration,
				// 		url: vi.url,
				// 	}))
				// );
				// console.log(res.data.videos);
				setSearchResult(res.data.videos);
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsSearching(false);
			});
	};

	return (
		<TabsContent value="search" className="pt-3">
			<Input
				type="text"
				placeholder="Busque pela musica."
				className="mb-2"
				ref={urlInputRef}
			/>
			<div className="flex gap-2 flex-1">
				<Button onClick={handleSearch} className="w-full font-normal">
					{!isSearching && (
						<>
							<MagnifyingGlass
								size="1.5rem"
								weight="light"
								className="mr-2"
							/>{" "}
							Buscar
						</>
					)}
					{isSearching && (
						<>
							<SpinnerGap
								size="1.5rem"
								weight="light"
								className="animate-spin mr-2"
							/>{" "}
							Buscando
						</>
					)}
				</Button>
			</div>
			{searchResult.length > 0 && (
				<ScrollArea className="h-[28rem] mt-4">
					<ul className="sm:space-y-2 space-y-4">
						{searchResult.map((video) => (
							<VideoResult video={video} key={video.id} />
						))}
					</ul>
				</ScrollArea>
			)}
		</TabsContent>
	);
};
