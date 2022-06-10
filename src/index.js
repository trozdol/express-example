import express from 'express'
import { logger, notFound } from './middleware.js'
import { api } from './api.js'
import cors from 'cors'

export const server = express()

/**
 * All requests pass through here before getting
 * handled by other routers.
 *
 * Alt way to do it is like:
 * ```
 *  server.use(cors({ origin: '*' }), express.json(), logger)
 *
 * ```
 */
server.use(cors({ origin: '*' }))
server.use(express.json())
server.use(logger)

/**
 * server static files from this dir
 */
server.use('/', express.static('public'))

/**
 * mount the api router mostly a way to keep root
 * paths separate from api paths
 */
server.use('/api', api)

/**
 * catch all that don't match a uri
 */
server.use('*', notFound)

/**
 * Start the server and listen on port 3000
 */
server.listen(3000, '0.0.0.0')
