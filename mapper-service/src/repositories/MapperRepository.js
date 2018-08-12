/* @flow */
export type Schema = {
    [string]: string | Schema,
}

export type Mapper = {
    id: string,
    inputFormat: Schema,
    outputFormat: Schema
}

export interface MapperRepository {
    mappers: () => Array<Mapper>;
    mapperById: (string) => Mapper;
}
