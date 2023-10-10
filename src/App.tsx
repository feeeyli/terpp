import { MusicNotes } from "@phosphor-icons/react";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { FromSearch } from "./components/tabs/from-search";
import { FromLink } from "./components/tabs/form-link";

function App() {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 p-4">
			<main className="w-full h-full sm:h-auto max-w-lg bg-background rounded-md flex flex-col items-center px-4 py-8">
				<h1 className="uppercase text-2xl font-light flex gap-2 items-center">
					Terpp <MusicNotes weight="thin" size={32} />
				</h1>
				<Tabs className="w-full mt-2" defaultValue="search">
					<TabsList>
						<TabsTrigger value="search">Via Busca</TabsTrigger>
						<TabsTrigger value="link">Via Link</TabsTrigger>
					</TabsList>
					<FromSearch />
					<FromLink />
				</Tabs>
			</main>
		</div>
	);
}

export default App;
