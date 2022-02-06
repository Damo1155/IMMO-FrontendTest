// Enums
import { MutationTypes } from "../../Enums/StoreTypes";

// Models
import { InputState, InputPayload } from "../../Models/Inputs/InputControlState";

// State Management
import { store } from "./SimpleDefaultStore";

export const RetrieveValue = (identifier: string): unknown => {
    const property =
        store.state.find((state: InputState) => state.Identifier === identifier);

    return property ? property.Value : "";
};

export const StoreValue = (identifier: string, value: unknown, isValid: boolean): void => {
    const payload = {
        Value: value,
        IsValid: isValid,
        Identifier: identifier
    } as InputPayload;

    store.commit(MutationTypes.SET_VALUE, payload);
};