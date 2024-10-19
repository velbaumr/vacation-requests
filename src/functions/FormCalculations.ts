const calculateRequestedDays = (startDate?: Date, endDate?: Date): number => {
    if (!startDate || !endDate) return 0;

    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24) + 1;
    
    return daysDiff > 0 ? daysDiff : 0;
  };

  const calculateStartDate = (endDate: Date, days: number): Date => {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days + 1);
    
    return startDate;
  };

  const calculateEndDate = (startDate: Date, days: number): Date => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days - 1);
    
    return endDate;
  };

  export {calculateRequestedDays, calculateStartDate, calculateEndDate}