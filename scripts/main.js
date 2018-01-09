var quotes
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

function handleClick() {
    const quotesFiltered = filter ? quotes.filter((x) => x.quoteAuthor === filter) : quotes
    const uniqId = getRandomInt(0, quotesFiltered.length)
    document.getElementById('quote').innerHTML = `${quotesFiltered[uniqId].quoteText} - ${quotesFiltered[uniqId].quoteAuthor}`
}

function handleSelect(el) {
    if (el.selectedIndex !== 0) {
        filter = quotes[el.selectedIndex - 1].quoteAuthor
    } else {
        filter = 0
    }
    handleClick()
}
