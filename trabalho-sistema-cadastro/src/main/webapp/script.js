const API_BASE_URL = 'http://localhost:8080';

const cache = {
    categorias: new Map(),
    cargos: new Map()
};

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'colaboradores') {
        loadColaboradores();
        loadCargosForSelect();
    } else if (tabName === 'cargos') {
        loadCargos();
    } else if (tabName === 'produtos') {
        loadProdutos();
        loadCategoriasForSelect();
    } else if (tabName === 'categorias') {
        loadCategorias();
    } else if (tabName === 'vendas') {
        loadVendas();
        loadColaboradoresForSelect();
        loadProdutosForSelect();
    }
}

async function loadColaboradores() {
    try {
        const response = await fetch(`${API_BASE_URL}/colaboradores`);
        const colaboradores = await response.json();
        const tbody = document.querySelector('#colaboradoresTable tbody');
        tbody.innerHTML = '';
        
        colaboradores.forEach(col => {
            const tr = document.createElement('tr');
            let cargoNome = 'Sem cargo';
            
            if (col.cargo && typeof col.cargo === 'object' && col.cargo.nome) {
                cargoNome = col.cargo.nome;
                cache.cargos.set(col.cargo.id, col.cargo);
            } 
            else if (col.cargo && typeof col.cargo === 'string') {
                const cargoCache = cache.cargos.get(col.cargo);
                if (cargoCache) {
                    cargoNome = cargoCache.nome;
                }
            }
            
            tr.innerHTML = `
                <td>${col.id}</td>
                <td>${col.nome}</td>
                <td>${col.cpf}</td>
                <td>${col.dataDeNascimento}</td>
                <td>${cargoNome}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="editColaborador('${col.id}')">Editar</button>
                    <button class="btn-delete" onclick="deleteColaborador('${col.id}')">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showNotification('Erro ao carregar colaboradores', 'error');
    }
}

async function loadCargosForSelect() {
    try {
        const response = await fetch(`${API_BASE_URL}/cargos`);
        const cargos = await response.json();
        const select = document.getElementById('colaboradorCargo');
        select.innerHTML = '<option value="">Selecione um Cargo</option>';
        
        cargos.forEach(cargo => {
            cache.cargos.set(cargo.id, cargo);
            const option = document.createElement('option');
            option.value = cargo.id;
            option.textContent = cargo.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar cargos:', error);
    }
}

async function searchColaborador() {
    const id = document.getElementById('searchColaboradorId').value.trim();
    if (!id) {
        showNotification('Digite um ID para buscar', 'info');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/colaboradores/${id}`);
        if (response.ok) {
            const colaborador = await response.json();
            document.getElementById('colaboradorId').value = colaborador.id;
            document.getElementById('colaboradorNome').value = colaborador.nome;
            document.getElementById('colaboradorCpf').value = colaborador.cpf;
            document.getElementById('colaboradorData').value = colaborador.dataDeNascimento;
            document.getElementById('colaboradorCargo').value = (colaborador.cargo && colaborador.cargo.id) ? colaborador.cargo.id : '';
            showNotification('Colaborador encontrado!', 'success');
        } else {
            showNotification('Colaborador não encontrado', 'error');
        }
    } catch (error) {
        showNotification('Erro ao buscar colaborador', 'error');
    }
}

async function editColaborador(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/colaboradores/${id}`);
        const colaborador = await response.json();
        document.getElementById('colaboradorId').value = colaborador.id;
        document.getElementById('colaboradorNome').value = colaborador.nome;
        document.getElementById('colaboradorCpf').value = colaborador.cpf;
        document.getElementById('colaboradorData').value = colaborador.dataDeNascimento;
        document.getElementById('colaboradorCargo').value = (colaborador.cargo && colaborador.cargo.id) ? colaborador.cargo.id : '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        showNotification('Erro ao carregar colaborador', 'error');
    }
}

async function deleteColaborador(id) {
    if (!confirm('Tem certeza que deseja excluir este colaborador?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/colaboradores/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Colaborador excluído com sucesso!', 'success');
            loadColaboradores();
        } else {
            showNotification('Erro ao excluir colaborador', 'error');
        }
    } catch (error) {
        showNotification('Erro ao excluir colaborador', 'error');
    }
}

function clearColaboradorForm() {
    document.getElementById('colaboradorForm').reset();
    document.getElementById('colaboradorId').value = '';
}

document.getElementById('colaboradorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('colaboradorId').value;
    const cargoId = document.getElementById('colaboradorCargo').value;
    
    const colaborador = {
        nome: document.getElementById('colaboradorNome').value,
        cpf: document.getElementById('colaboradorCpf').value,
        dataDeNascimento: document.getElementById('colaboradorData').value,
        cargo: cargoId ? { id: cargoId } : null
    };
    
    try {
        const url = id ? `${API_BASE_URL}/colaboradores/${id}` : `${API_BASE_URL}/colaboradores`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(colaborador)
        });
        
        if (response.ok) {
            showNotification(`Colaborador ${id ? 'atualizado' : 'criado'} com sucesso!`, 'success');
            clearColaboradorForm();
            loadColaboradores();
        } else {
            showNotification('Erro ao salvar colaborador', 'error');
        }
    } catch (error) {
        showNotification('Erro ao salvar colaborador', 'error');
    }
});

async function loadCargos() {
    try {
        const response = await fetch(`${API_BASE_URL}/cargos`);
        const cargos = await response.json();
        const tbody = document.querySelector('#cargosTable tbody');
        tbody.innerHTML = '';
        
        cargos.forEach(cargo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cargo.id}</td>
                <td>${cargo.nome}</td>
                <td>${cargo.funcao}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="editCargo('${cargo.id}')">Editar</button>
                    <button class="btn-delete" onclick="deleteCargo('${cargo.id}')">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showNotification('Erro ao carregar cargos', 'error');
    }
}

async function searchCargo() {
    const id = document.getElementById('searchCargoId').value.trim();
    if (!id) {
        showNotification('Digite um ID para buscar', 'info');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/cargos/${id}`);
        if (response.ok) {
            const cargo = await response.json();
            document.getElementById('cargoId').value = cargo.id;
            document.getElementById('cargoNome').value = cargo.nome;
            document.getElementById('cargoFuncao').value = cargo.funcao;
            showNotification('Cargo encontrado!', 'success');
        } else {
            showNotification('Cargo não encontrado', 'error');
        }
    } catch (error) {
        showNotification('Erro ao buscar cargo', 'error');
    }
}

async function editCargo(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/cargos/${id}`);
        const cargo = await response.json();
        document.getElementById('cargoId').value = cargo.id;
        document.getElementById('cargoNome').value = cargo.nome;
        document.getElementById('cargoFuncao').value = cargo.funcao;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        showNotification('Erro ao carregar cargo', 'error');
    }
}

async function deleteCargo(id) {
    if (!confirm('Tem certeza que deseja excluir este cargo?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/cargos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Cargo excluído com sucesso!', 'success');
            loadCargos();
        } else {
            showNotification('Erro ao excluir cargo', 'error');
        }
    } catch (error) {
        showNotification('Erro ao excluir cargo', 'error');
    }
}

function clearCargoForm() {
    document.getElementById('cargoForm').reset();
    document.getElementById('cargoId').value = '';
}

document.getElementById('cargoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('cargoId').value;
    const cargo = {
        nome: document.getElementById('cargoNome').value,
        funcao: document.getElementById('cargoFuncao').value
    };
    
    try {
        const url = id ? `${API_BASE_URL}/cargos/${id}` : `${API_BASE_URL}/cargos`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cargo)
        });
        
        if (response.ok) {
            showNotification(`Cargo ${id ? 'atualizado' : 'criado'} com sucesso!`, 'success');
            clearCargoForm();
            loadCargos();
        } else {
            showNotification('Erro ao salvar cargo', 'error');
        }
    } catch (error) {
        showNotification('Erro ao salvar cargo', 'error');
    }
});

async function loadProdutos() {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos`);
        const produtos = await response.json();
        const tbody = document.querySelector('#produtosTable tbody');
        tbody.innerHTML = '';
        
        produtos.forEach(prod => {
            const tr = document.createElement('tr');
            let categoriaNome = 'Sem categoria';
            
            if (prod.categoria && typeof prod.categoria === 'object' && prod.categoria.nome) {
                categoriaNome = prod.categoria.nome;
                cache.categorias.set(prod.categoria.id, prod.categoria);
            } 
            else if (prod.categoria && typeof prod.categoria === 'string') {
                const categoriaCache = cache.categorias.get(prod.categoria);
                if (categoriaCache) {
                    categoriaNome = categoriaCache.nome;
                }
            }
            
            tr.innerHTML = `
                <td>${prod.id}</td>
                <td>${prod.nome}</td>
                <td>${prod.quantidade}</td>
                <td>R$ ${prod.preco.toFixed(2)}</td>
                <td>${prod.status}</td>
                <td>${categoriaNome}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="editProduto('${prod.id}')">Editar</button>
                    <button class="btn-delete" onclick="deleteProduto('${prod.id}')">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showNotification('Erro ao carregar produtos', 'error');
    }
}

async function loadCategoriasForSelect() {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias`);
        const categorias = await response.json();
        const select = document.getElementById('produtoCategoria');
        select.innerHTML = '<option value="">Selecione uma Categoria</option>';
        
        categorias.forEach(cat => {
            cache.categorias.set(cat.id, cat);
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

async function searchProduto() {
    const id = document.getElementById('searchProdutoId').value.trim();
    if (!id) {
        showNotification('Digite um ID para buscar', 'info');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`);
        if (response.ok) {
            const produto = await response.json();
            document.getElementById('produtoId').value = produto.id;
            document.getElementById('produtoNome').value = produto.nome;
            document.getElementById('produtoQuantidade').value = produto.quantidade;
            document.getElementById('produtoPreco').value = produto.preco.toFixed(2).replace('.', ',');
            document.getElementById('produtoStatus').value = produto.status;
            document.getElementById('produtoCategoria').value = (produto.categoria && produto.categoria.id) ? produto.categoria.id : '';
            showNotification('Produto encontrado!', 'success');
        } else {
            showNotification('Produto não encontrado', 'error');
        }
    } catch (error) {
        showNotification('Erro ao buscar produto', 'error');
    }
}

async function editProduto(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`);
        const produto = await response.json();
        document.getElementById('produtoId').value = produto.id;
        document.getElementById('produtoNome').value = produto.nome;
        document.getElementById('produtoQuantidade').value = produto.quantidade;
        document.getElementById('produtoPreco').value = produto.preco.toFixed(2).replace('.', ',');
        document.getElementById('produtoStatus').value = produto.status;
        document.getElementById('produtoCategoria').value = (produto.categoria && produto.categoria.id) ? produto.categoria.id : '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        showNotification('Erro ao carregar produto', 'error');
    }
}

async function deleteProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Produto excluído com sucesso!', 'success');
            loadProdutos();
        } else {
            showNotification('Erro ao excluir produto', 'error');
        }
    } catch (error) {
        showNotification('Erro ao excluir produto', 'error');
    }
}

function clearProdutoForm() {
    document.getElementById('produtoForm').reset();
    document.getElementById('produtoId').value = '';
}

document.getElementById('produtoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('produtoId').value;
    const categoriaId = document.getElementById('produtoCategoria').value;
    const precoValue = document.getElementById('produtoPreco').value;
    
    const produto = {
        nome: document.getElementById('produtoNome').value,
        quantidade: parseInt(document.getElementById('produtoQuantidade').value),
        preco: parseCurrency(precoValue),
        status: document.getElementById('produtoStatus').value,
        categoria: categoriaId ? { id: categoriaId } : null
    };
    
    try {
        const url = id ? `${API_BASE_URL}/produtos/${id}` : `${API_BASE_URL}/produtos`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
        
        if (response.ok) {
            showNotification(`Produto ${id ? 'atualizado' : 'criado'} com sucesso!`, 'success');
            clearProdutoForm();
            loadProdutos();
        } else {
            showNotification('Erro ao salvar produto', 'error');
        }
    } catch (error) {
        showNotification('Erro ao salvar produto', 'error');
    }
});

async function loadCategorias() {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias`);
        const categorias = await response.json();
        const tbody = document.querySelector('#categoriasTable tbody');
        tbody.innerHTML = '';
        
        categorias.forEach(cat => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cat.id}</td>
                <td>${cat.nome}</td>
                <td>${cat.tipo}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="editCategoria('${cat.id}')">Editar</button>
                    <button class="btn-delete" onclick="deleteCategoria('${cat.id}')">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showNotification('Erro ao carregar categorias', 'error');
    }
}

async function searchCategoria() {
    const id = document.getElementById('searchCategoriaId').value.trim();
    if (!id) {
        showNotification('Digite um ID para buscar', 'info');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
        if (response.ok) {
            const categoria = await response.json();
            document.getElementById('categoriaId').value = categoria.id;
            document.getElementById('categoriaNome').value = categoria.nome;
            document.getElementById('categoriaTipo').value = categoria.tipo;
            showNotification('Categoria encontrada!', 'success');
        } else {
            showNotification('Categoria não encontrada', 'error');
        }
    } catch (error) {
        showNotification('Erro ao buscar categoria', 'error');
    }
}

async function editCategoria(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
        const categoria = await response.json();
        document.getElementById('categoriaId').value = categoria.id;
        document.getElementById('categoriaNome').value = categoria.nome;
        document.getElementById('categoriaTipo').value = categoria.tipo;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        showNotification('Erro ao carregar categoria', 'error');
    }
}

async function deleteCategoria(id) {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Categoria excluída com sucesso!', 'success');
            loadCategorias();
        } else {
            showNotification('Erro ao excluir categoria', 'error');
        }
    } catch (error) {
        showNotification('Erro ao excluir categoria', 'error');
    }
}

function clearCategoriaForm() {
    document.getElementById('categoriaForm').reset();
    document.getElementById('categoriaId').value = '';
}

document.getElementById('categoriaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('categoriaId').value;
    const categoria = {
        nome: document.getElementById('categoriaNome').value,
        tipo: document.getElementById('categoriaTipo').value
    };
    
    try {
        const url = id ? `${API_BASE_URL}/categorias/${id}` : `${API_BASE_URL}/categorias`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
        });
        
        if (response.ok) {
            showNotification(`Categoria ${id ? 'atualizada' : 'criada'} com sucesso!`, 'success');
            clearCategoriaForm();
            loadCategorias();
        } else {
            showNotification('Erro ao salvar categoria', 'error');
        }
    } catch (error) {
        showNotification('Erro ao salvar categoria', 'error');
    }
});

function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    input.value = value.replace('.', ',');
}

function parseCurrency(value) {
    return parseFloat(value.replace(',', '.'));
}

let contadorItens = 0;
let produtosDisponiveis = [];

async function loadColaboradoresForSelect() {
    try {
        const response = await fetch(`${API_BASE_URL}/colaboradores`);
        const colaboradores = await response.json();
        const select = document.getElementById('vendaColaborador');
        select.innerHTML = '<option value="">Selecione um Colaborador</option>';
        
        colaboradores.forEach(col => {
            const option = document.createElement('option');
            option.value = col.id;
            option.textContent = col.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar colaboradores:', error);
    }
}

async function loadProdutosForSelect() {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos`);
        produtosDisponiveis = await response.json();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function adicionarItemVenda() {
    const container = document.getElementById('itensVenda');
    const itemId = contadorItens++;
    
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-venda';
    itemDiv.id = `item-${itemId}`;
    
    let optionsProdutos = '<option value="">Selecione um Produto</option>';
    produtosDisponiveis.forEach(prod => {
        optionsProdutos += `<option value="${prod.id}" data-preco="${prod.preco}">${prod.nome} - R$ ${prod.preco.toFixed(2)}</option>`;
    });
    
    itemDiv.innerHTML = `
        <select class="item-produto" onchange="calcularTotal()" required>
            ${optionsProdutos}
        </select>
        <input type="number" class="item-quantidade" placeholder="Quantidade" min="1" value="1" onchange="calcularTotal()" required>
        <button type="button" class="btn-remove-item" onclick="removerItemVenda(${itemId})">Remover</button>
    `;
    
    container.appendChild(itemDiv);
    calcularTotal();
}

function removerItemVenda(itemId) {
    const item = document.getElementById(`item-${itemId}`);
    if (item) {
        item.remove();
        calcularTotal();
    }
}

function calcularTotal() {
    let total = 0;
    const itens = document.querySelectorAll('.item-venda');
    
    itens.forEach(item => {
        const select = item.querySelector('.item-produto');
        const quantidade = parseInt(item.querySelector('.item-quantidade').value) || 0;
        const option = select.options[select.selectedIndex];
        
        if (option && option.dataset.preco) {
            const preco = parseFloat(option.dataset.preco);
            total += preco * quantidade;
        }
    });
    
    document.getElementById('valorTotalVenda').textContent = total.toFixed(2).replace('.', ',');
}

async function loadVendas() {
    try {
        const response = await fetch(`${API_BASE_URL}/vendas`);
        const vendas = await response.json();
        const tbody = document.querySelector('#vendasTable tbody');
        tbody.innerHTML = '';
        
        vendas.forEach(venda => {
            const tr = document.createElement('tr');
            const colaboradorNome = (venda.colaborador && venda.colaborador.nome) ? venda.colaborador.nome : 'N/A';
            const dataFormatada = new Date(venda.dataVenda).toLocaleString('pt-BR');
            
            tr.innerHTML = `
                <td>${venda.id}</td>
                <td>${colaboradorNome}</td>
                <td>${dataFormatada}</td>
                <td>R$ ${venda.valorTotal.toFixed(2)}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="verDetalhesVenda('${venda.id}')">Ver Detalhes</button>
                    <button class="btn-delete" onclick="deleteVenda('${venda.id}')">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showNotification('Erro ao carregar vendas', 'error');
    }
}

async function searchVenda() {
    const id = document.getElementById('searchVendaId').value.trim();
    if (!id) {
        showNotification('Digite um ID para buscar', 'info');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/vendas/${id}`);
        if (response.ok) {
            const venda = await response.json();
            verDetalhesVenda(venda.id);
        } else {
            showNotification('Venda não encontrada', 'error');
        }
    } catch (error) {
        showNotification('Erro ao buscar venda', 'error');
    }
}

async function verDetalhesVenda(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/vendas/${id}`);
        const venda = await response.json();
        
        let detalhes = `Venda ID: ${venda.id}\n`;
        detalhes += `Colaborador: ${venda.colaborador.nome}\n`;
        detalhes += `Data: ${new Date(venda.dataVenda).toLocaleString('pt-BR')}\n\n`;
        detalhes += `Itens:\n`;
        
        venda.itens.forEach(item => {
            const produtoNome = item.produto.nome || 'Produto';
            detalhes += `- ${produtoNome} x${item.quantidade} = R$ ${(item.precoUnitario * item.quantidade).toFixed(2)}\n`;
        });
        
        detalhes += `\nValor Total: R$ ${venda.valorTotal.toFixed(2)}`;
        
        alert(detalhes);
    } catch (error) {
        showNotification('Erro ao carregar detalhes da venda', 'error');
    }
}

async function deleteVenda(id) {
    if (!confirm('Tem certeza que deseja excluir esta venda?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/vendas/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Venda excluída com sucesso!', 'success');
            loadVendas();
        } else {
            showNotification('Erro ao excluir venda', 'error');
        }
    } catch (error) {
        showNotification('Erro ao excluir venda', 'error');
    }
}

function clearVendaForm() {
    document.getElementById('vendaForm').reset();
    document.getElementById('vendaId').value = '';
    document.getElementById('itensVenda').innerHTML = '';
    contadorItens = 0;
    calcularTotal();
}

document.getElementById('vendaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const colaboradorId = document.getElementById('vendaColaborador').value;
    
    if (!colaboradorId) {
        showNotification('Selecione um colaborador', 'error');
        return;
    }
    
    const itensVenda = [];
    const itensElements = document.querySelectorAll('.item-venda');
    
    if (itensElements.length === 0) {
        showNotification('Adicione pelo menos um produto', 'error');
        return;
    }
    
    itensElements.forEach(item => {
        const select = item.querySelector('.item-produto');
        const produtoId = select.value;
        const quantidade = parseInt(item.querySelector('.item-quantidade').value);
        const option = select.options[select.selectedIndex];
        const preco = parseFloat(option.dataset.preco);
        
        if (produtoId && quantidade > 0) {
            itensVenda.push({
                produto: { id: produtoId },
                quantidade: quantidade,
                precoUnitario: preco
            });
        }
    });
    
    const venda = {
        colaborador: { id: colaboradorId },
        itens: itensVenda
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/vendas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(venda)
        });
        
        if (response.ok) {
            showNotification('Venda criada com sucesso!', 'success');
            clearVendaForm();
            loadVendas();
        } else {
            showNotification('Erro ao salvar venda', 'error');
        }
    } catch (error) {
        showNotification('Erro ao salvar venda', 'error');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    loadColaboradores();
    loadCargosForSelect();
    
    const precoInput = document.getElementById('produtoPreco');
    precoInput.addEventListener('input', function(e) {
        formatCurrency(e.target);
    });
});
