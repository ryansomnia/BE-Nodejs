const moment = require('moment');

function formatDate(date, format = 'YYYY-MM-DD') {
    return moment(date).format(format);
}

module.exports = formatDate;
