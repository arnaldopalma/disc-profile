# Melhorias futuras — DISC Profile

Projeto: https://disc-profile-sigma.vercel.app  
Repositório: https://github.com/arnaldopalma/disc-profile  
Dashboard: /dashboard (senha: disc2026)

---

## Funcionalidades pendentes

### Alta prioridade
- [ ] **Exportar resultado em PDF** — botão na página de resultado que gera um PDF com o perfil completo (gráfico + descrição + dicas de comunicação)
- [ ] **Enviar resultado por e-mail** — após completar o teste, enviar o link do resultado para o e-mail informado (usar Resend ou SendGrid)
- [ ] **Campo "Empresa" no cadastro** — adicionar empresa/organização no formulário inicial e no dashboard

### Melhorias de UX
- [ ] **Barra de progresso numérica durante o teste** — mostrar "10 de 40" além da barra visual
- [ ] **Rolar automaticamente** para a próxima característica não avaliada ao clicar em uma resposta
- [ ] **Salvar progresso no localStorage** — não perder as respostas se o usuário fechar a aba acidentalmente
- [ ] **Animação de entrada no resultado** — animar os gráficos ao carregar a página de resultado

### Dashboard
- [ ] **Exportar tabela como CSV/Excel** — botão para baixar todos os resultados
- [ ] **Gráfico de linha do tempo** — número de testes feitos por dia/semana
- [ ] **Comparar dois perfis** — selecionar dois participantes e ver as diferenças lado a lado
- [ ] **Filtro por data** — filtrar resultados por período

### Técnico
- [ ] **Domínio personalizado** — configurar domínio próprio no Vercel
- [ ] **Autenticação mais robusta no dashboard** — trocar a senha simples por login com NextAuth ou Supabase Auth
- [ ] **Rate limiting no /api/submit** — evitar spam de submissões
- [ ] **Página 404 customizada** — quando um ID de resultado não existe

---

## Estado atual (03/06/2026)

- ✅ Teste completo com 40 características × 2 (Natural + Adaptado)
- ✅ 16 perfis DISC mapeados com descrições completas
- ✅ Gráfico de linhas Natural vs Adaptado
- ✅ Barras D/I/S/C com diferença entre Natural e Adaptado
- ✅ Link individual compartilhável por resultado
- ✅ Dashboard com senha, tabela filtrável
- ✅ Dashboard com gráfico de médias do grupo e perfis mais frequentes
- ✅ Hospedado na Vercel + Supabase (região sa-east-1)
