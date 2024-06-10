import { Controller, Route } from 'wayofthenode';
import prisma from '../utils/connect';
import * as http from 'http';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { session } from 'passport';
import { sessionMiddleware } from '../middleware/sessionMiddleware';

@Controller('/categories')
export class CategoryController {
  @Route('get', '/')
  async getAllCategories(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      const categories = await prisma.category.findMany();

      res.statusCode = 200;
      res.end(JSON.stringify(categories));
    } catch (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }

  @Route('post', '/', 'createCategory', [sessionMiddleware])
  async createCategory(req: http.IncomingMessage, res: http.ServerResponse) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const categoryData = JSON.parse(body);
        const category = await prisma.category.create({
          data: categoryData,
        });

        res.statusCode = 201;
        res.end(JSON.stringify(category));
      } catch (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
  }
}
