const regex = (options, input) => {
    if (options == "dept_no") {
        const regex = /^[A-Z]{3}[0-9]{0,5}$$/;
        const isMatch = regex.test(input);
        return isMatch

    } else if (options == "dept_name") {
        const regex = /^[a-zA-Z]+$/;
        const isMatch = regex.test(input);
        return isMatch
        
    }

    return null
}

module.exports = { regex }