# Deployment Instructions for Production

## Prerequisites
- Ensure that you have access to the production server.
- Make sure that all environment variables are configured properly.

## Steps to Deploy
1. Pull the latest changes from the main branch:
   ```bash
   git pull origin main
   ```

2. Build the application:
   ```bash
   npm install
   npm run build
   ```

3. Restart the application service:
   ```bash
   pm2 restart your-app-name
   ```

4. Verify the deployment by checking the application URL.

## Rollback
If the deployment fails, you can roll back to the previous version:
```bash
git reset --hard HEAD~1
pm restart your-app-name
```