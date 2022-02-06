<template>
    <button type="submit" class="immo-btn immo-btn-submit" :disabled="IsProcessing">
        <span v-if="IsProcessing">
            <i class="fas fa-spinner fa-spin"></i>
        </span>
        <!-- Should not be in a 'v-if/v-else' for accessibility reasons -->
        <span :class="{ 'd-none': IsProcessing }">{{Text}}</span>
    </button>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "SubmitAction",
        props: {
            IsProcessing: {
                type: Boolean,
                default: false,
                required: true
            },
            Text: {
                type: String,
                required: true
            }
        }
    });
</script>