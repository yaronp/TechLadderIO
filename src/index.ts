interface Topic {
    name: string;
    description: string;
    resources: string[];
}

interface Level {
    name: string;
    topics: Topic[];
}

interface Contributor {
    name: string;
    contact: string;
}

interface Props {
    theme: Theme,
    levels: Level[];
    notes: string[];
    contributors: Contributor[];
}

interface Params {
    [key: string]: string;
}

interface Theme {
    primaryColor: string;
}

interface Technology {
    id: string;
    displayName: string;
    description: string;
}

function getParams(): Params {
    const search = window.location.search;
    if (search) {
        const paramsStr = search.split("?")[1];
        if (paramsStr) {
            const rawParams = paramsStr.split("&");
            const params: Params = rawParams.reduce((prev, curr) => {
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

function getTech(): string | undefined {
    const params = getParams();
    const tech = params["tech"];
    return tech;
}

function getUrl(tech: string) {
    if (tech !== undefined) {
        return `./technologies/${tech}/${tech}.json`;
    }
    return "./technologies/technologies.json";
}

async function fetchTechnologies(): Promise<Technology[]> {
    const url = "./technologies/technologies.json";
    const response = await fetch(url, {
        method: "GET"
    });
    const data = await response.json();
    return data;
}

async function fetchData(tech: string): Promise<Props> {
    const url = getUrl(tech);
    const response = await fetch(url, {
        method: "GET"
    });
    const data = await response.json();
    return data;
}

function renderContent(props: Props, tech: Technology) {
    return `
        <style>
            h1 {
                color: ${props.theme.primaryColor};
            }

            a {
                color: ${props.theme.primaryColor};
            }

            .level {
                background-color: ${props.theme.primaryColor};
                color: #ffffff;
            }
        </style>
        <img class="logo" src="./technologies/${tech.id}/${tech.id}.png" />
        <h1>
            ${tech.displayName} Progression Ladder
        </h1>
        <h4>
            The ${tech.displayName} progression ladder is a grouping of concepts and skills relevant to ${tech.displayName} programming.
            It provides aspiring TypeScript programmers with a way to track and improve their ${tech.displayName} skills.
        </h4>
        <table>
            ${
                props.levels.map(l => `
                    <tr class="level">
                        <td colspan="3">${l.name}</td>
                    </tr>
                    <tr class="level-subtitle">
                        <td>CONCEPTS</td>
                        <td>SKILLS</td>
                        <td>RESOURCES</td>
                    </tr>
                    ${
                        l.topics.map((t, i) => `
                            <tr class="topic ${i === l.topics.length -1 ? "last" : ""}">
                                <td>
                                    ${t.name}
                                </td>
                                <td>
                                    ${t.description}
                                </td>
                                <td>
                                    ${
                                        t.resources.map(r => `
                                            <a
                                                href="${r}"
                                                target="_blank"
                                                title="${r}"
                                            >
                                                <i class="material-icons">link</i>
                                            </a>
                                        `).join("")
                                    }
                                </td>
                            </tr>
                        `).join("")
                    }
                `).join("")
            }
        <table>
        ${
            props.notes.map(n => `
                <div class="note">${n}</div>
            `).join("")
        }
        <div class="copyright">
            This guide was created by
            ${props.contributors.map((contributor, index) => {
                if (props.contributors.length === 1 || index === 0) {
                    return `
                        <a href="${contributor.contact}">
                            ${contributor.name}
                        </a>
                    `;
                } else if (index > 0 && index < props.contributors.length -1) {
                    return `, <a href="${contributor.contact}">${contributor.name}</a>`;
                } else {
                    return `and <a href="${contributor.contact}">${contributor.name}</a>`;
                }
            }).join("")}
            and it is licensed under
            <a
                href="https://creativecommons.org/licenses/by/4.0/"
                title="Creative Commons Attribution 4.0 International license"
            >Creative Commons Attribution 4.0 International<a>.
        </div>
    `;
}

function renderHome(technologies: Technology[]) {
    technologies = technologies.sort((a, b) => a.displayName.localeCompare(b.displayName));
    return `
        <style>
            h1 {
                color: #f7a80d;
            }

            a {
                color: #f7a80d;
            }

            .level {
                background-color: #f7a80d;
                color: #ffffff;
            }
        </style>
        <img class="logo" src="./assets/logo.png" />
        <h1>Tech Ladder IO</h1>
        <h4>
            A community-driven grouping of concepts and skills relevant to different technologies
            that provides aspiring programmers with a way to track and improve their skills.
        </h4>
        <table>
            <tr class="level">
                <td>Technology</td>
                <td>Description</td>
                <td>Ladder</td>
            </tr>
            ${technologies.map(t => {
                return `
                    <tr class="topic">
                        <td>
                            <a href="/?tech=${t.id}">
                                <b>
                                    ${t.displayName}
                                </b>
                            </a>
                        </td>
                        <td>
                            ${t.description}
                        </td>
                        <td>
                            <a href="/?tech=${t.id}">
                                <i class="material-icons">link</i>
                            </a>
                        </td>
                    </tr>
                `;
            }).join("")}
        <table>
        <div class="promo">
            <h1>We need your help!</h1>
            <p>
                This is a community-driven project, please share your feedback and
                help us to improve it.<br>
                Please open an issue or send us a PR on <a href="https://github.com/remojansen/TechLadderIO">GitHub</a>!
            </p>
        </div>
    `;
}

function renderError(e: string) {
    return `${e}`;
}

function mount(selector: string, html: string) {
    const $e = document.querySelector(selector);
    if ($e) {
        $e.innerHTML = html;
    }
}

(async () => {
    const root = "#main";
    try {
        const techId = getTech();
        const technologies = await fetchTechnologies();
        let html = "";

        if (techId === undefined) {
            html = renderHome(technologies);
        } else if (technologies.find(t => t.id === techId) === undefined) {
            html = `
                Sorry page not found!
            `;
        } else {
            const data = await fetchData(techId!);
            const tech = technologies.find(t => t.id === techId);
            html = renderContent(data, tech!);
        }
        
        mount(root, html);

    } catch(e) {
        const html = renderError(e.message);
        mount(root, html);
    }
})();
