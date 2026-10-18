# Albion Forge — pesquisa de fontes, 18/10/2026

## Mercado

| Fonte | O que foi confirmado | Integração e limites |
|---|---|---|
| [Albion Online Data Project](https://www.albion-online-data.com/api/) | API pública Américas, preços por qualidade/cidade, histórico e livro de ofertas | Integrada. Cobertura depende das telas de mercado carregadas por jogadores. Consultar a API não provoca nova varredura do jogo. |
| [Albion Markets](https://albionmarkets.com/) | O próprio serviço declara varreduras independentes do AODP e consulta pública de registros | API anunciada como futura na página consultada. Novas varreduras exigem conta/plano; não foram contratadas. Cinco cidades Royal e Black Market; mercado normal de Caerleon e Brecilien não cobertos conforme FAQ. Não foi confirmado preço independente do Pútrido. |
| [Albion Codex](https://www.albioncodex.com/guides/how-to-use-albion-market-data) | O serviço declara combinar AODP e rede própria de coleta | Sem API pública confirmada nesta pesquisa. Distingue registros observados de estimativas; não foram importadas estimativas. |
| [Albion Free Market](https://albionfreemarket.com/data-client) | O cliente contribui ordens e históricos ao AODP e possui recursos privados de conta | Não foi encontrado feed público adicional que garantisse dados novos do Pútrido. |
| [Circle of Wizards](https://www.circleofwizards.com/albion-economy/), Ledger, Compass e outras interfaces | Declaram usar AODP | Mudar de interface não equivale a uma segunda coleta independente. |

O app ganhou busca de todas as variantes existentes de uma família, tier e encantamento exatos, cinco qualidades, sete cidades, datas reais, registros antigos visíveis, cache identificado e consultas separadas de histórico/livro. Nenhuma fonte garante inventário completo em tempo real. Black Market não foi adicionado como local para comprar equipamentos, porque compra itens dos jogadores.

### Exemplo verificável: Pútrido

Arquivo da consulta: `market-evidence.json` (resumo de registros positivos com URL da fonte) no repositório. Foram pesquisadas 25 variantes (4.0 a 8.4), cinco qualidades e sete cidades. A resposta da consulta realizada nesta sessão teve 11 preços de venda positivos em quatro cidades. Entre eles:

| Variante | Cidade | Qualidade | Prata | Coletado (Brasília) |
|---|---|---|---:|---|
| 4.0 | Martlock | 4 | 439.962 | 18/10/2026 08:20 |
| 7.2 | Caerleon | 4 | 6.000.000 | 17/10/2026 17:20 |
| 7.4 | Brecilien | 4 | 30.000.000 | 17/10/2026 15:50 |
| 8.2 | Thetford | 4 | 29.999.892 | 17/10/2026 15:15 |
| 8.3 | Thetford | 4 | 34.952.667 | 17/10/2026 15:15 |

Esses tiers não têm a mesma potência. A consulta não confirma ofertas ainda disponíveis. T7.0/T8.0 sem coleta não significa sem estoque.

## Estradas de Avalon

| Fonte | Achado | O que falta |
|---|---|---|
| [Modern Portaler](https://github.com/jmann184/portaler-core-beta-10-25) | O README divulga mapa comunitário alimentado pelos Mist Walkers. Pede cargo Member no [Discord indicado pelo projeto](https://discord.gg/hbupFJ3AAz). Código pode permitir instâncias públicas, conforme configuração | Não foi obtido acesso à comunidade ou a um feed atual de Américas. O domínio portaler.org não pôde ser aberto pela ferramenta web nesta sessão. Convite e disponibilidade da comunidade não foram validados por ingresso. |
| [Portaler.app](https://portaler.app/) | Site acessível; uma [integração de código aberto](https://github.com/psykzz/cogs/tree/main/albion_ava) documenta login Discord, token, guild ID e API `map/list` com `mergeWithPublic=true` | Requer acesso autorizado. O parâmetro não demonstra leitura anônima. Nenhuma credencial foi obtida. Integração citada é comunitária, não garantia de suporte contratual da API. |
| [Albion Free Market Map](https://albionfreemarket.com/albion-map) | Guia oficial da ferramenta oferece espaços compartilhados, membros e links públicos, rotas no mundo e portais temporários | Precisa de um mapa/link realmente preenchido para Américas; não foi encontrado um diretório global que confirme Qiitun-Vietis. API de exportação pública não confirmada. |
| [Albion Roads](https://github.com/dignityofwar/albionroads) | Salas com senha, sincronização e conexões contribuídas por usuários | Sem sala autorizada e populada, não oferece rota global automática. |
| [Albion Online Grind](https://forum.albiononline.com/index.php/Thread/182416-albiononlinegrind-com-Feedback-and-discussion/) | Mapeador divulgado pelo desenvolvedor | Página do mapeador não pôde ser aberta pela ferramenta web nesta sessão; feed público atual não confirmado. |
| [Albion Maps](https://www.albionmaps.com.br/about?lang=en) e [Albion World](https://albionworld.aliengad.com/) | Catálogo/mapas e planejamento de rotas/temporizadores | Layouts e mapas estáticos não provam quais conexões estão abertas agora. |

### Implementado

- Importação de arquivos com conexões normalizadas, estrutura Portaler.app e estrutura Modern Portaler.
- Leitura manual de feed JSON público por URL quando o servidor permite CORS.
- Confirmação obrigatória de Américas e rejeição de indicação de outro servidor.
- Descarte de conexões vencidas ou sem expiração verificável; origem dos dados preservada.
- Quando a fonte não informa observação, a tela identifica o horário como importação.
- Menor número de saltos para cidade específica ou qualquer saída Royal explicitamente identificada pela fonte. Não inventa trechos terrestres nem presume que toda zona seja Royal.

### Não concluído por falta de dados externos

Não há uma rota atual comprovada de Qiitun-Vietis até Royal. Ainda não existe feed comunitário autenticado conectado a esta PWA. O usuário informou não ter acesso ao Portaler. O próximo passo para dados comunitários é conseguir acesso ao mapa/Discord ou um link público preenchido e autorizado; o código não contorna esse controle.

A pesquisa cobriu serviços e projetos encontrados por busca pública e leitura das fontes citadas. Não representa auditoria de todos os serviços existentes nem valida comunidades privadas ou mensagens internas de Discord.

