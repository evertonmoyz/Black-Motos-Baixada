// ===== VENDIDOS.JS - FUNCIONALIDADES DA PÁGINA DE VENDIDOS =====

class VendidosController {
    constructor() {
        this.allCards = [];
        this.filteredCards = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentSort = '';
        this.currentView = 'grid';
        
        this.init();
    }
    
    init() {
        this.collectCards();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    // Coletar todos os cards vendidos
    collectCards() {
        const container = document.getElementById('vendidosList');
        if (!container) return;
        
        this.allCards = Array.from(container.querySelectorAll('.moto-card-vendido')).map(card => {
            return {
                element: card,
                title: card.querySelector('h3')?.textContent || '',
                subtitle: card.querySelector('.subtitulo')?.textContent || '',
                year: this.extractYear(card),
                price: this.extractPrice(card),
                km: this.extractKm(card),
                originalIndex: Array.from(container.children).indexOf(card)
            };
        });
        
        this.filteredCards = [...this.allCards];
    }
    
    // Extrair ano do card
    extractYear(card) {
        const yearElement = card.querySelector('.icon-item i.fa-calendar')?.nextElementSibling;
        return yearElement ? parseInt(yearElement.textContent) || 0 : 0;
    }
    
    // Extrair preço (se houver)
    extractPrice(card) {
        const priceElement = card.querySelector('.price, .valor');
        if (!priceElement) return 0;
        
        const priceText = priceElement.textContent.replace(/[^\d,]/g, '').replace(',', '.');
        return parseFloat(priceText) || 0;
    }
    
    // Extrair quilometragem
    extractKm(card) {
        const kmElement = card.querySelector('.icon-item i.fa-tachometer-alt')?.nextElementSibling;
        if (!kmElement) return 0;
        
        const kmText = kmElement.textContent.replace(/[^\d]/g, '');
        return parseInt(kmText) || 0;
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Ordenação
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.currentPage = 1;
                this.updateDisplay();
            });
        }
        
        // Itens por página
        const itemsSelect = document.getElementById('itemsPerPageSelect');
        if (itemsSelect) {
            itemsSelect.addEventListener('change', (e) => {
                this.itemsPerPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.updateDisplay();
            });
        }
        
        // Botões de paginação
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updateDisplay();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.updateDisplay();
                }
            });
        }
        
        // Botões de visualização
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');
        
        if (gridBtn) {
            gridBtn.addEventListener('click', () => {
                this.setView('grid');
            });
        }
        
        if (listBtn) {
            listBtn.addEventListener('click', () => {
                this.setView('list');
            });
        }
        
        // Busca
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
            
            // Busca com Enter
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchTerm = searchInput?.value || '';
                this.performSearch(searchTerm);
            });
        }
    }
    
    // Realizar busca
    performSearch(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredCards = [...this.allCards];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredCards = this.allCards.filter(card => 
                card.title.toLowerCase().includes(term) ||
                card.subtitle.toLowerCase().includes(term)
            );
        }
        
        this.currentPage = 1;
        this.updateDisplay();
    }
    
    // Ordenar cards
    sortCards() {
        if (!this.currentSort) return;
        
        this.filteredCards.sort((a, b) => {
            switch (this.currentSort) {
                case 'preco-asc':
                    return a.price - b.price;
                case 'preco-desc':
                    return b.price - a.price;
                case 'ano-desc':
                    return b.year - a.year;
                case 'ano-asc':
                    return a.year - b.year;
                case 'km-asc':
                    return a.km - b.km;
                case 'km-desc':
                    return b.km - a.km;
                case 'alfabetica':
                    return a.title.localeCompare(b.title);
                default:
                    return a.originalIndex - b.originalIndex;
            }
        });
    }
    
    // Definir visualização
    setView(view) {
        this.currentView = view;
        
        const container = document.getElementById('vendidosList');
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');
        
        if (view === 'grid') {
            container?.classList.remove('list-view');
            container?.classList.add('grid');
            gridBtn?.classList.add('active');
            listBtn?.classList.remove('active');
        } else {
            container?.classList.remove('grid');
            container?.classList.add('list-view');
            listBtn?.classList.add('active');
            gridBtn?.classList.remove('active');
        }
    }
    
    // Atualizar exibição
    updateDisplay() {
        this.sortCards();
        this.renderCards();
        this.updatePagination();
        this.updateResultsText();
    }
    
    // Renderizar cards
    renderCards() {
        const container = document.getElementById('vendidosList');
        if (!container) return;
        
        // Calcular cards da página atual
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentPageCards = this.filteredCards.slice(startIndex, endIndex);
        
        // Limpar container
        container.innerHTML = '';
        
        // Adicionar cards da página atual
        currentPageCards.forEach(cardData => {
            container.appendChild(cardData.element);
        });
        
        // Scroll para o topo quando mudar página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Atualizar paginação
    updatePagination() {
        const totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
        
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage >= totalPages || totalPages === 0;
        }
    }
    
    // Atualizar texto de resultados
    updateResultsText() {
        const resultsText = document.querySelector('.results-text-v2');
        if (!resultsText) return;
        
        const total = this.filteredCards.length;
        const startItem = total > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, total);
        
        if (total === 0) {
            resultsText.textContent = 'Nenhum veículo vendido encontrado.';
        } else if (total === this.allCards.length) {
            resultsText.textContent = `Exibindo ${startItem} a ${endItem} de ${total} veículos vendidos.`;
        } else {
            resultsText.textContent = `Exibindo ${startItem} a ${endItem} de ${total} resultados encontrados.`;
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de vendidos
    if (document.getElementById('vendidosList')) {
        window.vendidosController = new VendidosController();
    }
});
