import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/itensordemservico/[id] - Retrieve a single service order item by ID
export async function GET({ params }) {
  const itemOrdemServico = await prisma.itensOrdemServico.findUnique({
    where: { id: Number(params.id) }
  });
  if (itemOrdemServico) {
    return json(itemOrdemServico);
  }
  return json({ error: 'Item da Ordem de Serviço não encontrado' }, { status: 404 });
}

// PUT /api/itensordemservico/[id] - Update a service order item by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedItemOrdemServico = await prisma.itensOrdemServico.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedItemOrdemServico);
}

// DELETE /api/itensordemservico/[id] - Delete a service order item by ID
export async function DELETE({ params }) {
  await prisma.itensOrdemServico.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}