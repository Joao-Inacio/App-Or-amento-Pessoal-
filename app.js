
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for (let i in this) {
            if (this[i] == undefined || this[i] == ' ' || this[i] == null) {
                return false
            }
        }
        return true
    }
}
class Bd { 
    constructr(){
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id',0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }


    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros(){
        let despesas = Array()

        let id = localStorage.getItem('id')
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            if (despesa === null) {
                continue
            }
            despesas.push(despesa)
        }
        return despesas
    }
}
let bd = new Bd()

function cadastraDespesa(){
    let ano = document.getElementById("ano")
    let mes = document.getElementById("mes")
    let dia = document.getElementById("dia")
    let tipo = document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor")

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    if (despesa.validarDados()) {
        // bd.gravar(despesa)

        document.getElementById('msgTitulo').innerHTML = 'Registro Comfirmado'
        document.getElementById('div').className = 'modal-header text-success'
        document.getElementById('msg').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('botao').innerHTML = 'Voltar'
        document.getElementById('botao').className = 'btn btn-success'
        $('#msgStatus').modal('show')
        
        
    }
    else {
        document.getElementById('msgTitulo').innerHTML = 'Erro ao Registra'
        document.getElementById('div').className = 'modal-header text-danger'
        document.getElementById('msg').innerHTML = 'Campos obrigatorio vazios'
        document.getElementById('botao').innerHTML = 'Corrigir'
        document.getElementById('botao').className = 'btn btn-danger'
        $('#msgStatus').modal('show')
    }
}
function carregaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
}
