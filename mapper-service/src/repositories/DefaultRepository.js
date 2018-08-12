/* @flow */
import type { Mapper, MapperRepository } from './MapperRepository';
import type { Mapping, MappingRepository } from './MappingRepository';

type MapperStorage = {
    [id: string]: Mapper,
}

type MappingStorage = {
    [id: string]: Array<Mapping>,
}

export const mapperStorage: MapperStorage = {
    vega: {
        id: 'vega',
        inputFormat: {
            shizzle: {
                leet: 'number',
            },
        },
        outputFormat: {
            cool: 'number',
        },
    },
    betelgeuse: {
        id: 'betelgeuse',
        inputFormat: {
            transportation: {
                type: 'string',
                topSpeed: 'number',
            },
            nrPassengers: 'number',
            departure: 'date',
            arrival: 'date',
        },
        outputFormat: {
            vehicle: 'string',
            arrival: 'date',
            travellers: 'number',
        },
    },
    alnilam: {
        id: 'alnilam',
        inputFormat: {
            age: 'number',
            distances: {
                earth: 'number',
                betelgeuse: 'number',
            },
        },
        outputFormat: {
            objectDistances: {
                earth: 'number',
                betelgeuse: 'number',
            },
        },
    },
};

export const mappingStorage: MappingStorage = {
    vega: [],
    betelgeuse: [],
    alnilam: [{ from: 'distances.earth', to: 'objectDistances.earth' }],
};

class DefaultRepository implements MapperRepository, MappingRepository {
    mappers = () => Object.keys(mapperStorage).map((mapperId) => mapperStorage[mapperId]);

    mapperById = (id: string) => mapperStorage[id];

    mappings = (mapperId: string) => mappingStorage[mapperId];

    addOrReplaceMapping = (mapperId: string, mapping: Mapping) => {
        this.removeMapping(mapperId, mapping.to);

        mappingStorage[mapperId] = [...mappingStorage[mapperId], mapping];
    }

    removeMapping = (mapperId: string, to: string) => {
        mappingStorage[mapperId] = mappingStorage[mapperId].filter((mapping) => mapping.to !== to);
    }
}

export default DefaultRepository;
