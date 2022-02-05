<template>
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