<template>
    <div aria-live="polite" aria-atomic="false" class="position-fixed end-0">
        <div id="immo-toast-container" class="toast-container p-3"
                data-original-class="toast-container position-absolute p-3"></div>
    </div>

    <SiteHeader></SiteHeader>    

    <div class="container-fluid">
        <PropertySearchTool></PropertySearchTool>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    // Modules
    import SiteHeader from "./SiteStructure/SiteHeader.vue";
    import PropertySearchTool from "./PropertySearch/PropertySearchTool.vue";

    export default defineComponent({
        name: "App",
        components: {
            SiteHeader,
            PropertySearchTool
        }
    });
</script>