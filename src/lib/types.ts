namespace TechLadder.Types {

    export interface Topic {
        name: string;
        description: string;
        resources: string[];
    }
    
    export type Filter = "technologies" | "disciplines";
    
    export interface Levels {
        [key: string]: Topic[];
    }
    
    export interface Contributor {
        name: string;
        contact: string;
    }
    
    export interface Props {
        theme: Theme,
        levels: Levels;
        notes: string[];
        contributors: Contributor[];
    }
    
    export interface Params {
        [key: string]: string;
    }
    
    export interface Theme {
        primaryColor: string;
    }
    
    export interface Technology {
        id: string;
        isDiscipline: boolean,
        isVisible: boolean;
        displayName: string;
        description: string;
    }
    
    export interface TopicProgress {
        [key: string]: boolean;
    }
    
    export interface Progress {
        [key: string]: TopicProgress;
    }

    export interface Element {
        html: string;
        events: EventDeclararion[];
    }

    export interface Component<TProps> {
        render(props: TProps): Promise<Element>;
    }

    export interface EventHandlers {
        [k: string]: (e: any) => void;
    }

    export interface NodeProps {
        [k: string]: any;
    }

    export interface EventDeclararion {
        selector: string;
        eventType: string;
        handler: (e: any) => void;
    }
    
}
