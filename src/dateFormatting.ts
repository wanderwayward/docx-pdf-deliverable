/**
 * Formats a JavaScript Date object into a DD-MM-YYYY string.
 * This format aligns with common date formatting preferences in Israel, 
 * I thought I'd add that for you.
 **/

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits for the day.
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, add 1 for correct month, ensure two digits.
  const year = date.getFullYear(); // Full year as a four-digit number.
  return `${day}-${month}-${year}`; // Combine components into DD-MM-YYYY format.
};

export default formatDate;