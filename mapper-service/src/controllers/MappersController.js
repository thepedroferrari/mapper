/* @flow */
import type { MapperRepository } from '../repositories/MapperRepository';

class MappersController {
    mapperRepository: MapperRepository;

    constructor(mapperRepository: MapperRepository) {
        this.mapperRepository = mapperRepository;
    }

    all = (request: any, response: any) => {
        response.status(200);
        response.json(this.mapperRepository.mappers());
    }
}

export default MappersController;
