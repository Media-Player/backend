const path = require('path')

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env
const entitiesDir = 'src/database/entities'
const migrationsDir = 'src/database/migrations'
const subscribersDir = 'src/database/subscribers'

module.exports = {
  cli: { entitiesDir, migrationsDir, subscribersDir },
  database: DB_DATABASE,
  entities: [path.join(entitiesDir, '*.ts')],
  host: DB_HOST,
  logging: false,
  migrations: [path.join(migrationsDir, '*.ts')],
  password: DB_PASSWORD,
  port: DB_PORT,
  subscribers: [path.join(subscribersDir, '*.ts')],
  synchronize: false,
  type: 'mysql',
  username: DB_USER,
}
