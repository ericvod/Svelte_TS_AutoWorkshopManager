import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function GET() {
  const prestadores = await prisma.prestador.findMany();
  return json(prestadores);
}

export async function POST({ request }) {
  const data = await request.json();
  const prestador = await prisma.prestador.create({ data });
  return json(prestador);
}