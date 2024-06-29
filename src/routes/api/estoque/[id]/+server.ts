import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/estoque/[id] - Retrieve a single stock item by ID
export async function GET({ params }) {
  const estoque = await prisma.estoque.findUnique({
    where: { id: Number(params.id) }
  });
  if (estoque) {
    return json(estoque);
  }
  return json({ error: 'Item de estoque não encontrado' }, { status: 404 });
}

// PUT /api/estoque/[id] - Update a stock item by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedEstoque = await prisma.estoque.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedEstoque);
}

// DELETE /api/estoque/[id] - Delete a stock item by ID
export async function DELETE({ params }) {
  await prisma.estoque.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}
