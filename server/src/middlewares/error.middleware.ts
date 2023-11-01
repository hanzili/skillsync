import { NextFunction, Request, Response } from 'express'

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack) // Log the error stack for debugging
  res.status(500).send(err.message)
}

export default errorMiddleware
