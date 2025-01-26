## Key, Secret, and Access Token

1. Go to **Settings > Apps and sales channels > Develop Apps**
   - https://admin.shopify.com/store/your-shop-name/settings/apps/development
2. Click on **Create an app** or on your existing app
   - https://admin.shopify.com/store/your-shop-name/settings/apps/development/<YOUR_APP>/overview
3. Paste the relevant data into the `.env` file
   ```
   SHOP_NAME="your-shop-name.myshopify.com"
   ADMIN_API_ACCESS_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   API_SECRET_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```
4. Export your unfulfilled orders as a CSV file
   - https://admin.shopify.com/store/your-shop-name/orders?fulfillment_status=unshipped%2Cpartial&status=open
5. Execute the script to generate a parsed CSV
   ```
   yarn --silent tsx src/index.ts ~/Desktop/shopify_orders_export.csv > ~/Desktop/shopify_orders_parsed.csv
   ```
6. Replace contents of shared sheet with parsed export
