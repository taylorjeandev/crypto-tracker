const deleteBtn = document.querySelectorAll('.del')
const portfolioItem = document.querySelectorAll('span.not')
const portfolioComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteCoin)
})

Array.from(portfolioItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(portfolioComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteCoin(){
    console.log('here in delete')
    const coinId = this.parentNode.dataset.id
    console.log(coinId)
    try{
        const response = await fetch('portfolio/deleteCoin', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'coinIdFromJSFile': coinId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('portfolio/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}