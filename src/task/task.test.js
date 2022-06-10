import { TaskModule } from './task.module.js'

/**
 * if you wanted you could test out the individual
 * task module like so.
 */

const tasksModule = new TaskModule()

console.log(`
----------------------------------------------
TESTING TASKS:
----------------------------------------------
`)

const controller = tasksModule.get('controller')

controller
    .get({
        params: {},
        query: {},
        body: {}
    })
    .then((res) => {
        console.log(`controller.get: success`)
    })
    .catch((err) => {
        console.error(err)
    })

controller
    .post({
        params: {},
        query: {},
        body: {
            name: 'Six',
            description: 'Created from task.test.js',
            isComplete: false
        }
    })
    .then((res) => {
        console.log(`controller.post: success`)
    })
    .catch((err) => {
        console.error(err)
    })

controller
    .put({
        params: {
            id: 6
        },
        query: {},
        body: {
            isComplete: true
        }
    })
    .then((res) => {
        console.log(`controller.put: success`)
    })
    .catch((err) => {
        console.error(err)
    })

controller
    .delete({
        params: {
            id: 6
        },
        query: {},
        body: {}
    })
    .then((res) => {
        console.log(`controller.delete: success`)
    })
    .catch((err) => {
        console.error(err)
    })

const service = tasksModule.get('service')

service
    .insert({
        name: 'Six',
        description: 'Created from task.test.js',
        isComplete: false
    })
    .then((res) => {
        console.log(`service.insert: success`)
    })
    .catch((err) => {
        console.error(err)
    })

service
    .select({
        id: 6
    })
    .then((res) => {
        console.log(`service.select: success`)
    })
    .catch((err) => {
        console.error(err)
    })

service
    .update({
        id: 6,
        isComplete: true
    })
    .then((res) => {
        console.log(`service.update: success`)
    })
    .catch((err) => {
        console.error(err)
    })

service
    .delete(6)
    .then((res) => {
        console.log(`service.delete: success`)
    })
    .catch((err) => {
        console.error(err)
    })

tasksModule.get('router').listen(8000, () => {
    console.log(`TESTING TASK API SERVER FOR 5 SECONDS:`)

    console.log('server started listening @ http://localhost:8000')

    setTimeout(() => {
        console.log('stopping server')
        process.exit()
    }, 5000)
})
