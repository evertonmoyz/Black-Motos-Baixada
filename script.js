document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    const motoList = document.getElementById('motoList');

    // Dados das motos - GLOBAL para ser acessado por detalhes.html
    window.motosData = [
        {
            id: 1,
            nome: "Honda CG 160",
            preco: 20000,
            ano: 2023,
            marca: "Honda",
            categoria: "Street",
            combustivel: "Gasolina",
            cor: "Prata",
            quilometragem: 15000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "160cc",
            descricao: "Motocicleta em ótimo estado, único dono e com 15.000 km rodados. Ideal para uso urbano com excelente economia de combustível.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 2,
            nome: "MT-07",
            preco: 28000,
            ano: 2018,
            marca: "Yamaha",
            categoria: "Sport",
            combustivel: "Gasolina",
            cor: "Vermelha",
            quilometragem: 30000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "689cc",
            descricao: "Motocicleta esportiva de excelente desempenho com motor bicilíndrico de 689cc.",
            zeroKm: false,
            unicoDono: false,
            blindada: false,
            revisada: true,
            garantia: false
        },
        {
            id: 3,
            nome: "Z900",
            preco: 22000,
            ano: 2021,
            marca: "Kawasaki",
            categoria: "Sport",
            combustivel: "Gasolina",
            cor: "Verde",
            quilometragem: 12000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "948cc",
            descricao: "Motocicleta esportiva de alto desempenho, com apenas 12.000 km rodados. Motor 4 cilindros potente.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 4,
            nome: "CB 500X",
            preco: 32000,
            ano: 2020,
            marca: "Honda",
            categoria: "Naked",
            combustivel: "Gasolina",
            cor: "Azul",
            quilometragem: 20000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "471cc",
            descricao: "Motocicleta com grande conforto para longas viagens, com 20.000 km rodados. ABS de série.",
            zeroKm: false,
            unicoDono: false,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 5,
            nome: "G 310 R",
            preco: 27000,
            ano: 2021,
            marca: "BMW",
            categoria: "Street",
            combustivel: "Gasolina",
            cor: "Branca",
            quilometragem: 5000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "313cc",
            descricao: "Motocicleta naked de excelente desempenho, praticamente nova com apenas 5.000 km. Tecnologia BMW.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 6,
            nome: "GSX-S750",
            preco: 35000,
            ano: 2019,
            marca: "Suzuki",
            categoria: "Sport",
            combustivel: "Gasolina",
            cor: "Preta",
            quilometragem: 25000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "749cc",
            descricao: "Motocicleta de alto desempenho, perfeita para quem busca velocidade e estilo. Motor 4 cilindros em linha.",
            zeroKm: false,
            unicoDono: false,
            blindada: false,
            revisada: true,
            garantia: false
        },
        {
            id: 7,
            nome: "390 Duke",
            preco: 25000,
            ano: 2020,
            marca: "KTM",
            categoria: "Naked",
            combustivel: "Gasolina",
            cor: "Laranja",
            quilometragem: 15000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "373cc",
            descricao: "Motocicleta agressiva e cheia de potência, ideal para quem ama adrenalina. Design único KTM.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 8,
            nome: "XRE 300",
            preco: 29000,
            ano: 2021,
            marca: "Honda",
            categoria: "Trail",
            combustivel: "Gasolina",
            cor: "Preta",
            quilometragem: 10000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "291cc",
            descricao: "Motocicleta para quem adora aventuras off-road com 10.000 km rodados. Suspensão longa e resistente.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 9,
            nome: "Fazer 250",
            preco: 19000,
            ano: 2020,
            marca: "Yamaha",
            categoria: "Street",
            combustivel: "Gasolina",
            cor: "Azul",
            quilometragem: 18000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "249cc",
            descricao: "Motocicleta ideal para o dia a dia, com um bom desempenho e conforto. Econômica e confiável.",
            zeroKm: false,
            unicoDono: false,
            blindada: false,
            revisada: true,
            garantia: false
        },
        {
            id: 10,
            nome: "NMAX 160",
            preco: 25000,
            ano: 2024,
            marca: "Yamaha",
            categoria: "Scooter",
            combustivel: "Gasolina",
            cor: "Preta",
            quilometragem: 0,
            cambio: "CVT",
            imagem: "MT07.jpg",
            cilindrada: "155cc",
            descricao: "Scooter com design moderno e ótimo desempenho, zero quilômetro. Câmbio automático CVT.",
            zeroKm: true,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 11,
            nome: "Monster 821",
            preco: 42000,
            ano: 2021,
            marca: "Ducati",
            categoria: "Naked",
            combustivel: "Gasolina",
            cor: "Vermelha",
            quilometragem: 7000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "821cc",
            descricao: "Motocicleta esportiva com design icônico e desempenho impressionante. Motor Testastretta 11°.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 12,
            nome: "Street Triple 765",
            preco: 48000,
            ano: 2021,
            marca: "Triumph",
            categoria: "Sport",
            combustivel: "Gasolina",
            cor: "Cinza",
            quilometragem: 5000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "765cc",
            descricao: "Motocicleta de alta performance, com motor de 765cc e excelente para rodar nas estradas. 3 cilindros em linha.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: true
        },
        {
            id: 13,
            nome: "DK 150",
            preco: 15000,
            ano: 2022,
            marca: "HaoJue",
            categoria: "Street",
            combustivel: "Flex",
            cor: "Branca",
            quilometragem: 8000,
            cambio: "Manual",
            imagem: "MT07.jpg",
            cilindrada: "149cc",
            descricao: "Motocicleta econômica e confiável para uso urbano. Aceita gasolina e etanol.",
            zeroKm: false,
            unicoDono: true,
            blindada: false,
            revisada: true,
            garantia: false
        }
    ];

    // Variáveis para controle de filtros e paginação
    let motosFiltradas = [...window.motosData];
    let currentPage = 1;
    let itemsPerPage = 12;
    let viewMode = 'grid';

    // Função para aplicar filtros
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
            // Filtros de marca
            if (filtros.marcas.length > 0 && !filtros.marcas.includes(moto.marca)) return false;
            
            // Filtros de categoria
            if (filtros.categorias.length > 0 && !filtros.categorias.includes(moto.categoria)) return false;
            
            // Filtros de combustível
            if (filtros.combustiveis.length > 0 && !filtros.combustiveis.includes(moto.combustivel)) return false;
            
            // Filtros de cor
            if (filtros.cores.length > 0 && !filtros.cores.includes(moto.cor)) return false;
            
            // Filtros de câmbio
            if (filtros.cambios.length > 0 && !filtros.cambios.includes(moto.cambio)) return false;
            
            // Filtros de características
            if (filtros.caracteristicas.includes('zeroKm') && !moto.zeroKm) return false;
            if (filtros.caracteristicas.includes('blindada') && !moto.blindada) return false;
            if (filtros.caracteristicas.includes('unicoDono') && !moto.unicoDono) return false;
            if (filtros.caracteristicas.includes('revisada') && !moto.revisada) return false;
            if (filtros.caracteristicas.includes('garantia') && !moto.garantia) return false;
            
            // Filtros numéricos
            if (moto.ano < filtros.anoMin || moto.ano > filtros.anoMax) return false;
            if (moto.preco < filtros.precoMin || moto.preco > filtros.precoMax) return false;
            if (moto.quilometragem < filtros.kmMin || moto.quilometragem > filtros.kmMax) return false;
            
            return true;
        });

        currentPage = 1;
        gerarCards(motosFiltradas);
        atualizarPaginacao();
    }

    // Função para limpar filtros
    function limparFiltros() {
        // Limpar checkboxes
        document.querySelectorAll('.filtros input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        // Limpar campos numéricos
        document.querySelectorAll('.filtros input[type="number"]').forEach(inp => inp.value = '');
        
        // Resetar ranges
        document.querySelectorAll('.filtros input[type="range"]').forEach(range => {
            range.value = range.getAttribute('value') || range.min;
        });
        
        // Resetar dados
        motosFiltradas = [...window.motosData];
        currentPage = 1;
        gerarCards(motosFiltradas);
        atualizarPaginacao();
    }

    // Função para aplicar destaque no termo pesquisado
    function highlightTerm(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Função para gerar os cards dinamicamente com os 6 ícones
    function gerarCards(motos, termoPesquisa = "") {
        if (!motoList) return;
        
        motoList.innerHTML = '';
        if (motos.length === 0) {
            motoList.innerHTML = "<p style='text-align: center; padding: 40px; color: #666;'>Nenhuma moto encontrada com os filtros aplicados.</p>";
            return;
        }

        // Aplicar paginação
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const motosParaExibir = motos.slice(startIndex, endIndex);

        // Aplicar classe do modo de visualização
        motoList.className = `motos ${viewMode}`;

        motosParaExibir.forEach(moto => {
            const card = document.createElement('div');
            card.classList.add('moto-card');

            const nomeDestaque = highlightTerm(moto.nome, termoPesquisa);
            const categoriaDestaque = highlightTerm(moto.categoria, termoPesquisa);

            card.innerHTML = `
                <div class="card-media">
                    <img src="images/${moto.imagem}" alt="${moto.marca} ${moto.nome}" loading="lazy">
                </div>
                <div class="card-body">
                    <div class="card-content">
                        <p class="subtitulo">${categoriaDestaque} • USADO • ${moto.ano}/${moto.ano}</p>
                        <h3>${moto.marca} ${nomeDestaque}</h3>
                        <p class="preco">R$ ${moto.preco.toLocaleString('pt-BR')}</p>
                        <div class="info-icons">
                            <div class="item">
                                <i class="fas fa-calendar"></i>
                                <span>${moto.ano}</span>
                            </div>
                            <div class="item">
                                <i class="fas fa-palette"></i>
                                <span>${moto.cor}</span>
                            </div>
                            <div class="item">
                                <i class="fas fa-motorcycle"></i>
                                <span>${moto.categoria}</span>
                            </div>
                            <div class="item">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>${moto.quilometragem.toLocaleString()} km</span>
                            </div>
                            <div class="item">
                                <i class="fas fa-gas-pump"></i>
                                <span>${moto.combustivel}</span>
                            </div>
                            <div class="item">
                                <i class="fas fa-cogs"></i>
                                <span>${moto.cilindrada || moto.cambio}</span>
                            </div>
                        </div>
                    </div>
                    <a href="detalhes.html?id=${moto.id}" class="btn-detalhes">Mais Detalhes</a>
                </div>
            `;
            
            motoList.appendChild(card);
        });

        atualizarPaginacao();
    }

    // Função para atualizar paginação
    function atualizarPaginacao() {
        const totalPages = Math.ceil(motosFiltradas.length / itemsPerPage);
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
        }
    }

    // Função para filtrar motos baseado na busca
    function filtrarMotos(termo) {
        const termoLower = termo.toLowerCase();
        return window.motosData.filter(moto => {
            return moto.nome.toLowerCase().includes(termoLower) ||
                   moto.marca.toLowerCase().includes(termoLower) ||
                   moto.categoria.toLowerCase().includes(termoLower) ||
                   moto.descricao.toLowerCase().includes(termoLower);
        });
    }

    // Event listener para a busca
    function realizarBusca() {
        const termo = input ? input.value.trim() : '';
        if (termo) {
            motosFiltradas = filtrarMotos(termo);
            currentPage = 1;
            gerarCards(motosFiltradas, termo);
        } else {
            motosFiltradas = [...window.motosData];
            currentPage = 1;
            gerarCards(motosFiltradas);
        }
    }

    // Função para ler parâmetros de busca da URL
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

    // Inicializar a página
    function inicializar() {
        // Aplicar filtros da URL se houver
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

        // Gerar cards iniciais
        gerarCards(motosFiltradas);

        // Configurar eventos de busca
        if (btn) {
            btn.addEventListener('click', realizarBusca);
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    realizarBusca();
                }
            });
        }

        // Configurar filtros
        const aplicarBtn = document.getElementById('aplicarFiltros');
        const limparBtn = document.getElementById('limparFiltros');
        
        if (aplicarBtn) {
            aplicarBtn.addEventListener('click', aplicarFiltros);
        }
        
        if (limparBtn) {
            limparBtn.addEventListener('click', limparFiltros);
        }

        // Configurar paginação
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

        // Configurar ordenação
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

        // Configurar itens por página
        const itemsSelect = document.getElementById('itemsPerPageSelect');
        if (itemsSelect) {
            itemsSelect.addEventListener('change', (e) => {
                itemsPerPage = parseInt(e.target.value);
                currentPage = 1;
                gerarCards(motosFiltradas);
            });
        }

        // Configurar views
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

    // Inicializar quando a página carrega
    inicializar();

    // Função global para detalhes da moto
    window.verDetalhes = function(motoId) {
        window.location.href = `detalhes.html?id=${motoId}`;
    };
});