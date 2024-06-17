import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function GET() {
  const ordensPrestadores = await prisma.ordensPrestadores.findMany({
    include: {
      ordemDeServico: true,
      prestador: true
    },
  });
  return json(ordensPrestadores);
}

export async function POST({ request }) {
  const data = await request.json();
  const ordemPrestador = await prisma.ordensPrestadores.create({ data });
  return json(ordemPrestador);
}