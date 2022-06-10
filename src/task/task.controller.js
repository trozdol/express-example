/**
 * this is based on a design peter and I put together
 * a couple years ago but simplified.
 */
export class TaskController {
    service = undefined
    model = undefined

    constructor({ service, model }) {
        console.log('constructor', this.constructor.name)
        this.service = service
        this.model = model
    }

    async post(req, res) {
        const params = Object.assign(req.params, req.body)
        return this.service.insert(params)
    }

    async get(req, res) {
        const params = Object.assign(req.params, req.query)
        return this.service.select(params)
    }

    async put(req, res) {
        const { params, body } = req
        const values = Object.assign({}, params, body)
        if (!values.id) {
            throw new Error(`id param is required`)
        }
        return this.service.update(values)
    }

    async delete(req, res) {
        if (!req.params.id) {
            throw new Error(`id param is required`)
        }
        return this.service.delete(req.params.id)
    }

    async catch(req, res, next) {
        throw new Error(`Not Found`)
    }
}
