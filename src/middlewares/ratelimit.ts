import { rateLimit } from "express-rate-limit";

const env = process.env.NODE_ENV || "dev";
const rateLimitRequest = Number(process.env.RATE_LIMIT_TIME) || 15;
const rateLimitTime = Number(process.env.RATE_LIMIT_REQUEST) || 100;

export default () => {
  return rateLimit({
    windowMs: env === "production" ? rateLimitTime : 5 * 60 * 1000, // 15 minutes by default
    limit: rateLimitRequest, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  });
};
