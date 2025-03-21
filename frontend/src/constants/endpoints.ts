export const generate = "/generate";
export const generateName = "/generate/name";
export const generateDescription = "/generate/description";
export const poster = "/poster";

export const host =
  import.meta.env.MODE == "production"
    ? import.meta.env.BASE_URL
    : "http://localhost:8000";
