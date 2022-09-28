const deleteBtn = document.querySelectorAll('.del')
const portfolioItem = document.querySelectorAll('span.not')
const portfolioComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteCoin)
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

let total = document.querySelectorAll('.total');
let profit = 0
let totalMoney = Number(total[0].innerText)
for(let i = 1; i < total.length;i++){
    totalMoney += Number(total[i].innerText)

}
document.getElementById("currentBalance").innerHTML = totalMoney.toFixed(2);

if(totalMoney > 0){
    document.getElementById("currentBalance").classList.add("profit")
} else {
    document.getElementById("currentBalance").classList.add("loss")
}

// adding color to the profit column
for (let i = 0; i< total.length;i++){
    if(Number(total[i].innerText)>0){
        total[i].className = "profit"
    } else {
        total[i].className = "loss"
    }

}