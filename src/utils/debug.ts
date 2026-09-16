export const formatDebugObject = (name: string, obj: any, indent: number = 2): string => {
  const objJson = JSON.stringify(obj, null, indent);
  return `\x1b[1;38;2;240;79;120mname: \x1b[1;38;2;143;211;255m${objJson}\x1b[0m`
}

export const consoleDebugObject = (name: string, obj: any, indent: number = 2): string => {
  console.log(formatDebugObject(name, obj, indent))
}
