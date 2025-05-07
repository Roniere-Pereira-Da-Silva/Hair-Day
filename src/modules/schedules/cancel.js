import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"
const periods = document.querySelectorAll(".period")
//console.log(periods)

//Gera um evento de clique para cadas lista (Manha tarde e noite)
periods.forEach((period)=>{
  //Captura o evento de clique da lista 
  period.addEventListener("click", async(event) => {
    //Valida se o local da tela onde estou clicando contem esta classe "cancel-icon" retrna True ou False
    if (event.target.classList.contains("cancel-icon")){
      //Obtem o li pai do elemento clicado
      const item = event.target.closest("li")
      //Pega o id do agendamento para remover
      const { id } = item.dataset
      //console.log( id )
      //Confirma que o id foi selecionado
      if ( id ){
        const isConfirm = confirm("tem certeza que deseja cancelar o agendamento?")
        if (isConfirm){
          //console.log("Remover")
          //Faz a requisição na API para cancelar e recarrega
          await scheduleCancel({ id })
          schedulesDay()
        }
      }
    }
  })
})