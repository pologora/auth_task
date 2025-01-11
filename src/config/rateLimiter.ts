import { rateLimit } from 'express-rate-limit';

const minutes = 15;
const secondsInMinute = 60;
const millisecndsInSecond = 1000;
const requestsPerWindow = 100;
const standardHeaders = 'draft-8';

export const rateLimiter = rateLimit({
  legacyHeaders: false,
  limit: requestsPerWindow,
  standardHeaders,
  windowMs: minutes * secondsInMinute * millisecndsInSecond,
});
