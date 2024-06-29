import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/clientes - Retrieve all clients
export async function GET() {
  const clientes = await prisma.cliente.findMany();
  return json(clientes);
}

// POST /api/clientes - Create a new client
export async function POST({ request }) {
  const data = await request.json();
  const newCliente = await prisma.cliente.create({
    data
  });
  return json(newCliente, { status: 201 });
}
