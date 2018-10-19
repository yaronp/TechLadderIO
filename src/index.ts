namespace TechLadder.App {

    export function run() {
        (async () => {
            const navigate = await TechLadder.Routing.initRouter();
            await navigate();
        })();
    }
}
