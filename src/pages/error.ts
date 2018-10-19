namespace TechLadder.Pages.NotFound {

    const { div } = TechLadder.Dom;

    interface ErrorPageProps {
        msg: string;
    }

    class ErrorPage implements TechLadder.Types.Component<ErrorPageProps> {
        async render(props: ErrorPageProps) {
            return div({}, props.msg);
        }
    }

    export const errorPage = new ErrorPage();

}
