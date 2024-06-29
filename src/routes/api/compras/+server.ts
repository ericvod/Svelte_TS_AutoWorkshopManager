import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/compras - Retrieve all purchases
export async function GET() {
  const compras = await prisma.compra.findMany();
  return json(compras);
}

// POST /api/compras - Create a new purchase
export async function POST({ request }) {
  const data = await request.json();

  // Convert date to ISO 8601 format
  const formattedData = {
    ...data,
    data_compra: new Date(data.data_compra).toISOString()
  };

  const newCompra = await prisma.compra.create({
    data: formattedData
  });
  return json(newCompra, { status: 201 });
}
