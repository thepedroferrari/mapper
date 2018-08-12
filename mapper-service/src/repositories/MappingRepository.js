/* @flow */
export type Mapping = {
    from: string,
    to: string,
};

export interface MappingRepository {
    mappings: (mapperId: string) => Array<Mapping>;
    addOrReplaceMapping: (mapperId: string, mapping: Mapping) => void;
    removeMapping: (mapperId: string, to: string) => void;
}
