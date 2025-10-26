import { UserRepository } from '@/repositories/user';
import { UserService } from '@/services/user';
import express from 'express';

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

/**
 * @openapi
 * /v1/user:
 *   get:
 *     description: 사용자 목록 조회 (이름으로 검색)
 *     tags:
 *       - Users v1
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 검색할 사용자 이름
 *     responses:
 *       200:
 *         description: 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/user', async (req, res) => {
  const query = req.query;

  const users = userService.searchUser(query.name as string);

  res.json(users);
});

/**
 * @openapi
 * /v1/user/{userId}:
 *   get:
 *     description: 특정 사용자 상세 정보 조회
 *     tags:
 *       - Users v1
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 상세 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get('/user/:userId', async (req, res) => {
  const params = req.params;

  const user = await userService.getUserDetail(Number(params.userId));

  res.json(user);
});

export default router;
