import { $ } from "bun";
import chokidar from "chokidar";
import FiveServer from "five-server";

async function doExport(): Promise<void> {
	await $`bun export`;
}

async function main() {
	await doExport();

	chokidar
		.watch(["./src/theme", "./data"], {
			ignoreInitial: true,
		})
		.on("all", async (event, path) => {
			console.log(`${event.padStart(10, " ")}: ${path}`);
			doExport();
		});

	new FiveServer().start({
		open: false,
		root: "./public",
		watch: ["./public"],
		port: 3000,
		cache: false,
	});
}

main();
