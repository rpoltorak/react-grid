export function generateCSV(headers, data) {
  const csvData = `${headers.join(",")}\n${data.map(row => row.join(",")).join("\n")}`;

  return `data:text/csv;charset=UTF-8,${encodeURIComponent(csvData)}`;
}

export function removeByIndex(data, index) {
  if (typeof index === "undefined") {
    return data;
  }

  return [
    ...data.slice(0, index),
    ...data.slice(index + 1),
  ];
}

export function updateByIndex(data, index, value) {
  if (!data.length) {
    throw new Error("Error: Specified array is empty");
  }

  if (index > data.length - 1) {
    throw new Error(`Error: Expected index from 0 to ${data.length - 1} range`);
  }

  return [
    ...data.slice(0, index),
    value,
    ...data.slice(index + 1),
  ];
}
