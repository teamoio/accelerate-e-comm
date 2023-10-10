import { NextFunction, Response } from "express";

const setCache = (req: Request, res: Response, next: NextFunction) => {
  // keep cache for 5 minutes
  const period = 60 * 5;

  // only cache GET requests
  if (req.method === "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    // for other requests set strict no cache parameters
    res.set("Cache-control", "no-store");
  }

  next();
};
export default setCache;
