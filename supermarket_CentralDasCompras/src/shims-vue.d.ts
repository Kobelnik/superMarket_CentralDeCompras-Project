/***************************************/
/* Faz o ts reconhecer importações .vue*/
/***************************************/
declare module '*.vue' {
    import type {DefineComponent} from 'vue';
    const component: DefineComponent<{}, {}, ant>
    export default component
}