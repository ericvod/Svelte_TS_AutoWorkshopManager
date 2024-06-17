-- CreateTable
CREATE TABLE "Veiculo" (
    "placa" TEXT NOT NULL PRIMARY KEY,
    "chassi" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "proprietario_id" INTEGER NOT NULL,
    CONSTRAINT "Veiculo_proprietario_id_fkey" FOREIGN KEY ("proprietario_id") REFERENCES "Proprietario" ("proprietario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Proprietario" (
    "proprietario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Peca" (
    "peca_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "OrdensDeServico" (
    "os_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "data_abertura" DATETIME NOT NULL,
    "data_fechamento" DATETIME,
    "status" TEXT NOT NULL,
    "descricao_problema" TEXT NOT NULL,
    "descricao_servico" TEXT NOT NULL,
    CONSTRAINT "OrdensDeServico_placa_fkey" FOREIGN KEY ("placa") REFERENCES "Veiculo" ("placa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrdensPrestadores" (
    "os_id" INTEGER NOT NULL,
    "prestador_id" INTEGER NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL,
    "descricao_tarefa" TEXT NOT NULL,

    PRIMARY KEY ("os_id", "prestador_id"),
    CONSTRAINT "OrdensPrestadores_os_id_fkey" FOREIGN KEY ("os_id") REFERENCES "OrdensDeServico" ("os_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrdensPrestadores_prestador_id_fkey" FOREIGN KEY ("prestador_id") REFERENCES "Prestador" ("prestador_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoricoReparo" (
    "historico_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "os_id" INTEGER NOT NULL,
    "data_reparo" DATETIME NOT NULL,
    "descricao_reparo" TEXT NOT NULL,
    "peca_usada" TEXT NOT NULL,
    "custo_reparo" REAL,
    CONSTRAINT "HistoricoReparo_os_id_fkey" FOREIGN KEY ("os_id") REFERENCES "OrdensDeServico" ("os_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HistoricoReparo_peca_usada_fkey" FOREIGN KEY ("peca_usada") REFERENCES "Peca" ("nome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Defeito" (
    "defeito_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Prestador" (
    "prestador_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VeiculoDefeito" (
    "veiculo_placa" TEXT NOT NULL,
    "defeito_id" INTEGER NOT NULL,

    PRIMARY KEY ("veiculo_placa", "defeito_id"),
    CONSTRAINT "VeiculoDefeito_veiculo_placa_fkey" FOREIGN KEY ("veiculo_placa") REFERENCES "Veiculo" ("placa") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VeiculoDefeito_defeito_id_fkey" FOREIGN KEY ("defeito_id") REFERENCES "Defeito" ("defeito_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Peca_nome_key" ON "Peca"("nome");
