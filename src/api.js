import express from 'express'

import { notFound } from './middleware.js'
import { TaskModule } from './task/task.module.js'
import { router as tasksRouter } from './task.js'

const tasksModule = new TaskModule()

export const api = express()

api.use('/v1/tasks', tasksRouter)

api.use('/v2/tasks', tasksModule.get('router'))

api.use('*', notFound)
