# 💃 Site Rancho Juvenil — CTG Rancho da Saudade

Site oficial da invernada juvenil do CTG _Rancho da Saudade_, reunindo informações,
identidade visual, fotos e o espírito tradicionalista do grupo.

## 🎯 Objetivo

Criar um espaço digital simples, bonito e funcional para divulgar a invernada juvenil do
Rancho, fortalecer a presença online do grupo e valorizar a cultura gaúcha.

## 🧩 Conteúdo do site

- Página inicial com destaque para o grupo e cena 3D animada
- Seções sobre a história e as conquistas do CTG
- Galeria de fotos com interação 3D
- Formulário de inscrição
- Layout responsivo (celular e desktop)

## 🔧 Tecnologias

- **HTML** — estrutura das páginas
- **Tailwind CSS v4** — estilização (build local, sem CDN)
- **Vite** — dev server e build de produção
- **Three.js** — cena 3D do hero (carregada sob demanda)
- **AOS** — animações de scroll
- **JavaScript** — interações (menu, formulário, tilt 3D)

## 🛠️ Desenvolvimento

```bash
npm install       # instalar dependências
npm run dev       # servidor local com hot reload
npm run build     # build de produção (gera dist/)
npm run preview   # visualizar o build
npm run lint      # Prettier + html-validate
```

## 🚀 Deploy

O deploy é automático via **GitHub Pages** a cada merge na branch `main`
(ver `.github/workflows/deploy.yml`). A CI (`.github/workflows/ci.yml`) roda formatação,
validação HTML e build em cada pull request.

Contribua lendo [CONTRIBUTING.md](CONTRIBUTING.md) — usamos Conventional Commits e
Pull Requests.

## 👤 Desenvolvido por

Larah Matos · Gabriel Manke
