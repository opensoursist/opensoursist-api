/* eslint typescript/no-namespace: 0 */
// https://github.com/Microsoft/TypeScript/issues/17736
export {};
// https://stackoverflow.com/q/12709074/2777142
declare global {
    interface Error {
        status?: number;
    }
}
