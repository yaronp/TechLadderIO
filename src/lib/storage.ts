namespace TechLadder.Storage {

    const localStorageKey = "__@@__user_progress";

    export async function getProgress(): Promise<TechLadder.Types.Progress> {
        if (localStorage) {
            const progressJson = localStorage.getItem(localStorageKey);
            if (progressJson) {
                const progress: TechLadder.Types.Progress = JSON.parse(progressJson);
                return Promise.resolve(progress);
            } else {
                const defaultValue = {};
                const defaultValueJson = JSON.stringify(defaultValue);
                localStorage.setItem(localStorageKey, defaultValueJson);
                return Promise.resolve(defaultValue);
            }
        }
        return Promise.reject();
    }

    export async function setProgress(technologyId: string, topic: string, completed: boolean) {
        const progress = await getProgress();
        if (progress) {
            if (progress[technologyId] === undefined) {
                progress[technologyId] = {
                    [topic]: completed
                };
            } else {
                progress[technologyId][topic] = completed;
            }
            const progressJson = JSON.stringify(progress);
            localStorage.setItem(localStorageKey, progressJson);
            return Promise.resolve(progress);
        }
        return Promise.reject();
    }

}
