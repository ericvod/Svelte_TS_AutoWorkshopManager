import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/funcionarios - Retrieve all employees
export async function GET() {
  const funcionarios = await prisma.funcionario.findMany();
  return json(funcionarios);
}

// POST /api/funcionarios - Create a new employee
export async function POST({ request }) {
  const data = await request.json();
  const newFuncionario = await prisma.funcionario.create({
    data
  });
  return json(newFuncionario, { status: 201 });
}
