import { load } from "https://deno.land/std@0.186.0/dotenv/mod.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const configSchema = z.object({
    ENV: z.string(),
    HOSTNAME: z.string(),
    LOCALHOST: z.string(),
    BSKY_USERNAME: z.string(),
    BSKY_PASSWORD: z.string(),
    BSKY_HOST: z.string(),
    PG_USERNAME: z.string(),
    PG_PASSWORD: z.string(),
    PG_DATABASE: z.string(),
    PG_HOST: z.string(),
})

let config: z.infer<typeof configSchema> | undefined;

export async function loadConfigFromEnv(): Promise<z.infer<typeof configSchema>> {
    const env_vars = {
        ENV: Deno.env.get("ENV"),
        HOSTNAME: Deno.env.get("HOSTNAME"),
        LOCALHOST: Deno.env.get("LOCALHOST"),
        BSKY_USERNAME: Deno.env.get("BSKY_USERNAME"),
        BSKY_PASSWORD: Deno.env.get("BSKY_PASSWORD"),
        BSKY_HOST: Deno.env.get("BSKY_HOST"),
        PG_USERNAME: Deno.env.get("PG_USERNAME"),
        PG_PASSWORD: Deno.env.get("PG_PASSWORD"),
        PG_DATABASE: Deno.env.get("PG_DATABASE"),
        PG_HOST: Deno.env.get("PG_HOST")
    }
    config = configSchema.parse(env_vars);
    return config;
}

export function setConfig(key: keyof z.infer<typeof configSchema>, value: string) {
    if (!config) {
        throw new Error("config not loaded");
    }
    config[key] = value;
}

export function getConfig(key: keyof z.infer<typeof configSchema>): string {
    if (!config) {
        throw new Error("config not loaded");
    }
    return config[key];
}
