# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 必要なパッケージをインストール
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ソースコードをコピー
COPY . .

# アプリをビルド
RUN yarn build

# ポートを公開（NestJSデフォルト3000）
EXPOSE 3000

# Nestアプリ起動
CMD ["yarn", "start:prod"] 