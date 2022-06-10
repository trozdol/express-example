/**
 * Could essentially be a dto or model
 */
export class Task {
    id = undefined
    name = undefined
    description = undefined
    isComplete = false
    dateCreated = undefined
    dateUpdated = undefined

    constructor(values = {}) {
        console.log('constructor', this.constructor.name)

        this.id = values?.id ?? this.id
        this.name = values?.name ?? this.name
        this.description = values?.description ?? this.description
        this.isComplete = values?.isComplete ?? this.isComplete
        this.dateCreated = values?.dateCreated ?? this.dateCreated
        this.dateUpdated = values?.dateUpdated ?? this.dateUpdated
    }
}
