namespace TechLadder.Pages.Ladder {

    const { div, style, img, h1, h4, table, tr, td, a, i, input } = TechLadder.Dom;

    interface LadderPageProps {
        data: TechLadder.Types.Props;
        tech: TechLadder.Types.Technology;
    }

    class LadderPage implements TechLadder.Types.Component<LadderPageProps> {
        async render(props: LadderPageProps) {
            const progress = await TechLadder.Storage.getProgress();
            const levels = Object.keys(props.data.levels);
            return div({}, [
                style({}, `
                    h1 {
                        color: ${props.data.theme.primaryColor};
                    }
    
                    a {
                        color: ${props.data.theme.primaryColor};
                    }
    
                    .level {
                        background-color: ${props.data.theme.primaryColor};
                        color: #ffffff;
                    }
                `),
                img({
                    class: "logo",
                    src: `./technologies/${props.tech.id}/${props.tech.id}.png`
                }),
                h1({}, `${props.tech.displayName} Progression Ladder`),
                h4({}, `
                    The ${props.tech.displayName} progression ladder is a grouping of
                    concepts and skills relevant to ${props.tech.displayName} programming.
                    It provides aspiring TypeScript programmers with a way to track
                    and improve their ${props.tech.displayName} skills.
                `),
                div({ class: "container" },
                    div({ class: "row" }, [
                        table({},
                            levels.map(level => [
                                tr({ class: "level" }, [
                                    td({ colspan: 4 }, (() => {
                                        switch (level) {
                                            case "novice":
                                                return "NOVICE";
                                            case "advanced_beginner":
                                                return "ADVANCED BEGINNER";
                                            case "competent":
                                                return "COMPETENT";
                                            case "proficient":
                                                return "PROFICIENT";
                                            case "expert":
                                                return "EXPERT";
                                            default:
                                                throw new Error(`Unknown level ${level}`);
                                        }
                                    })())
                                ]),
                                tr({ class: "level-subtitle" }, [
                                    td({}, "CONCEPTS"),
                                    td({}, "SKILLS"),
                                    td({}, "RESOURCES"),
                                    td({}, "COMPLETED")
                                ]),
                                ...props.data.levels[level].map((topic, topicIndex) => {
                                    return tr({
                                        class: `topic ${topicIndex === level.length -1 ? "last" : ""}`
                                    }, [
                                        td({}, topic.name),
                                        td({}, topic.description),
                                        td({},
                                            [
                                                ...topic.resources.map(resource => {
                                                    return a(
                                                        {
                                                            href: resource,
                                                            target: "_blank",
                                                            "data-toggle": "tooltip",
                                                            "data-placement": "left",
                                                            title: resource
                                                        },
                                                        i({ class: "material-icons" }, "link"),
                                                        {
                                                            click: (e)  => this._internalLinkClickHandler(e)
                                                        }
                                                    );
                                                })
                                            ]
                                        ),
                                        td({},
                                            input(
                                                {
                                                    class: "completed_checkbox",
                                                    type: "checkbox",
                                                    name: `${props.tech.id}_${topic.name}`,
                                                    "data-lang": props.tech.id,
                                                    "data-topic": topic.name,
                                                    value: "true",
                                                    ...(progress[props.tech.id] && progress[props.tech.id][topic.name]) ?
                                                        { checked: "checked" } : {}
                                                },
                                                undefined,
                                                {
                                                    change: (e) => this._completedCheckboxChangeHandler(e)
                                                }
                                            )
                                        )
                                    ]);
                                })
                            ])
                        ),
                        ...props.data.notes.map(n => div({ class: "note" }, n))
                    ])
                ),
                div({ class: "copyright" }, [
                    "This guide was created by ",
                    ...props.data.contributors.map((contributor, index) => {
                        const link = a({ href: contributor.contact }, contributor.name);
                        return (index !== 1 && props.data.contributors.length > 1) ? `| ${link}` : link;
                    }),
                    " and it is licensed under ",
                    a({
                        href: "https://creativecommons.org/licenses/by/4.0/",
                        title: "Creative Commons Attribution 4.0 International license"
                    },
                        "Creative Commons Attribution 4.0 International"
                    )
                ])
            ]);
        }

        private _completedCheckboxChangeHandler(e: any) {
            (async () => {
                const currentTarget = e.currentTarget;
                const data = currentTarget.data();
                const isChecked = currentTarget.is(":checked");
                await TechLadder.Storage.setProgress(data.lang, data.topic, isChecked);
            })();
        }

        private _internalLinkClickHandler(e: any) {
            e.preventDefault();
            const currentTarget = e.currentTarget;
            const href = currentTarget.attr("href");
            history.pushState({}, document.title, href);
        }

    }

    export const ladderPage = new LadderPage();

}
