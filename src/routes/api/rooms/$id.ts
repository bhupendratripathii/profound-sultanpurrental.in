import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { rooms } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/api/rooms/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const [room] = await db
          .select()
          .from(rooms)
          .where(eq(rooms.id, parseInt(params.id)));

        if (!room) {
          return Response.json({ error: "Room not found" }, { status: 404 });
        }
        return Response.json(room);
      },
    },
  },
});
