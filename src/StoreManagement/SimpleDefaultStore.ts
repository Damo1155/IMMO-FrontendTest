// Libraries
import { Store as VuexStore, createStore } from "vuex";

// Enums
import { ActionTypes, MutationTypes } from "../Enums/StoreTypes";

// Models
import { InputState, InputPayload } from "../Models/Inputs/InputControlState";
import { ActionContext, ActionTree, CommitOptions, DispatchOptions, GetterTree, MutationTree } from "vuex";

// Set State
const states = [] as Array<InputState>;

// Mutation Types
export type Mutations<State = Array<InputState>> = {
    [MutationTypes.SET_VALUE](state: State, payload: InputPayload): void;
}

// Define Mutations
// Intersect between Mutations and MutationTree
const mutations: MutationTree<Array<InputState>> & Mutations = {
    [MutationTypes.SET_VALUE](newState: Array<InputState>, payload: InputPayload) {
        const property = newState.find((state: InputState) => state.Identifier === payload.Identifier );

        if (!property) {
            const newStateItem = {
                Value: payload.Value,
                IsValid: payload.IsValid,
                Identifier: payload.Identifier
            } as InputState;

            newState.push(newStateItem);

            return;
        }

        property.Value = payload.Value;
        property.IsValid = payload.IsValid;
    }
};

// Actions
type AugmentedActionContext = {
    // Special type of method which acts as a dispatch event to the mutation
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<Array<InputState>, Array<InputState>>, "commit">;

// Actions Interface
export interface Actions {
    [ActionTypes.SET_VALUE](
        { commit }: AugmentedActionContext,
        payload: InputPayload
    ): void
};

export const actions: ActionTree<Array<InputState>, Array<InputState>> & Actions = {
    [ActionTypes.SET_VALUE]({ commit }, payload: InputPayload) {
        commit(MutationTypes.SET_VALUE, payload)
    }
};

// Getters Types
export type Getters = {
    CurrentValue(state: Array<InputState>): string | number | boolean;
}

// Getters
export const getters: GetterTree<Array<InputState>, Array<InputState>> & Getters = {
    CurrentValue: state => {
        return "";
    }
}

// Setup store type
export type Store = Omit<VuexStore<Array<InputState>>, "commit" | "getters" | "dispatch"> &
{ commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(key: K, payload: P, options?: CommitOptions): ReturnType<Mutations[K]>; } &
{ getters: { [K in keyof Getters]: ReturnType<Getters[K]>; }; } &
{ dispatch<K extends keyof Actions>(key: K, payload: Parameters<Actions[K]>[1], options?: DispatchOptions): ReturnType<Actions[K]> };

export const store = createStore({
    strict: true,
    state: states,
    mutations: mutations,
    actions: actions,
    getters: getters
});

export function UseStore() {
    return store as Store;
};