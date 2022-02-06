<template>
    <div :class="{ 'd-none': !IsProcessing, 'alert alert-info': IsProcessing }"
         aria-atomic="true" aria-live="assertive" role="alert" :aria-hidden="!IsProcessing">
        <span class="icon">
            <i class="fas fa-spinner fa-spin"></i>
        </span>
        <div class="text">{{Text}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "AlertLoading",
        props: {
            IsProcessing: {
                type: Boolean,
                required: true
            },
            Text: {
                type: String,
                required: true
            }
        }
    });
</script>