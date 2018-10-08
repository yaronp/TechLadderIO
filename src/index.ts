interface Topic {
    name: string;
    description: string;
    resources: string[];
}

interface Level {
    name: string;
    topics: Topic[];
}

interface Promo {
    title: string;
    p1: string;
    p2: string;
    p3: string;
}

interface Copyright {
    p1: string;
    p2: string;
}

interface Props {
    title: string;
    subtitle: string;
    levels: Level[];
    notes: string[];
    promo: Promo;
    copyright: Copyright;
}

function getUrl() {
    const lang = getLang();
    return `./data/data.${lang}.json`;
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
            <h1>${props.promo.title}</h1>
            <p>
                ${props.promo.p1} <b>Learning TypeScript 2.x (2nd edition)</b> ${props.promo.p2}
            </p>
            <a href="http://www.learningtypescript.com/">
                <img src="./assets/book.png"/>
            </a>
            <p>
                ${props.promo.p3} <a href="http://www.learningtypescript.com/">www.learningtypescript.com</a>
            </p>
        </div>
        <div class="copyright">
            Copyright &copy; 2018 <a href="https://twitter.com/RemoHJansen">Remo H. Jansen</a>.
            ${props.copyright.p1}
            <a
                href="https://github.com/remojansen/TSPL/blob/master/LICENSE"
            >MIT</a>.
            <br/>
            ${props.copyright.p2}
            <a
                href="https://creativecommons.org/licenses/by/4.0/"
                title="Creative Commons Attribution 4.0 International license"
            >Creative Commons Attribution 4.0 International<a>.
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

function getLang() {
    /*
        At the moment we only support one language
        but people can contribute more language by
        submmiting new data files. Once a new file
        is created we need to add an entry here. 
    */
    const supportedLang = [ "en" ];
    const defaultLang = supportedLang[0];
    const raw = navigator.language.split("-");
    const lang = raw[0];
    if (supportedLang.indexOf(lang) !== -1) {
        return lang;
    } else {
        return defaultLang;
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
