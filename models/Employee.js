const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema ({
    employeeID: { type: Number, unique: true},
    name: String,
    position: String,
    address: String,
    phone: String,
    isAdmin: Boolean,
})

module.exports = mongoose.model('Employee', employeeSchema)