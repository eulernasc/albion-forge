# Albion Forge — Américas

PWA independente de builds e cotações do Albion Online.

## Uso
Publique a pasta dist em HTTPS para instalar. Abra dist/index.html para uso local com conexão.

## Desenvolvimento
Node.js 20+; sem instalação de dependências. Execute node build.cjs, node split-catalog.cjs, node finalize.cjs e node test-routes.cjs.

## Recursos
Builds locais salvas/editáveis, catálogo PT-BR com imagens, qualidade, meta tier+encantamento, comparação entre cidades e CSV.

Preços vêm de https://west.albion-online-data.com; ausência de coleta não significa ausência do item. Cada cidade e variante aparece na cobertura dos dados. Dados antigos não entram no total. consulta original em putrido-audit.json. Catálogo: https://github.com/ao-data/ao-bin-dumps, coleta em 18/10/2026. Imagens de https://render.albiononline.com.

## Avalon — limitação real
Ainda não há feed automático de conexões conectado. Menor rota para qualquer Royal ou cidade específica, somente entre ligações informadas com evidência e expiração. Não informa uma rota atual de Qiitun-Vietis sem esses dados. Não prevê portais ou segurança.

## Busca ampliada e comunidades

A seção Buscar itens pesquisa todos os tiers e encantamentos existentes, cinco qualidades e sete cidades; inclui registros antigos identificados, cópia local da última consulta, histórico de vendas separado e livro de ofertas. Os totais da build continuam restritos à meta selecionada; os resultados amplos não são equivalentes em potência.

Conexões podem ser importadas por JSON normalizado, resposta Portaler.app ou Modern Portaler, ou por URL de feed público compatível com CORS. Exige confirmar Américas, descarta conexões expiradas e identifica a data de importação quando a observação original não foi informada. Não é uma conexão autenticada ao Portaler. Consulte SOURCES.md para fontes pesquisadas, acessos exigidos e limitações.

Execute também node test-search.cjs antes de publicar.

## Armazenamento e validação
Dados locais no navegador; exporte backup. Testes do cálculo de rotas passam. Interface e instalação ainda precisam de validação em navegador.

