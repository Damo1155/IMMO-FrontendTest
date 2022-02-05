// Models
import { PropertyType } from "../../../api";
import { MappedProperties } from "../../../Models/Pages/PropertySearch/PropertiesConfiguration";

export interface PropertySearchToolData {
    DisplayHelpMessage: boolean;
    IsProcessingSearch: boolean;
    
    Identifiers: Identifiers;
    CustomMessages: CustomMessages;

    PropertyTypes: Array<PropertyType>;
    Properties: Array<MappedProperties>;
}

interface Identifiers {
    Address: string;
}

interface CustomMessages {    
    Search: string;
    Address: string;
    PropertyTypes: string;
}