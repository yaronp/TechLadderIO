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

function getUrl() {
    return "./data/data.en.json";
}

async function fetchData(): Promise<Props> {
    const url = getUrl();
    const response = await fetch(url, {
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
        <div class="promo">
            <h1>Would you like to learn more?</h1>
            <p>
                Check out my new book <b>Learning TypeScript 2.x</b> (Second edition)
                to learn everything in the preceding list and more from a single source!
                Available now at all major retailers!
            </p>
            <a href="http://www.learningtypescript.com/">
                <img src="./assets/book.png"/>
            </a>
            <p>
                Learn more at
                <a href="http://www.learningtypescript.com/">www.learningtypescript.com</a>
            </p>
        </div>
        <div class="copyright">
            Copyright &copy; 2018 <a href="https://twitter.com/RemoHJansen">Remo H. Jansen</a>.
            Code licensed under
            <a
                href="https://github.com/remojansen/TSPL/blob/master/LICENSE"
            >the MIT license</a>.
            <br/>
            Content licensed under the
            <a
                href="https://creativecommons.org/licenses/by/4.0/"
                title="Creative Commons Attribution 4.0 International license"
            >the Creative Commons Attribution 4.0 International license<a>.
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
        const data = await fetchData();
        const html = renderContent(data);
        mount(root, html);
    } catch(e) {
        const html = renderError(e.message);
        mount(root, html);
    }
})();
