import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params }: RequestEvent) {
  const ordemDeServico = await prisma.ordensDeServico.findUnique({
    where: {
      os_id: Number(params.id),
    },
    include: {
      veiculo: true,
    },
  });

  if (!ordemDeServico) {
    return new Response(null, { status: 404 });
  }

  return json(ordemDeServico);
}

export async function PUT({ params, request }: RequestEvent) {
  const data = await request.json();

  const updatedOrdemDeServico = await prisma.ordensDeServico.update({
    where: {
      os_id: Number(params.id),
    },
    data,
  });

  return json(updatedOrdemDeServico);
}