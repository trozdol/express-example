export function logger(req, res, next) {
    const { url, method, params, query, body } = req
    console.log(method, url, { params, query, body })
    next()
}

export function notFound(req, res, next) {
    console.log('not found 404')
    next(404)
}

/**
 * this is confusing and not perfect but should wrap the
 * functions you pass into express router so you can just
 * throw erros or return the data
 */
export function requestHandler(fn) {
    return (req, res, next) => {
        console.log('requestHandling middleware')
        const response = {
            status: 'OK',
            statusCode: 200,
            success: false,
            data: undefined,
            messages: undefined
        }

        return new Promise((resolve, reject) => {
            console.log('requestHandler - promise')

            try {
                var results = fn(req, res)
                resolve(results)
            } catch (e) {
                reject(e)
            }
        })
            .then((data) => {
                console.log('requestHandler - promise.then')
                response.data = data
                response.success = true
            })
            .catch((error) => {
                console.error('requestHandler - promise.catch', error)
                response.status = 'Error'
                response.statusCode = 500
                response.messages = {
                    type: 'error',
                    message: error.message
                }
            })
            .finally(() => {
                console.log('requestHandler - promise.finally', response)
                res.status(response.statusCode).send(response)
            })
    }
}
