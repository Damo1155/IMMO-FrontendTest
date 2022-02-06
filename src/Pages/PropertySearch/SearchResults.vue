<template>
    <h2 class="h5 mb-3">{{CustomMessages.SearchResults}}</h2>
    <template v-if="DisplayHelpMessage">
        <AlertInfo :Text="CustomMessages.HelpMessage"></AlertInfo>
    </template>
    <template v-else-if="HasSearchResults">
        <table class="table table-bordered table-hover mb-0">
            <caption class="sr-only">{{CustomMessages.ListOfProperties}}</caption>
            <thead class="table-light">
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
                    <th class="text-center">{{CustomMessages.FloorArea}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="property in Properties" :key="property.Id">
                    <td class="text-center">
                        <!-- TODO   :   On click, check the selected state
                                        If 'selected/true' then deselect it and remove from the list of selected properties
                                        If 'unselected/false' then select it and add to the list of selected properties
                                        Updates will be done as an emit back to the parent -->
                        <input type="checkbox" class="width-auto" :aria-label="CustomMessages.SelectProperty"
                               v-model="property.IsSelected">
                    </td>
                    <td class="text-center">{{property.Address}}</td>
                    <td class="text-center">{{property.Postcode}}</td>
                    <td class="text-center immo-sentence-case">{{property.PropertyType}}</td>
                    <td class="text-center">{{property.NumberOfRooms}}</td>
                    <td class="text-center">{{property.FloorArea}}</td>
                </tr>
            </tbody>
        </table>        
    </template>
    <template v-else>
        <AlertWarning :Text="CustomMessages.NoPropertiesFound"></AlertWarning>        
    </template>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue";

    // Models
    import { MappedProperty } from "../../Models/Pages/PropertySearch/PropertiesConfiguration";

    // Components
    import AlertInfo from "../../Components/Alerts/AlertInfo.vue";
    import AlertWarning from "../../Components/Alerts/AlertWarning.vue";

    export default defineComponent({
        name: "SearchResults",
        data(): any {
            return {
                CustomMessages:{
                    Address: "Address",
                    Postcode: "Postcode",
                    FloorArea: "Floor area (m2)", // TODO   :   m2 needs to look like the designs
                    PropertyType: "Property type",
                    SearchResults: "Search results",
                    NumberOfRooms: "Number of rooms",
                    SelectProperty: "Select property",
                    ListOfProperties: "List of properties",
                    NoPropertiesFound: "No properties found",
                    HelpMessage: "Please provide an address before continuing"
                }
            };
        },
        computed: {
            HasSearchResults(): boolean {
                return !this.IsProcessingSearch && this.Properties.length > 0;
            }
        },
        props: {
            Properties: {
                required: true,
                type: Array as PropType<Array<MappedProperty>>
            },
            DisplayHelpMessage: {
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
            AlertWarning
        }
    });
</script>