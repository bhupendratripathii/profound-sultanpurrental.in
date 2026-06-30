CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"area" text NOT NULL,
	"locality" text NOT NULL,
	"address" text DEFAULT '' NOT NULL,
	"price_per_month" integer NOT NULL,
	"bedrooms" integer DEFAULT 1 NOT NULL,
	"bathrooms" integer DEFAULT 1 NOT NULL,
	"furnishing" text DEFAULT 'unfurnished' NOT NULL,
	"room_type" text DEFAULT 'private' NOT NULL,
	"amenities" text DEFAULT '' NOT NULL,
	"contact_name" text NOT NULL,
	"contact_phone" text NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"image_url" text DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
