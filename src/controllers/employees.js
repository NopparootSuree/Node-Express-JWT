const { validationResult } = require('express-validator');
const db = require('../configs/database')

const createEmployees = async (req, res) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

    try {
        const { birth_date, first_name, last_name, gender, hire_date } = req.body

        const employee = await db('employees').where('first_name', first_name).andWhere("last_name", last_name).first();

        if (employee != null) {
            const fname = employee.first_name
            const lname = employee.last_name
        
            if (first_name == fname && last_name == lname) {
               throw new Error("Employee already taken") 
            }
        }
    
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
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const listEmployee = (req, res) => {
    db('employees')
        .select("*")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((error) => {
            res.status(500).json({ message: 'Failed to Get list employee', error });
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