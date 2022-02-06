import { string, StringSchema } from "yup";

// Libraries
import { AnyObject } from "yup/lib/object";

// Models
import { StringValidatorProperties } from "../../Models/Validation/ValidatorConfiguration";

export const BuildStringValidator = (request: StringValidatorProperties): StringSchema<string, AnyObject> => {
    return string()
        .when((value: string) => {
            if (request.IsRequired && !value) {
                return string().required(`${request.FieldText} is a required field.`);
            }

            if (request.MaxLength != null && request.MaxLength != undefined && value.length > request.MaxLength) {
                return string().max(request.MaxLength, `${request.FieldText} max length is ${request.MaxLength} characters, currently ${value.length}`);
            }
        });
}