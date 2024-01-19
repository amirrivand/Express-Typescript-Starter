import { Models, modelsDefinition } from './definitions';
import sequelize from './sequelize';

const models: any = {};

for (const model in modelsDefinition) {
    const defineModel = modelsDefinition[model as keyof Models];
    const Model = defineModel(sequelize);
    models[Model.name] = Model;
}

for (const modelName in models) {
    const Model = (models as Models)[modelName as keyof Models];
    if (Model.associate && typeof Model.associate === 'function') {
        Model.associate(models as Models);
    }
}

export default models as Models;
