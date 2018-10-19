namespace TechLadder.Pages.Home {

    const { style, div, img, h1, h4, a, p, br, table, tr, td, i, b } = TechLadder.Dom;

    interface HomePageProps {
        filter: TechLadder.Types.Filter | undefined;
        technologies: TechLadder.Types.Technology[];
    }

    class HomePage implements TechLadder.Types.Component<HomePageProps> {

        async render(props: HomePageProps) {

            const technologies = props.technologies.sort((a, b) => a.displayName.localeCompare(b.displayName))
                                      .filter(t => t.isVisible);

            return div({},
                [
                    style({},
                        `
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
                        `
                    ),
                    img({ class: "logo", src: "./assets/logo.png" }),
                    h1({}, "Tech Ladder IO"),
                    h4({},
                        `
                            A community-driven grouping of concepts and skills relevant to different technologies
                            that provides aspiring programmers with a way to track and improve their skills.
                        `
                    ),
                    div({ class: "container"},
                        div({ class: "row"}, [
                            div({ class: "nav nav-pills flex-column flex-sm-row"},
                                [
                                    a(
                                        {
                                            href: "/",
                                            class: "internal_link text-white bg-warning flex-sm-fill text-sm-center nav-link"
                                        },
                                        "All",
                                        {
                                            click: (e: any) => this._internalLinkClickHandler(e)
                                        }
                                    ),
                                    a(
                                        {
                                            href: "/?filter=technologies",
                                            class: "internal_link text-white bg-warning flex-sm-fill text-sm-center nav-link"
                                        },
                                        "Technologies",
                                        {
                                            click: (e: any) => this._internalLinkClickHandler(e)
                                        }
                                    ),
                                    a(
                                        {
                                            href: "/?filter=disciplines",
                                            class: "internal_link text-white bg-warning flex-sm-fill text-sm-center nav-link"
                                        },
                                        "Disciplines",
                                        {
                                            click: (e: any) => this._internalLinkClickHandler(e)
                                        }
                                    )
                                ]
                            ),
                            table({}, [
                                tr({ class:"level" }, [
                                    td({}, "Technology"),
                                    td({}, "Description"),
                                    td({}, "Ladder")
                                ]),
                                ...technologies.map(t => {
                                    return tr({ class: "topic" }, [
                                        td({},
                                            a(
                                                {
                                                    class: "internal_link",
                                                    href: `/?tech=${t.id}`
                                                },
                                                b({}, t.displayName)
                                            )
                                        ),
                                        td({}, t.description),
                                        td({},
                                            a(
                                                {
                                                    class: "internal_link",
                                                    href: `/?tech=${t.id}`,
                                                    title: t.displayName,
                                                    "data-toggle": "tooltip",
                                                    "data-placement": "left"
                                                },
                                                i({ class: "material-icons" }, "link"),
                                                {
                                                    click: (e)  => this._internalLinkClickHandler(e)
                                                }
                                            )
                                        )
                                    ])
                                })
                            ])
                        ])
                    ),
                    div({ class: "promo"},
                        [
                            h1({}, "We need your help!"),
                            p({}, [
                                "This is a community-driven project, please share your feedback and help us to improve it.",
                                br({}),
                                "Please open an issue or send us a PR on ",
                                a({ href: "https://github.com/remojansen/TechLadderIO" }, "GitHub"),
                                "!"
                            ])
                        ]
                    )
                ]
            );

        }

        private _internalLinkClickHandler(e: any) {
            e.preventDefault();
            const currentTarget = e.currentTarget;
            const href = currentTarget.attr("href");
            history.pushState({}, document.title, href);
        }

    }

    export const homePage = new HomePage();

}
