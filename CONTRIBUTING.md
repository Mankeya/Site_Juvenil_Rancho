# Contribuindo — Site Juvenil Rancho

Obrigado por querer contribuir! Este documento define o fluxo de trabalho do repositório.

## Fluxo de trabalho

1. **Crie uma branch** a partir da `main` com prefixo descritivo:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/nova-galeria
   ```

   Prefixos aceitos: `feat/`, `fix/`, `docs/`, `style/`, `chore/`, `refactor/`.

2. **Faça commits** seguindo [Conventional Commits](https://www.conventionalcommits.org/):

   ```
   <tipo>(<escopo>): <descrição curta>
   ```

   | Tipo                                               | Quando usar                  |
   | -------------------------------------------------- | ---------------------------- |
   | `feat:`                                            | nova funcionalidade ou seção |
   | `fix:`                                             | correção de bug              |
   | `style:`                                           | aparência, cores, animações  |
   | `docs:`                                            | README, comentários          |
   | `chore:`                                           | build, dependências, CI      |
   | `refactor:` reestruturação sem mudar comportamento |

   Exemplos:

   ```
   feat: adicionar cena 3D no hero
   fix: corrigir caminhos absolutos das imagens
   chore: configurar GitHub Actions de deploy
   ```

3. **Rode as verificações** antes de abrir o PR:

   ```bash
   npm run lint    # Prettier + html-validate
   npm run build   # build de produção
   ```

4. **Abra um Pull Request** usando o template do repositório, preenchendo descrição,
   tipo de mudança e como testar.

5. **Após aprovação e CI verde**, o PR pode ser mesclado na `main`. O deploy no
   GitHub Pages é automático a cada merge.

## Desenvolvimento local

```bash
npm install   # primeira vez
npm run dev   # servidor de desenvolvimento com hot reload
```

## Estrutura do projeto

```
├── index.html          # página principal
├── inscricao.html      # página de confirmação de inscrição
├── src/
│   ├── main.js         # entrada JS (menu, formulário, animações)
│   ├── hero3d.js       # cena 3D do hero (Three.js, lazy)
│   └── styles/main.css # tema Tailwind v4 (branco/vermelho/verde)
├── Img/                # imagens do site
├── assets/             # ícones e imagens auxiliares
└── .github/workflows/  # CI e deploy automáticos
```

## Diretrizes de estilo

- **Paleta**: branco `#ffffff`, vermelho `#d62828`, verde `#009739` — use os tokens
  `rancho-*` do tema (`bg-rancho-red`, `text-rancho-green`, `shadow-red`...).
- **Acessibilidade**: `alt` em todas as imagens, `aria-label` em botões de ícone,
  foco visível, contraste AA. Animações respeitam `prefers-reduced-motion`.
- **Imagens**: comprima antes de enviar (`loading="lazy"` já aplicado na galeria).
