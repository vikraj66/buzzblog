import { Controller, Route } from 'wayofnode';
import prisma from '../utils/connect';
import * as http from 'http';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { sessionMiddleware } from '../middleware/sessionMiddleware';

@Controller('/comments')
export class CommentController {
  @Route('get', '/')
  async getAllComments(req: http.IncomingMessage, res: http.ServerResponse) {
    const { searchParams } = new URL(req.url as string, `http://${req.headers.host}`);
    const postSlug = searchParams.get('postSlug');

    try {
      const comments = await prisma.comment.findMany({
        where: {
          ...(postSlug && { postSlug }),
        },
        include: { user: true },
      });

      res.statusCode = 200;
      res.end(JSON.stringify(comments));
    } catch (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }

  @Route('post', '/', 'createComment', [sessionMiddleware])
  async createComment(req: http.IncomingMessage, res: http.ServerResponse) {
    const session = req.session;

    if (!session) {
      res.statusCode = 401;
      res.end('Not Authenticated');
      return;
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const commentData = JSON.parse(body);
        const comment = await prisma.comment.create({
          data: { ...commentData, userEmail: session.user.email },
        });

        res.statusCode = 201;
        res.end(JSON.stringify({ ...comment, image: session.user.image, name: session.user.name }));
      } catch (err) {
        console.log(err)
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
  }
}
