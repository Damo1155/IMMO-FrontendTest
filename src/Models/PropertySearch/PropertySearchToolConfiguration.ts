// Models
import { PropertyType } from "../../TestDependencies/api";
import { MappedPropertyBase, MappedProperty } from "./PropertiesConfiguration";

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
    PropertySearch: string;
    AddressRequired: string;
    LoadingProperties: string;
}