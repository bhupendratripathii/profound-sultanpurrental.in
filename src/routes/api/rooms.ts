import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../db/index.js";
import { rooms } from "../../../db/schema.js";
import { eq, and, ilike, gte, lte, sql } from "drizzle-orm";

export const Route = createFileRoute("/api/rooms")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const area = url.searchParams.get("area");
        const minPrice = url.searchParams.get("minPrice");
        const maxPrice = url.searchParams.get("maxPrice");
        const roomType = url.searchParams.get("roomType");
        const furnishing = url.searchParams.get("furnishing");
        const search = url.searchParams.get("search");

        const conditions = [eq(rooms.available, true)];

        if (area && area !== "all") {
          conditions.push(ilike(rooms.area, `%${area}%`));
        }
        if (minPrice) {
          conditions.push(gte(rooms.pricePerMonth, parseInt(minPrice)));
        }
        if (maxPrice) {
          conditions.push(lte(rooms.pricePerMonth, parseInt(maxPrice)));
        }
        if (roomType && roomType !== "all") {
          conditions.push(eq(rooms.roomType, roomType));
        }
        if (furnishing && furnishing !== "all") {
          conditions.push(eq(rooms.furnishing, furnishing));
        }
        if (search) {
          conditions.push(
            sql`(${rooms.title} ilike ${"%" + search + "%"} OR ${rooms.area} ilike ${"%" + search + "%"} OR ${rooms.locality} ilike ${"%" + search + "%"})`
          );
        }

        const results = await db
          .select()
          .from(rooms)
          .where(and(...conditions))
          .orderBy(rooms.createdAt);

        return Response.json(results);
      },

      POST: async ({ request }) => {
        const body = await request.json();
        const [room] = await db.insert(rooms).values(body).returning();
        return Response.json(room, { status: 201 });
      },
    },
  },
});
