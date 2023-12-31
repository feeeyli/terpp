import {
	ClipboardText,
	DownloadSimple,
	MagnifyingGlass,
	SpinnerGap,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ytparse } from "@/lib/utils";
import axios from "axios";
import ReactPlayer from "react-player/youtube";

type DlResultData = {
	link: string;
	title: string;
	filesize: number;
	progress: number;
	duration: number;
	status: string;
	msg: string;
};

export const FromLink = () => {
	const urlInputRef = useRef<HTMLInputElement>(null);
	const [urlInputValue, setUrlInputValue] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [validUrl, setValidUrl] = useState(false);
	const [dlResult, setDlResult] = useState<DlResultData>();

	const handlePaste = async () => {
		const toPaste = await navigator.clipboard.readText();

		urlInputRef.current!.value = toPaste;
	};

	const handleDownload = () => {
		if (!urlInputRef.current?.value) return;

		setIsSearching(true);

		const options = {
			method: "GET",
			url: "https://youtube-mp36.p.rapidapi.com/dl",
			params: { id: ytparse(urlInputRef.current?.value) },
			headers: {
				"X-RapidAPI-Key":
					"3e82b4b5aemsh6e0735361837025p1e67a2jsne58c9bf1f8c8",
				"X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
			},
		};

		axios(options)
			.then((res) => {
				setDlResult(res.data);
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsSearching(false);
			});
	};

	useEffect(() => {
		setValidUrl(!!ytparse(urlInputValue));
	}, [urlInputValue]);

	return (
		<TabsContent value="link" className="pt-3">
			<Input
				type="text"
				placeholder="Insira o URL da musica."
				className="mb-2"
				value={urlInputValue}
				onChange={(e) => setUrlInputValue(e.target.value)}
				ref={urlInputRef}
			/>
			<div className="flex gap-2 flex-1">
				<Button
					onClick={handlePaste}
					className="w-full font-normal bg-pink-300 hover:bg-pink-300/90"
				>
					<ClipboardText
						size="1.5rem"
						weight="light"
						className="mr-2"
					/>
					Colar
				</Button>
				<Button
					onClick={handleDownload}
					disabled={!validUrl}
					className="w-full font-normal"
				>
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
			<div
				data-hidden={!validUrl}
				className="aspect-video data-[hidden=true]:hidden w-full overflow-hidden rounded-md mt-2"
			>
				<ReactPlayer
					url={urlInputValue}
					width="100%"
					height="100%"
					playbackRate={1}
					controls
					config={{
						playerVars: {
							autoplay: true,
						},
					}}
					onError={() => console.log("NOOOOO")}
					onReady={() => setValidUrl(true)}
				/>
			</div>
			{dlResult?.link && (
				<Button
					asChild
					className="bg-green-300 hover:bg-green-300/90 text-green-950"
				>
					<a
						href={dlResult?.link}
						target="_blank"
						rel="noreferrer"
						className="min-h-9 h-auto w-full mt-2"
					>
						<DownloadSimple size="1.5rem" weight="light" />
						<span className="break-words">
							Baixar "{dlResult.title}" (
							{(dlResult.filesize / (1024 * 1024)).toFixed(1)}MB)
						</span>
					</a>
				</Button>
			)}
		</TabsContent>
	);
};
