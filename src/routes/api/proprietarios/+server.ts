import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function GET() {
  const proprietarios = await prisma.proprietario.findMany();
  return json(proprietarios);
}

export async function POST({ request }) {
  const data = await request.json();
  const proprietario = await prisma.proprietario.create({ data });
  return json(proprietario);
}