
# Dario who?

Who is Dario? O meglio, chi Ã¨ Dario? Dario il calendario. Il piÃ¹ efficiente calendario per i tuoi progetti.
## Come implementare Dario

Includi il file .css nel tuo progetto
```html
<link rel="stylesheet" href="dario.css">
```

Importa e crea l'istanza di Dario:
```js
import Dario from "dario.js";

new Dario("#in");
```

## Dario API

| Parametro   | Tipologia | Esempio    | Descrizione |
|-------------|-----------|------------|-------------|
| inline      | `boolean`   | false      | Indica se visualizzare il calendario in linea o nel body della pagina. |
| classes     | `string`    | "dario--mod"         | Classe CSS aggiuntiva da applicare all'elemento del calendario. |
| lang        | `string`    | "ita"      | Definisce la lingua da utilizzare per il calendario. |
| container   | `string`    | ".container"         | Selettore dell'elemento genitore in cui posizionare il calendario. |
| minDate     | `string`    | "new Date('2023-08-30')"         | Data minima selezionabile nel formato "yyyy-mm-dd". |
| range       | `boolean`   | false      | Indica se abilitare la selezione di un intervallo di date anzichÃ© una singola data. |
| showSelected| `boolean`   | false      | Indica se visualizzare la data selezionata dei giorni correnti. |


## Per dare il tuo contributo

Clona il progetto

```bash
  git clone https://kevinbism@bitbucket.org/kevinbism/dario-calendar.git
```

Vai sulla cartella del progetto

```bash
  cd dario-calendar
```

Installa le dependencies per far funzionare Prettier

```bash
  npm install
```

Ricordati infine di caricare le tue modifiche su Bitbucket.
## Autori

- Federico Varese
- Kevin Ramirez [@kevinbism](https://github.com/kevinbism)
- E chiunque altro voglia contribuire al progetto