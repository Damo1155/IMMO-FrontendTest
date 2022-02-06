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
            <SelectedSearchResults :SelectedProperties="SelectedProperties" :IsProcessingSearch="IsProcessingSearch"></SelectedSearchResults>
            <SearchResults :Properties="Properties" :DisplayHelpMessage="DisplayHelpMessage" :IsProcessingSearch="IsProcessingSearch"></SearchResults>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, toRaw } from "vue";

    // Api
    import { fetchProperties, fetchPropertyDetails, getAvailablePropertyTypes, PropertyDetails, PropertyType } from "../../api";

    // Models
    import { PropertySearchToolData } from "../../Models/Pages/PropertySearch/PropertySearchToolConfiguration";
    import { MappedPropertyBase, MappedProperty } from "../../Models/Pages/PropertySearch/PropertiesConfiguration";

    // Services
    import { DistinctBy } from "../../Services/Array/DuplicatesService";
    import { IsValid } from "../../Services/Validation/ValidationService";
    import { RetrieveValue } from "../../StoreManagement/StoreManagementService";

    // Modules
    import SearchResults from "./SearchResults.vue";
    import SelectedSearchResults from "./SelectedSearchResults.vue";

    // Components
    import InputText from "../../Components/Inputs/InputText.vue";
    import SubmitAction from "../../Components/Buttons/SubmitAction.vue";

    export default defineComponent({
        name: "PropertySearchTool",
        data(): PropertySearchToolData {
            return {
                Properties: [],
                PropertyTypes: [],
                SelectedProperties: [],
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

                this.Properties = [];
                this.IsProcessingSearch = true;

                const address = RetrieveValue(this.Identifiers.Address) as string;
                
                // Purpose  :   Some requests are being bubbled back up with an object rather than string.
                const propertyType = (typeof(type) === "string" ? type : undefined) as string;

                fetchProperties({ address, propertyType })
                    .then(({ properties }) => {
                        const ids = properties.map((property) => property.id);

                        this.RetrievePropertyDetails(ids);
                    })
                    .catch(() => {
                        // TODO :   Display an error message as it's sending back randomly generated errors.
                    })
                    .finally(() => {
                        this.IsProcessingSearch = false;
                        this.DisplayHelpMessage = false;
                    });
            },
            RetrievePropertyDetails(ids: Array<string>): void {
                // Note :   To combat UI lag, a race condition in 'ArePropertiesSelected' and the watch executing multiple times,
                //          the following is wrapped in a promise which will resolve everything at the same point.
                
                const promises = [] as Array<Promise<{ property: PropertyDetails }>>;

                ids.forEach((id: string) => {
                    promises.push(fetchPropertyDetails(id));
                });

                Promise.all(promises)
                    .then((response) => {
                        const mappedProperties = 
                            response.map(({ property }) => {
                                return {
                                    Id: property.id,
                                    IsSelected: false, // TODO  :   Compare against the 'SelectedProperties' array to see if it's selected
                                    Address: property.address,
                                    Postcode: property.postcode,
                                    FloorArea: property.floorArea,
                                    PropertyType: property.propertyType,
                                    NumberOfRooms: property.numberOfRooms
                                } as MappedProperty;
                            });

                        this.Properties = mappedProperties;
                    })
                    .catch(() => {
                        // TODO :   Display an error message as it's sending back randomly generated errors.
                    })
            },
            RetrievePropertyTypes(): void {
                getAvailablePropertyTypes()
                    .then(({ propertyTypes }) => {
                        propertyTypes.unshift({
                            label: "All",
                            value: undefined
                        } as PropertyType);

                        this.PropertyTypes = propertyTypes;
                    });
            }
        },
        computed: {
            ArePropertiesSelected(): boolean {
                return this.Properties.map((property: MappedProperty) => property.IsSelected);
            }
        },
        watch:{
            ArePropertiesSelected(): void {
                // TODO :   Deselecting the 'Selected Properties' doesn't remove them from the list.
                //          Might need to be done differently, look into emitting a callback.
                //              This way the ID of the selected object can be sent back rather than relying on reactive objects.

                const properties = this.Properties as Array<MappedProperty>;

                // Important    :   Reactive property which needs to be unwrapped when assigning to 'updatedSelection',
                //                  otherwise it'll be assigned as a proxy.
                const selectedProperties = toRaw(this.SelectedProperties) as Array<MappedPropertyBase>;
                
                const newAdditions = properties
                    .filter((property: MappedProperty) => property.IsSelected)
                    .map((property: MappedProperty) => {
                        return {
                            Id: property.Id,
                            Address: property.Address,
                            Postcode: property.Postcode,
                            FloorArea: property.FloorArea,
                            NumberOfRooms: property.NumberOfRooms
                        } as MappedPropertyBase;
                    });

                const updatedSelection = [] as Array<MappedPropertyBase>;
                
                updatedSelection.push(...selectedProperties);
                updatedSelection.push(...newAdditions);

                // Purpose  :   Due to the above it's possible duplicates could be added so those are removed.
                this.SelectedProperties = DistinctBy("Id", updatedSelection);
            }
        },
        mounted(): void {
            this.RetrievePropertyTypes();
        },
        components: {
            InputText,
            SubmitAction,
            SearchResults,
            SelectedSearchResults
        }
    });
</script>