import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreateMediaTable1588886135010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({ name: 'medias' })

    const id = new TableColumn({
      generationStrategy: 'increment',
      isGenerated: true,
      isPrimary: true,
      name: 'id',
      type: 'int',
    })
    const name = new TableColumn({ isNullable: true, name: 'name', type: 'text' })
    const path = new TableColumn({ isNullable: false, name: 'path', type: 'text' })
    const type = new TableColumn({ enum: ['MUSIC', 'VIDEO'], name: 'type', type: 'enum' })
    const owner = new TableColumn({ isNullable: true, name: 'owner', type: 'text' })
    const playlistId = new TableColumn({ isNullable: false, name: 'playlistId', type: 'int' })
    const thumbnail = new TableColumn({ isNullable: true, name: 'thumbnail', type: 'text' })
    const createdAt = new TableColumn({ default: 'now()', name: 'createdAt', type: 'datetime' })
    const updatedAt = new TableColumn({ default: 'now()', name: 'updatedAt', onUpdate: 'NOW()', type: 'datetime' })

    table.columns.push(id)
    table.columns.push(name)
    table.columns.push(path)
    table.columns.push(type)
    table.columns.push(owner)
    table.columns.push(thumbnail)
    table.columns.push(playlistId)
    table.columns.push(createdAt)
    table.columns.push(updatedAt)

    const foreignKey = new TableForeignKey({
      columnNames: ['playlistId'],
      name: 'fk_medias_playlistId',
      referencedColumnNames: ['id'],
      referencedTableName: 'playlists',
    })

    await queryRunner.createTable(table)
    await queryRunner.createForeignKey(table.name, foreignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('medias')
  }
}
