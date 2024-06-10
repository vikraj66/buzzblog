import { Controller, Route } from 'wayofnode';
import prisma from '../utils/connect';
import * as http from 'http';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { sessionMiddleware } from '../middleware/sessionMiddleware';
import { parse } from 'url';



@Controller('/posts')
export class PostController {
  @Route('get', '/', 'getAllPosts')
  async getAllPosts(req: http.IncomingMessage, res: http.ServerResponse) {
    const { searchParams } = new URL(req.url as string, `http://${req.headers.host}`);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const cat = searchParams.get('cat');

    const POST_PER_PAGE = 2;

    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(cat && { catSlug: cat }),
      },
    };

    try {
      const [posts, count] = await prisma.$transaction([
        prisma.post.findMany({
          ...query,
          orderBy: {
            createdAt: 'desc'
          }
        }),
        prisma.post.count({ where: query.where }),
      ]);
      res.statusCode = 200;
      res.end(JSON.stringify({ posts, count }));
    } catch (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }

  @Route('get', '/blog', 'getPost')
  async getPost(req: http.IncomingMessage, res: http.ServerResponse) {
    const queryObject = parse(req.url || '', true).query;
    const slug = queryObject.slug as string;

    try {
      const post = await prisma.post.update({
        where: { slug },
        data: { views: { increment: 1 } },
        include: { user: true, comments: true },
      });

      res.statusCode = 200;
      res.end(JSON.stringify(post));
    } catch (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }

  @Route('post', '/', 'createPost', [sessionMiddleware])
  async createPost(req: http.IncomingMessage, res: http.ServerResponse) {
    const session = req.session;

    if (!session) {
      res.statusCode = 401;
      res.end('Not Authenticated');
      return;
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      console.log(body)
      try {
        const postData = JSON.parse(body);
        console.log(postData)
        const post = await prisma.post.create({
          data: { ...postData, userEmail: session.user.email },
        });

        res.statusCode = 201;
        res.end(JSON.stringify(post));
      } catch (err) {
        console.log(err)
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
  }
}
