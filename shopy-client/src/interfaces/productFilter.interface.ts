export interface ProductFilteri {
    id: number;
    name: string;
    parent: boolean;
    open: boolean;
    openIcon: string;
    children?: { id: number; icon?: string; name: string }[];
    rating?: Array<number>;
}
