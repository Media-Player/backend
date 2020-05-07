import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import Media from './Media'

@Entity({ name: 'playlists' })
class Playlist {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'date' })
  date: string

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date

  @OneToMany(
    () => Media,
    media => media.playlist
  )
  medias: Media[]
}

export default Playlist
