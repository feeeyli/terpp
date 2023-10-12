import {
	ClipboardText,
	DownloadSimple,
	MagnifyingGlass,
	SpinnerGap,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ytparse } from "@/lib/utils";
import axios from "axios";

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
	const [isSearching, setIsSearching] = useState(false);
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
				console.log(res.data);
				setDlResult(res.data);
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsSearching(false);
			});
	};

	return (
		<TabsContent value="link" className="pt-3">
			<Input
				type="text"
				placeholder="Insira o URL da musica."
				className="mb-2"
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
				<Button onClick={handleDownload} className="w-full font-normal">
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
