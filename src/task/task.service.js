/**
 * this is based on a design peter and I put together
 * a couple years ago.
 */
export class TaskService {
    source = undefined
    model = undefined

    constructor({ source, model }) {
        console.log('constructor', this.constructor.name)
        this.source = source
        this.model = model
    }

    async select(params) {
        console.log('select', params)

        let records = Array.from(this.source.values())

        return params?.id
            ? records.filter((rec) => rec.id == params.id)
            : records
    }

    async insert(params = {}) {
        console.log('insert', params)

        const record = new this.model({ id: this.source.size + 1, ...params })

        this.source.set(record.id, record)

        return record
    }

    async update(params) {
        console.log('update', params)
        const id = +params.id
        const record = this.source.get(id)

        if (!record) throw new Error(`record not found using id: ${params.id}`)

        for (const [key, val] of Object.entries(params)) {
            if (!Reflect.hasOwnProperty(record, key)) continue
            Reflect.set(record, key, val)
        }

        this.source.set(id, record)

        return record
    }

    async delete(id) {
        console.log('delete', id)

        id = parseInt(id)

        const recordExists = this.source.has(id)

        if (!recordExists) {
            throw new Error(`record ${id} doesn't exist to be deleted`)
        }

        const record = this.source.get(id)

        if (!this.source.delete(id)) {
            throw new Error(`problem deleting record ${id}`)
        }

        return true
    }
}
