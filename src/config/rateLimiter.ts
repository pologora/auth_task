import { rateLimit } from 'express-rate-limit';
import { config } from './config';

const secondsInMinute = 60;
const millisecndsInSecond = 1000;
const standardHeaders = 'draft-8';

export const rateLimiter = rateLimit({
  legacyHeaders: false,
  limit: config.limits.requestPerWindow,
  standardHeaders,
  windowMs: config.limits.windowMinutes * secondsInMinute * millisecndsInSecond,
});
