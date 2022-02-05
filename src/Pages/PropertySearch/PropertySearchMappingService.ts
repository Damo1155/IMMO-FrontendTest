// Models
import { PropertiesListEntry } from "../../api";
import { MappedProperties } from "../../Models/Pages/PropertySearch/PropertiesConfiguration";

export const MapProperties = (properties: Array<PropertiesListEntry>) : Array<MappedProperties> => 
    properties.map((property: PropertiesListEntry) => {
        return {
            Id: property.id,
            Address: property.address,
            Postcode: property.postcode,
            PropertyType: property.propertyType
        } as MappedProperties;
    });