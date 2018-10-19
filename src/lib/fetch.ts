namespace TechLadder.Fetch {

    export async function fetchTechnologies(): Promise<TechLadder.Types.Technology[]> {
        const url = TechLadder.Url.getUrl();
        const response = await fetch(url, {
            method: "GET"
        });
        const data = await response.json();
        return data;
    }
    
    export async function fetchData(tech: string): Promise<TechLadder.Types.Props> {
        const url = TechLadder.Url.getUrl(tech);
        const response = await fetch(url, {
            method: "GET"
        });
        const data = await response.json();
        return data;
    }

}
