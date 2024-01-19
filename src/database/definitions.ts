
export const modelsDefinition = {
    
};

export type Models = {
    [Property in keyof typeof modelsDefinition]: ReturnType<
        (typeof modelsDefinition)[Property]
    >;
};
