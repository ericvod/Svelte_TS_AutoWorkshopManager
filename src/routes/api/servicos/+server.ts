import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/servicos - Retrieve all services
export async function GET() {
  const servicos = await prisma.servico.findMany();
  return json(servicos);
}

// POST /api/servicos - Create a new service
export async function POST({ request }) {
  const data = await request.json();
  const newServico = await prisma.servico.create({
    data
  });
  return json(newServico, { status: 201 });
}
