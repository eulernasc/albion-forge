const oldHero=document.querySelector('.hero p');oldHero.innerHTML='Monte e salve suas builds, pesquise equipamentos em todos os tiers e compare preços observados nas cidades de Américas. Planeje rotas com os portais disponíveis nos seus registros.';
const releaseNotice=document.createElement('div');releaseNotice.className='status';releaseNotice.innerHTML='<b>Como usar</b> · Busque um item em “Buscar itens”; para otimizar a build, escolha a meta de tier + encantamento e atualize o mercado. Em Avalon, use registros reais de portais. Depois de sair, “Saída até Royal” calcula o trecho terrestre. Nenhum cadastro externo é obrigatório para esses recursos.';document.querySelector('nav').after(releaseNotice);
$('category').value='weapon';browse();
if(navigator.onLine){wideSearch();update()}else $('wide-status').textContent='Você está offline. A interface funciona; use Buscar para tentar recuperar a última consulta salva. Novas cotações exigem internet.';

