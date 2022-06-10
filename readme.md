# Express Example

## Start:

    npm install

    npm run start:dev

## Tests:

    npm run test:tasks

## Example Routes:

### V1 Routes: (`/api/v1/tasks`)

This example is handled in `./src/task.js` and is a more flat approach.

    GET:    http://localhost:3000/api/v1/tasks
    GET:    http://localhost:3000/api/v1/tasks/1
    GET:    http://localhost:3000/api/v1/tasks?id=1

    POST:   http://localhost:3000/api/v1/tasks
    BODY:   { name: 'Six', isCompleted: false }

    GET:    http://localhost:3000/api/v1/tasks/6

    PUT:    http://localhost:3000/api/v1/tasks/6
    BODY:   { isCompleted: true }

    DELETE: http://localhost:3000/api/v1/tasks/6

### V2 Routes: (`/api/v2/tasks`)

This is the same as above but organized into classes and such in `./src/task/`.

    GET:    http://localhost:3000/api/v2/tasks
    GET:    http://localhost:3000/api/v2/tasks/1
    GET:    http://localhost:3000/api/v2/tasks?id=1

    POST:   http://localhost:3000/api/v2/tasks
    BODY:   { name: 'Six', isCompleted: false }

    GET:    http://localhost:3000/api/v2/tasks/6

    PUT:    http://localhost:3000/api/v2/tasks/6
    BODY:   { isCompleted: true }

    DELETE: http://localhost:3000/api/v2/tasks/6

## Some ExpressJS Notes:

This is a basic overview of a single request handler with middleware if you
wanted to do everything specifically for a single route, but it's usually
better make the middleware defaults on the router.

```js
const app = express()

app.get(
    '/route',
    function (req, res, next) {
        // do something like check for cookie or token
        next()
    },
    function (req, res, next) {
        // do another thing
        next()
    },
    function (req, res, next) {
        // actually handle the request
        res.send({
            data: [1, 2, 3]
        })
    },
    function (err, req, res, next) {
        // when last and has all 4 params
        // you can catch errors
        res.status(500).send({
            error: 'Oh no!',
            message: err.message
        })
    }
)
```

Example of putting the middleware on the router.

```js
const router = express()

router.use(function (req, res, next) {
    // do something like check for cookie or token
    next()
})

router.use(function (req, res, next) {
    // do another thing
    next()
})
// actually handle the specific request
router.get('/route', function (req, res, next) {
    // actually handle the request
    res.send({
        data: [1, 2, 3]
    })
})

router.use(function (err, req, res, next) {
    // when last and has all 4 params
    // you can catch errors
    res.status(500).send({
        error: 'Oh no!',
        message: err.message
    })
})
```
