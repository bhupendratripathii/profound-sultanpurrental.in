import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text().notNull().default(""),
  area: text().notNull(),
  locality: text().notNull(),
  address: text().notNull().default(""),
  pricePerMonth: integer("price_per_month").notNull(),
  bedrooms: integer().notNull().default(1),
  bathrooms: integer().notNull().default(1),
  furnishing: text().notNull().default("unfurnished"),
  roomType: text("room_type").notNull().default("private"),
  amenities: text().notNull().default(""),
  contactName: text("contact_name").notNull(),
  contactPhone: text("contact_phone").notNull(),
  available: boolean().notNull().default(true),
  imageUrl: text("image_url").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});
