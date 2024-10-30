import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Controller('/produtos')
export class ProdutoController {

    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    async criaproduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();
        produtoEntity.id = uuid();
        produtoEntity.usuarioId = dadosDoProduto.usuarioId;
        produtoEntity.nome = dadosDoProduto.nome;
        produtoEntity.valor = dadosDoProduto.valor;
        produtoEntity.quantidade = dadosDoProduto.quantidade;
        produtoEntity.descricao = dadosDoProduto.descricao;
        produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
        produtoEntity.imagens = dadosDoProduto.imagens;
        produtoEntity.categoria = dadosDoProduto.categoria;

        this.produtoRepository.salvar(produtoEntity);
        return {
            produto: {
                id: produtoEntity.id,
                nome: produtoEntity.nome,
            },
            messagem: 'produto criado com sucesso',
        };
    }

    @Get()
    async listaprodutos() {
        return this.produtoRepository.listar();
    }

    @Put('/:id') 
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoRepository.atualiza(
        id,
        novosDados,
        );

        return {
        produto: produtoAtualizado,
        messagem: 'produto atualizado com sucesso',
        };
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const produtoRemovido = await this.produtoRepository.remove(id);

        return {
        produto: produtoRemovido,
        messagem: 'produto removido com suceso',
        };
    }
}
