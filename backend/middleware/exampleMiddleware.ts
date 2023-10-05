const exampleMiddleware = (req: any, res: any, next: any) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

export default exampleMiddleware;
