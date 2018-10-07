interface Topic {
    name: string;
    description: string;
    resources: string[];
}

interface Level {
    name: string;
    topics: Topic[];
}

interface Props {
    title: string;
    subtitle: string;
    levels: Level[],
    notes: string[]
}

async function fetchData(): Promise<Props> {
    const response = await fetch("./data/data.json", {
        method: "GET"
    });
    const data = await response.json();
    return data;
}

function renderContent(props: Props) {
    return `
        <img class="logo" src="./assets/ts.png" />
        <h1>${props.title}</h1>
        <h4>${props.subtitle}</h4>
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
        const data = await fetchData();
        const html = renderContent(data);
        mount(root, html);
    } catch(e) {
        const html = renderError(e.message);
        mount(root, html);
    }
})();
