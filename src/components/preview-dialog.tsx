import { PlayCircle } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import ReactPlayer from "react-player/youtube";

interface PreviewDialogProps {
	videoUrl: string;
}

export const PreviewDialog = (props: PreviewDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="absolute bg-black/30 inset-0 rounded-md">
					<PlayCircle
						weight="fill"
						size="2rem"
						className="text-white/40 m-auto"
					/>
				</button>
			</DialogTrigger>
			<DialogContent>
				<div className="w-full aspect-video mt-4">
					<ReactPlayer
						url={props.videoUrl}
						width="100%"
						height="100%"
						playbackRate={1}
						controls
						config={{
							playerVars: {
								autoplay: true,
							},
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
