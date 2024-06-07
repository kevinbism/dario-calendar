# Dario

Benvenuti a bordo del viaggio di Dario, il calendario che trasforma la pianificazione quotidiana in un'avventura emozionante! Con un tocco di magia e un sorriso contagioso, Dario rende ogni giorno un'opportunità per brillare. Preparati a organizzare il tuo tempo con stile e allegria! 🌟

## Come implementare Dario

Includi il file .css nel tuo progetto

```html
<link
  rel="stylesheet"
  href="dario.css"
/>
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
| minStay      | `number`  | 1                          | Indica il minimo numero di giorni da tenere selezionato.                                                                                                           |

## Eventi

Con Dario è possibile gestire gli eventi al click del calendario usando il metodo `onSelect()`:

```js
onSelect(dario) {
  document.querySelector('#gg').value = dario.startDate.fullDate;
  document.querySelector('#mm').value = dario.startDate.fullMonth;
  document.querySelector('#aa').value = dario.startDate.year;
  document.querySelector('#notti_1').value = dario.nights;
},
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

Ricordati infine di caricare le tue modifiche sul progetto privato di Github.

## Autori

- Federico Varese
- Kevin Ramirez [@kevinbism](https://github.com/kevinbism)
- E chiunque altro voglia contribuire al progetto.
