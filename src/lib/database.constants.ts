export const ALLOWED_TABLES = [
  "users", "pages", "products", "orders", "order_items",
  "customers", "tickets", "categories", "blog_posts",
  "settings", "modules", "bot_visits", "messages", "forms",
  "suppliers", "form_submissions",
] as const;

export type AllowedTable = typeof ALLOWED_TABLES[number];
