# GitHub Actions CI セットアップガイド

## 概要

このプロジェクトではGitHub ActionsによるCIを設定し、Pull Request時に以下のチェックを自動実行します：

- ✅ **フォーマットチェック** (Prettier)
- ✅ **ビルドチェック** (npm run build)
- ✅ **ユニットテスト** (Jest)

## 設定済みワークフロー

### `.github/workflows/ci.yml`

- **トリガー**: mainブランチへのPull RequestとPush
- **Node.js バージョン**: 18.x, 20.x (マトリックス実行)
- **実行コマンド**: `npm test` (フォーマット + ビルド + テストの包括チェック)

## ブランチ保護ルールの設定

GitHubリポジトリでブランチ保護を有効にするには：

### 1. GitHubリポジトリの設定画面

1. リポジトリページで **Settings** タブをクリック
2. 左メニューから **Branches** を選択
3. **Add rule** ボタンをクリック

### 2. ブランチ保護ルールの設定

```
Branch name pattern: main
```

以下の項目にチェック：

- ☑️ **Require a pull request before merging**
  - ☑️ Require approvals: `1`
  - ☑️ Dismiss stale PR approvals when new commits are pushed
  
- ☑️ **Require status checks to pass before merging**
  - ☑️ Require branches to be up to date before merging
  - 必須ステータスチェック: `test (18.x)`, `test (20.x)`

- ☑️ **Require conversation resolution before merging**

- ☑️ **Restrict pushes that create files larger than 100MB**

### 3. ステータスチェックの追加

**Required status checks** セクションで：

1. 検索ボックスに `test` と入力
2. 表示される以下を選択：
   - `test (18.x)`
   - `test (20.x)`

## 使用方法

### 開発フロー

1. **新機能ブランチを作成**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **開発・コミット**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push後、Pull Request作成**
   ```bash
   git push origin feature/new-feature
   ```

4. **GitHub上でPull Request作成**
   - CIが自動実行される
   - 全チェックが✅になるまでマージ不可

### ローカルでの事前チェック

PR作成前にローカルで同じチェックを実行：

```bash
npm test  # フォーマット + ビルド + テスト
```

個別実行：
```bash
npm run format:check  # フォーマットチェックのみ
npm run build        # ビルドチェックのみ
npm run test:watch   # テストのみ（watch mode）
```

## トラブルシューティング

### CI失敗時の対処法

1. **フォーマットエラー**
   ```bash
   npm run format  # 自動修正
   ```

2. **ビルドエラー**
   - TypeScriptエラー、インポートエラー等を修正
   - `npm run build`でローカル確認

3. **テスト失敗**
   - `npm run test:watch`でローカルデバッグ
   - テストコードまたは実装コードを修正

### Node.js バージョン対応

- CIではNode.js 18.x, 20.x両方でテスト
- ローカル開発でも対応バージョンを使用推奨

## メリット

- 🛡️ **品質保証**: 問題のあるコードのマージを防止
- 🔄 **自動化**: 手動チェック作業を削減
- 👥 **チーム開発**: 一貫したコード品質を維持
- 🚀 **安全なデプロイ**: ビルド成功を保証