import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function GET() {
  const veiculos = await prisma.veiculo.findMany({
    include: {
      proprietario: true,
    },
  });
  return json(veiculos);
}

export async function POST({ request }) {
  const data = await request.json();
  const veiculo = await prisma.veiculo.create({ data });
  return json(veiculo);
}