namespace TechLadder.Dom {

    type ElementOrString = TechLadder.Types.Element | string;
    type Child = ElementOrString | (ElementOrString[]) | (ElementOrString[][]);

    function node(tag: string) {
        return function (
            props: TechLadder.Types.NodeProps,
            child?: Child,
            events?: TechLadder.Types.EventHandlers
        ): TechLadder.Types.Element {

            // Render HTML attributes
            const guid = TechLadder.UUID.guid();
            const _props: TechLadder.Types.NodeProps = {
                ...props, 
                ...{ uuid: guid }
            };
            const propKeys = Object.keys(_props);
            const attrs = propKeys.map(k => `${k}="${_props[k]}" `).join("");

            // Create event references
            let eventDeclararions: TechLadder.Types.EventDeclararion[] = [];
            if (events) {
                const eventKeys = Object.keys(events);
                eventDeclararions = eventKeys.map(eventKey => {
                    return {
                        selector: `[uuid='${guid}']`,
                        eventType: eventKey,
                        handler: events[eventKey]
                    };
                });
            }

            const renderElementOrString = (child: ElementOrString) => {
                if (typeof child === "string") {
                    return child;
                } else {
                    eventDeclararions = [
                        ...eventDeclararions,
                        ...child.events
                    ];
                    return child.html;
                }
            }

            // Render HTML attributes
            let html = "";
            if (!child) {
                html = `<${tag} ${attrs} />`;
            } else {
                html = `
                    <${tag} ${attrs}>
                        ${
                            ((): string => {
                                if (Array.isArray(child)) {
                                    if (Array.isArray(child[0])) {
                                        const _child: ElementOrString[][] = child as any;
                                        return _child.map(
                                            a => a.map(
                                                c => renderElementOrString(c)
                                            ).join("")
                                        ).join("");
                                    } else {
                                        const _child: ElementOrString[] = child as any;
                                        return _child.map(c => renderElementOrString(c)).join("");
                                    }
                                } else {
                                    return renderElementOrString(child);
                                }
                            })()
                        }
                    </${tag}>
                `;
            }

            return {
                html,
                events: eventDeclararions
            };
            
        }
    }

    export const div = node("div");
    export const img = node("img");
    export const h1 = node("h1");
    export const h4 = node("h4");
    export const a = node("a");
    export const p = node("p");
    export const br = node("br");
    export const tr = node("tr");
    export const td = node("td");
    export const i = node("i");
    export const b = node("b");
    export const input = node("input");
    export const table = node("table");
    export const style = node("style");

    export async function mount<T>(
        selector: string,
        component: TechLadder.Types.Component<T>,
        props: T
    ) {
        const $e = document.querySelector(selector);
        if ($e) {

            const { html, events } = await component.render(props);

            // Append DOM
            $e.innerHTML = html;

            // Add event listeners
            events.forEach(event => {
                const element = document.querySelector(event.selector);
                if (element) {
                    element.addEventListener(event.eventType, event.handler);
                }
            });
        }
    }

}
