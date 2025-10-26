import { toNodeHandler } from 'better-auth/node';
import BetterAuthConfig from './index';

const betterAuthRouter = toNodeHandler(BetterAuthConfig);

export default betterAuthRouter;
