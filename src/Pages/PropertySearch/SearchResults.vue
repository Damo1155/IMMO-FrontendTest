<template>
    <h2 class="h5 mb-3">{{CustomMessages.SearchResults}}</h2>
    
    <AlertError :HasErrorOccurred="HasErrorOccurred"></AlertError>
    <AlertInfo :Text="CustomMessages.HelpMessage" :HideAlert="!DisplayHelpMessage"></AlertInfo>
    <AlertLoading :Text="CustomMessages.LoadingProperties" :IsProcessing="IsProcessingSearch"></AlertLoading>
    <AlertWarning :Text="CustomMessages.NoPropertiesFound" :HideAlert="!DisplayNoResultsFound"></AlertWarning>
    
    <template v-if="DisplaySearchResults">
        <div class="table-responsive-md immo-bg-light-grey min-h-19">
            <table class="table">
                <caption class="sr-only">{{CustomMessages.ListOfProperties}}</caption>
                <thead>
                    <tr>
                        <th class="text-center">
                            <i class="fas fa-check"></i>
                            <span class="sr-only">
                                {{CustomMessages.SelectProperty}}
                            </span>
                        </th>
                        <th class="text-center">{{CustomMessages.Address}}</th>
                        <th class="text-center">{{CustomMessages.Postcode}}</th>
                        <th class="text-center">{{CustomMessages.PropertyType}}</th>
                        <th class="text-center">{{CustomMessages.NumberOfRooms}}</th>
                        <th class="text-center" v-html="CustomMessages.FloorArea"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="property in Properties" :key="property.Id">
                        <td class="text-center">
                            <input type="checkbox" class="width-auto" :aria-label="CustomMessages.SelectProperty"
                                v-model="property.IsSelected" @click="$emit('UpdatePropertySelection', property.Id)">
                        </td>
                        <td class="text-center">{{property.Address}}</td>
                        <td class="text-center">{{property.Postcode}}</td>
                        <td class="text-center immo-sentence-case">{{property.PropertyType}}</td>
                        <td class="text-center">{{property.NumberOfRooms}}</td>
                        <td class="text-center">{{property.FloorArea}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </template>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue";

    // Models
    import { MappedProperty } from "../../Models/PropertySearch/PropertiesConfiguration";

    // Components
    import AlertInfo from "../../Components/Alerts/AlertInfo.vue";
    import AlertError from "../../Components/Alerts/AlertError.vue";
    import AlertLoading from "../../Components/Alerts/AlertLoading.vue";
    import AlertWarning from "../../Components/Alerts/AlertWarning.vue";

    export default defineComponent({
        name: "SearchResults",
        data(): any {
            return {
                CustomMessages:{
                    Address: "Address",
                    Postcode: "Postcode",
                    PropertyType: "Property type",
                    SearchResults: "Search results",
                    NumberOfRooms: "Number of rooms",
                    SelectProperty: "Select property",
                    ListOfProperties: "List of properties",
                    FloorArea: "Floor area (m<sup>2</sup>)",
                    LoadingProperties: "Loading properties",
                    NoPropertiesFound: "No properties found",
                    HelpMessage: "Please provide an address before continuing"
                }
            };
        },
        computed: {
            DisplaySearchResults(): boolean {
                return !this.IsProcessingSearch && !this.HasErrorOccurred && !this.DisplayHelpMessage && this.Properties.length > 0;
            },
            DisplayNoResultsFound(): boolean {
                return !this.IsProcessingSearch && !this.HasErrorOccurred && !this.DisplayHelpMessage && this.Properties.length === 0;
            }
        },
        emits: ["UpdatePropertySelection"],
        props: {
            Properties: {
                required: true,
                type: Array as PropType<Array<MappedProperty>>
            },
            DisplayHelpMessage: {
                type: Boolean,
                required: true
            },
            HasErrorOccurred: {
                type: Boolean,
                required: true
            },
            IsProcessingSearch: {
                type: Boolean,
                required: true
            }
        },
        components: {
            AlertInfo,
            AlertError,
            AlertWarning,
            AlertLoading
        }
    });
</script>