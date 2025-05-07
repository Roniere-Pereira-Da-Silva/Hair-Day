import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "../../modules/form/hours-click.js";

const hours = document.getElementById("hours")

export function hoursLoad({date, dailySchedules}){
  //Limpa a lista de horarios
  hours.innerHTML = ""

  //Variavel para guardar os horarios não disponiveis
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))


  //Map para recuperar cada hora da API
  const opening = openingHours.map((hour) => {
    //Recupera somente a hora
    //console.log(hour)
    //Quero apenas a hora então vou fazer um split para desestruturar
    //const scheduleHour = hour.split(":")
    //console.log(scheduleHour)
    const [scheduleHour] = hour.split(":")
    //console.log(scheduleHour)

    //Adiciona a hora na data e verifica se esta no passado
    //const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())
    //console.log(scheduleHour, isHourPast)
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())
    
    //console.log(date)
    
   //console.log({  
   //   hour,
   //   available: isHourPast,
   //   }    
   // )    

    const available = !unavailableHours.includes(hour) && !isHourPast;

    return {
      hour,
      available,
    }      

  })
  //console.log(opening)

  //Renderizar os horarios
  opening.forEach(({hour,available})=>{
    const li = document.createElement("li")
    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")
    li.textContent = hour

    if (hour === "9:00"){
      hourHeaderAdd("Manhã")
    } else if  (hour === "13:00"){
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00"){
      hourHeaderAdd("Noite")
    } 

    hours.append(li)
  })
  //Adiociona os eventos de clique nos horarios disponiveis
  hoursClick()
}

function hourHeaderAdd(title){
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title
  hours.append(header)
}
