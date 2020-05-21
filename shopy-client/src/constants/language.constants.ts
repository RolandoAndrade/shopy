import { TranslatorInterface } from '@/interfaces/translator.interface';
import { TranslatorService } from '@/translations/translator';

export const DEFAULT_LANGUAGE = 'en';
export const ENGLISH = 'en';
export const SPANISH = 'es';
export const translator: TranslatorInterface = new TranslatorService();
