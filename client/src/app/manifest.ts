import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'zkml-search',
        short_name: 'zkml',
        description: '',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
    };
}