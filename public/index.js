import { getFormValues } from './common.js'

const authenticationForm = document.querySelector('form[name=authentication]')
const authorizationForm = document.querySelector('form[name=authorization]')

authenticationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.submitter.id, getFormValues(e.target))
})

authorizationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.submitter.id, getFormValues(e.target))
})

// todo
async function authenticate(values) {}
async function authorize(values) {}
async function resetToken(values) {}
async function resetPassword(values) {}
