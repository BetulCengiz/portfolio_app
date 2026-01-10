"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import common_tr from './locales/tr/common.json';
import common_en from './locales/en/common.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            tr: { common: common_tr },
            en: { common: common_en }
        },
        lng: 'tr', // Default language
        fallbackLng: 'tr',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie']
        }
    });

export default i18n;
