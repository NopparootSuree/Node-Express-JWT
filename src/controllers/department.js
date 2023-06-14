const { validationResult } = require('express-validator');
const db = require('../configs/database');
const { regex } = require('../configs/config')

const createDepartment = (req, res) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

    try {
	    const { dept_no, dept_name } = req.body

        const isMatch_DeptNo = regex("dept_no", dept_no)
        const isMatch_DeptName = regex("dept_name", dept_name)
        
        if(isMatch_DeptNo != true || isMatch_DeptName != true) {
            throw new Error("Cannot enter spacial symbol or dept_no cannot small character")
        }

        db('departments')
            .insert({ dept_no, dept_name })
            .then(() => {
                res.status(201).json({ message: 'Department created successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to create department', error });
            })

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    
}

const listDepartment = (req, res) => {
    db('departments')
        .select("*")
        .then((data) => {
            res.status(200).json({ result: data});
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to Get list employee', err });
        })
}

const deleteDepartment = async (req, res) => {
    let { dept_no }= req.params
    try {
        const deptExists = await db('departments').where('dept_no', dept_no).first();
        
        if (!deptExists) {
            throw new Error('Department does not exists');
        }

        db('departments')
            .where('dept_no', dept_no)
            .del()
            .then(() => {
                res.status(200).json({ message: 'Department deleted successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to delete department', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const updateDepartment = async (req, res) => {
    let { dept_no }= req.params
    const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}
    
    try {
        const { dept_name } = req.body
    
        const isMatch_DeptName = regex("dept_name", dept_name)
    
        if(isMatch_DeptName != true) {
            throw new Error("Cannot enter spacial symbol or dept_no cannot small character")
        }

        const deptExists = await db('departments').where('dept_no', dept_no).first();
        
        if (!deptExists) {
            throw new Error('Department does not exists');
        } 

        db('departments')
            .where('dept_no', dept_no)
            .update({
                dept_name: dept_name
            })
            .then(() => {
                res.status(200).json({ message: 'Department updated successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to update department', error });
            })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { createDepartment, listDepartment, deleteDepartment, updateDepartment };