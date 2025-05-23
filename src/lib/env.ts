import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    EMAIL_FROM_NAME: z.string(),
    EMAIL_FROM_ADDRESS: z.string(),
    MAILER_API_KEY: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_WEBHOOK_SECRET: z.string(),
    FOURLLM_API_KEY: z.string(),
  },
  client: {},
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXT_PUBLIC_DEVELOPMENT_URL: z.string().optional(),
    NEXT_PUBLIC_POLAR_FREE_PRODUCT_ID: z.string(),
    NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    MAILER_API_KEY: process.env.MAILER_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
    NEXT_PUBLIC_POLAR_FREE_PRODUCT_ID: process.env.NEXT_PUBLIC_POLAR_FREE_PRODUCT_ID,
    NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID: process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
    NEXT_PUBLIC_DEVELOPMENT_URL: process.env.NEXT_PUBLIC_DEVELOPMENT_URL,
    FOURLLM_API_KEY: process.env.FOURLLM_API_KEY,
  },
});
