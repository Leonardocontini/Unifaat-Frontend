/**
 * Ativa o modo de edição em um item da lista (li).
 *
 * @param {HTMLLIElement} liElement - O elemento li que será editado.
 */
export default function editItem(liElement) {
    // Recupera o textNode atual (sempre é o primeiro filho do li)
    const textNode = liElement.firstChild;
    const currentValue = textNode.nodeValue;

    // Cria o input já preenchido com o valor atual
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("value", currentValue);
    inputElement.classList.add("form-control", "form-control-sm", "me-2");

    // Cria o botão "Alterar"
    const buttonEditElement = document.createElement("button");
    buttonEditElement.classList.add("btn", "btn-warning", "btn-sm");
    buttonEditElement.innerText = "Alterar";

    // Substitui o textNode pelo input
    liElement.replaceChild(inputElement, textNode);

    // Insere o botão "Alterar" antes do botão "Excluir"
    const buttonDeleteElement = liElement.querySelector("button");
    liElement.insertBefore(buttonEditElement, buttonDeleteElement);

    // Foca no input e posiciona o cursor no final
    inputElement.focus();
    inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);

    // Função que confirma a alteração
    function confirmar() {
        const newValue = inputElement.value.trim();

        // Não permite salvar valor vazio
        if (newValue === "") {
            inputElement.focus();
            return;
        }

        // Volta ao textNode com o novo valor
        const newTextNode = document.createTextNode(newValue);
        liElement.replaceChild(newTextNode, inputElement);

        // Remove o botão "Alterar"
        buttonEditElement.remove();
    }

    // Confirma ao clicar em "Alterar"
    buttonEditElement.addEventListener("click", (event) => {
        event.preventDefault();
        // Impede que o clique no botão propague para o li e reative o modo de edição
        event.stopPropagation();
        confirmar();
    });

    // Desafio: Enter também confirma
    inputElement.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();
        confirmar();
    });
}
