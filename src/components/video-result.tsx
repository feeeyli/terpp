import { Video } from "@/@types/video";
import { ytparse } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { DownloadSimple, SpinnerGap } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { PreviewDialog } from "./preview-dialog";

interface VideoResultProps {
	video: Video;
}

export const VideoResult = (props: VideoResultProps) => {
	const [isSearching, setIsSearching] = useState(false);

	const handleDownload = async () => {
		setIsSearching(true);

		const options = {
			method: "GET",
			url: "https://youtube-mp36.p.rapidapi.com/dl",
			params: { id: ytparse(props.video.link || "") },
			headers: {
				"X-RapidAPI-Key":
					"3e82b4b5aemsh6e0735361837025p1e67a2jsne58c9bf1f8c8",
				"X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
			},
		};

		let url = "";

		await axios<{ link: string }>(options)
			.then((res) => {
				url = res.data.link;
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsSearching(false);
			});

		const link = document.createElement("a");
		link.target = "_blank";
		link.rel = "noreferrer";
		link.href = url;
		document.body.appendChild(link);
		link.click();
	};

	return (
		<li className="flex justify-between">
			<div className="flex">
				{props.video.thumbnail && (
					<div className="mr-2 aspect-video h-16 relative">
						<img
							src={props.video.thumbnail || ""}
							alt={`Imagem do video "${
								props.video.title || "Desconhecido"
							}"`}
							className="object-cover h-16 aspect-video rounded-md"
						/>
						{props.video.link && (
							<PreviewDialog videoUrl={props.video.link} />
						)}
					</div>
				)}
				<div>
					<span className="line-clamp-2 text-sm">
						{props.video.title}
					</span>
					<div className="flex gap-3">
						{props.video.channel && (
							<span className="text-xs line-clamp-1 text-primary">
								{props.video.channel?.name}
							</span>
						)}
						{!props.video.channel && "Desconhecido"}
						<span className="text-xs text-primary">
							{props.video.durationString}
						</span>
					</div>
				</div>
			</div>
			<Button
				className="bg-green-300 hover:bg-green-300/90 text-green-950 ml-2"
				onClick={handleDownload}
				size="sm"
			>
				{!isSearching && (
					<>
						<DownloadSimple
							size="1.5rem"
							weight="light"
							className="mr-2"
						/>{" "}
						Baixar
					</>
				)}
				{isSearching && (
					<>
						<SpinnerGap
							size="1.5rem"
							weight="light"
							className="animate-spin mr-2"
						/>{" "}
						Baixando
					</>
				)}
			</Button>
		</li>
	);
};
