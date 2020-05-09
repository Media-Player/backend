import { MediaType } from '@enums/MediaType'

import { Attribute, buildModelAttrs, OnlyProperties } from '@general/ModelStructure'

class Media {
  @Attribute
  id: number

  @Attribute
  name: string

  @Attribute
  path: string

  @Attribute
  type: MediaType

  @Attribute
  owner: string

  @Attribute
  thumbnail: string

  @Attribute
  playlistId: number

  constructor(attrs: OnlyProperties<Media> = {}) {
    buildModelAttrs(this, attrs)
  }
}

export default Media
