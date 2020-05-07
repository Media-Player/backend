import Server from './Server'

const { NODE_ENV, PORT } = process.env
const server = new Server(NODE_ENV === 'development')

server.startServer(parseInt(PORT)).then(() => server.startSocket())
