import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"]
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/items", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const item = await prisma.item.create({ data: req.body });
  res.json(item);
});

app.get("/search", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";

  const results = await prisma.item.findMany({
    where: {
      name: {
        contains: q,
        mode: "insensitive"
      }
    }
  });

  res.json(results);
});

async function main() {
  try {
    // test DB connection early
    await prisma.$connect();
    console.log("Connected to database!");

    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  } catch (err) {
    console.error("❌ Server failed to start:");
    console.error(err);
    process.exit(1);
  }
}

main();
