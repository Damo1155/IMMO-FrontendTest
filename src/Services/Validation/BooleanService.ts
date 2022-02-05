import { boolean, BooleanSchema } from "yup";

// Libraries
import { AnyObject } from "yup/lib/object";

// Models
import { BaseValidatorProperties } from "../../Models/Validation/ValidatorConfiguration";

export const BuildBooleanValidator = (request: BaseValidatorProperties): BooleanSchema<boolean, AnyObject> => {
    return boolean()
        .when((value: string) => {
            if (request.IsRequired && !value) {
                return boolean().required(`${request.FieldText} is a required field.`);
            }
        });
}