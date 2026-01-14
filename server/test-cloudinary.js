const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test connection
async function testCloudinary() {
  try {
    console.log('Testing Cloudinary connection...');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    
    // Try to get account details (this will fail if credentials are wrong)
    const result = await cloudinary.api.ping();
    
    console.log('✅ Cloudinary connected successfully!');
    console.log('Status:', result.status);
    console.log('\n🎉 Ready to upload images!');
  } catch (error) {
    console.error('❌ Cloudinary connection failed!');
    console.error('Error:', error.message);
    console.log('\n⚠️  Please check your credentials in .env file');
  }
}

testCloudinary();
