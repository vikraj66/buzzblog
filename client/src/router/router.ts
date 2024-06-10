import { authMiddleware, privateMiddleware } from "@/middleware/authMiddleware";
import { blogPageRouterHandler } from "@/routerHandlers/blogRouterHandler";
import { homepageRouteHandler } from "@/routerHandlers/homeRouterHandler";
import { loginRouteHandler } from "@/routerHandlers/loginRouterHandler";
import { postPageRouteHandler } from "@/routerHandlers/postRouterHandler";
import { sampleRouteHandler } from "@/routerHandlers/sampleRouterHandler";
import { testViewHandler } from "@/routerHandlers/testRouterHandler";
import { writeRouteHandler } from "@/routerHandlers/writeRouterHandler";
import { Router } from 'wayofjs'

const router = new Router();

router.addRoute('/posts/:postId', postPageRouteHandler)
router.addRoute('/', homepageRouteHandler);
router.addRoute('/sample', sampleRouteHandler);
router.addRoute('/login', loginRouteHandler, null, null, [authMiddleware]);
router.addRoute('/write', writeRouteHandler, null, null, [privateMiddleware])
// router.addRoute('/test', testViewHandler);
router.addRoute('/blog/:slug', blogPageRouterHandler)
router.addRoute('/tess', testViewHandler);

export default router;

