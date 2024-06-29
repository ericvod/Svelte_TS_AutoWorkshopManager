-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "data_registro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "placa" TEXT NOT NULL PRIMARY KEY,
    "chassi" TEXT,
    "marca" TEXT,
    "modelo" TEXT,
    "ano" INTEGER,
    "cor" TEXT,
    "cliente_id" INTEGER NOT NULL,
    CONSTRAINT "Veiculo_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrdensDeServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "veiculo_placa" TEXT NOT NULL,
    "data_abertura" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fechamento" DATETIME,
    "status" TEXT NOT NULL,
    "descricao_problema" TEXT,
    "descricao_servico" TEXT,
    CONSTRAINT "OrdensDeServico_veiculo_placa_fkey" FOREIGN KEY ("veiculo_placa") REFERENCES "Veiculo" ("placa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItensOrdemServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ordem_servico_id" INTEGER NOT NULL,
    "servico_id" INTEGER NOT NULL,
    "preco_total" REAL NOT NULL,
    CONSTRAINT "ItensOrdemServico_ordem_servico_id_fkey" FOREIGN KEY ("ordem_servico_id") REFERENCES "OrdensDeServico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItensOrdemServico_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "Servico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "cargo" TEXT,
    "data_contratacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OrdemServicoFuncionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ordem_servico_id" INTEGER NOT NULL,
    "funcionario_id" INTEGER NOT NULL,
    CONSTRAINT "OrdemServicoFuncionario_ordem_servico_id_fkey" FOREIGN KEY ("ordem_servico_id") REFERENCES "OrdensDeServico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrdemServicoFuncionario_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "Funcionario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "quantidade" INTEGER NOT NULL,
    "preco" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estoque_id" INTEGER NOT NULL,
    "data_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" INTEGER NOT NULL,
    "preco_total" REAL NOT NULL,
    CONSTRAINT "Compra_estoque_id_fkey" FOREIGN KEY ("estoque_id") REFERENCES "Estoque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");
