import { schedulesDay } from "../schedules/load.js" 
//seleciona o input de data
const selectedDate = document.getElementById("date")

//Recarrega os horarios disponiveis
selectedDate.onchange = () => schedulesDay()
