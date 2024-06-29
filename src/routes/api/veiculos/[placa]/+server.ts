import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/veiculos/[placa] - Retrieve a single vehicle by plate
export async function GET({ params }) {
  const veiculo = await prisma.veiculo.findUnique({
    where: { placa: params.placa }
  });
  if (veiculo) {
    return json(veiculo);
  }
  return json({ error: 'Veículo não encontrado' }, { status: 404 });
}

// PUT /api/veiculos/[placa] - Update a vehicle by plate
export async function PUT({ request, params }) {
  const data = await request.json();
  const updatedVeiculo = await prisma.veiculo.update({
    where: { placa: params.placa },
    data
  });
  return json(updatedVeiculo);
}

// DELETE /api/veiculos/[placa] - Delete a vehicle by plate
export async function DELETE({ params }) {
  await prisma.veiculo.delete({
    where: { placa: params.placa }
  });
  return new Response(null, { status: 204 });
}