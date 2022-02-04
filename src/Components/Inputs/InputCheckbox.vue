<template>
    <div class="checkbox">
        <label>
            <input type="checkbox" class="width-auto"
                   v-model="Value" :aria-required="IsRequired">
            <span :class="{ 'atr-required': IsRequired }">{{Text}}</span>
        </label>
    </div>

    <AlertValidation :Text="ErrorMessage"></AlertValidation>
</template>

<script lang="ts">
    import { object } from "yup";
    import { defineComponent } from "vue";

    // Models
    import { ValidatorErrorsResponse } from "../../Models/Validation/ValidatorSchema";
    import { ControlsData, ControlsSetup } from "../../Models/Inputs/InputControlState";
    import { BaseValidatorProperties } from "../../Models/Validation/ValidatorConfiguration";

    // Services
    import { BuildBooleanValidator } from "../../Services/Validation/BooleanService";
    import { RetrieveValue, StoreValue } from "../../StoreManagement/StoreManagementService";

    // Components
    import AlertValidation from "../Alerts/AlertValidation.vue";

    export default defineComponent({
        name: "InputCheckbox",
        setup(props): ControlsSetup {
            const schema = object()
                .shape({
                    Value: BuildBooleanValidator({
                        FieldText: props.Text,
                        IsRequired: props.IsRequired
                    } as BaseValidatorProperties)
                });

            const currentValue = RetrieveValue(props.FieldIdentifier) as boolean || false;
            const isValid = schema.isValidSync({ Value: currentValue });
            StoreValue(props.FieldIdentifier, currentValue, isValid);

            return {
                ValidationSchema: schema
            } as ControlsSetup;
        },
        data(): ControlsData {
            return {
                ErrorMessage: null
            } as ControlsData;
        },
        methods: {
            ValidateComponent(value: string, updateStoreValue: boolean): void {
                this.ValidationSchema
                    .validate({ Value: value })
                    .then(() => {
                        this.ErrorMessage = null;

                        if (updateStoreValue) {
                            StoreValue(this.FieldIdentifier, value, true);
                        }
                    })
                    .catch((response: ValidatorErrorsResponse) => {
                        this.ErrorMessage = response.errors[0];

                        if (updateStoreValue) {
                            StoreValue(this.FieldIdentifier, value, false);
                        }
                    });
            }
        },
        computed: {
            Value: {
                get(): boolean {
                    return RetrieveValue(this.FieldIdentifier) as boolean || false;
                },
                set(value: boolean): void {
                    this.ValidateComponent(value, true);
                }
            }
        },
        props: {
            Text: {
                type: String,
                required: true
            },
            IsRequired: {
                type: Boolean,
                default: false
            },
            FieldIdentifier: {
                type: String,
                required: true
            }
        },
        components: {
            AlertValidation
        }
    });
</script>