const { validationResult } = require('express-validator');
const db = require('../configs/database');
const { regex } = require('../configs/config')

const createDeptEmp = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() })
    }

    try {
        const { dept_no, emp_no, from_date, to_date } = req.body
        
        const isMatch_DeptNo = regex("dept_no", dept_no)
        const deptExists = await db('departments').where('dept_no', dept_no).first();
        const empExists = await db('employees').where('emp_no', emp_no).first();

        if(isMatch_DeptNo != true) {
            throw new Error("Cannot enter spacial symbol or dept_no cannot small character")
        }
    
        if (deptExists == null || empExists == null){
            throw new Error("Data is not exists")
        }

        db('dept_emp')
            .insert({ dept_no, emp_no, from_date, to_date })
            .then(() => {
                res.status(201).json({ message: 'DeptEmp created successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to create DeptEmp', error });
            })
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const listDeptEmp = (req, res) => {
    db('dept_emp')
        .select("*")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get list dept_emp', err });
        })
}

module.exports = { createDeptEmp, listDeptEmp }