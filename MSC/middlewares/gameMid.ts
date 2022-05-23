import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const BAD_REQ = 400;


const ValidId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  if (!userId || userId === '') {
   return res.status(StatusCodes.BAD_REQUEST)
     .json({ message: '"id" is required' });
  }
  if (Number(userId) < 1) {
   return res.status(BAD_REQ)
     .json({ message: '"id" must be a number greater than 0' });
  }
 next();
};

const validBody = (req: Request, res: Response, next: NextFunction) => {
  const { successes, mistakes, result, userId } = req.body;
  if (!successes || successes === '') {
   return res.status(StatusCodes.BAD_REQUEST)
     .json({ message: '"successes" is required' });
  }

  if (!mistakes || mistakes === '') {
   return res.status(StatusCodes.BAD_REQUEST)
     .json({ message: '"mistakes" is required' });
   }

  if (typeof result !== 'boolean' || result === undefined) {
  return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"result" is mandatory, and must be a boolean value' });
  }

  if (!userId || userId === '') {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: '"userId" is required' });
    }
 next();
};

export default  {
  ValidId,
  validBody,
};