export const convertDate = (created_at: string | undefined) => {
  if (!created_at) return "-"
  return new Date(+created_at).toDateString()
}
