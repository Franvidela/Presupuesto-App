let expendArray = [];
let cash;

/* Guardamos presupuesto y desbloqueamos el form de gastos */
$('#btnBudget').click(function (event) {
    event.preventDefault()
    cash = saveBudget()
    showMoney(cash)
    unBlock(cash)
})

/* Guardamos los gastos en la tabla, en el array y al mismo tiempo calculamos y actualizamos los montos*/
$('#btnExpend').click(function (event) {
    event.preventDefault()
    let expend = saveExpends()
    sumExpends(expend)
    addListItems(expend)
})

/* Eliminamos gastos de la tabla y actualizamos los montos */
$('#tBody').on('click', '.trash', function () {
    $(this).parent().parent().remove()
    deleteItem($(this).parent().prev().prev().text())
    subExpends()
});

/* Definimos nuestra clase constructora de objetos para manejar cada gasto */
class Expends {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}

/* F. para guardar el presupuesto */
function saveBudget() {
    let budgetLock = $('#budget').val()
    if (!/[\D]/gm.test(budgetLock) && budgetLock != '' && budgetLock > 0) {
        let budget = parseInt(budgetLock)
        $('#budget').val('')
        return budget
    } else {
        alert('Por favor ingrese un monto valido, sin puntos ni comas y solo numeros')
        $('#budget').val('')
        return 0
    }
}

/* F. donde entregamos los datos de Presupuesto y Saldo */
const showMoney = (cash = 0) => {
    if (cash >= 0) {
        $('#cash').text(`$${cash.toLocaleString()}`)
        $('#finalCash').text(`$${cash.toLocaleString()}`)
        /* $('#tBody').html('') */

    }
}

/* F. para construir nuestro objeto de gastos y guardamos en nuestro array de objetos */
const saveExpends = () => {
    let nameExpLock = $('#nameExpend').val();
    let amntExpLock = $('#amountExpend').val();
    if (!/[\D]/gm.test(amntExpLock) && amntExpLock != '' && nameExpLock != '') {
        let objExpend = new Expends(nameExpLock, amntExpLock);
        expendArray.push(objExpend)
        $('#amountExpend').val('') && $('#nameExpend').val('')
        return expendArray
    } else {
        alert('Por favor ingrese un producto junto a un monto valido sin puntos ni comas en los espacios indicados')
        $('#amountExpend').val('') && $('#nameExpend').val('')
        return
    }
}

/* F. donde entregamos los gastos a nuestra tabla */
const addListItems = (expend) => {
    $('#tBody').html('')
    expend.forEach(item => {
        $('#tBody').append(`
            <tr>
                <td>${item.name}</td>
                <td>$${(item.amount).toLocaleString()}</td>
                <td><img class="trash" src="./assets/img/trashCan.jpg" width="15px"></td>
            </tr>
        `)
    })
}

/* F. para eliminars los gastos de nuestro array de objetos */
const deleteItem = (product) => {
    expendArray = expendArray.filter(item => {
        if (item.name != product) {
            return item
        }
    })
}

/* F. para sumar los gastos en nuestro array de objetos y actualizamos Gastos y Saldo */
const sumExpends = (expend) => {
    let expendsTotal = [];
    let total;
    expend.forEach(item => {
        expendsTotal.push(item.amount)
        total = expendsTotal.reduce((a, b) => {
            return parseInt(a) + parseInt(b)
        })
    })
    $('#sumExpend').text(`$${(total).toLocaleString()}`)
    if(cash - total >= 0){
        $('#finalCash').text(`$${(cash - total).toLocaleString()}`)
    }else{
        $('#finalCash').text(`$${(cash - total).toLocaleString()}`).css('color', 'red')
    }
}

/* F. donde sumamos los gastos eliminados de nuestro array de objetos y actualizamos Gastos y Saldo */
const subExpends = () => {
    let expendsTotal = [];
    let total;
    if (expendArray.length >= 1) {
        expendArray.forEach(item => {
            expendsTotal.push(item.amount)
            total = expendsTotal.reduce((a, b) => {
                return parseInt(a) + parseInt(b)
            })
        })
        $('#sumExpend').text(`$${(total).toLocaleString()}`)
        if(cash - total >= 0){
            $('#finalCash').text(`$${(cash - total).toLocaleString()}`).css('color', 'black')
        }else{
            $('#finalCash').text(`$${(cash - total).toLocaleString()}`).css('color', 'red')
        }
    } else {
        $('#sumExpend').text(0).toLocaleString()
        $('#finalCash').text(`$${(cash).toLocaleString()}`)

    }
}

/* F. elimina el disbaled en el fieldset */
const unBlock = (cash) => {
    if (cash > 0) {
        $('#expendures').removeAttr('disabled')
    }
}