import { request, response } from 'express';
import { validationResult } from 'express-validator';

export const validateInput = ( req = request, res = response, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(405).json({
            description: 'Invalid input'
        });
    }

    next();
}


