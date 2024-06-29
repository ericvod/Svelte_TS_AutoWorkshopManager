import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/funcionarios/[id] - Retrieve a single employee by ID
export async function GET({ params }) {
  const funcionario = await prisma.funcionario.findUnique({
    where: { id: Number(params.id) }
  });
  if (funcionario) {
    return json(funcionario);
  }
  return json({ error: 'Funcionário não encontrado' }, { status: 404 });
}

// PUT /api/funcionarios/[id] - Update an employee by ID
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedFuncionario = await prisma.funcionario.update({
    where: { id: Number(params.id) },
    data
  });
  return json(updatedFuncionario);
}

// DELETE /api/funcionarios/[id] - Delete an employee by ID
export async function DELETE({ params }) {
  await prisma.funcionario.delete({
    where: { id: Number(params.id) }
  });
  return new Response(null, { status: 204 });
}
