// ── Zentrale Datenbank-Types für paeffgen-next ────────────────────────────────
// Basierend auf dem Supabase Schema — einmal definiert, überall nutzbar!
// Import: import type { BlogPost, Page, Product, ... } from "@/types/database";

export type Page = {
  id: number;
  title: string;
  slug: string;
  content_json: string | null;
  is_published: boolean;
  is_system_node: boolean;
  show_in_nav: boolean;
  created_at: string;
  updated_at: string;
  nav_order: number;
  is_landingpage: boolean;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  author_id: string | null;
  main_image: string | null;
  created_at: string;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[];
  category_id: number | null;
  status?: string;
};

export type BlogComment = {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  created_at: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  module: string | null;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
  stock: number;
  category_id: number | null;
  supplier_id: number | null;
  in_stock: boolean;
  created_at: string;
  cost_price: number;
  min_stock: number;
  vat_rate: number;
};

export type Customer = {
  id: number;
  email: string;
  full_name: string;
  created_at: string;
  password_hash: string | null;
  tier: string;
  customer_number: number;
};

export type Order = {
  id: number;
  customer_id: number | null;
  order_date: string;
  status: string;
  total_price: number | null;
  gesamtpreis?: number | null;
};

export type OrderItem = {
  id: number;
  order_id: number | null;
  product_id: number | null;
  quantity: number;
  price_at_purchase: number | null;
  created_at: string;
};

export type Project = {
  id: number;
  project_name: string;
  status: string;
  deadline: string | null;
};

export type ProjectTask = {
  id: number;
  project_id: number | null;
  task_name: string;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
};

export type Ticket = {
  id: number;
  user_id: string | null;
  subject: string;
  message: string | null;
  status: string;
  project_id: number | null;
  created_at: string;
  updated_at: string;
  asset_node_id: string | null;
  telemetry_data: Record<string, unknown> | null;
  external_sync_status: string | null;
  automated_action_log: Record<string, unknown> | null;
  scheduled_date: string | null;
};

export type User = {
  id: string;
  username: string | null;
  email: string | null;
  role: string;
  created_at: string;
  settings: {
    active_modules: string[];
  } | null;
};

export type Supplier = {
  id: number;
  name: string;
  description: string | null;
  kontakt_email: string | null;
  status: string;
  created_at: string;
  contact_person: string | null;
  street: string | null;
  house_number: string | null;
  zip_code: string | null;
  city: string | null;
  phone: string | null;
  mobile: string | null;
  web: string | null;
};

export type Employee = {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  employee_number: string;
  department: string | null;
  joined_at: string;
  base_salary: number;
  salary_type: string;
  hourly_rate: number;
  iban: string | null;
  bic: string | null;
  created_at: string;
  updated_at: string;
};

export type Form = {
  id: string;
  name: string;
  slug: string;
  fields: FormField[];
  created_at: string;
};

export type FormField = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
};

export type FormSubmission = {
  id: string;
  form_id: string | null;
  data: Record<string, unknown>;
  submitted_at: string;
};

export type Message = {
  id: string;
  sender_id: string | null;
  receiver_id: string | null;
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
  customer_id: number | null;
};

export type Notification = {
  id: string;
  created_at: string;
  source: string;
  type: string;
  msg: string;
  read: boolean;
  user_id: string | null;
};

export type CartItem = {
  id: string;
  product_id: number;
  quantity: number;
  session_id: string;
  created_at: string;
};

export type Module = {
  id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  is_premium: boolean;
  icon_name: string | null;
  category: string;
};

export type SiteSetting = {
  key: string;
  value: string | null;
};

export type Gallery = {
  id: string;
  created_at: string;
  file_name: string;
  url: string;
  category: "blog" | "shop";
  mime_type: string | null;
  file_size: number | null;
};
