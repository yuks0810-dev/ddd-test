# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# OpenSSLとその他の依存関係をインストール
RUN apk add --no-cache openssl openssl-dev python3 make g++

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

# ポートを公開（NestJSデフォルト3000）
EXPOSE 3000

# 開発用のコマンド（docker-composeで上書き）
CMD ["npm", "run", "start:dev"] 