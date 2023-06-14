const regex = (options, input) => {
    if (options == "Int,BigAZ") {
        const regex = /^[0-9A-Z]+$/;
        const isMatch = regex.test(input);
        return isMatch

    } else if (options == "SmallAZ,BigAZ") {
        const regex = /^[a-zA-Z]+$/;
        const isMatch = regex.test(input);
        return isMatch
        
    }

    return null
}

module.exports = { regex }