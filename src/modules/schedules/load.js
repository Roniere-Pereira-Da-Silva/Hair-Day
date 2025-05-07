import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { hoursLoad } from "../form/hours-load.js"
import { schedulesShow } from "./show.js"
//poder carregar o agendamento conforme o dia
//seleciona o input de data
const selectedDate = document.getElementById("date");

export async function schedulesDay(){
  
  // Os Horarios disponiveis (Horario futuro + não agendados) do lado esquerdo (form)

  //Obtem a data do input
  const date = selectedDate.value
  //console.log(Date)
  //Buscar na API os agendamentos para carregar do lado direito da tela
  const dailySchedules = await scheduleFetchByDay({date})
  //OK console.log(dailySchedules)

  //Exibe os agendamentos
  schedulesShow({dailySchedules})

  //Renderiza as horas disponiveis
  hoursLoad({date, dailySchedules}) 
}