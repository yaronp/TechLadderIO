namespace TechLadder.Routing {

    export async function initRouter() {
    
        const root = "#main";
    
        // Fetch list of technologies
        const technologies = await TechLadder.Fetch.fetchTechnologies();
    
        const navigate = async () => {
            try {
    
                // Get params from URL
                const params = TechLadder.Url.getParams();
        
                // Get tech ID from URL
                const techId = TechLadder.Url.getTech(params);
                
                let html = "";
                
                if (techId === undefined) {
    
                    // Get filter from URL
                    const filter = TechLadder.Url.getFilter(params);
        
                    // Render home if no tech ID in URL
                    await TechLadder.Dom.mount(
                        root,
                        TechLadder.Pages.Home.homePage,
                        {
                            filter,
                            technologies
                        }
                    );
                
                } else {
                    
                    if (technologies.find(t => t.id === techId) === undefined) {
        
                        // Render not found if invalid tech ID in URL
                        await TechLadder.Dom.mount(
                            root,
                            TechLadder.Pages.NotFound.errorPage,
                            { msg: "Sorry page not found!" }
                        );
            
                    } else {
            
                        // Render ladder if valid tech ID in URL
                        const data = await TechLadder.Fetch.fetchData(techId!);
                        const tech = technologies.find(t => t.id === techId);

                        await TechLadder.Dom.mount(
                            root,
                            TechLadder.Pages.Ladder.ladderPage,
                            {
                                data: data,
                                tech: tech!
                            }
                        );
            
                    }
                }
        
            } catch(e) {
                await TechLadder.Dom.mount(
                    root,
                    TechLadder.Pages.NotFound.errorPage,
                    { msg: e.message }
                );
            }
        };
    
        const _pushState = window.history.pushState;
    
        history.pushState = function() {
            _pushState.apply(window.history, arguments);
            (async () => {
                await navigate();
            })();
        };
        
        return navigate;
    }

}
