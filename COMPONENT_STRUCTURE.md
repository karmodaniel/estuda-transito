# Estrutura Padrão dos Componentes

## 📁 **Padrão de Arquivos**

Todos os componentes devem seguir a estrutura tradicional do Angular com arquivos separados:

```
src/app/estuda-transito/presentation/component/
├── nome-do-componente/
│   ├── nome-do-componente.component.ts      # Lógica do componente
│   ├── nome-do-componente.component.html    # Template HTML
│   ├── nome-do-componente.component.less   # Estilos LESS
│   └── nome-do-componente.component.spec.ts # Testes (opcional)
```

## 🚫 **NÃO FAZER (Anti-patterns)**

```typescript
// ❌ EVITAR: Template inline
@Component({
  selector: 'app-exemplo',
  template: `<div>Template inline</div>`,
  styles: [`.classe { color: red; }`]
})

// ❌ EVITAR: Styles inline
@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styles: [`
    .classe {
      color: red;
    }
  `]
})
```

## ✅ **FAZER (Padrão Correto)**

```typescript
// ✅ CORRETO: Arquivos separados
@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.less']
})
```

## 📋 **Estrutura dos Arquivos**

### 1. **Component TypeScript** (`.component.ts`)

```typescript
import { Component, OnInit, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-exemplo",
  templateUrl: "./exemplo.component.html",
  styleUrls: ["./exemplo.component.less"],
  standalone: true,
  imports: [CommonModule],
})
export class ExemploComponent implements OnInit {
  // Signals para estado
  readonly dados = signal<any[]>([]);

  // Computed para valores derivados
  readonly total = computed(() => this.dados().length);

  ngOnInit(): void {
    // Inicialização
  }
}
```

### 2. **Template HTML** (`.component.html`)

```html
<div class="exemplo-container">
  <header class="exemplo-header">
    <h1>{{ titulo }}</h1>
  </header>

  <div class="exemplo-content">
    @for (item of dados(); track item.id) {
    <div class="item">{{ item.nome }}</div>
    }
  </div>
</div>
```

### 3. **Estilos LESS** (`.component.less`)

```less
.exemplo-container {
  padding: 24px;

  .exemplo-header {
    text-align: center;
    margin-bottom: 32px;

    h1 {
      font-size: 2rem;
      color: #333;
    }
  }

  .exemplo-content {
    display: grid;
    gap: 16px;

    .item {
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }
  }
}
```

## 🎯 **Benefícios da Separação**

1. **✅ Manutenibilidade**: Cada arquivo tem uma responsabilidade específica
2. **✅ Legibilidade**: Código mais fácil de ler e entender
3. **✅ Reutilização**: Estilos podem ser facilmente copiados/modificados
4. **✅ Colaboração**: Diferentes desenvolvedores podem trabalhar em arquivos diferentes
5. **✅ Debugging**: Mais fácil identificar problemas em arquivos específicos
6. **✅ Versionamento**: Mudanças mais claras no controle de versão

## 🔧 **Configuração do Angular**

Certifique-se de que o `angular.json` está configurado para usar LESS:

```json
{
  "projects": {
    "estuda-transito": {
      "schematics": {
        "@schematics/angular:component": {
          "style": "less"
        }
      },
      "architect": {
        "build": {
          "options": {
            "inlineStyleLanguage": "less",
            "styles": ["src/theme.less"]
          }
        }
      }
    }
  }
}
```

## 📝 **Exemplos de Componentes Refatorados**

### Sidebar Component

- ✅ `sidebar.component.ts` - Lógica e configuração
- ✅ `sidebar.component.html` - Template da sidebar
- ✅ `sidebar.component.less` - Estilos da sidebar

### Placas Page Component

- ✅ `placas-page.component.ts` - Lógica da página
- ✅ `placas-page.component.html` - Template da página
- ✅ `placas-page.component.less` - Estilos da página

## 🚀 **Próximos Passos**

1. **Refatorar todos os componentes existentes** para seguir este padrão
2. **Criar novos componentes** sempre com arquivos separados
3. **Manter consistência** em todo o projeto
4. **Usar LESS** para estilos mais organizados e reutilizáveis

## 📚 **Referências**

- [Angular Component Architecture](https://angular.io/guide/component-overview)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [LESS Documentation](https://lesscss.org/)

