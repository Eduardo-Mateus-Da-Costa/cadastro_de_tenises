export class TenisDTO {
    id?: number;
    name: string;
    tamanho: number;
    cor: string;
    preco: number;
    user_id: number;

    constructor(nome: string, tamanho: number, cor: string, preco: number, user_id: number, id?: number) {
        this.name = nome;
        this.tamanho = tamanho;
        this.cor = cor;
        this.preco = preco;
        this.user_id = user_id;
        this.id = id;
    }
}

export class SearchDTO{
  id: number;
  name?: string;
  tamanho?: number;
  cor?: string;
  preco?: number;

  constructor(id: number, name?: string, tamanho?: number, cor?: string, preco?: number) {
    this.id = id;
    this.name = name;
    this.tamanho = tamanho;
    this.cor = cor;
    this.preco = preco;
  }
}
