import express from 'express'
// requestHandler will wrap standard and
// async methods so they work in express
// also wraps with a try catch.
//
import { requestHandler } from '../middleware.js'
import { store } from './task.source.js'
import { Task } from './task.model.js'
import { TaskController } from './task.controller.js'
import { TaskService } from './task.service.js'

// This module class is inspired partly how NestJS
// handles things, but with less BS
//
export class TaskModule {
    static router = express()
    static model = Task
    static source = store
    static service = TaskService
    static controller = TaskController

    #instances = new Map()

    get(name) {
        return this.#instances.get(name)
    }
    set(name, instance) {
        return this.#instances.set(name, instance)
    }

    /**
     * FYI I didn't go over the top for clarity.
     */
    constructor() {
        const self = this.constructor

        this.set('router', self.router)
        this.set('source', self.source)
        this.set('model', self.model)

        const router = this.get('router')
        const model = this.get('model')
        const source = this.get('source')

        const service = new self.service({ source, model })
        const controller = new self.controller({ router, model, service })

        this.set('service', service)
        this.set('controller', controller)

        // setup the default routes I would do this differently in a real
        // situation to make it more flexible.
        // we have to re-bind the scope of the controller to the route handler
        // since it's used out of context

        router.post('/', requestHandler(controller.post.bind(controller)))
        router.get('/', requestHandler(controller.get.bind(controller)))
        router.get('/:id', requestHandler(controller.get.bind(controller)))
        router.put('/:id', requestHandler(controller.put.bind(controller)))
        router.delete(
            '/:id',
            requestHandler(controller.delete.bind(controller))
        )
        router.all('*', requestHandler(controller.catch.bind(controller)))
    }
}
