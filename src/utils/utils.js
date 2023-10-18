export const formatMoneyNey = (valor) => {
    valor = parseFloat(valor).toFixed(2);

    valor = valor.replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return `R$ ${valor}`;
}