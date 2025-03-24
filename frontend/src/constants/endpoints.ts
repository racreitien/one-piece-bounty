export const generate = "/generate";
export const generateName = "/generate/name";
export const generateDescription = "/generate/description";
export const poster = "/poster";

export const host =
  __APP_ENV__ == "production" ? __BASE_URL__ : "http://localhost:8080";
