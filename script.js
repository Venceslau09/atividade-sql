const entrada 
const botao 
const saida 
= 
document.getElementById('arquivo'); document.getElementById('btnAbrir'); 
const conteudoSQL 
= 
= 
document.getElementById('conteudoSQL'); 
document.getElementById('saida'); 
botao.addEventListener('click', async () 
saida.innerHTML 
} <= 
= 
"'; 
1 
= 
(nenhum arquivo carregado)'; 
conteudo SQL.textContent 
if (entrada.files.length 
saida.innerHTML 
primeiro.</p>'; 
= 
=== 
0) { 
'<p class="erro">Selecione um arquivo .sql 
} 
return; 
// 1. Lê o arquivo escolhido pelo usuário 
const conteudo 
= 
await entrada.files[0].text(); 
= 
conteudo; 
conteudo SQL.textContent 
try { 
// 2. Cria um banco SQLite na memória do navegador 
const SQL 
= 
await initSqlJs ({ 
locateFile: arquivo => 
'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/' + arquivo 
}); 
const ban co new SQL.Database(); 
// 3. Executa todos os comandos do arquivo (CREATE, INSERT...) banco.exec(conteudo); 
// 4. Descobre o nome da primeira tabela criada 
const tabelas 
type='table'"); 
= 
banco.exec("SELECT name FROM sqlite master WHERE 
if (tabelas.length 
tabela.</p>'; 
0) { 
saida.innerHTML '<p class="erro">0 arquivo não criou nenhuma 
} 
return; 
const nomeTabela 
= 
tabelas[0].values[0][0]; 
// 5. Consulta os dados e monta a tabela HTML 
const dados 
= 
banco.exec('SELECT * FROM ' + nome Tabela); 
if (dados.length 
=== 
0) { 
= 
'<p>A tabela está vazia.</p>'; 
saida.innerHTML 
return; 
} 
let html = '<table><tr>'; 
for (const coluna of dados[0].columns) html += 
'<th>' + coluna + 
'</th>'; 
html += </tr>'; 
1 
for (const linha of dados[0].values) { 
html += '<tr>'; 
for (const valor of linha) html += '<td>' + valor + html += '</tr>'; 
'</td>'; 
} 
= 
html; 
= 
'<p class="erro">Erro ao executar o SQL: + 
་ 
html += '</table>'; saida.innerHTML 
} catch (erro) { 
saida.innerHTML erro.message + '</p>'; 
} 
}); 
