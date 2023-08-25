const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };
  
  export { formatDate };
  
  const getAgenda = (startDate, endDate) => {
    const agendaArray = [];
  
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      if (days == 0) {
        agendaArray.push({
          data: startDate,
          status: "disponivel",
          ocupante: "",
        });
      } else {
        for (let i = 0; i <= days; i++) {
          const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
          agendaArray.push({
            data: formatDate(currentDate),
            status: "disponivel",
            ocupante: "",
          });
        }
      }
      console.log("agenda", agendaArray);
    }
    return agendaArray;
  };
  
  export { getAgenda };
  
  const getDates = (startDate, endDate) => {
    const dates = [];
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      if (days == 0) {
        dates.push({
          startDate: startDate,
          endDate: endDate,
        });
      } else {
        for (let i = 0; i <= days; i++) {
          const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
          dates.push({
            startDate: formatDate(currentDate),
            endDate: formatDate(currentDate),
          });
        }
      }
      console.log("dates", dates);
    }
    return dates;
  };
  
  export { getDates };