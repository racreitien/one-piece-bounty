import { host } from "../constants/endpoints";

/*
 * Helper method to make a POST request to an endpoint on the local server
 * The request and response are expected to be in JSON format
 */
export const postRequest = async (url: string, body: any) => {
  const postUrl = host + url;

  const response = await fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
};
