# Quiz Placas - Aplicativo de Placas de Trânsito

Este é um aplicativo educativo desenvolvido em Angular para aprender sobre as principais placas de trânsito brasileiras.

## 🚀 Funcionalidades

- **Visualização de Placas**: Lista completa de placas de trânsito organizadas por categoria
- **Filtros Inteligentes**: Filtre placas por categoria (Regulamentação, Advertência, Indicação, Serviços)
- **Pesquisa**: Busque placas por nome, descrição ou código
- **Interface Moderna**: Design responsivo usando ng-zorro Ant Design
- **Categorização**: Organização clara por tipos de placas

## 🛠️ Tecnologias Utilizadas

- **Angular 16**: Framework principal
- **ng-zorro-antd**: Biblioteca de componentes UI
- **SCSS**: Estilos avançados
- **TypeScript**: Linguagem de programação

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── placas-list/          # Componente de listagem de placas
│   ├── services/
│   │   └── placas.service.ts     # Serviço para gerenciar placas
│   ├── app.component.*           # Componente principal
│   └── app.module.ts            # Módulo principal
├── assets/
│   ├── placas/                  # Imagens das placas renomeadas
│   └── placas.json             # Dados das placas
└── styles.less                  # Estilos globais
```

## 🖼️ Sistema de Imagens

As imagens das placas foram renomeadas de forma sistemática para facilitar a integração:

- **Formato**: `{CÓDIGO}.jpg` (ex: `R-1.jpg`, `A-1a.jpg`)
- **Categorias**:
  - **R**: Placas de Regulamentação
  - **A**: Placas de Advertência
  - **I**: Placas de Indicação
  - **S**: Placas de Serviços Auxiliares

### Exemplos de Nomenclatura:

- `R-1.jpg` → Placa de Parada Obrigatória (PARE)
- `A-1a.jpg` → Placa de Curva Acentuada à Esquerda
- `I-1.jpg` → Placa de Identificação de Rodovias
- `S-1.jpg` → Placa de Área de Estacionamento

## 🚀 Como Executar

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento**:

   ```bash
   npm start
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

## 📱 Componentes Principais

### PlacasListComponent

- Lista todas as placas de trânsito
- Filtros por categoria
- Pesquisa por texto
- Layout responsivo em grid

### PlacasService

- Gerencia dados das placas
- Filtros e pesquisas
- Processamento de URLs das imagens
- Categorização automática

## 🎨 Estilos e Design

- **Tema**: ng-zorro Ant Design
- **Layout**: Responsivo com CSS Grid
- **Cores**: Sistema de cores consistente por categoria
- **Animações**: Transições suaves e hover effects

## 🔧 Configuração do ng-zorro

O projeto está configurado com os seguintes módulos do ng-zorro:

- `NzButtonModule` - Botões
- `NzCardModule` - Cards
- `NzLayoutModule` - Layout
- `NzInputModule` - Campos de entrada
- `NzTagModule` - Tags
- `NzSpinModule` - Indicadores de loading
- `NzEmptyModule` - Estados vazios

## 📊 Dados das Placas

As placas são carregadas do arquivo `src/assets/placas.json` que contém:

- Código da placa
- Nome descritivo
- Categoria
- Descrição detalhada
- Informações da imagem

## 🌟 Próximos Passos

- [ ] Implementar sistema de quiz
- [ ] Adicionar sistema de pontuação
- [ ] Criar modo de estudo
- [ ] Implementar testes práticos
- [ ] Sistema de ranking de usuários

## 📝 Licença

Este projeto é desenvolvido para fins educativos sobre segurança no trânsito.

---

**Desenvolvido com ❤️ usando Angular e ng-zorro**
