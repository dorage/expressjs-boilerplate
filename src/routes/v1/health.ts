import express from 'express';

const router = express.Router();

/**
 * @openapi
 * /v1/health:
 *   get:
 *     description: 서버 헬스체크
 *     tags:
 *       - Health v1
 *     responses:
 *       200:
 *         description: 서버가 정상적으로 작동 중입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 okay:
 *                   type: boolean
 *                   example: true
 */
router.get('/health', (_, res) => {
  res.json({ okay: true });
});

export default router;
