<template>
    <template v-if="HasSelectedResults">
        <h2 class="h5 mb-3">{{CustomMessages.SelectedProperties}}</h2>
        <div class="table-responsive-md immo-bg-light-grey min-h-9">
            <table class="table">
                <caption class="sr-only">{{CustomMessages.ListOfSelectedProperties}}</caption>
                <thead>
                    <tr>
                        <th class="text-center">{{CustomMessages.Address}}</th>
                        <th class="text-center">{{CustomMessages.Postcode}}</th>
                        <th class="text-center">{{CustomMessages.NumberOfRooms}}</th>
                        <th class="text-center" v-html="CustomMessages.FloorArea"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="selectedProperty in SelectedProperties" :key="selectedProperty.Id">
                        <td class="text-center">{{selectedProperty.Address}}</td>
                        <td class="text-center">{{selectedProperty.Postcode}}</td>
                        <td class="text-center">{{selectedProperty.NumberOfRooms}}</td>
                        <td class="text-center">{{selectedProperty.FloorArea}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </template>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue";

    // Models
    import { MappedPropertyBase } from "../../Models/Pages/PropertySearch/PropertiesConfiguration";

    export default defineComponent({
        name: "SelectedSearchResults",
        data(): any {
            return {
                CustomMessages: {
                    Address: "Address",
                    Postcode: "Postcode",
                    NumberOfRooms: "Number of rooms",
                    FloorArea: "Floor area (m<sup>2</sup>)",
                    SelectedProperties: "Selected properties",
                    ListOfSelectedProperties: "List of selected properties"
                }
            };
        },
        computed: {
            HasSelectedResults(): boolean {
                return !this.IsProcessingSearch && this.SelectedProperties.length > 0;
            }
        },
        props: {
            SelectedProperties: {
                required: true,
                type: Array as PropType<Array<MappedPropertyBase>>
            },
            IsProcessingSearch: {
                type: Boolean,
                required: true
            }
        }
    });
</script>