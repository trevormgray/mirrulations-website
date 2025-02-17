import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        server: {
            host: '127.0.0.1',
            port: 5500
        },
        define: {
            'process.env': env
        }
    };
});