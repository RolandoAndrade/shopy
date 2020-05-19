export interface SectionInterface {
    id: number;
    name: string;
    parent: boolean;
    open: boolean;
    openIcon: string;
    icon: string;
    children?: { id: number; name: string }[];
}