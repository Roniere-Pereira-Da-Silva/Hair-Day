export function hoursClick(){
  const hours = document.querySelectorAll('.hour-available')
  //console.log(hours)
  hours.forEach((available)=>{
    available.addEventListener("click", (selected) => {
      //Removendo a classe "hour-selected" de todas as lis não selecionadas
      hours.forEach((hour) => {
        hour.classList.remove("hour-selected")
      })

      //Adiciona a classe na li clicada
      selected.target.classList.add("hour-selected")
    })
  })
}