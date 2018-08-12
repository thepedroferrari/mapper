/* @flow */
import type { MapperRepository } from '../repositories/MapperRepository';
import type { MappingRepository } from '../repositories/MappingRepository';

class MappingsController {
    mapperRepository: MapperRepository;
    mappingRepository: MappingRepository;

    constructor(mapperRepository: MapperRepository, mappingRepository: MappingRepository) {
        this.mapperRepository = mapperRepository;
        this.mappingRepository = mappingRepository;
    }

    all = (request: any, response: any) => {
        const { mapperId } = request.params;
        const mappings = this.mappingRepository.mappings(mapperId);
        if (!mappings) {
            response.status(404);
            response.json({ error: ':unknown-mapper' });
            return;
        }

        response.status(200);
        response.json(mappings);
    };

    validateProperty = (propertyPath: Array<string>, dataFormat: any) => {
        const nextProperty = dataFormat[propertyPath[0]];
        if (typeof nextProperty !== 'object' || propertyPath.length === 1) {
            return nextProperty;
        }

        return this.validateProperty(propertyPath.slice(1), nextProperty);
    };

    set = (request: any, response: any) => {
        const { mapperId, id } = request.params;
        const { from } = request.body;
        const to = id.replace(/-/g, '.');

        const mapper = this.mapperRepository.mapperById(mapperId);
        if (!mapper || !this.validateProperty(to.split('.'), mapper.outputFormat)) {
            response.status(404);
            response.json({ error: (!mapper ? ':unknown-mapper' : ':unknown-output-format-property') });
            return;
        }

        if (!from || !this.validateProperty(from.split('.'), mapper.inputFormat)) {
            response.status(422);
            response.json({ error: ':unknown-input-format-property' });
            return;
        }

        this.mappingRepository.addOrReplaceMapping(mapperId, { from, to });

        response.status(204).send();
    };

    remove = (request: any, response: any) => {
        const { mapperId, id } = request.params;
        const to = id.replace(/-/g, '.');

        const mapper = this.mapperRepository.mapperById(mapperId);
        if (!mapper || !this.validateProperty(to.split('.'), mapper.outputFormat)) {
            response.status(404);
            response.json({ error: (!mapper ? ':unknown-mapper' : ':unknown-output-format-property') });
            return;
        }

        this.mappingRepository.removeMapping(mapperId, to);

        response.status(204).send();
    };
}

export default MappingsController;
