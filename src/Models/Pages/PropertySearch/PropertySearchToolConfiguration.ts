// Models
import { PropertyType } from "../../../api";
import { MappedPropertyBase, MappedProperty } from "../../../Models/Pages/PropertySearch/PropertiesConfiguration";

export interface PropertySearchToolData {
    DisplayHelpMessage: boolean;
    IsProcessingSearch: boolean;
    
    Identifiers: Identifiers;
    CustomMessages: CustomMessages;

    Properties: Array<MappedProperty>;
    PropertyTypes: Array<PropertyType>;
    SelectedProperties: Array<MappedPropertyBase>;
}

interface Identifiers {
    Address: string;
}

interface CustomMessages {    
    Search: string;
    Address: string;
    PropertyTypes: string;
}