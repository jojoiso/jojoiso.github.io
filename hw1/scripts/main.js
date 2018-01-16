var quotes
var quotesToDisplay = []
var filter = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
fetch('https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json', {
        mode: 'cors'
    })
    .then((response) => response.json())
    .then(rQuotes => {
        quotes = rQuotes
        const list = document.getElementById('list')
        rQuotes.forEach(function(quote) {
            const newNode = document.createElement('option');
            newNode.value = quote.quoteAuthor
            newNode.innerHTML = quote.quoteAuthor
            list.appendChild(newNode)
        })
    })

function displayQuotes(quotesFiltered) {
  quotesToDisplay.forEach((quoute, i) => {
    document.getElementById(`quote${i}`).innerHTML = `${quotesFiltered[quoute].quoteText} - ${quotesFiltered[quoute].quoteAuthor}`
  })
}

function handleClick() {
    const quotesFiltered = filter ? quotes.filter((x) => x.quoteAuthor === filter) : quotes
    quotesToDisplay = []
    for (let i = 0; i < 3; i++) {
      const uniqId = getRandomInt(0, quotesFiltered.length)
      quotesToDisplay.push(uniqId)
    }
    displayQuotes(quotesFiltered);
}

function reorder() {
  const quotesFiltered = filter ? quotes.filter((x) => x.quoteAuthor === filter) : quotes
  quotesToDisplay.sort((a, b) => {
    if(quotesFiltered[a].quoteText < quotesFiltered[b].quoteText) return -1;
    if(quotesFiltered[a].quoteText > quotesFiltered[b].quoteText) return 1;
    return 0;
  })
  displayQuotes(quotesFiltered);
}

function handleSelect(el) {
    if (el.selectedIndex !== 0) {
        filter = quotes[el.selectedIndex - 1].quoteAuthor
    } else {
        filter = 0
    }
    handleClick()
}
