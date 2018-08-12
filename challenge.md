# The Mapper Challenge
Our customers often require the ability to map data between different types, from one class to another. Rather than requiring them do this manually in code, we want to give them the possibility to do this graphically drag-n-drop-style to make this easy also for non-coders. The task is to create a React component which provides this functionality, and integrate it a surrounding system.

As hinted, in addition to the component, we want you store its state using Redux with necessary actions to update it (typically adding/removing mappings). Furthermore, this all means nothing unless the changes are actually stored somewhere between page refreshes. Therefore, we want you to integrate with an API (and perhaps use some sweet redux-sagas). Or some other way that gets the job done in a nicely asynchronous fashion!

## Requirements
Through the API, a list of *mappers* can be found and that the user should be able to update. Perhaps, the "active" mapper is simply selected through a dropdown.

The graphical view of the component can be a very simple thing and really needn't be drag-n-drop for the sake of this task. The only requirement is that we are presented with the input and output formats, and in a simple manner can create a mapping from one property in the input format, to a property in the output format. Mappings must also be shown visually, and we must be able to remove a mapping.

We describe the contract of the wished-for React component below, but leave the looks of the rest to you!

We provide a skeleton react app (setup with create-react-app) exists in *./mapper-app* to get you going. A service for to integrate with for retrieving and storing mappers and mappings can be found in *./mapper-service*. It's API is described in the swagger.yaml-file.

## The React Component
Below is a description of the components required interface as props, as well as needed type-definitions.
```
{
    inputFormat: Schema,
    outputFormat: Schema,
    add: (MappingEvent) => void,
    remove: (MappingEvent) => void
}
```

A *Schema* represent a data type.
```
type Schema {
	[string]: string|Schema
}
```

A *Mapping* represents a mapping for the property at `from` to another property at `to`.
```
type Mapping {
	from: Path,
	to: Path
}
```

*Path* is a dot-separated path for referencing possibly nested properties.
```
type Path = string
```

### Examples
Consider the following models:
```
Spaceship: {
	model: 'string',
	engine: {
		model: 'string',
		power: 'int'
	}
	maxSpeed: 'int'
}
```
```
Vehicle: {
	model: 'string',
	power: 'int',
	topSpeed: 'int'
}
```

Example of mappings from Spaceship -> Veichle:
```
'model' => 'model'
'power' => 'engine.power'
'topSpeed' => 'maxSpeed'
```

When given the following Spaceship:
```
{
	model: 'interstellar-spaceship-1337',
	engine: {
		model: 'YOLO-300',
		power: 9048
	},
	maxSpeed: 247947
}
```

the mappings above would yield the following Veichle:
```
{
	model: 'interstellar-spaceship-1337',
	power: 9048,
	topSpeed: 247947
}
```
