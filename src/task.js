import express from 'express'
// requestHandler will wrap standard and
// async methods so they work in express
// also wraps with a try catch.
import { requestHandler } from './middleware.js'

/**
 * all the endpoints
 */

export const router = express()

router.post(
    '/',
    requestHandler((req, res, next) => {
        const params = Object.assign(req.params, req.body)
        return insertTask(params)
    })
)

router.get(
    '/?:id',
    requestHandler((req, res, next) => {
        // allows the use of /tasks, /tasks/:id, or /tasks?id=:id
        const id = Object.assign(req.params, req.query)?.id
        if (!id) {
            throw new Error(`id param is required`)
        }
        return selectTask({ id })
    })
)

router.put(
    '/:id',
    requestHandler((req, res, next) => {
        const { params, query, body } = req
        const values = Object.assign({}, params, body)
        if (!values.id) {
            throw new Error(`id param is required`)
        }
        return updateTask(values)
    })
)

router.delete(
    '/:id',
    requestHandler((req, res, next) => {
        if (!req.params.id) {
            throw new Error(`id param is required`)
        }
        return deleteTask(req.params.id)
    })
)

router.all(
    '*',
    requestHandler((req, res, next) => {
        throw new Error('Not Found')
    })
)

/**
 * basic model
 */

export class Task {
    id = undefined
    name = undefined
    description = undefined
    isComplete = undefined
    dateCreated = undefined
    dateUpdated = undefined

    constructor(values = {}) {
        console.log('constructor', this.constructor.name)

        this.id = values?.id
        this.name = values?.name
        this.description = values?.description
        this.isComplete = values?.isComplete || false
        this.dateCreated = values?.dateCreated
        this.dateUpdated = values?.dateUpdated
    }
}

/**
 * Super Advanced In Memory Database
 */

const store = new Map()
store.set(1, new Task({ id: 1, name: 'One', description: 'Thing to do' }))
store.set(2, new Task({ id: 2, name: 'Two', description: 'Thing to do' }))
store.set(3, new Task({ id: 3, name: 'Three', description: 'Thing to do' }))
store.set(4, new Task({ id: 4, name: 'Four', description: 'Thing to do' }))
store.set(5, new Task({ id: 5, name: 'Five', description: 'Thing to do' }))

/**
 * The real logic.. if you can call it that.
 */

export async function selectTask(params) {
    console.log('selectTask', params)

    let records = Array.from(store.values())

    return params?.id ? records.filter((rec) => rec.id == params.id) : records
}

export async function insertTask(params = {}) {
    console.log('insertTask', params)

    const record = new Task({ id: store.size + 1, ...params })
    console.log({ record })
    store.set(record.id, record)

    return record
}

export async function updateTask(params) {
    console.log('updateTask', params)

    const record = store.get(+params.id)

    if (!record) throw new Error(`record not found using id: ${params.id}`)

    for (const [key, val] of Object.entries(params)) {
        if (!Reflect.hasOwnProperty(record, key)) continue
        Reflect.set(record, key, val)
    }

    store.set(record.id, record)

    return record
}

export async function deleteTask(id) {
    console.log('deleteTask', id)

    id = parseInt(id)

    const recordExists = store.has(id)

    if (!recordExists) {
        throw new Error(`record ${id} doesn't exist to be deleted`)
    }

    const record = store.get(id)

    if (!store.delete(id)) {
        throw new Error(`problem deleting record ${id}`)
    }

    return true
}
