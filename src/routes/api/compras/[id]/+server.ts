import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/compras/[id] - Retrieve a single purchase by ID
export async function GET({ params }) {
  const compra = await prisma.compra.findUnique({
    where: { id: Number(params.id) }
  });
  if (compra) {
    return json(compra);
  }
  return json({ error: 'Compra não encontrada' }, { status: 404 });
}

// PUT /api/compras/[id] - Update a purchase by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedCompra = await prisma.compra.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedCompra);
}

// DELETE /api/compras/[id] - Delete a purchase by ID
export async function DELETE({ params }) {
  await prisma.compra.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}
