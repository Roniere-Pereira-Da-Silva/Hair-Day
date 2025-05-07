import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"
const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

//************************* */
//Carrega a data atual
const inputToday = dayjs(new Date()).format("YYYY-MM-DD") 
//Data atual para o input
selectedDate.value = inputToday 
//Define a data minima como data atual
selectedDate.min   = inputToday
//************************* */


form.onsubmit = async (event) => {
  //Previne o comportamento padrão do navegador garregar a pagina
  event.preventDefault()

  //console.log("ENVIADO!")
  try{
    //recuperando o nome do cliente
    const name = clientName.value.trim()
    //console.log(name)
    if (!name) {
      return alert("informe o nome do cliente!")
    }

    //Recupera o horario selecionado
    const hourSelected = document.querySelector(".hour-selected")
    //console.log(hourSelected)
    
    //Recupensado o horario selecionado
    if (!hourSelected) {
      return alert("informe o horário!")
    }

    //Recuperando somente o horario
    const  [hour] = hourSelected.innerText.split(":")
    //console.log(hour)

    //Inserir a hora na data
    const when = dayjs(selectedDate.value).add(hour,"hour")
    //console.log(when)

    //Gerar im ID
    const id = new Date().getTime().toString()
    /*
    console.log({
      id,
      name,
      when,
    })
    */

    //Faz os agendamentos
    await scheduleNew({
      id,
      name,
      when,
    })

    //Recarrega os agendamentos
    await schedulesDay()

    //Limpa o imput de nome do cliente 
    clientName.value = ""

  } catch(error){
    alert("Não foi possivel realizar o agendamento.")
    console.log(error)
  }
}