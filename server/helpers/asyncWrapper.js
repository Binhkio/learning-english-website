const asyncMiddleware = require('../middlewares/asyncMiddleware');

const wrapAsync = (obj, funcNames) => {
    return funcNames.reduce((wrappedObj, funcName) => {
        if (typeof obj[funcName] === 'function') {
            wrappedObj[funcName] = asyncMiddleware(obj[funcName]);
        } else {
            wrappedObj[funcName] = obj[funcName];
        }
        return wrappedObj;
    }, {});
};

module.exports = wrapAsync;
