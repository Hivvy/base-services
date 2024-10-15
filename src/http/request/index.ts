import Joi from "joi";
import { Request, Response, NextFunction } from "express";

class ValidationClass<T> {
    private rules: Joi.ObjectSchema<T>;

    constructor(rules: Joi.ObjectSchema<T>) {
        this.rules = rules;
    }

    validate(req: Request, res: Response, next: NextFunction): void {
        const data: T = req.body;
        const result: Joi.ValidationResult<T> = this.rules.validate(data);
        if (result.error) {
            res.status(400).send({
                error: result.error.details
                    .map((err) => err.message)
                    .join(", "),
            });
        } else {
            next();
        }
    }
}

export default ValidationClass;
