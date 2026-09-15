import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import leadsRouter from "./leads.js";
import shipmentsRouter from "./shipments.js";
import carrierAgreementRouter from "./carrier-agreement.js";
import adminAuthRouter from "./admin/auth.js";
import adminShipmentsRouter from "./admin/shipments.js";
import adminLeadsRouter from "./admin/leads.js";
import adminUsersRouter from "./admin/users.js";
import adminRolesRouter from "./admin/roles.js";
import adminLoadsRouter from "./admin/loads.js";
import adminRateConfirmationsRouter from "./admin/rate-confirmations.js";
import storageRouter from "./storage.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(shipmentsRouter);
router.use(carrierAgreementRouter);
router.use(adminAuthRouter);
router.use(adminShipmentsRouter);
router.use(adminLeadsRouter);
router.use(adminUsersRouter);
router.use(adminRolesRouter);
router.use(adminLoadsRouter);
router.use(adminRateConfirmationsRouter);
router.use(storageRouter);

export default router;
