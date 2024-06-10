import { App } from 'wayofnode';
import { PostController } from './controllers/postController';
import { CommentController } from './controllers/commentController';
import { CategoryController } from './controllers/categoryController';
import { AuthController } from './controllers/authController';
import { LoggingMiddleware } from './middleware/loggingMiddleware';
import { corsMiddleware } from './middleware/corsMiddleware';
import * as http from 'http';

const app = new App();
app.server.setRequestHandler((req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  next();
});

app.use(corsMiddleware)
app.use(LoggingMiddleware);

app.registerController(new PostController());
app.registerController(new CommentController());
app.registerController(new CategoryController());
app.registerController(new AuthController());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
