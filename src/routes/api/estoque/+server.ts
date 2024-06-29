import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/estoque - Retrieve all stock items
export async function GET() {
  const estoque = await prisma.estoque.findMany();
  return json(estoque);
}

// POST /api/estoque - Create a new stock item
export async function POST({ request }) {
  const data = await request.json();
  const newEstoque = await prisma.estoque.create({
    data
  });
  return json(newEstoque, { status: 201 });
}
