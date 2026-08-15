import path from 'path';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGO_URI: z.string().url(),
  JWT_SECRET: z.string().min(1),
  CLIENT_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

export default env;
