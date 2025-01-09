"use server";

import 'server-only';
import type { Locale } from '@/i18n.config';

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then(module => module.default),
    es: () => import('@/dictionaries/es.json').then(module => module.default)
};

export const getDictionary = async (locale?: Locale) => {
    console.log("Locale recibido:", locale); 
    if (!locale) {
        throw new Error("Locale is undefined. Make sure to pass the correct locale.");
    }
    if (locale in dictionaries) {
        return dictionaries[locale as keyof typeof dictionaries]();
    }
    throw new Error(`Locale '${locale}' is not supported`);
};
