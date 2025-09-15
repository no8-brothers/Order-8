const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envProductionPath = path.join(__dirname, '..', '.env.production');

try {
  // .envファイルが存在するかチェック
  if (fs.existsSync(envPath)) {
    // .envの内容を読み取り
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // .env.productionに書き込み
    fs.writeFileSync(envProductionPath, envContent);
    
    console.log('✅ Successfully copied .env to .env.production');
    console.log('Environment variables for production build:');
    console.log(envContent.trim());
  } else {
    console.warn('⚠️  .env file not found, skipping copy operation');
  }
} catch (error) {
  console.error('❌ Error copying environment variables:', error.message);
  process.exit(1);
}