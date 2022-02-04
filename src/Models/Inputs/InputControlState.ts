import { OptionalObjectSchema } from "yup/lib/object";

export interface ControlsSetup {
    ValidationSchema: OptionalObjectSchema<any>;
}

export interface ControlsData {
    ErrorMessage: string;
}

export interface InputState {
    IsValid: boolean;
    Identifier: string;
    Value: string | number | boolean | Array<Object>;
}

export interface InputPayload {
    IsValid: boolean;
    Identifier: string;
    Value: string | number | boolean | Array<Object>;
}