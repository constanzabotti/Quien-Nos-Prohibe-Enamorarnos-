import { Router, type IRouter } from "express";
import healthRouter from "./health";
import lettersRouter from "./letters";
import versesRouter from "./verses";
import newsletterRouter from "./newsletter";

const router: IRouter = Router();

router.use(healthRouter);
router.use(lettersRouter);
router.use(versesRouter);
router.use(newsletterRouter);

export default router;
