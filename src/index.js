const url = "https://openlibrary.org/search.json?q=test";
const btnCarregar = document.getElementById('btnCarregar');
const livrosCount = document.querySelector('.livrosCount');

btnCarregar.addEventListener('click', async () => {
    btnCarregar.disabled = true;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`A API respondeu com o status ${response.status}.`);
        }
        
        const data = await response.json();
        console.log(data)
        const livros = data.docs;

        if (!Array.isArray(livros) || livros.length === 0) {
            throw new Error('A API não retornou livros.');
        }

        // Apaga o livro anterior
        livrosCount.innerHTML = '';

        // Escolhe um livro aleatório
        const livro = livros[Math.floor(Math.random() * livros.length)];

        // Cria o título
        const item = document.createElement('h2');
        item.textContent = livro.title || 'Título indisponível';
        livrosCount.appendChild(item);

        // Cria a capa
        if (livro.cover_i) {
            const img = document.createElement('img');

            img.src = `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`;
            img.alt = `Capa de ${livro.title || 'livro sem título'}`;

            livrosCount.appendChild(img);
        }
        if (livro.author_name){
            const author = document.createElement('h3');
            author.textContent = livro.author_name[0] || 'Autor indisponível';
            livrosCount.appendChild(author);
        }
    } catch (error) {
        console.error('Não foi possível carregar um livro:', error);

        livrosCount.innerHTML = '';

        const item = document.createElement('h2');
        item.textContent = 'Não foi possível carregar um livro. Tente novamente.';

        livrosCount.appendChild(item);

    } finally {
        btnCarregar.disabled = false;
    }
});