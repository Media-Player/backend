import { Field, Int, ObjectType } from 'type-graphql'

import { Attribute, buildModelAttrs, OnlyProperties } from '@general/ModelStructure'

@ObjectType()
class Playlist {
  @Field(() => Int)
  @Attribute
  id: number

  @Field()
  @Attribute
  date: string

  constructor(attrs: OnlyProperties<Playlist> = {}) {
    buildModelAttrs(this, attrs)
  }
}

export default Playlist
