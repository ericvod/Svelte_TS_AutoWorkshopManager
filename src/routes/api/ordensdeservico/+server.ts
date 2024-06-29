import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/ordensdeservico - Retrieve all service orders
export async function GET() {
  const ordensDeServico = await prisma.ordensDeServico.findMany();
  return json(ordensDeServico);
}

// POST /api/ordensdeservico - Create a new service order
export async function POST({ request }) {
  const data = await request.json();
  
  // Convert dates to ISO 8601 format
  const formattedData = {
    ...data,
    data_abertura: new Date(data.data_abertura).toISOString(),
    data_fechamento: data.data_fechamento ? new Date(data.data_fechamento).toISOString() : null
  };

  const newOrdemDeServico = await prisma.ordensDeServico.create({
    data: formattedData
  });
  return json(newOrdemDeServico, { status: 201 });
}
