export function generateCSV(headers, data) {
  const csvData = headers.join(',') + "\n" + data.map(row => row.join(',')).join('\n');

  return `data:text/csv;charset=UTF-8,${encodeURIComponent(csvData)}`;
}

export function removeByIndex(data, index) {
  return [
    ...data.slice(0, index),
    ...data.slice(index + 1)
  ]
}

export function updateByIndex(data, index, value) {
  return [
    ...data.slice(0, index),
    value,
    ...data.slice(index + 1)
  ]
}
