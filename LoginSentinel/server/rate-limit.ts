import rateLimit from "express-rate-limit";

const isLoadTestMode = process.env.LOAD_TEST_MODE === "true";

export const loginRateLimiter = rateLimit({
  windowMs: isLoadTestMode ? 1000 : 15 * 60 * 1000,
  max: isLoadTestMode ? 10000 : 5,
  message: "Too many login attempts from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isLoadTestMode,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many login attempts",
      message: "Please try again later",
      retryAfter: 15 * 60,
    });
  },
});

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: isLoadTestMode ? 100000 : 100,
  message: "Too many requests from this IP",
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isLoadTestMode,
});
