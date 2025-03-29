# ベースイメージ
FROM node:20-alpine

# 必要なパッケージをインストール
RUN apk add --no-cache openssl

# 作業ディレクトリを設定
WORKDIR /app

# 必要なパッケージをインストール
COPY package.json ./
RUN yarn install

# ポートを公開（NestJSデフォルト3000）
EXPOSE 3000

# 開発用のコマンド（docker-composeで上書き）
CMD ["yarn", "start:dev"] 