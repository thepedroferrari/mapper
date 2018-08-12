/* @flow */

export type Schema = {
    [string]: string | Schema,
};

export type Path = string

export type Mapping = {
	from: Path,
	to: Path
}
