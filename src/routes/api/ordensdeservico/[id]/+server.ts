import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/ordensdeservico/[id] - Retrieve a single service order by ID
export async function GET({ params }) {
  const ordemDeServico = await prisma.ordensDeServico.findUnique({
    where: { id: Number(params.id) }
  });
  if (ordemDeServico) {
    return json(ordemDeServico);
  }
  return json({ error: 'Ordem de Serviço não encontrada' }, { status: 404 });
}

// PUT /api/ordensdeservico/[id] - Update a service order by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedOrdemDeServico = await prisma.ordensDeServico.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedOrdemDeServico);
}

// DELETE /api/ordensdeservico/[id] - Delete a service order by ID
export async function DELETE({ params }) {
  await prisma.ordensDeServico.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}
