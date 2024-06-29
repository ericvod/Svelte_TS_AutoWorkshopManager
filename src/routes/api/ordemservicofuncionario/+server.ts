import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/ordemservicofuncionario - Retrieve all service order and employee associations
export async function GET() {
  const ordemServicoFuncionario = await prisma.ordemServicoFuncionario.findMany();
  return json(ordemServicoFuncionario);
}

// POST /api/ordemservicofuncionario - Create a new association between service order and employee
export async function POST({ request }) {
  const data = await request.json();
  const newOrdemServicoFuncionario = await prisma.ordemServicoFuncionario.create({
    data
  });
  return json(newOrdemServicoFuncionario, { status: 201 });
}
