
export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            groups: undefined;
            new: undefined;

            // aqui tipo passando um parametro, que no caso, a rota players
            // vai receber um group, que será uma string
            players: {
                group: string
            }
        }
    }
}