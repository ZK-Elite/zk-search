import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "zkml-search",
    short_name: "zkml",
    description:
      "zkSearch is a privacy-centric search engine crafted within the ZKML ecosystem, utilising established privacy-focused technologies while refraining from storing user data. It harnesses the power of venice ai and groq to deliver AI-driven search capabilities within the secure confines of the ZKML subnet, ensuring heightened levels of privacy and security.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: "/logo-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo-384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    background_color: "#00111A",
    theme_color: "#3367D6",
  };
}
