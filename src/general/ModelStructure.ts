type Pick<Clazz, Key extends keyof Clazz> = { [Property in Key]?: Clazz[Property] }
type WithoutMethodKeys<T> = { [P in keyof T]: T[P] extends Function ? never : P }[keyof T]

type Relationships = { [key: string]: Construtable<any> }

export interface Construtable<T> {
  new (...args: any[]): T
}

export type OnlyProperties<T> = Pick<T, WithoutMethodKeys<T>>

interface Target extends Object {
  attributes?: PropertyKey[]
  cumputedProperties?: PropertyKey[]
  relationships?: Relationships
}

export function Relationship<Clazz extends Target>(model: Construtable<Clazz>) {
  return function(target: Target, propertyKey: string) {
    target.relationships = target.relationships || {}
    target.relationships[propertyKey] = model
  }
}

export function Computed<Clazz extends Target>(target: Clazz, propertyKey: PropertyKey) {
  target.cumputedProperties = target.cumputedProperties || []
  target.cumputedProperties.push(propertyKey)
}

export function Attribute<Clazz extends Target>(target: Clazz, propertyKey: PropertyKey) {
  target.attributes = target.attributes || []
  target.attributes.push(propertyKey)
}

export function buildModelAttrs<Clazz extends Target>(instance: Clazz, attrs: OnlyProperties<Clazz>) {
  const { attributes = [], cumputedProperties = [], relationships = {} } = instance

  Object.keys(attrs).forEach(key => {
    if (attributes.includes(key)) instance[key] = attrs[key]
    if (relationships[key]) {
      const Relationship = relationships[key]

      if (Array.isArray(attrs[key])) instance[key] = attrs[key].map(attr => new Relationship(attr)) || []
      else instance[key] = new Relationship(attrs[key])
    }
  })

  cumputedProperties.forEach(propertyKey => instance[propertyKey](attrs, instance))

  return instance
}
