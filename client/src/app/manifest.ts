import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'zkml-search',
        short_name: 'zkml',
        description: '',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
         //Mock Data->
        icons: [
            {
                src: '/og.png', 
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/og.png', 
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
        background_color: '#ffffff',
        theme_color: '#3367D6' 
    };
}
