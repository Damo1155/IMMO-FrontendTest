<template>
    <div :class="{ 'd-none': HideAlert, 'alert alert-info': !HideAlert }"
         aria-atomic="true" aria-live="assertive" role="alert" :aria-hidden="HideAlert">
        <span class="icon">
            <i class="fas fa-exclamation-triangle"></i>
        </span>
        <div class="text" v-html="Text"></div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "AlertInfo",
        props: {
            Text: {
                type: String,
                required: false
            },
            HideAlert:{
                type: Boolean,
                required: false
            }
        }
    });
</script>