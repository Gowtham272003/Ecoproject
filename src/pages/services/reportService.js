export const downloadPDF = (userId) =>
  window.open(`http://localhost:8080/api/report/pdf/${userId}`);

export const downloadCSV = () =>
  window.open("http://localhost:8080/api/report/csv");