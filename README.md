# Dario

Benvenuti a bordo del viaggio di Dario, il calendario che trasforma la pianificazione quotidiana in un'avventura emozionante! Con un tocco di magia e un sorriso contagioso, Dario rende ogni giorno un'opportunità per brillare. Preparati a organizzare il tuo tempo con stile e allegria! 🌟

## Come implementare Dario

Includi il file CSS e JavaScript nel tuo progetto:

```html
<link
  rel="stylesheet"
  href="dario.css"
/>

<script
  type="text/javascript"
  src="dario.js"
></script>
```

Esempio implementazione di Dario:

```js
new Dario('#in');
```

## Dario API

| Parametro    | Tipologia | Esempio                    | Descrizione                                                                                                                                                        |
| ------------ | --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| inline       | `boolean` | `false`                    | Indica se visualizzare il calendario in linea o nel body della pagina.                                                                                             |
| classes      | `string`  | `"dario--mod"`             | Classe CSS aggiuntiva da applicare all'elemento del calendario.                                                                                                    |
| lang         | `string`  | `"ita"`                    | Definisce la lingua da utilizzare per il calendario.                                                                                                               |
| container    | `string`  | `".container"`             | Selettore dell'elemento genitore in cui posizionare il calendario.                                                                                                 |
| minDate      | `string`  | `"new Date('2023-08-30')"` | Data minima selezionabile nel formato "yyyy-mm-dd".                                                                                                                |
| range        | `boolean` | `false`                    | Indica se abilitare la selezione di un intervallo di date anziché una singola data. Come alternativa è possibile impostare la data come attributo del tag `input`. |
| showSelected | `boolean` | `false`                    | Indica se visualizzare la data selezionata dei giorni correnti.                                                                                                    |
| minStay      | `number`  | `1`                        | Indica il minimo numero di giorni da tenere selezionato.                                                                                                           |

## Eventi

Con Dario è possibile gestire gli eventi al click del calendario usando il metodo `onSelect()`. L'argomento `dario` è un oggetto con le seguenti proprietà:

```js
{
  endDate: {
    date: 12,
    day: 3,
    fullDate: 12,
    fullMonth: "06",
    month: 5,
    time: 1718178303063,
    year: 2024,
    yearShort: "24"
  },
  endMonth: "June",
  endMonthShort: "Jun",
  nights: 1,
  startDate: {
    date: 11,
    day: 2,
    fullDate: 11,
    fullMonth: "06",
    month: 5,
    time: 1718091903063,
    year: 2024,
    yearShort: "24"
  },
  startMonth: "June",
  startMonthShort: "Jun"
}
```

## Per dare il tuo contributo

Clona il progetto

```bash
  git clone https://github.com/kevinbism/dario-calendar.git
```

Vai sulla cartella del progetto

```bash
  cd dario-calendar
```

E installa le dipendenze

```bash
  npm install
```

Infine, dopo aver apportato le modifiche compila il progetto con il runtime di Babel

```bash
  npm run build
```

Ricordati di caricare le tue modifiche sul progetto privato di Github.

## Autori

- Federico Varese
- Kevin Ramirez [@kevinbism](https://github.com/kevinbism)
- E chiunque altro voglia contribuire al progetto.
