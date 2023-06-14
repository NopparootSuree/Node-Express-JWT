const { validationResult } = require('express-validator');
const db = require('../configs/database')

const createSalaries = async (req, res) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

	try {
		const { emp_no, salary, from_date, to_date } = req.body

		const empExists = await db('employees').where('emp_no', emp_no).first();
		const salaryExists = await db('salaries').where('emp_no', emp_no).first();

		if (salaryExists != null) {
			throw new Error("The employee's salary has been created. please update salary")
		}

		if (empExists == null){
            throw new Error("Employee is not exists")
        }

		if (typeof salary !== 'number') {
			throw new Error("Salary must be an Integer")
		}
	
		db('salaries')
			.insert({ emp_no, salary, from_date, to_date })
			//ถ้าสำเร็จ
			.then(() => {
				res.status(200).json({ message: 'Salaries created successfully' });
			})
			//ถ้าไม่สำเร็จ
			.catch((error) => {
				res.status(500).json({ message: 'Failed to create salaries', error });
			})
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
    
}

const listSalaries = (req, res) => {
    db('salaries')
        .select("*")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to Get list employee', err });
        })
}

const deleteSalaries = async (req, res) => {
    let { emp_no }= req.params
    try {
        const empExists = await db('salaries').where('emp_no', emp_no).first();
        
        if (!empExists) {
            throw new Error('Employee does not exists');
        } 

        db('salaries')
            .where('emp_no', emp_no)
            .del()
            .then(() => {
                res.status(200).json({ message: 'Salaries deleted successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to delete salaries', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const updateSalaries = async (req, res) => {
    let { emp_no }= req.params
    const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

	
    try {
		const { salary, from_date, to_date } = req.body

        const empExists = await db('salaries').where('emp_no', emp_no).first();
        
        if (!empExists) {
            throw new Error('Employee does not exists');
        }

		if (typeof salary !== 'number') {
			throw new Error("Salary must be an Integer")
		}
	

        db('salaries')
            .where('emp_no', emp_no)
            .update({
				salary: salary,
				from_date: from_date,
				to_date: to_date
            })
            .then(() => {
                res.status(201).json({ message: 'Salaries updated successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to update salaries', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { createSalaries, listSalaries, deleteSalaries, updateSalaries };