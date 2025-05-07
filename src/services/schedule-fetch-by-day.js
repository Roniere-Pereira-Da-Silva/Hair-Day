//schedule-fetch-by-day.js
import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function scheduleFetchByDay({date}){
  try {
    //faz a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`)
    //Converte a req para json
    const data = await response.json()
    //Filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) => 
      dayjs(date).isSame(schedule.when,"day")
    )
    
    return dailySchedules

    //alert("Agendamento realizado com sucesso!")
  } catch (error) {
    console.log(error)
    alert("Não foi possivel buscar agendamentos no dia selecionado!")    
  }
}