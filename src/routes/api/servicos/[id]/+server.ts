import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/servicos/[id] - Retrieve a single service by ID
export async function GET({ params }) {
  const servico = await prisma.servico.findUnique({
    where: { id: Number(params.id) }
  });
  if (servico) {
    return json(servico);
  }
  return json({ error: 'Serviço não encontrado' }, { status: 404 });
}

// PUT /api/servicos/[id] - Update a service by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedServico = await prisma.servico.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedServico);
}

// DELETE /api/servicos/[id] - Delete a service by ID
export async function DELETE({ params }) {
  await prisma.servico.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}
