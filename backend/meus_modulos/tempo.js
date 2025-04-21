function GetHora() {
    const agora = new Date();

    const dia = agora.getDate().toString().padStart(2, '0');
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const ano = agora.getFullYear();

    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes().toString().padStart(2, '0');
    const segundo = agora.getSeconds().toString().padStart(2, '0');

    const dataHoraCompleta = `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`;

    return dataHoraCompleta 

}

module.exports = horaFormatada;