import { authMiddleware, privateMiddleware } from "@/middleware/authMiddleware";
import { blogPageRouterHandler } from "@/routerHandlers/blogRouterHandler";
import { homepageRouteHandler } from "@/routerHandlers/homeRouterHandler";
import { loginRouteHandler } from "@/routerHandlers/loginRouterHandler";
import { postPageRouteHandler } from "@/routerHandlers/postRouterHandler";
import { writeRouteHandler } from "@/routerHandlers/writeRouterHandler";
import { Router } from 'wayofthejs'

const router = new Router();

router.addRoute('/posts/:postId', postPageRouteHandler)
router.addRoute('/', homepageRouteHandler);
router.addRoute('/login', loginRouteHandler, null, null, [authMiddleware]);
router.addRoute('/write', writeRouteHandler, null, null, [privateMiddleware])
router.addRoute('/blog/:slug', blogPageRouterHandler)

export default router;

