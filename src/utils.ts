export function getPreviousMonthDateRange() {
  const today = new Date();
  
  // Get the first day of the *current* month
  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // The last day of the previous month is day 0 of the current month
  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfPreviousMonth.setDate(0); 

  // The first day of the previous month is day 1 of that same (previous) month
  const firstDayOfPreviousMonth = new Date(lastDayOfPreviousMonth);
  firstDayOfPreviousMonth.setDate(1);

  return {
    firstDay: firstDayOfPreviousMonth,
    lastDay: lastDayOfPreviousMonth
  };
}

export function getMonthDateRange(year: number, month: number) {
    // month: 0-based (0 = January)
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
}