export default async function fetcher(...args: Parameters<typeof fetch>) {
  return (await fetch(...args)).json();
}
