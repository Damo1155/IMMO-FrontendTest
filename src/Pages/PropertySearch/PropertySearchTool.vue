<template>
    <div class="row">
        <div class="col-md-2" aria-hidden="true" role="presentation"></div>
        <div class="col-md-10">
            <form @submit.prevent="ProcessSearch" class="mb-3">
                <h2 class="h5 mb-3">{{CustomMessages.Search}}</h2>
                
                <div class="immo-search-group">
                    <InputText :Text="CustomMessages.Address" :FieldIdentifier="Identifiers.Address" :IsRequired="true" :AsPlaceholder="true"></InputText>
                    <SubmitAction :Text="CustomMessages.Search" :IsProcessing="IsProcessingSearch"></SubmitAction>
                </div>
            </form>
            
            <SelectedSearchResults :SelectedProperties="SelectedProperties"></SelectedSearchResults>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-md-2">
            <template v-if="HasPropertyTypes">
                <h2 class="h5 mb-3">{{CustomMessages.PropertyTypes}}</h2>
                <div class="immo-property-types">
                    <ul>
                        <template v-for="(propertyType, index) in PropertyTypes" :key="index">
                            <li>
                                <a href="#" @click="ProcessSearch(propertyType.value)">{{propertyType.label}}</a>
                            </li>
                        </template>
                    </ul>
                </div>
            </template>
        </div>
        <div class="col-md-10">
            <SearchResults :Properties="Properties" :DisplayHelpMessage="DisplayHelpMessage" :IsProcessingSearch="IsProcessingSearch"
                           :HasErrorOccurred="HasErrorOccurred" @UpdatePropertySelection="UpdatePropertySelection"></SearchResults>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    // Api
    import { fetchProperties, fetchPropertyDetails, getAvailablePropertyTypes, PropertyDetails, PropertyType } from "../../api";

    // Models
    import { PropertySearchToolData } from "../../Models/PropertySearch/PropertySearchToolConfiguration";
    import { MappedPropertyBase, MappedProperty } from "../../Models/PropertySearch/PropertiesConfiguration";

    // Services
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
                HasErrorOccurred: false,
                DisplayHelpMessage: true,
                IsProcessingSearch: false,
                CustomMessages: {
                    Search: "Search",
                    Address: "Address",
                    PropertyTypes: "Property types",
                    PropertySearch: "Property search"
                },
                Identifiers: {
                    Address: "immo-address-search"
                }
            } as PropertySearchToolData;
        },
        computed: {
            HasPropertyTypes(): boolean {
                return !this.IsProcessingSearch && this.Properties.length > 0;
            }
        },
        methods:{
            UpdatePropertySelection(id: string): void {
                const properties = this.Properties as Array<MappedProperty>;
                const property = properties.find((property: MappedProperty) => property.Id == id);

                if(property.IsSelected) {
                    // Important    :   Cannot rely on 'index' with 'splice'/'$delete' due to dealing with 2 different objects.
                    const selectedProperties = (this.SelectedProperties as Array<MappedPropertyBase>);
                    const filteredProperties = selectedProperties.filter((selectedProperty: MappedPropertyBase) => selectedProperty.Id !== id);
                    
                    this.SelectedProperties = filteredProperties;
                    
                    return;
                }

                const newSelectedProperty = {
                    Id: property.Id,
                    Address: property.Address,
                    Postcode: property.Postcode,
                    FloorArea: property.FloorArea,
                    NumberOfRooms: property.NumberOfRooms
                } as MappedPropertyBase;

                (this.SelectedProperties as Array<MappedPropertyBase>).push(newSelectedProperty);
            },
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
                this.HasErrorOccurred = false;
                this.IsProcessingSearch = true;
                this.DisplayHelpMessage = false;

                const address = RetrieveValue(this.Identifiers.Address) as string;
                
                // Purpose  :   Some requests are being bubbled back up with an object rather than string.
                const propertyType = (typeof(type) === "string" ? type : undefined) as string;

                fetchProperties({ address, propertyType })
                    .then(({ properties }) => {
                        const ids = properties.map((property) => property.id);

                        this.RetrievePropertyDetails(ids);
                    })
                    .catch(() => {
                        this.HasErrorOccurred = true;
                        this.IsProcessingSearch = false;
                    });
            },
            RetrievePropertyDetails(ids: Array<string>): void {                
                const promises = [] as Array<Promise<{ property: PropertyDetails }>>;

                ids.forEach((id: string) => {
                    promises.push(fetchPropertyDetails(id));
                });

                const selectedProperties = (this.SelectedProperties as Array<MappedPropertyBase>)

                // Note :   To combat significant UI lag the following is wrapped in a promise so they're
                //          all resolved at the same point.
                Promise.all(promises)
                    .then((response) => {
                        const mappedProperties = 
                            response.map(({ property }) => {
                                const isSelected = selectedProperties
                                    .some((selectedProperty: MappedPropertyBase) => selectedProperty.Id === property.id);

                                return {
                                    Id: property.id,
                                    IsSelected: isSelected,
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
                        this.HasErrorOccurred = true;
                        this.IsProcessingSearch = false;
                    })
                    .finally(() => {
                        this.IsProcessingSearch = false;
                    });
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
        mounted(): void {
            this.RetrievePropertyTypes();            
            
            document.title = this.CustomMessages.PropertySearch;
        },
        components: {
            InputText,
            SubmitAction,
            SearchResults,
            SelectedSearchResults
        }
    });
</script>