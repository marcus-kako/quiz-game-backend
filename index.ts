import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserRoutes from './routes/user.routes';
import LoginRoutes from './routes/login.routes';
import GameRoutes from './routes/game.routes';
import 'express-async-errors';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('Quiz Game API')
});

app.use('/users', UserRoutes);
app.use('/login', LoginRoutes);
app.use('/games', GameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});