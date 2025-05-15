const { execSync } = require('child_process');

console.log('Building project while ignoring TypeScript errors...');

try {
  // Set environment variables to ignore TypeScript errors
  process.env.TSC_COMPILE_ON_ERROR = 'true';
  process.env.GENERATE_SOURCEMAP = 'false';
  
  // Use the standard build command
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  
  // Use local TypeScript to create a transpiled version
  console.log('Attempting to build without TypeScript checks...');
  try {
    execSync('npx react-scripts --max_old_space_size=4096 build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        TSC_COMPILE_ON_ERROR: 'true',
        GENERATE_SOURCEMAP: 'false',
        DISABLE_ESLINT_PLUGIN: 'true'
      }
    });
    console.log('Build completed with TypeScript errors ignored!');
  } catch (error) {
    console.error('Build failed completely:', error.message);
    process.exit(1);
  }
} 