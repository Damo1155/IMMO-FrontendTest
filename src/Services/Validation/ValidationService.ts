// State Management
import { store } from "StoreManagement/SimpleDefaultStore";

// Models
import { InputState } from "Models/Shared/Controls/Inputs/InputControlState";

export const IsValid = (identifiers: Array<string>): boolean => {
    let allValid = true;

    identifiers.forEach((identifier: string) => {
        store.state.forEach((state: InputState) => {
            if (state.Identifier === identifier && !state.IsValid) {
                allValid = false;
            }
        });
    });

    return allValid;
}

export const DefineInvalidFields = (identifiers: Array<string>): Array<string> => {
    const invalidFields = [] as Array<string>;

    identifiers.forEach((identifier: string) => {
        store.state.forEach((state: InputState) => {
            if (state.Identifier === identifier && !state.IsValid) {
                invalidFields.push(identifier);
            }
        });
    });

    return invalidFields;
}