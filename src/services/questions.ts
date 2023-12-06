export const getAllQuestons = async () => {
  const resp = await fetch( 'http://localhost:5173/data.json' );
  const json = await resp.json();
  return json;
};