import { Controller, Route } from 'wayofthenode';
import prisma from '../utils/connect';
import * as http from 'http';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { sessionMiddleware } from '../middleware/sessionMiddleware';
import { parse } from 'url';

@Controller('/api/comments')
export class CommentController {
  @Route('get', '/')
  async getAllComments(req: http.IncomingMessage, res: http.ServerResponse) {
    const queryObject = parse(req.url || '', true).query;
    const slug = queryObject.slug as string;

    try {
      const comments = await prisma.comment.findMany({
        where: {
          ...(slug && { postSlug:slug }),
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
