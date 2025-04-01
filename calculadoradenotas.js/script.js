document.addEventListener('DOMContentLoaded', () => {
    const gabaritoInput = document.getElementById('gabarito');
    const respostasInput = document.getElementById('respostasAluno');
    const calcularButton = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');

    calcularButton.addEventListener('click', () => {
        const gabarito = gabaritoInput.value.split(',').map(item => item.trim().toUpperCase());
        const respostasAluno = respostasInput.value.split(',').map(item => item.trim().toUpperCase());

        if (gabarito.length !== respostasAluno.length) {
            resultadoDiv.textContent = 'Erro: Gabarito e respostas devem ter o mesmo tamanho.';
            return;
        }

        let nota = 0;
        for (let i = 0; i < gabarito.length; i++) {
            if (gabarito[i] === respostasAluno[i]) {
                nota++;
            }
        }

        resultadoDiv.textContent = `Nota do aluno: ${nota} de ${gabarito.length}`;
    });
});