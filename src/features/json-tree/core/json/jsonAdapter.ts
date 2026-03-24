async function contentToJson(value: string): Promise<object> {
  return JSON.parse(value)
}

export { contentToJson }
