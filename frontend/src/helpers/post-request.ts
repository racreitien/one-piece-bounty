/*
 * Helper method to make a POST request to an endpoint on the local server
 * The request and response are expected to be in JSON format
 */
export const postRequest = async (url: string, body: any) => {
  console.log(body);

  const response = await fetch(`http://localhost:8000${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
};
