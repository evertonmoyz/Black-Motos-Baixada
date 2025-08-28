document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    const motoList = document.getElementById('motoList');

      /* ---------- BUSCA GLOBAL  (NOVO) ---------- */
  function goSearch() {
    const termo = input.value.trim();
    if (termo) {
      window.location.href = `motos.html?q=${encodeURIComponent(termo)}`;
    }
  }

  if (input && btn) {
    btn.addEventListener('click', goSearch);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') goSearch();
    });
  }

    // Dados das motos - CORRIGIDOS: todas com array "imagens"
    window.motosData = [
        {
            id: 1,
            nome: "MT-07 ABS",
            preco: 47600,
            ano: 2025,
            marca: "Yamaha",
            categoria: "Naked",
            combustivel: "Gasolina",
            cor: "Preta",
            quilometragem: 15000,
            cambio: "Manual",
            imagens: ["MT07.jpg", "MT07.jpg", "MT07.jpg", "MT07.jpg", "MT07.jpg", "MT07.jpg", "MT07.jpg", "MT07.jpg", "MT07.jpg", "MT07.jpg"],
            cilindrada: "698cc",
            descricao: "Motocicleta em ótimo estado, de único dono e com 15.000 km rodados. Equipado com sistema ABS, revisada, com garantia e pronta para uso urbano e viagens curtas. Ideal para quem busca desempenho e economia, sem abrir mão do estilo.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },

    ];

    /* ======= SUPORTE A ?q= + RENDER ======= */

    // Base e lista de trabalho
    window.motosBase = Array.isArray(window.motosData) ? window.motosData.slice() : [];
    window.listaTrabalho = window.motosBase.slice();

    // Render dos cards na #motoList
    function renderMotos(lista) {
    const ul = document.getElementById('motoList');
    if (!ul) return;

    if (!Array.isArray(lista) || lista.length === 0) {
        const qs = new URLSearchParams(window.location.search);
        const termo = (typeof obterTermoPesquisado === 'function' ? obterTermoPesquisado() : '') || qs.get('q') || '';
        if (typeof mostrarMensagemSemResultado === 'function') {
        mostrarMensagemSemResultado(termo);
        } else {
        ul.innerHTML = `<div class="moto-card"><div class="card-body"><h3>Nenhuma moto encontrada</h3><p>Não encontramos motos com as características: <strong>${termo || 'informadas'}</strong></p></div></div>`;
        }
        return;
    }

    ul.innerHTML = `
        ${lista.map(moto => `
        <div class="moto-card">
            <div class="card-media">
            <img src="${(moto.imagens && moto.imagens) ? moto.imagens : ''}" alt="${moto.nome}">
            <div class="foto-contador">${(moto.imagens ? moto.imagens.length : 0)} fotos</div>
            </div>
            <div class="card-body">
            <div class="card-content">
                <div class="subtitulo">${moto.categoria} • USADO • ${moto.ano}/${moto.ano}</div>
                <h3>${moto.marca} ${moto.nome}</h3>
                <div class="modelo">${moto.cilindrada} • ${moto.cor}</div>
                <div class="preco">R$ ${(moto.preco || 0).toLocaleString('pt-BR')}</div>
                <div class="info-icons">
                <div class="item"><i class="fa-solid fa-route"></i><span>${(moto.quilometragem || 0).toLocaleString('pt-BR')} km</span></div>
                <div class="item"><i class="fa-solid fa-gas-pump"></i><span>${moto.combustivel}</span></div>
                <div class="item"><i class="fa-solid fa-gear"></i><span>${moto.cambio}</span></div>
                </div>
            </div>
            <a class="btn-detalhes" href="detalhes.html?id=${moto.id}">Ver detalhes</a>
            </div>
        </div>
        `).join('')}
    `;
    }

    // Aplica ?q= e renderiza assim que o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
    // Garante base/lista caso o script rode antes
    window.motosBase = Array.isArray(window.motosData) ? window.motosData.slice() : [];
    window.listaTrabalho = window.motosBase.slice();

    const params = new URLSearchParams(window.location.search);
    const termo = params.get('q');

    if (termo) {
        const base = window.motosBase.slice();
        const filtrada = (typeof aplicarBuscaLivre === 'function') ? aplicarBuscaLivre(base) : base;
        window.listaTrabalho = filtrada;
        renderMotos(filtrada);
    } else {
        renderMotos(window.listaTrabalho);
    }
    });




    /* === utilitário: remove acento e deixa minúsculo ========== */
    const normalizar = s =>
    s
        .toString()
        .normalize('NFD')           // separa acentos
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    
    // mantém seu normalizar() como está

    function aplicarBuscaLivre(lista) {
        const params = new URLSearchParams(window.location.search);
        const termo = params.get('q') || '';
        if (!termo) return lista;

        const tokens = termo
            .split(/[,\s]+/)  // Separando múltiplos termos (vírgula ou espaço)
            .map(t => normalizar(t))  // Normaliza (sem acentos, minúsculo)
            .filter(Boolean);

        return lista.filter(moto => {
            const alvo = normalizar(
                `${moto.nome} ${moto.marca} ${moto.categoria} ${moto.cor}
                ${moto.combustivel} ${moto.cambio} ${moto.cilindrada}
                ${moto.ano} ${moto.quilometragem}`
            );
            return tokens.some(tok => alvo.includes(tok));  // Verifica se algum token bate
        });
    }




    // Função para identificar o que foi pesquisado
    function obterTermoPesquisado() {
        const termo = input ? input.value.trim() : '';
        if (termo) return termo;
        
        // Verificar filtros ativos
        const marcaSelecionada = Array.from(document.querySelectorAll('input[type="checkbox"][value]'))
            .filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Marca'))
            .map(cb => cb.value);
        
        const categoriaSelecionada = Array.from(document.querySelectorAll('input[type="checkbox"][value]'))
            .filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Categoria'))
            .map(cb => cb.value);
            
        const corSelecionada = Array.from(document.querySelectorAll('input[type="checkbox"][value]'))
            .filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Cor'))
            .map(cb => cb.value);
            
        const combustivelSelecionado = Array.from(document.querySelectorAll('input[type="checkbox"][value]'))
            .filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Combustível'))
            .map(cb => cb.value);
            
        const cambioSelecionado = Array.from(document.querySelectorAll('input[type="checkbox"][value]'))
            .filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Câmbio'))
            .map(cb => cb.value);
        
        // Verificar campos de ano, preço e km
        const anoMin = document.getElementById('anoMin')?.value;
        const anoMax = document.getElementById('anoMax')?.value;
        const precoMin = document.getElementById('precoMin')?.value;
        const precoMax = document.getElementById('precoMax')?.value;
        const kmMin = document.getElementById('kmMin')?.value;
        const kmMax = document.getElementById('kmMax')?.value;
        
        // Montar descrição do que foi pesquisado
        let termosAtivos = [];
        
        if (marcaSelecionada.length > 0) termosAtivos.push(`marca${marcaSelecionada.length > 1 ? 's' : ''}: ${marcaSelecionada.join(', ')}`);
        if (categoriaSelecionada.length > 0) termosAtivos.push(`categoria${categoriaSelecionada.length > 1 ? 's' : ''}: ${categoriaSelecionada.join(', ')}`);
        if (corSelecionada.length > 0) termosAtivos.push(`cor${corSelecionada.length > 1 ? 'es' : ''}: ${corSelecionada.join(', ')}`);
        if (combustivelSelecionado.length > 0) termosAtivos.push(`combustível: ${combustivelSelecionado.join(', ')}`);
        if (cambioSelecionado.length > 0) termosAtivos.push(`câmbio: ${cambioSelecionado.join(', ')}`);
        
        if (anoMin || anoMax) {
            let anoRange = 'ano';
            if (anoMin && anoMax) anoRange += ` entre ${anoMin} e ${anoMax}`;
            else if (anoMin) anoRange += ` a partir de ${anoMin}`;
            else if (anoMax) anoRange += ` até ${anoMax}`;
            termosAtivos.push(anoRange);
        }
        
        if (precoMin || precoMax) {
            let precoRange = 'preço';
            if (precoMin && precoMax) precoRange += ` entre R$ ${parseInt(precoMin).toLocaleString()} e R$ ${parseInt(precoMax).toLocaleString()}`;
            else if (precoMin) precoRange += ` a partir de R$ ${parseInt(precoMin).toLocaleString()}`;
            else if (precoMax) precoRange += ` até R$ ${parseInt(precoMax).toLocaleString()}`;
            termosAtivos.push(precoRange);
        }
        
        if (kmMin || kmMax) {
            let kmRange = 'quilometragem';
            if (kmMin && kmMax) kmRange += ` entre ${parseInt(kmMin).toLocaleString()} e ${parseInt(kmMax).toLocaleString()} km`;
            else if (kmMin) kmRange += ` a partir de ${parseInt(kmMin).toLocaleString()} km`;
            else if (kmMax) kmRange += ` até ${parseInt(kmMax).toLocaleString()} km`;
            termosAtivos.push(kmRange);
        }
        
        return termosAtivos.length > 0 ? termosAtivos.join(', ') : 'filtros aplicados';
    }

    // Função para salvar informações da pesquisa
    function salvarInfoPesquisa(termoPesquisado) {
        const infoPesquisa = {
            termo: termoPesquisado,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('pesquisaSemResultado', JSON.stringify(infoPesquisa));
    }

    // Função para verificar se há info de pesquisa sem resultado
    function verificarPesquisaSemResultado() {
        const info = localStorage.getItem('pesquisaSemResultado');
        if (info) {
            const pesquisa = JSON.parse(info);
            // Verificar se a pesquisa foi feita há menos de 30 segundos
            if (new Date().getTime() - pesquisa.timestamp < 30000) {
                mostrarMensagemSemResultado(pesquisa.termo);
                localStorage.removeItem('pesquisaSemResultado');
                return true;
            }
        }
        return false;
    }

// ----- MENSAGEM QUANDO NÃO HÁ RESULTADOS -----
function mostrarMensagemSemResultado(termoPesquisado = '') {
  if (!motoList) return;

  motoList.innerHTML = `
    <div style="
        text-align:center;
        padding:60px 20px;
        background:#f9f9f9;
        border-radius:10px;
        margin:20px 0;
        box-shadow:0 2px 10px rgba(0,0,0,0.08);
    ">
      <i class="fas fa-search" style="font-size:48px;color:#ccc;margin-bottom:18px;"></i>
      <h2 style="color:#333;margin-bottom:12px;">Nenhuma moto encontrada</h2>
      <p style="font-size:16px;color:#555;margin-bottom:20px;">
        Não encontramos motos com as características:
        <strong>${termoPesquisado || 'informadas'}</strong>
      </p>
      <button onclick="limparFiltros()" style="
          background:#000;
          color:#fff;
          border:none;
          padding:10px 22px;
          border-radius:5px;
          cursor:pointer;
          font-size:14px;
      ">
        Limpar filtros
      </button>
      <a href="https://wa.me/5513997730431?text=Olá! Procuro uma moto com características específicas. Podem me ajudar?"
         target="_blank"
         style="
           display:inline-block;
           margin-left:12px;
           background:#25d366;
           color:#fff;
           padding:10px 22px;
           border-radius:5px;
           text-decoration:none;
           font-size:14px;
      ">
        <i class="fab fa-whatsapp"></i> Falar no WhatsApp
      </a>
    </div>`;
}



    // formata 123456 em "123.456"
    function kmFormat(valor) {
        return valor.toLocaleString('pt-BR');
    }

    // IDs das motos que quer mostrar na index.html ( MOTOS EM DESTAQUE)
    const idsDestaque = [1];

    // CORREÇÃO: Verificar se estamos na página index E se o elemento existe
    function inicializarIndex() {
        const isIndex = window.location.pathname.endsWith("index.html") || 
                    window.location.pathname === "/" || 
                    window.location.pathname.endsWith("/");
        
        if (isIndex && motoList) {
            console.log('Inicializando cards do index...'); // Para debug
            gerarCardsPorIds(idsDestaque);
        } else if (isIndex && !motoList) {
            console.error('Elemento motoList não encontrado no index.html');
        }
    }

    // Executar após DOM carregado
    setTimeout(inicializarIndex, 100);

    function gerarCardsPorIds(ids) {
        if (!motoList) return;
        
        console.log('IDs solicitados na ordem:', ids); // Para debug
        
        motoList.innerHTML = '';
        
        // Gerar cards EXATAMENTE na ordem dos IDs fornecidos
        ids.forEach(id => {
            const moto = window.motosData.find(m => m.id === id);
            if (moto) {
                const card = document.createElement('div');
                card.classList.add('moto-card');
                
                // Usar primeira imagem do array
                const imagemPrincipal = moto.imagens && moto.imagens.length > 0 ? moto.imagens[0] : 'placeholder.jpg';
                
                card.innerHTML = `
                    <div class="card-media">
                        <img src="images/${imagemPrincipal}" alt="${moto.marca} ${moto.nome}">
                    </div>
                    <div class="card-body">
                        <div class="card-content">
                            <p class="subtitulo">${moto.categoria} • USADO • ${moto.ano}/${moto.ano}</p>
                            <h3>${moto.marca} ${moto.nome}</h3>
                            <p class="preco">R$ ${moto.preco.toLocaleString('pt-BR')}</p>
                            <div class="info-icons">
                                <div class="item"><i class="fas fa-calendar"></i><span>${moto.ano}</span></div>
                                <div class="item"><i class="fas fa-palette"></i><span>${moto.cor}</span></div>
                                <div class="item"><i class="fas fa-motorcycle"></i><span>${moto.categoria}</span></div>
                                <div class="item"><i class="fas fa-tachometer-alt"></i><span>${kmFormat(moto.quilometragem)} km</span></div>
                                <div class="item"><i class="fas fa-gas-pump"></i><span>${moto.combustivel}</span></div>
                                <div class="item"><i class="fas fa-cogs"></i><span>${moto.cilindrada}</span></div>
                            </div>
                        </div>
                        <a href="detalhes.html?id=${moto.id}" class="btn-detalhes">Mais Detalhes</a>
                    </div>
                `;
                
                // Adicionar diretamente na ordem correta
                motoList.appendChild(card);
                
                console.log(`Card adicionado: ID ${id} - ${moto.marca} ${moto.nome}`); // Para debug
            } else {
                console.warn(`Moto com ID ${id} não encontrada`); // Para debug
            }
        });
    }

    // Variáveis para controle de filtros e paginação
    let motosFiltradas = aplicarBuscaLivre([...window.motosData]);
    let currentPage   = 1;
    let itemsPerPage  = 12;
    let viewMode      = 'grid';


    // SINCRONIZAÇÃO DE RANGES COM CAMPOS NUMÉRICOS
    function setupRangeSync() {
        const anoMinRange = document.getElementById('anoMinRange');
        const anoMaxRange = document.getElementById('anoMaxRange');
        const anoMin = document.getElementById('anoMin');
        const anoMax = document.getElementById('anoMax');
        
        if (anoMinRange && anoMin) {
            anoMinRange.addEventListener('input', () => {
                anoMin.value = anoMinRange.value;
                if (anoMax) anoMax.min = anoMinRange.value;
            });
        }
        if (anoMaxRange && anoMax) {
            anoMaxRange.addEventListener('input', () => {
                anoMax.value = anoMaxRange.value;
                if (anoMin) anoMin.max = anoMaxRange.value;
            });
        }

        const precoMinRange = document.getElementById('precoMinRange');
        const precoMaxRange = document.getElementById('precoMaxRange');
        const precoMin = document.getElementById('precoMin');
        const precoMax = document.getElementById('precoMax');
        
        if (precoMinRange && precoMin) {
            precoMinRange.addEventListener('input', () => {
                precoMin.value = precoMinRange.value;
                if (precoMax) precoMax.min = precoMinRange.value;
            });
        }
        if (precoMaxRange && precoMax) {
            precoMaxRange.addEventListener('input', () => {
                precoMax.value = precoMaxRange.value;
                if (precoMin) precoMin.max = precoMaxRange.value;
            });
        }

        const kmMinRange = document.getElementById('kmMinRange');
        const kmMaxRange = document.getElementById('kmMaxRange');
        const kmMin = document.getElementById('kmMin');
        const kmMax = document.getElementById('kmMax');
        
        if (kmMinRange && kmMin) {
            kmMinRange.addEventListener('input', () => {
                kmMin.value = kmMinRange.value;
                if (kmMax) kmMax.min = kmMinRange.value;
            });
        }
        if (kmMaxRange && kmMax) {
            kmMaxRange.addEventListener('input', () => {
                kmMax.value = kmMaxRange.value;
                if (kmMin) kmMin.max = kmMaxRange.value;
            });
        }
    }

    // Função para aplicar filtros - MODIFICADA
    function aplicarFiltros() {
        const filtros = {
            marcas: Array.from(document.querySelectorAll('input[type="checkbox"][value]')).filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Marca')).map(cb => cb.value),
            categorias: Array.from(document.querySelectorAll('input[type="checkbox"][value]')).filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Categoria')).map(cb => cb.value),
            combustiveis: Array.from(document.querySelectorAll('input[type="checkbox"][value]')).filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Combustível')).map(cb => cb.value),
            cores: Array.from(document.querySelectorAll('input[type="checkbox"][value]')).filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Cor')).map(cb => cb.value),
            cambios: Array.from(document.querySelectorAll('input[type="checkbox"][value]')).filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Câmbio')).map(cb => cb.value),
            caracteristicas: Array.from(document.querySelectorAll('input[type="checkbox"][value]')).filter(cb => cb.checked && cb.closest('.grupo').querySelector('h4').textContent.includes('Características')).map(cb => cb.value),
            anoMin: parseInt(document.getElementById('anoMin')?.value) || 0,
            anoMax: parseInt(document.getElementById('anoMax')?.value) || 9999,
            precoMin: parseInt(document.getElementById('precoMin')?.value) || 0,
            precoMax: parseInt(document.getElementById('precoMax')?.value) || 999999,
            kmMin: parseInt(document.getElementById('kmMin')?.value) || 0,
            kmMax: parseInt(document.getElementById('kmMax')?.value) || 999999
        };

        motosFiltradas = window.motosData.filter(moto => {
            if (filtros.marcas.length > 0 && !filtros.marcas.includes(moto.marca)) return false;
            if (filtros.categorias.length > 0 && !filtros.categorias.includes(moto.categoria)) return false;
            if (filtros.combustiveis.length > 0 && !filtros.combustiveis.includes(moto.combustivel)) return false;
            if (filtros.cores.length > 0 && !filtros.cores.includes(moto.cor)) return false;
            if (filtros.cambios.length > 0 && !filtros.cambios.includes(moto.cambio)) return false;
            if (filtros.caracteristicas.includes('zeroKm') && !moto.zeroKm) return false;
            if (filtros.caracteristicas.includes('blindada') && !moto.blindada) return false;
            if (filtros.caracteristicas.includes('unicoDono') && !moto.unicoDono) return false;
            if (filtros.caracteristicas.includes('revisada') && !moto.revisada) return false;
            if (filtros.caracteristicas.includes('garantia') && !moto.garantia) return false;
            if (moto.ano < filtros.anoMin || moto.ano > filtros.anoMax) return false;
            if (moto.preco < filtros.precoMin || moto.preco > filtros.precoMax) return false;
            if (moto.quilometragem < filtros.kmMin || moto.quilometragem > filtros.kmMax) return false;
            return true;
        });

        // NOVA LÓGICA: Se não há resultados, redirecionar para motos.html com informação
        if (motosFiltradas.length === 0) {
            const termoPesquisado = obterTermoPesquisado();
            
            // Se já estamos na página motos.html, mostrar mensagem
            if (window.location.pathname.includes('motos.html')) {
                mostrarMensagemSemResultado(termoPesquisado);
                return;
            }
            
            // Se não estamos na página motos.html, salvar info e redirecionar
            salvarInfoPesquisa(termoPesquisado);
            window.location.href = 'motos.html';
            return;
        }

        currentPage = 1;
        gerarCards(motosFiltradas);
        atualizarPaginacao();
    }

    // Função para limpar filtros - GLOBAL
    window.limparFiltros = function() {
        document.querySelectorAll('.filtros input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.filtros input[type="number"]').forEach(inp => inp.value = '');
        document.querySelectorAll('.filtros input[type="range"]').forEach(range => {
            range.value = range.getAttribute('value') || range.min;
        });
        if (input) input.value = '';
        motosFiltradas = aplicarBuscaLivre([...window.motosData]);
        currentPage = 1;
        gerarCards(motosFiltradas);
        atualizarPaginacao();
    };

    // Função para aplicar destaque no termo pesquisado
    function highlightTerm(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Função para gerar os cards dinamicamente - MODIFICADA
    function gerarCards(motos, termoPesquisa = "") {
        if (!motoList) return;
        
        motoList.innerHTML = '';

        if (motos.length === 0) {
            const termoPesquisado = obterTermoPesquisado();
            mostrarMensagemSemResultado(termoPesquisado);  // Exibe mensagem de erro
            return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const motosParaExibir = motos.slice(startIndex, endIndex);
        motoList.className = `motos ${viewMode}`;

        motosParaExibir.forEach(moto => {
            const card = document.createElement('div');
            card.classList.add('moto-card');

            // Destaque de termos pesquisados
            const nomeDestaque = highlightTerm(moto.nome, termoPesquisa);
            const categoriaDestaque = highlightTerm(moto.categoria, termoPesquisa);

            const imagemPrincipal = moto.imagens && moto.imagens.length > 0 ? moto.imagens[0] : 'placeholder.jpg';

            card.innerHTML = `
                <div class="card-media">
                    <img src="images/${imagemPrincipal}" alt="${moto.marca} ${moto.nome}" loading="lazy">
                </div>
                <div class="card-body">
                    <div class="card-content">
                        <p class="subtitulo">${categoriaDestaque} • USADO • ${moto.ano}/${moto.ano}</p>
                        <h3>${moto.marca} ${nomeDestaque}</h3>
                        <p class="preco">R$ ${moto.preco.toLocaleString('pt-BR')}</p>
                        <div class="info-icons">
                            <div class="item"><i class="fas fa-calendar"></i><span>${moto.ano}</span></div>
                            <div class="item"><i class="fas fa-palette"></i><span>${moto.cor}</span></div>
                            <div class="item"><i class="fas fa-motorcycle"></i><span>${moto.categoria}</span></div>
                            <div class="item"><i class="fas fa-tachometer-alt"></i><span>${moto.quilometragem.toLocaleString()} km</span></div>
                            <div class="item"><i class="fas fa-gas-pump"></i><span>${moto.combustivel}</span></div>
                            <div class="item"><i class="fas fa-cogs"></i><span>${moto.cilindrada || moto.cambio}</span></div>
                        </div>
                    </div>
                    <a href="detalhes.html?id=${moto.id}" class="btn-detalhes">Mais Detalhes</a>
                </div>
            `;

            motoList.appendChild(card);
        });

        atualizarPaginacao();
    }


    // Funções auxiliares
    function atualizarPaginacao() {
        const totalPages = Math.ceil(motosFiltradas.length / itemsPerPage);
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) prevBtn.disabled = currentPage <= 1;
        if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
    }

    function filtrarMotos(termo) {
    if (!termo) return [...window.motosData];

    const tokens = termo
        .split(/[,\s]+/)
        .map(t => normalizar(t))
        .filter(Boolean);

    return window.motosData.filter(moto => {
        const alvo = normalizar(
        `${moto.nome} ${moto.marca} ${moto.categoria} ${moto.cor}
        ${moto.combustivel} ${moto.cambio} ${moto.cilindrada}
        ${moto.ano} ${moto.quilometragem} ${moto.descricao || ''}`
        );
        return tokens.some(tok => alvo.includes(tok));
    });
    }


    // Função de busca - MODIFICADA
    function realizarBusca() {
        const termo = input ? input.value.trim() : '';
        if (termo) {
            motosFiltradas = filtrarMotos(termo);
            
            // NOVA LÓGICA: Se não há resultados na busca
            if (motosFiltradas.length === 0) {
                // Se já estamos na página motos.html, mostrar mensagem
                if (window.location.pathname.includes('motos.html')) {
                    mostrarMensagemSemResultado(termo);
                    return;
                }
                
                // Se não estamos na página motos.html, salvar info e redirecionar
                salvarInfoPesquisa(termo);
                window.location.href = 'motos.html';
                return;
            }
            
            currentPage = 1;
            gerarCards(motosFiltradas, termo);
        } else {
            motosFiltradas = aplicarBuscaLivre([...window.motosData]);
            currentPage = 1;
            gerarCards(motosFiltradas);
        }
    }

    function lerParametrosBusca() {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        return {
            marca: params.get('marca') || "",
            modelo: params.get('modelo') || "",
            menor: params.get('menor') || "",
            maior: params.get('maior') || ""
        };
    }

    // Inicializar a página - MODIFICADA
    function inicializar() {
        // Verificar se há pesquisa sem resultado salva (apenas na página motos.html)
        if (window.location.pathname.includes('motos.html')) {
            if (verificarPesquisaSemResultado()) {
                return; // Mensagem já foi exibida
            }
        }

        const params = lerParametrosBusca();
        if (params.marca || params.modelo || params.menor || params.maior) {
            motosFiltradas = window.motosData.filter(moto => {
                let match = true;
                if (params.marca && moto.marca !== params.marca) match = false;
                if (params.modelo && moto.nome !== params.modelo) match = false;
                if (params.menor && moto.ano < parseInt(params.menor)) match = false;
                if (params.maior && moto.ano > parseInt(params.maior)) match = false;
                return match;
            });
        }

        gerarCards(motosFiltradas);
        setupRangeSync();

        if (btn) btn.addEventListener('click', realizarBusca);
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') realizarBusca();
            });
        }

        const aplicarBtn = document.getElementById('aplicarFiltros');
        const limparBtn = document.getElementById('limparFiltros');
        
        if (aplicarBtn) aplicarBtn.addEventListener('click', aplicarFiltros);
        if (limparBtn) limparBtn.addEventListener('click', limparFiltros);

        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    gerarCards(motosFiltradas);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(motosFiltradas.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    gerarCards(motosFiltradas);
                }
            });
        }

        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const sortValue = e.target.value;
                
                switch (sortValue) {
                    case 'preco-asc':
                        motosFiltradas.sort((a, b) => a.preco - b.preco);
                        break;
                    case 'preco-desc':
                        motosFiltradas.sort((a, b) => b.preco - a.preco);
                        break;
                    case 'ano-desc':
                        motosFiltradas.sort((a, b) => b.ano - a.ano);
                        break;
                }
                
                currentPage = 1;
                gerarCards(motosFiltradas);
            });
        }

        const itemsSelect = document.getElementById('itemsPerPageSelect');
        if (itemsSelect) {
            itemsSelect.addEventListener('change', (e) => {
                itemsPerPage = parseInt(e.target.value);
                currentPage = 1;
                gerarCards(motosFiltradas);
            });
        }

        const gridViewBtn = document.getElementById('gridViewBtn');
        const listViewBtn = document.getElementById('listViewBtn');
        
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                viewMode = 'grid';
                gerarCards(motosFiltradas);
            });
        }
        
        if (listViewBtn) {
            listViewBtn.addEventListener('click', () => {
                viewMode = 'list';
                gerarCards(motosFiltradas);
            });
        }
    }

    inicializar();

    window.verDetalhes = function(motoId) {
        window.location.href = `detalhes.html?id=${motoId}`;
    };
});


// ===============================================================
// CÓDIGO PARA PÁGINA DE DETALHES - FUNCIONAL
// ===============================================================

// Script específico para página de detalhes - FORA do DOMContentLoaded principal
document.addEventListener('DOMContentLoaded', () => {
    // Só executa se estiver na página de detalhes
    if (!window.location.pathname.includes("detalhes.html")) return;

    const urlParams = new URLSearchParams(window.location.search);
    const motoId = parseInt(urlParams.get('id'));
    
    if (!motoId) {
        const nomeMoto = document.getElementById('nomeMoto');
        if (nomeMoto) nomeMoto.textContent = 'Moto não encontrada';
        return;
    }

    // Aguardar o motosData estar disponível
    setTimeout(() => {
        if (!window.motosData) {
            console.error('motosData não encontrado');
            return;
        }

        const moto = window.motosData.find(m => m.id === motoId);
        
        if (!moto) {
            const nomeMoto = document.getElementById('nomeMoto');
            if (nomeMoto) nomeMoto.textContent = 'Moto não encontrada';
            return;
        }

        // Preencher informações da moto
        const breadcrumbMoto = document.getElementById('breadcrumbMoto');
        const categoriaAno = document.getElementById('categoriaAno');
        const nomeMoto = document.getElementById('nomeMoto');
        const precoMoto = document.getElementById('precoMoto');
        const anoMoto = document.getElementById('anoMoto');
        const quilometragemMoto = document.getElementById('quilometragemMoto');
        const cambioMoto = document.getElementById('cambioMoto');
        const corMoto = document.getElementById('corMoto');
        const combustivelMoto = document.getElementById('combustivelMoto');
        const categoriaMoto = document.getElementById('categoriaMoto');
        const descricaoMoto = document.getElementById('descricaoMoto');

        if (breadcrumbMoto) breadcrumbMoto.textContent = `${moto.marca} ${moto.nome}`;
        if (categoriaAno) categoriaAno.textContent = `${moto.categoria.toUpperCase()} • USADO • ${moto.ano}/${moto.ano}`;
        if (nomeMoto) nomeMoto.textContent = `${moto.marca} ${moto.nome}`;
        if (precoMoto) precoMoto.textContent = `R$ ${moto.preco.toLocaleString('pt-BR')}`;
        if (anoMoto) anoMoto.textContent = moto.ano;
        if (quilometragemMoto) quilometragemMoto.textContent = `${moto.quilometragem.toLocaleString()} km`;
        if (cambioMoto) cambioMoto.textContent = moto.cambio;
        if (corMoto) corMoto.textContent = moto.cor;
        if (combustivelMoto) combustivelMoto.textContent = moto.combustivel;
        if (categoriaMoto) categoriaMoto.textContent = moto.categoria;
        if (descricaoMoto) descricaoMoto.textContent = moto.descricao;
        
        // Especificações
        const marcaMoto = document.getElementById('marcaMoto');
        const modeloMoto = document.getElementById('modeloMoto');
        const categoriaSpec = document.getElementById('categoriaSpec');
        const combustivelSpec = document.getElementById('combustivelSpec');
        const anoSpec = document.getElementById('anoSpec');
        const kmSpec = document.getElementById('kmSpec');

        if (marcaMoto) marcaMoto.textContent = moto.marca;
        if (modeloMoto) modeloMoto.textContent = moto.nome;
        if (categoriaSpec) categoriaSpec.textContent = moto.categoria;
        if (combustivelSpec) combustivelSpec.textContent = moto.combustivel;
        if (anoSpec) anoSpec.textContent = moto.ano;
        if (kmSpec) kmSpec.textContent = `${moto.quilometragem.toLocaleString()} km`;

        // Gerar badges
        const badgesContainer = document.getElementById('badgesContainer');
        if (badgesContainer) {
            badgesContainer.innerHTML = '';
            
            if (moto.zeroKm) badgesContainer.innerHTML += '<span class="badge badge-positive">Zero KM</span>';
            if (moto.unicoDono) badgesContainer.innerHTML += '<span class="badge badge-positive">Único Dono</span>';
            if (moto.revisada) badgesContainer.innerHTML += '<span class="badge badge-positive">Revisada</span>';
            if (moto.garantia) badgesContainer.innerHTML += '<span class="badge badge-positive">Garantia</span>';
        }

        // GALERIA DE IMAGENS
        const imagens = moto.imagens || ['placeholder.jpg'];
        let currentImageIndex = 0;
        const imagemPrincipal = document.getElementById('imagemPrincipal');
        const miniaturas = document.getElementById('miniaturas');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        function renderGaleria() {
            if (imagemPrincipal) {
                imagemPrincipal.src = `images/${imagens[currentImageIndex]}`;
                imagemPrincipal.alt = `${moto.marca} ${moto.nome} - Foto ${currentImageIndex + 1}`;
            }
            
            if (miniaturas) {
                miniaturas.innerHTML = '';
                imagens.forEach((img, index) => {
                    const miniatura = document.createElement('div');
                    miniatura.className = `miniatura ${index === currentImageIndex ? 'active' : ''}`;
                    miniatura.innerHTML = `<img src="images/${img}" alt="Imagem ${index + 1}">`;
                    miniatura.onclick = () => {
                        currentImageIndex = index;
                        renderGaleria();
                    };
                    miniaturas.appendChild(miniatura);
                });
            }
        }

        renderGaleria();

        // Navegação de imagens
        if (prevBtn) {
            prevBtn.onclick = () => {
                currentImageIndex = currentImageIndex === 0 ? imagens.length - 1 : currentImageIndex - 1;
                renderGaleria();
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                currentImageIndex = currentImageIndex === imagens.length - 1 ? 0 : currentImageIndex + 1;
                renderGaleria();
            };
        }

        // Configurar botões de ação
        const btnWhatsApp = document.getElementById('btnWhatsApp');
        if (btnWhatsApp) {
            const mensagem = `Olá! Tenho interesse na ${moto.marca} ${moto.nome} ${moto.ano} por R$ ${moto.preco.toLocaleString('pt-BR')}. Podemos conversar?`;
            btnWhatsApp.href = `https://wa.me/5513997730431?text=${encodeURIComponent(mensagem)}`;
        }

        const btnCompartilhar = document.getElementById('btnCompartilhar');
        if (btnCompartilhar) {
            btnCompartilhar.onclick = () => {
                if (navigator.share) {
                    navigator.share({
                        title: `${moto.marca} ${moto.nome}`,
                        text: `Confira esta ${moto.marca} ${moto.nome} por R$ ${moto.preco.toLocaleString('pt-BR')}`,
                        url: window.location.href
                    });
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copiado para a área de transferência!');
                }
            };
        }

        // Gerar motos relacionadas
        const motosRelacionadas = window.motosData.filter(m => 
            m.id !== moto.id && 
            (m.marca === moto.marca || m.categoria === moto.categoria)
        ).slice(0, 3);

        const container = document.getElementById('motosRelacionadas');
        if (container && motosRelacionadas.length > 0) {
            container.style.display = motosRelacionadas.length > 1 ? 'grid' : 'flex';
            container.style.gridTemplateColumns = motosRelacionadas.length > 1 ? `repeat(${Math.min(motosRelacionadas.length, 3)}, 1fr)` : '';
            container.style.justifyContent = motosRelacionadas.length === 1 ? 'center' : '';
            
            container.innerHTML = '';
            motosRelacionadas.forEach(motoRel => {
                const card = document.createElement('div');
                card.className = 'moto-card';
                
                // Usar primeira imagem do array para motos relacionadas
                const imagemRelacionada = motoRel.imagens && motoRel.imagens.length > 0 ? motoRel.imagens[0] : 'placeholder.jpg';
                
                card.innerHTML = `
                    <div class="card-media">
                        <img src="images/${imagemRelacionada}" alt="${motoRel.marca} ${motoRel.nome}">
                    </div>
                    <div class="card-body">
                        <div class="card-content">
                            <p class="subtitulo">${motoRel.categoria.toUpperCase()} • USADO • ${motoRel.ano}/${motoRel.ano}</p>
                            <h3 class="modelo">${motoRel.marca} ${motoRel.nome}</h3>
                            <p class="preco">R$ ${motoRel.preco.toLocaleString('pt-BR')}</p>
                            <div class="info-icons">
                                <div class="item"><i class="fas fa-calendar"></i><span>${motoRel.ano}</span></div>
                                <div class="item"><i class="fas fa-palette"></i><span>${motoRel.cor}</span></div>
                                <div class="item"><i class="fas fa-motorcycle"></i><span>${motoRel.categoria}</span></div>
                                <div class="item"><i class="fas fa-tachometer-alt"></i><span>${motoRel.quilometragem.toLocaleString()} km</span></div>
                                <div class="item"><i class="fas fa-gas-pump"></i><span>${motoRel.combustivel}</span></div>
                                <div class="item"><i class="fas fa-cogs"></i><span>${motoRel.cambio}</span></div>
                            </div>
                        </div>
                        <a href="detalhes.html?id=${motoRel.id}" class="btn-detalhes">Mais Detalhes</a>
                    </div>
                `;
                container.appendChild(card);
            });
        } else if (container) {
            container.innerHTML = '<p style="text-align: center; color: #666;">Nenhuma moto relacionada encontrada.</p>';
        }
    }, 100); // Pequeno delay para garantir que motosData esteja carregado
});
