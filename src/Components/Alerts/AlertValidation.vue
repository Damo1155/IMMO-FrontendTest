<template>
    <div :class="{ 'd-none': !HasValidationError, 'alert alert-danger': HasValidationError }"
         aria-atomic="true" aria-live="assertive" role="alert" :aria-hidden="!HasValidationError">
        <span class="icon">
            <i class="fas fa-exclamation-triangle"></i>
        </span>
        <div class="text" v-html="Text"></div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "AlertValidation",
        computed: {
            HasValidationError(): boolean {
                return this.Text !== null && this.Text !== undefined && this.Text !== "";
            }
        },
        props: {
            Text: {
                type: String,
                required: false
            }
        }
    });
</script>