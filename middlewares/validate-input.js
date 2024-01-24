const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validateInput = ( req = request, res = response, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(405).json({
            description: 'Invalid input',
            errors
        });
    }

    next();
}

module.exports = {
    validateInput
}


