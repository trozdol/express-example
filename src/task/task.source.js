import { Task } from './task.model.js'

/**
 * Super Advanced In Memory Database
 */

export const store = new Map()

/**
 * setup some default records
 */
store.set(1, new Task({ id: 1, name: 'One', description: 'Thing to do' }))
store.set(2, new Task({ id: 2, name: 'Two', description: 'Thing to do' }))
store.set(3, new Task({ id: 3, name: 'Three', description: 'Thing to do' }))
store.set(4, new Task({ id: 4, name: 'Four', description: 'Thing to do' }))
store.set(5, new Task({ id: 5, name: 'Five', description: 'Thing to do' }))
