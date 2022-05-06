let accounts = require('./database.json')
module.exports = {
    getAccounts: (req, res) => {
        res.status(200).send(accounts)
    },
    createAccount: (req, res) => {
        const {emailaddress,username, password} = req.body
        let newAccount = {
            emailaddress,
            username,
            password
        }
        accounts.push(newAccount);
        res.status(200).send(accounts)
    }
}