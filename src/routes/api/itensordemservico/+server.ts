import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/itensordemservico - Retrieve all service order items
export async function GET() {
  const itensOrdemServico = await prisma.itensOrdemServico.findMany();
  return json(itensOrdemServico);
}

// POST /api/itensordemservico - Create a new service order item
export async function POST({ request }) {
  const data = await request.json();
  const newItemOrdemServico = await prisma.itensOrdemServico.create({
    data
  });
  return json(newItemOrdemServico, { status: 201 });
}
