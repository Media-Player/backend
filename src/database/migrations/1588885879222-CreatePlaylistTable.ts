import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class CreatePlaylistTable1588885879222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({ name: 'playlists' })

    const id = new TableColumn({
      generationStrategy: 'increment',
      isGenerated: true,
      isPrimary: true,
      name: 'id',
      type: 'int',
    })
    const name = new TableColumn({ isNullable: true, name: 'name', type: 'text' })
    const date = new TableColumn({ name: 'date', type: 'date' })
    const createdAt = new TableColumn({ default: 'now()', name: 'createdAt', type: 'datetime' })
    const updatedAt = new TableColumn({ default: 'now()', name: 'updatedAt', onUpdate: 'NOW()', type: 'datetime' })

    table.columns.push(id)
    table.columns.push(name)
    table.columns.push(date)
    table.columns.push(createdAt)
    table.columns.push(updatedAt)

    await queryRunner.createTable(table)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('playlists')
  }
}
