export const encodeUrl = (data: {
  [key: string]: string | string[] | undefined
}) => {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(`${data[key]}`)
    )
    .join('&')
}
