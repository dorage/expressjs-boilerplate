import { app } from '@/app';
import request from 'supertest';

export const apiClient = request(app);
