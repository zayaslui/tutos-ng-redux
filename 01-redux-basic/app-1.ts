interface Action {
    type        : String;
    payload?    : any;
}

//el objetivo del reducer es devolver un estado
function reducer(state=10, action: Action){

    switch (action.type) {
        case 'INCREMENTAR':
            return state+=1;
        case 'DECREMENTAR':
            return state-=1;
        case 'MULTIPLICAR':
            return state * action.payload;
        case 'DIVIDIR':
            return state / action.payload;            
        default:
            return state
    }
}

// usar el reducer
const incrementadorAction: Action = {
    type :"INCREMENTAR"
}
console.log(reducer(10,incrementadorAction));

const decrementadorAction: Action = {
    type :"DECREMENTAR"
}
console.log(reducer(10,decrementadorAction));

const multiplicarAction: Action = {
    type :"MULTIPLICAR",
    payload: 2
}
console.log(reducer(10,multiplicarAction));

const dividirAction: Action = {
    type :"DIVIDIR",
    payload: 2
}
console.log(reducer(10,dividirAction));