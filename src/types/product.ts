export interface IProduct {
    id: string;
    active: boolean;
    default_price: string;
    description: string;
    metadata?: object;
    name: string;
    attributes: [];
    created: number;
    images: string[];
    livemode: boolean;
    object: "product";
    package_dimensions: null;
    shippable: null;
    statement_descriptor: null;
    tax_code: null;
    type: "service";
    unit_label: null;
    updated: number;
    url: null;
}