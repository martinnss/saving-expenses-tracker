function formatDate(string) {
    const fechaFormateada = new Date(string);

    const año = fechaFormateada.getFullYear();
    const mes = fechaFormateada.getMonth() + 1; // Sumar 1 ya que los meses comienzan desde 0.
    const dia = fechaFormateada.getDate();

    const fechaFinal = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

    return fechaFinal;
}

export default formatDate