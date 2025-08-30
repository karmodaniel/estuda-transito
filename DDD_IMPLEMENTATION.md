# Implementação DDD no Projeto Estuda Trânsito

## Estrutura do Projeto

### Camadas de Alto Nível

- **Camada Presentation**: `src/app/estuda-transito/presentation/`
- **Camada Shared**: `src/app/shared/`
- **Padrões de desenvolvimento**: `src/app/estuda-transito/abstraction/`
- **Arquivos de mock**: `src/app/estuda-transito/mock/`
- **Classes e Interfaces**: `src/app/estuda-transito/domain/`

### Somente variáveis com tipos definidos e métodos com assinatura serão aceitos

### Nomenclatura de variáveis, funções, argumentos e demais tipos

- **Arquivos**: kebab-case (ex: `placa-card.component.ts`)
- **Classes**: PascalCase (ex: `PlacaCardComponent`)
- **Interfaces**: PascalCase com prefixo "I" (ex: `IPlaca`)
- **Enums**: PascalCase com sufixo "Enum" (ex: `CategoriaEnum`)
- **Types**: PascalCase com prefixo "T" (ex: `TPlacaConfig`)
- **Variáveis e funções**: camelCase (ex: `obterPlacas`, `placasAtuais`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_PLACAS`)
- **Tudo em português**

### Boas Práticas

- **Injeção de dependência**: Usar `inject()` ao invés de constructor injection
- **Gerenciamento de estado**: Usar Angular Signals
- **Control Flow**: Usar `@for`, `@if` ao invés de `*ngFor`, `*ngIf`
- **Componentes**: Standalone components
- **Contratos**: Classes ao invés de interfaces para Request/Response
- **Conversão**: Métodos estáticos `converter()` nas classes Response
- **Tratamento de dados**: Métodos `converterParaParams()` e `formatarCorpo()` nas classes Request

## 📦src

┣ 📂app
┣ 📂estuda-transito
┣ 📂domain
┣ 📂entity
┣ 📂interface
┣ 📂model
┣ 📂repository
┣ 📂service
┣ 📂value-object
┣ 📂infrastructure
┣ 📂api
┣ 📂database
┣ 📂external-service
┣ 📂store
┣ 📂abstraction
┣ 📂facade
┣ 📂adapter
┣ 📂strategy
┣ 📂presentation
┣ 📂component
┣ 📂page
┣ 📂pipe
┣ 📂directive
┣ 📂mock
┣ 📂shared
┣ 📂domain
┣ 📂infrastructure
┣ 📂abstraction
┣ 📂presentation
┣ 📂environments
