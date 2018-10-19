namespace TechLadder.Url {

    export function getParams(): TechLadder.Types.Params {
        const search = window.location.search;
        if (search) {
            const paramsStr = search.split("?")[1];
            if (paramsStr) {
                const rawParams = paramsStr.split("&");
                const params: TechLadder.Types.Params = rawParams.reduce((prev, curr) => {
                    const raw = curr.split("=");
                    return {
                        ...prev,
                        ...{
                            [raw[0]]: raw[1]
                        }
                    }
                }, {});
                return params;
            }
        }
        return {};
    }
    
    export function getTech(params: TechLadder.Types.Params): string | undefined {
        const tech = params["tech"];
        return tech;
    }
    
    export function getFilter(params: TechLadder.Types.Params): TechLadder.Types.Filter | undefined {
        const filter = params["filter"] as (TechLadder.Types.Filter | undefined);
        return filter;
    }

    export function getUrl(tech?: string) {
        if (tech !== undefined) {
            return `./technologies/${tech}/${tech}.json?cache=${new Date().getTime()}`;
        }
        return `./technologies/technologies.json?cache=${new Date().getTime()}`;
    }

}
