/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_SUPERBASE_URL: string;
    readonly VITE_SUPERBASE_PUBLIC_KEY: string;
    readonly VITE_TEMPLATE_NAME: string;
    readonly VITE_GALLERY_IMAGE_LIMIT: number;
}

interface MetaImport {
    readonly env: ImportMetaEnv;
}
