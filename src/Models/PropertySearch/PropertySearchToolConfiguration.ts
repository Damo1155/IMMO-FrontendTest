// Models
import { PropertyType } from "../../api";
import { MappedPropertyBase, MappedProperty } from "./PropertiesConfiguration";

export interface PropertySearchToolData {
    HasErrorOccurred: boolean;
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
    PropertySearch: string;
}