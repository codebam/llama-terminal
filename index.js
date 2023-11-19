import EventSource from "eventsource";

const llama2 = async (prompt) => {
	const url = new URL("https://broad-pine-2.codebam.workers.dev");
	url.searchParams.set("q", prompt);
	const source = new EventSource(url.toString());
	source.onmessage = (event) => {
		if (event.data == "[DONE]") {
			source.close();
			console.log("\n");
			return;
		}
		const data = JSON.parse(event.data);
		process.stdout.write(data.response);
	};
};

if (process.argv[1]) {
	const line = process.argv.slice(2).join(" ");
	llama2(line);
}
