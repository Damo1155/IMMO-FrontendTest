<template>
    <div :class="{ 'd-none': !HasErrorOccurred, 'alert alert-danger': HasErrorOccurred }"
         aria-atomic="true" aria-live="assertive" role="alert" :aria-hidden="!HasErrorOccurred">
        <span class="icon">
            <i class="fas fa-exclamation-triangle"></i>
        </span>
        <div class="text">{{CustomMessages.DefaultErrorMessage}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    // Models
    import { AlertErrorData } from "../../Models/Alerts/AlertErrorConfiguration";

    export default defineComponent({
        name: "AlertGenericError",
        data(): AlertErrorData {
            return {
                CustomMessages: {
                    DefaultErrorMessage: "An error occurred, please try again later."
                }
            } as AlertErrorData;
        },
        props: {
            HasErrorOccurred: {
                type: Boolean,
                required: true
            }
        }
    });
</script>