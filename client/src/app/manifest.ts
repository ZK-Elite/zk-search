import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'zkml-search',
        short_name: 'zkml',
        description: 'zkSearch is a privacy-centric search engine crafted within the ZKML ecosystem, utilising established privacy-focused technologies while refraining from storing user data. It harnesses the power of venice ai and groq to deliver AI-driven search capabilities within the secure confines of the ZKML subnet, ensuring heightened levels of privacy and security.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
            {
                src: '/twitter-x.png', 
                sizes: '',
                type: 'image/png',
                purpose: 'any'
            }, 
            {
                src: '/zwap-2d.png', 
                sizes: '',
                type: 'image/png',
                purpose: 'any'
            }, 
            {
                src: '/placeholder-image.png', 
                sizes: '',
                type: 'image/png',
                purpose: 'any'
            }, 
            {
                src: '/user.png', 
                sizes: '',
                type: 'image/png',
                purpose: 'any'
            }, 
            {
                src: '/video.png', 
                sizes: '',
                type: 'image/png',
                purpose: 'any'
            }, 
            {
                src: '/logo.svg', 
                sizes: 'any', 
                type: 'image/svg+xml',
                purpose: 'any'
            },
            {
                src: '/search-normal.svg', 
                sizes: 'any', 
                type: 'image/svg+xml',
                purpose: 'any'
            },
            {
                src: '/search-blue.svg', 
                sizes: 'any',  
                type: 'image/svg+xml', 
                purpose: 'any'
            },
            {
                src: '/image.svg', 
                sizes: 'any', 
                type: 'image/svg+xml',
                purpose: 'any'
            },
            {
                src: '/moon.svg', 
                sizes: 'any',
                type: 'image/svg+xml', 
                purpose: 'any'
            },
            {
                src: '/news.svg', 
                sizes: 'any', 
                type: 'image/svg+xml', 
                purpose: 'any'
            },
            {
                src: '/sun.svg', 
                sizes: 'any', 
                type: 'image/svg+xml', 
                purpose: 'any'
            },
            {
                src: '/telegram-out.svg', 
                sizes: 'any', 
                type: 'image/svg+xml', 
                purpose: 'any'
            },
        ],
        background_color: '#00111A',
        theme_color: '#FFFFFF' 
    };
}
