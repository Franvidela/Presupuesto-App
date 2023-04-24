let expendArray = [];
let cash;

/* Este código es responsable de manejar el evento del botón "Calcular"*/
$('#btnBudget').click(function (event) {
    event.preventDefault()
    cash = saveBudget()
    showMoney(cash)
    unBlock(cash)
})

/* Este código es responsable de manejar el evento del botón "Agregar Gasto"*/
$('#btnExpend').click(function (event) {
    event.preventDefault()
    let expend = saveExpends()
    sumExpends(expend)
    addListItems(expend)
})

/* Este código es responsable de manejar el evento del botón de eliminación*/
$('#tBody').on('click', '.trash', function () {
    $(this).parent().parent().remove()
    deleteItem($(this).parent().prev().prev().text())
    subExpends()
});

/* Esta clase se utiliza para crear objetos de gastos con información sobre el nombre del gasto y su monto */
class Expends {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}

/* Esta funcion desbloquea la tabla */
const unBlock = (cash) => {
    if (cash > 0) {
        $('#expendures').removeAttr('disabled')
    }
}

/* Esta función se utiliza para obtener y validar el presupuesto ingresado por el usuario en el formulario de la aplicación de presupuesto */
function saveBudget() {
    let budgetLock = $('#budget').val()
    if (!/[\D]/gm.test(budgetLock) && budgetLock != '' && budgetLock > 0) {
        let budget = parseInt(budgetLock)
        $('#budget').val('')
        return budget
    } else {
        alert('Por favor ingrese solo numeros')
        $('#budget').val('')
        return 0
    }
}

/* Esta función se utiliza para actualizar y mostrar el saldo disponible en la página */
const showMoney = (cash = 0) => {
    if (cash >= 0) {
        $('#cash').text(`$${cash.toLocaleString()}`)
        $('#finalCash').text(`$${cash.toLocaleString()}`)
        /* $('#tBody').html('') */

    }
}

/* Esta función se utiliza para obtener y validar los valores de gasto ingresados */
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

/* Esta funcion agrega los datos de gasto en formato de tabla */
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

/* Esta funcion sirve para borrar un elemento del array */
const deleteItem = (product) => {
    expendArray = expendArray.filter(item => {
        if (item.name != product) {
            return item
        }
    })
}

/* Esta funcion suma los gastos y los devuelve como el total final, si es negativo se pone rojo. */
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

/* Esta funcion suma los gastos eliminados de la tabla gastos para mostrar los datos actualizados. */
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

