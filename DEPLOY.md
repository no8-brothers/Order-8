# 🚀 Vercelデプロイ手順

## 概要

このプロジェクトは自動的に`.env`から`.env.production`に環境変数をコピーしてからビルド・デプロイされます。

## 🔧 セットアップ済み機能

### 自動環境変数コピー

- **`prebuild`スクリプト**: ビルド前に`scripts/copy-env.js`が実行される
- **`.env` → `.env.production`**: 自動コピーでプロダクション用環境変数を生成
- **Vercel設定**: `vercel.json`でSPAルーティング対応

### 利用可能なコマンド

```bash
# ローカルビルドテスト（環境変数コピー含む）
npm run build

# Vercelデプロイ（ビルド + デプロイ）
npm run deploy
```

## 📋 デプロイ手順

### 1. Vercel CLIのインストール

```bash
npm install -g vercel
```

### 2. Vercelにログイン

```bash
vercel login
```

### 3. 初回プロジェクト設定

```bash
vercel
```

初回実行時の質問:
- **Set up and deploy?** → `Y`
- **Which scope?** → 自分のアカウント選択
- **Project name?** → `order8-kakigori` (または任意)
- **Directory?** → `./` (Enter)
- **Override settings?** → `N`

### 4. プロダクションデプロイ

```bash
npm run deploy
```

または

```bash
vercel --prod
```

## 🔄 自動デプロイ（GitHub連携）

### Vercel Dashboard設定

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. **Import Project** → GitHubリポジトリを選択
3. **Build & Development Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm ci`

### 自動化されるフロー

```
Git Push → Vercel自動ビルド → .env → .env.production → ビルド → デプロイ
```

## 📁 ファイル構成

```
├── vercel.json           # Vercel設定（SPA対応）
├── scripts/
│   └── copy-env.js      # 環境変数コピースクリプト
├── .env                 # 開発・デプロイ用環境変数
└── .env.production      # 自動生成されるプロダクション用
```

## 🔐 環境変数管理

### ローカル開発

`.env`ファイルを編集:

```bash
REACT_APP_API_BASE_URL=https://kakigori-api.fly.dev
REACT_APP_STORE_ID=store-001
```

### プロダクション

- ビルド時に`.env`から`.env.production`へ自動コピー
- Vercel Dashboard で手動設定も可能（より安全）

## ✅ デプロイ確認

1. **ビルド成功確認**
   ```bash
   npm run build
   ```

2. **デプロイURL確認**
   - Vercel CLIでURL表示
   - Dashboard で確認

3. **動作テスト**
   - メニュー表示
   - 注文機能
   - API通信

## 🐛 トラブルシューティング

### ビルドエラー

```bash
# ローカルでテスト
npm run build

# 環境変数確認
cat .env.production
```

### デプロイエラー

```bash
# Vercelログ確認
vercel logs [deployment-url]

# 再デプロイ
vercel --prod --force
```

### 環境変数エラー

- `.env`ファイルの存在確認
- `REACT_APP_`プレフィックスの確認
- 特殊文字のエスケープ確認

## 🌐 デプロイ後のURL例

```
Production: https://order8-kakigori.vercel.app
Preview: https://order8-kakigori-git-branch.vercel.app
```