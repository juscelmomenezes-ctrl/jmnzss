# CasaPet — PetStore

Loja online demonstrativa de produtos para animais, construída com React e Vite.

## Funcionalidades
- Catálogo com filtros por categoria e pesquisa.
- Carrinho com quantidades, remoção e cálculo do subtotal.
- Layout responsivo para telemóvel, tablet e computador.
- Botão de encomenda por WhatsApp com mensagem pré-preenchida.
- Secções de apresentação, vantagens, redes sociais e contactos.

## Executar localmente
```bash
npm install
npm run dev
```

Para validar a versão de produção:
```bash
npm run build
npm run preview
```

## Antes de publicar
1. Em `src/App.jsx`, altera a variável `phone` dentro de `checkout()` para o número WhatsApp real da loja, com indicativo internacional e apenas dígitos (ex.: Angola: 2449XXXXXXXX).
2. Atualiza os produtos, preços e categorias no array `products` no início de `src/App.jsx`. Os produtos e preços atuais são apenas exemplos.
3. Substitui os links genéricos de Instagram/Facebook/WhatsApp pelos perfis reais.
4. Define zonas, prazos e custos de entrega e informa-os aos clientes.
5. Substitui os textos e imagens de demonstração pelos dados reais da marca.

## Limitações atuais
Este é um frontend demonstrativo. Não inclui pagamentos online, base de dados, gestão de stock, autenticação, painel administrativo ou registo persistente de encomendas. O carrinho existe apenas durante a sessão atual. As imagens são carregadas de URLs externas.

## Publicação
O projeto pode ser importado no Lovable a partir deste repositório GitHub ou publicado com um serviço compatível com Vite.
