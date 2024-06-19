exports.validateDate = (date) => {
    return !isNaN(Date.parse(date));
};

