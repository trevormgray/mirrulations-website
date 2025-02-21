import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    return {
        server: {
            host: 'localhost',
            port: 5500
        },
        build: {
            outDir: 'dist', // Specifies the output directory for the build
        },
        define: {
            'import.meta.env': {
                ...env,
            }
        }
    };
});