export const formattedDate = (definedDate) => {
  
    const originalDate = new Date(definedDate);
  
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const monthIndex = originalDate.getMonth();
    const monthName = months[monthIndex];
    
    const formattedDay = originalDate.getDate();
    const formattedYear = originalDate.getFullYear();
  
    return `${monthName} ${formattedDay} ${formattedYear}`;
}