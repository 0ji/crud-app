const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: "N/A"
    },
    address: {
        type: String,
        default: "N/A"
    },
    phone: {
        type: String,
        default: "N/A"
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;