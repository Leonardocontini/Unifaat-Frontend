import editItem from "./editItem.js";

export default function createNameList(name) {

    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    liElement.append(document.createTextNode(name));

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", (event) => {
        event.preventDefault();

        // stopPropagation garante que o clique no botão Excluir
        // não acione o listener de edição do li
        event.stopPropagation();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        event.currentTarget.parentElement.remove();
    });
    liElement.append(buttonDeleteElement);

    // Ao clicar no li (mas não nos botões), entra no modo de edição
    liElement.addEventListener("click", (event) => {
        // Ignora cliques em botões; usa currentTarget para comparar
        if (event.target.tagName === "BUTTON" || event.target.tagName === "INPUT") {
            return;
        }
        editItem(liElement);
    });

    return liElement;

}
