import { SectionInterface } from '@/interfaces/section.interface';

export interface ProductFilterInterface {
    title: string;
    rating?: number[];
    sections?: SectionInterface[];
    types?: {
        name: string;
        used: boolean;
        icon: string;
    }[];
}
