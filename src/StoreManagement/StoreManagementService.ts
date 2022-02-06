// Enums
import { MutationTypes } from "../Enums/StoreTypes";

// Models
import { InputState, InputPayload } from "../Models/Inputs/InputControlState";

// State Management
import { store } from "../StoreManagement/SimpleDefaultStore";

export function RetrieveValue(identifier: string): string | number | boolean | Array<Object> | Object {
    const property =
        store.state.find((state: InputState) => {
            return state.Identifier == identifier;
        });

    if (!property) {
        return "";
    }

    return property.Value;
};

export function StoreValue(identifier: string, value: string | number | boolean | Array<Object> | Object): void;
export function StoreValue(identifier: string, value: string | number | boolean | Array<Object> | Object, isValid: boolean): void;

export function StoreValue(identifier: string, value: string | number | boolean | Array<Object> | Object, isValid: boolean = true): void {
    const payload = {
        Value: value,
        IsValid: isValid,
        Identifier: identifier
    } as InputPayload;

    store.commit(MutationTypes.SET_VALUE, payload);
};