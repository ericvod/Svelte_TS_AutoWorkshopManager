import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/ordemservicofuncionario/[id] - Retrieve a single association by ID
export async function GET({ params }) {
  const ordemServicoFuncionario = await prisma.ordemServicoFuncionario.findUnique({
    where: { id: Number(params.id) }
  });
  if (ordemServicoFuncionario) {
    return json(ordemServicoFuncionario);
  }
  return json({ error: 'Associação não encontrada' }, { status: 404 });
}

// PUT /api/ordemservicofuncionario/[id] - Update an association by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedOrdemServicoFuncionario = await prisma.ordemServicoFuncionario.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedOrdemServicoFuncionario);
}

// DELETE /api/ordemservicofuncionario/[id] - Delete an association by ID
export async function DELETE({ params }) {
  await prisma.ordemServicoFuncionario.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}
