import { Promise } from './meiyisi.js'

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    })
})
    .then(
        value => {
            return new Promise((resolve) => {
                resolve(new Promise((resolve, reject) => {
                    resolve('333')
                })
                )
            })
        },
        reason => {
            console.log('reason', reason)
        }
    )
    .then(
        value => {
            console.log('then 2 value:', value)
        },
        reason => {
            console.log('reason', reason)
        }
    )
