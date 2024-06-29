import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/veiculos - Retrieve all vehicles with their owners
export async function GET() {
  const veiculos = await prisma.veiculo.findMany({
    include: {
      cliente: true
    }
  });
  return json(veiculos);
}

// POST /api/veiculos - Create a new vehicle
export async function POST({ request }) {
  const data = await request.json();
  const newVeiculo = await prisma.veiculo.create({
    data: {
      placa: data.placa,
      chassi: data.chassi,
      marca: data.marca,
      modelo: data.modelo,
      ano: data.ano,
      cor: data.cor,
      cliente: {
        connect: { id: data.clienteId }
      }
    }
  });
  return json(newVeiculo, { status: 201 });
}
