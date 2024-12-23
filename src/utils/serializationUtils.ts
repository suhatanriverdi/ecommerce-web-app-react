// serializationUtils.ts

/* Usage:

  const originalValue = [
    new Map([['a', {
      b: {
        c: new Map([['d', 'text']])
      }
    }]])
  ];

  const str = JSON.stringify(originalValue, replacer);
  const newValue = JSON.parse(str, reviver);
*/

// JSON.Stringify(value, replacer)
export function replacer(_key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  }
  return value;
}

// JSON.parse(string, reviver)
export function reviver(_key: string, value: any) {
  if (typeof value === "object" && value !== null && value.dataType === "Map") {
    return new Map(value.value);
  }
  return value;
}
