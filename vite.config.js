import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    return defineConfig({
        server: {
            host: 'localhost',
            port: 5500
        },
        define: {
            'import.meta.env': {
                ...env,
            }
        }
    });
});