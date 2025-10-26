# ============================================
# Build Stage
# TypeScript 소스 코드를 JavaScript로 컴파일
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# pnpm 패키지 매니저 설치
RUN npm install -g pnpm

# package.json과 pnpm-lock.yaml 복사
# 의존성이 변경되지 않으면 Docker 레이어 캐싱 활용
COPY package*.json pnpm-lock.yaml ./

# 모든 의존성 설치 (devDependencies 포함)
# --frozen-lockfile: lock 파일과 일치하는 버전만 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# TypeScript 빌드 실행 (dist 폴더 생성)
RUN pnpm run build

# ============================================
# Production Dependencies Stage
# 프로덕션 환경에 필요한 의존성만 설치
# ============================================
FROM node:22-alpine AS prod-deps

WORKDIR /app

# 네이티브 모듈 빌드를 위한 도구 설치
RUN apk add --no-cache python3 make g++

# pnpm 패키지 매니저 설치
RUN npm install -g pnpm

# package.json과 pnpm-lock.yaml 복사
COPY package*.json pnpm-lock.yaml ./

# 프로덕션 의존성만 설치 (devDependencies 제외)
# 최종 이미지 크기를 줄이기 위함
# better-sqlite3 빌드 스크립트 실행을 허용
RUN pnpm config set enable-pre-post-scripts true && \
    pnpm install --prod --frozen-lockfile && \
    cd node_modules/better-sqlite3 && npm run build-release || true

# ============================================
# Production Stage
# 최종 실행 환경 구성
# ============================================
FROM node:22-alpine

WORKDIR /app

# pnpm 패키지 매니저 설치
RUN npm install -g pnpm

# 프로덕션 의존성만 복사 (devDependencies 제외)
COPY --from=prod-deps /app/node_modules ./node_modules

# 빌드된 JavaScript 파일 복사
COPY --from=builder /app/dist ./dist

# package.json 복사 (앱 메타데이터용)
COPY package*.json ./

# 환경변수 설정
ENV PORT=3000
ENV NODE_ENV=production

# 애플리케이션 포트 노출 (Express 기본 포트)
EXPOSE 3000

# 컨테이너 시작 시 실행할 명령어
CMD ["node", "dist/src/index.js"]
