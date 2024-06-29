import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/clientes/[id] - Retrieve a single client by ID
export async function GET({ params }) {
  const cliente = await prisma.cliente.findUnique({
    where: { id: Number(params.id) }
  });
  if (cliente) {
    return json(cliente);
  }
  return json({ error: 'Cliente não encontrado' }, { status: 404 });
}

// PUT /api/clientes/[id] - Update a client by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedCliente = await prisma.cliente.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedCliente);
}

// DELETE /api/clientes/[id] - Delete a client by ID
export async function DELETE({ params }) {
  await prisma.cliente.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}