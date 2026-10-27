import { check, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { TICKET_STATUSES } from "@/domain/tickets/machine";

export const movement = pgEnum("movement", ["automatic", "quartz", "manual", "solar"]);
export const condition = pgEnum("condition", ["new", "pre-owned"]);
export const grade = pgEnum("grade", ["A", "B", "C"]);
export const productStatus = pgEnum("product_status", ["active", "archived"]);
export const ticketStatus = pgEnum("ticket_status", TICKET_STATUSES);
export const eventVisibility = pgEnum("event_visibility", ["public", "internal"]);

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    brandId: uuid("brand_id").notNull().references(() => brands.id),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    movement: movement("movement").notNull(),
    condition: condition("condition").notNull(),
    grade: grade("grade"),
    priceMinor: integer("price_minor").notNull(),
    stock: integer("stock").notNull().default(0),
    serialNo: text("serial_no"),
    status: productStatus("status").notNull().default("active"),
  },
  (t) => [
    check("price_positive", sql`${t.priceMinor} > 0`),
    check("stock_non_negative", sql`${t.stock} >= 0`),
    check("preowned_has_grade", sql`${t.condition} <> 'pre-owned' OR ${t.grade} IS NOT NULL`),
    check("preowned_single_unit", sql`${t.condition} <> 'pre-owned' OR ${t.stock} <= 1`),
  ],
);

export const productImages = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => products.id),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  position: integer("position").notNull().default(0),
});

export const repairServices = pgTable("repair_services", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  fromMinor: integer("from_minor").notNull(),
  toMinor: integer("to_minor").notNull(),
  turnaround: text("turnaround").notNull(),
});

export const ticketSequence = pgTable("ticket_sequence", {
  year: integer("year").primaryKey(),
  lastValue: integer("last_value").notNull(),
});

export const repairTickets = pgTable("repair_tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  ticketNo: text("ticket_no").notNull().unique(),
  customerId: uuid("customer_id").notNull().references(() => customers.id),
  serviceId: text("service_id").notNull().references(() => repairServices.id),
  watchBrand: text("watch_brand").notNull(),
  watchModel: text("watch_model"),
  issue: text("issue").notNull(),
  status: ticketStatus("status").notNull().default("RECEIVED"),
  promisedDate: timestamp("promised_date", { withTimezone: true }),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  publicToken: text("public_token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const ticketEvents = pgTable("ticket_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  ticketId: uuid("ticket_id").notNull().references(() => repairTickets.id),
  status: ticketStatus("status").notNull(),
  publicNote: text("public_note"),
  internalNote: text("internal_note"),
  visibility: eventVisibility("visibility").notNull().default("public"),
  staffId: uuid("staff_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const quotes = pgTable("quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  ticketId: uuid("ticket_id").notNull().references(() => repairTickets.id),
  totalMinor: integer("total_minor").notNull(),
  status: text("status").notNull().default("SENT"),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
});
