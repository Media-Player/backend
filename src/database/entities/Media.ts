import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { MediaType } from '../../enums/MediaType'

import Playlist from './Playlist'

@Entity({ name: 'medias' })
class Media {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  path: string

  @Column({ enum: MediaType, type: 'enum' })
  type: MediaType

  @Column()
  owner: string

  @Column()
  thumbnail: string

  @Column()
  playlistId: number

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date

  @ManyToOne(
    () => Playlist,
    playlist => playlist.medias
  )
  playlist: Playlist
}

export default Media
