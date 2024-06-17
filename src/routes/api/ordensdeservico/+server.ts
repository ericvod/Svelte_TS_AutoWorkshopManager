import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function GET() {
  const ordensDeServico = await prisma.ordensDeServico.findMany({
    include: {
      veiculo: true,
      ordensPrestadores: true
    },
  });
  return json(ordensDeServico);
}

export async function POST({ request }) {
  const data = await request.json();
  const ordemDeServico = await prisma.ordensDeServico.create({ data });
  return json(ordemDeServico);
}