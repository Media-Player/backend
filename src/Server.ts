import { Server as ExpressServer } from '@overnightjs/core'
import bodyParser from 'body-parser'
import 'express-async-errors'
import fileUpload from 'express-fileupload'
import ExpressGraphql from 'express-graphql'
import { Server as HTTPServer } from 'http'
import path from 'path'
import SocketIO, { Server as IOServer, Socket as IOSocket } from 'socket.io'
import { buildSchema } from 'type-graphql'

import Database from '@database/Database'

import { Event } from '@enums/Event'

import DIContainer from '@src/ioc'
import TYPES from '@src/ioc/types'

import errorMiddleware from '@middlewares/error'

import PlaylistController from '@modules/playlist/PlaylistController'
import PlaylistResolver from '@modules/playlist/PlaylistResolver'
import PlaylistService from '@modules/playlist/PlaylistService'

import MediaController from '@modules/media/MediaController'

import EmitService from '@modules/socket/EmitService'
import ListennerService from '@modules/socket/ListennerService'

class Server extends ExpressServer {
  private server: HTTPServer
  private io: IOServer

  constructor(showLogs: boolean) {
    super(showLogs)

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    )
  }

  async setup() {
    const database = DIContainer.get<Database>(TYPES.Database)

    await database.init()
    // await this.setupGraphql()
    this.setupControllers()

    this.app.use(errorMiddleware)
  }

  async startServer(port: number) {
    await this.setup()

    this.server = this.app.listen(port, () => process.stdout.write(`Server listening on port: ${port}\n`))
    this.server.setTimeout(10000)
  }

  async startSocket() {
    const emitService = DIContainer.get<EmitService>(TYPES.EmitService)
    const listennerService = DIContainer.get<ListennerService>(TYPES.ListennerService)
    const playlistService = DIContainer.get<PlaylistService>(TYPES.PlaylistService)

    this.io = SocketIO(this.server)

    this.io.sockets.on(Event.CONNECTION, async (socket: IOSocket) => {
      emitService.setSocket(socket)
      listennerService.setSocket(socket)
      listennerService.startListenners()

      const list = await playlistService.find()
      emitService.listPlaylist(list)
    })
  }

  private setupControllers() {
    const playlistController = DIContainer.get<PlaylistController>(TYPES.PlaylistController)
    const mediaController = DIContainer.get<MediaController>(TYPES.MediaController)

    super.addControllers([playlistController, mediaController])
  }

  private async setupGraphql() {
    const playlistResolver = DIContainer.get(PlaylistResolver)

    const schema = await buildSchema({
      container: DIContainer,
      emitSchemaFile: path.join('dist', 'src', 'schema.gql'),
      resolvers: [playlistResolver as any],
    })
    const graphql = ExpressGraphql({ graphiql: true, schema })

    this.app.use('/graphql', graphql)
  }
}

export default Server
