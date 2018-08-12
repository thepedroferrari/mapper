import MappersController from './controllers/MappersController';
import MappingsController from './controllers/MappingsController';

export default (app, mapperRepository, mappingRepository) => {
    const mappersController = new MappersController(mapperRepository);
    const mappingsController = new MappingsController(mapperRepository, mappingRepository);

    app.route('/mappers')
        .get(mappersController.all);

    app.route('/mappers/:mapperId/mappings')
        .get(mappingsController.all);

    app.route('/mappers/:mapperId/mappings/:id')
        .put(mappingsController.set)
        .delete(mappingsController.remove);
};
