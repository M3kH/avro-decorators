import {
  AvroArray,
  AvroEnum,
  AvroMap,
  AvroRecord,
  AvroInt,
  AvroString,
  Record,
  AvroUnion,
} from '../../src/decorators'


const fruitTypes = ['berry', 'tropical'] as const
type FruitType = typeof fruitTypes[number]

@Record({
  description: 'An origin location',
  namespace: 'fruits.meta',
})
export class Origin {
  @AvroString({ fieldDoc: 'The continent the fruit is originally from' })
  continent: string
}

@Record()
class MyInlineRecord {}

@Record()
export class Fruit {
  @AvroInt()
  id: number

  @AvroString({ fieldDoc: 'The name of the fruit' })
  name: string

  @AvroRecord({ ofType: () => Origin, fieldDoc: 'The origin of the fruit' })
  origin: Origin

  @AvroEnum({ name: 'FruitType', symbols: fruitTypes })
  fruitType: FruitType

  @AvroArray({ ofType: 'string', fieldDefault: [] })
  flavours: string[]

  @AvroMap({ ofType: 'int' })
  inventory: Record<string, number>

  @AvroUnion({
    fieldDoc: 'An examplary union',
    // nullable: true
  }, [
    'string',
    'Fruit',
    { enum: { name: 'Letter', symbols: ['A', 'B', 'C'] }},
    { array: { items: 'string' }},
    { map: { values: 'string' }},
    { fixed: { size: 4, name: 'MyFixedThing' }},
    () => MyInlineRecord
  ])
  anything: null | string | any
}
