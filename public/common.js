export function getFormValues(form, ignoreEmpty = false) {
    const selector = `select,radio,checkbox,textarea,[name]`
    const fields = form.querySelectorAll(selector)
    const values = Array.from(fields).reduce((values, field) => {
        if (ignoreEmpty && ['', undefined].includes(field.value)) {
            return values
        }

        values[field.name] = field.value

        return values
    }, {})

    return values
}
