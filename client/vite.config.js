import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/

export default defineConfig({
    //set build preview port to 3000
    plugins: [react()],
    server: {
        port: 3000,
    },
});
