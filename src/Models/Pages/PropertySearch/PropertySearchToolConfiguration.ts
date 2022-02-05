// Models
import { PropertyType } from "../../../api";
import { MappedProperty } from "../../../Models/Pages/PropertySearch/PropertiesConfiguration";

export interface PropertySearchToolData {
    DisplayHelpMessage: boolean;
    IsProcessingSearch: boolean;
    
    Identifiers: Identifiers;
    CustomMessages: CustomMessages;

    Properties: Array<MappedProperty>;
    PropertyTypes: Array<PropertyType>;
}

interface Identifiers {
    Address: string;
}

interface CustomMessages {    
    Search: string;
    Address: string;
    PropertyTypes: string;
}