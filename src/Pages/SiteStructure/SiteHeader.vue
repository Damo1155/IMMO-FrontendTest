<template>
    <header class="immo-nav-header">
        <div class="immo-nav-branding d-flex">
            <div class="immo-brand-logo">
                <img src="../../Images/immo-logo.svg" :alt="CustomMessages.BrandImage" />
            </div>
            <div class="immo-pageheader flex-grow-1">
                <div class="d-flex justify-content-center h-100">
                    <h1 class="h2 m-0">{{CustomMessages.PropertySearchTool}}</h1>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    // Models
    import { SiteHeaderData } from "Models/SiteStructure/SiteHeaderConfiguration";

    export default defineComponent({
        name: "SiteHeader",
        data(): SiteHeaderData {
            return {
                CustomMessages: {
                    BrandImage: "IMMO logo",
                    PropertySearchTool: "Property search tool"
                }
            } as SiteHeaderData;
        }
    });
</script>