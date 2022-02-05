<template>
    <div class="row">
        <div class="col-md-2" aria-hidden="true" role="presentation"></div>
        <div class="col-md-10">
            <form @submit.prevent="ProcessSearch">
                <h2 class="h5 mb-3">{{CustomMessages.Search}}</h2>

                <!-- TODO   : Come back to this later and adjust so it falls inline with the designs -->
                <div class="input-group mb-3">
                    <InputText :Text="CustomMessages.Address" :FieldIdentifier="Identifiers.Address" :IsRequired="true" :AsPlaceholder="true"></InputText>
                    <SubmitAction :Text="CustomMessages.Search" :IsProcessing="IsProcessingSearch"></SubmitAction>
                </div>
            </form>
        </div>
    </div>

    <div class="row">
        <div class="col-md-2">
            <h2 class="h5 mb-3">{{CustomMessages.PropertyTypes}}</h2>
            <ul>
                <template v-for="(propertyType, index) in PropertyTypes" :key="index">
                    <li>
                        <a href="#" @click="ProcessSearch(propertyType.value)">{{propertyType.label}}</a>
                    </li>
                </template>
            </ul>
        </div>
        <div class="col-md-10">
            <SearchResults :Properties="Properties" :DisplayHelpMessage="DisplayHelpMessage" :IsProcessingSearch="IsProcessingSearch"></SearchResults>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    // Api
    import { fetchProperties, getAvailablePropertyTypes, PropertyType } from "../../api";

    // Models
    import { PropertySearchToolData } from "../../Models/Pages/PropertySearch/PropertySearchToolConfiguration";

    // Services
    import { MapProperties } from "./PropertySearchMappingService";
    import { IsValid } from "../../Services/Validation/ValidationService";
    import { RetrieveValue } from "../../StoreManagement/StoreManagementService";

    // Modules
    import SearchResults from "./SearchResults.vue";

    // Components
    import InputText from "../../Components/Inputs/InputText.vue";
    import SubmitAction from "../../Components/Buttons/SubmitAction.vue";

    export default defineComponent({
        name: "PropertySearchTool",
        data(): PropertySearchToolData {
            return {
                Properties: [],
                PropertyTypes: [],
                DisplayHelpMessage: true,
                IsProcessingSearch: false,
                CustomMessages: {
                    Search: "Search",
                    Address: "Address",
                    PropertyTypes: "Property types"
                },
                Identifiers: {
                    Address: "immo-address-search"
                }
            } as PropertySearchToolData;
        },
        methods:{
            ProcessSearch(type: string): void {
                if(this.IsProcessingSearch) {
                    return;
                }
                
                const fieldsToValidate = [
                    this.Identifiers.Address
                ] as Array<string>;

                if (!IsValid(fieldsToValidate)) {
                    return;
                }

                this.IsProcessingSearch = true;

                const address = RetrieveValue(this.Identifiers.Address) as string;
                
                // Purpose  :   Some requests are being bubbled back up with an object rather than string.
                const propertyType = (typeof(type) === "string" ? type : undefined) as string;

                fetchProperties({ address, propertyType })
                    .then((response) => {
                        this.Properties = MapProperties(response.properties);
                    })
                    .catch(() => {
                        // TODO :   Display a toast notification
                    })
                    .finally(() => {
                        this.IsProcessingSearch = false;
                        this.DisplayHelpMessage = false;
                    })
            },
            RetrievePropertyTypes(): void {
                getAvailablePropertyTypes()
                    .then((response) => {
                        response.propertyTypes.unshift({
                            label: "All",
                            value: undefined
                        } as PropertyType);

                        this.PropertyTypes = response.propertyTypes;
                    });
            }
        },
        mounted(): void {
            this.RetrievePropertyTypes();
        },
        components: {
            InputText,
            SubmitAction,
            SearchResults
        }
    });
</script>