<template>
    <div class="form-group mb-1">
        <label :for="FieldIdentifier" :class="{ 'atr-required': IsRequired }">{{Text}}</label>
        <input type="text" class="form-control"
               v-model="Value" :id="FieldIdentifier" :aria-required="IsRequired" :readonly="IsReadonly" :maxlength="MaxLength" />
    </div>

    <AlertValidation :Text="ErrorMessage"></AlertValidation>
</template>

<script lang="ts">
    import { object } from "yup";
    import { defineComponent } from "vue";

    // Models
    import { ValidatorErrorsResponse } from "../../Models/Validation/ValidatorSchema";
    import { ControlsSetup, ControlsData } from "../../Models/Inputs/InputControlState";
    import { StringValidatorProperties } from "../../Models/Validation/ValidatorConfiguration";

    // Services
    import { BuildStringValidator } from "../../Services/Validation/StringService";
    import { RetrieveValue, StoreValue } from "../../StoreManagement/StoreManagementService";

    // Components
    import AlertValidation from "../Alerts/AlertValidation.vue";

    export default defineComponent({
        name: "InputText",
        setup(props): ControlsSetup {
            const schema = object()
                .shape({
                    Value: BuildStringValidator({
                        FieldText: props.Text,
                        MaxLength: props.MaxLength,
                        IsRequired: props.IsRequired
                    } as StringValidatorProperties)
                });

            const currentValue = RetrieveValue(props.FieldIdentifier) || "";
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
                get(): string {
                    return RetrieveValue(this.FieldIdentifier) as string;
                },
                set(value: string): void {
                    this.ValidateComponent(value, true);
                }
            }
        },
        watch: {
            ForceValidation(value: boolean): void {
                if (value) {
                    this.ValidateComponent(RetrieveValue(this.FieldIdentifier), false);
                    this.$emit("HasValidated");
                }
            }
        },
        emits: ["HasValidated"],
        props: {
            Text: {
                type: String,
                required: true
            },
            IsRequired: {
                type: Boolean,
                default: false,
                required: false
            },
            IsReadonly: {
                type: Boolean,
                default: false,
                required: false
            },
            FieldIdentifier: {
                type: String,
                required: true
            },
            ForceValidation: {
                type: Boolean,
                default: false
            },
            MaxLength: {
                type: Number
            }
        },
        components: {
            AlertValidation
        }
    });
</script>