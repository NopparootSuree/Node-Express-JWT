const { validationResult } = require('express-validator');
const db = require('../configs/database')

const createEmployees = (req, res) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}
    
	const { birth_date, first_name, last_name, gender, hire_date } = req.body

	db('employees')
		.insert({ birth_date, first_name, last_name, gender, hire_date })
        //ถ้าสำเร็จ
        .then(() => {
			res.status(200).json({ message: 'Employee created successfully' });
		})
        //ถ้าไม่สำเร็จ
		.catch((error) => {
			res.status(500).json({ message: 'Failed to create employee', error });
		})
}

const listEmployee = (req, res) => {
    db('employees')
        .select("emp_no", "first_name", "last_name", "gender")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to Get list employee', err });
        })
}

const deleteEmployee = async (req, res) => {
    let { emp_no }= req.params
    try {
        const empExists = await db('employees').where('emp_no', emp_no).first();
        
        if (!empExists) {
            throw new Error('Employee does not exists');
        } 

        db('employees')
            .where('emp_no', emp_no)
            .del()
            .then(() => {
                res.status(200).json({ message: 'Employee deleted successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to delete employee', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const updateEmployee = async (req, res) => {
    let { emp_no }= req.params
    const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

    const { first_name, last_name } = req.body

    try {
        const empExists = await db('employees').where('emp_no', emp_no).first();
        
        if (!empExists) {
            throw new Error('Employee does not exists');
        } 

        db('employees')
            .where('emp_no', emp_no)
            .update({
                first_name: first_name,
                last_name: last_name
            })
            .then(() => {
                res.status(201).json({ message: 'Employee updated successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to update employee', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { createEmployees, listEmployee, deleteEmployee, updateEmployee };