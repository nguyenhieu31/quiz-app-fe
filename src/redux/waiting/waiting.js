export default async function waiting(timer) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
}
