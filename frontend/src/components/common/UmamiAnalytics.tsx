"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { api } from '@/utils/api';

export default function UmamiAnalytics() {
    const [config, setConfig] = useState<{ id: string; url: string } | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const settings = await api.getSettings();
                if (settings?.analytics_id) {
                    setConfig({
                        id: settings.analytics_id,
                        url: settings.analytics_url || 'https://cloud.umami.is/script.js'
                    });
                }
            } catch (error) {
                console.error('Umami config fetch error:', error);
            }
        };
        fetchConfig();
    }, []);

    if (!config?.id) return null;

    return (
        <Script
            async
            defer
            src={config.url}
            data-website-id={config.id}
        />
    );
}
