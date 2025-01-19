export const userRoles = [
  "SPIME",
  "Community Officer (CO)",
  "MDA Officer",
  "Project Development Officer (PDO)",
];

const baseURL = "/users";
export const endpoints = {
  CREATE_USER: `${baseURL}/`,
  GET_USERS: (
    page: number,
    direction: "forward" | "backward" | string,
    cursorId: string,
    postsPerPage: number
  ) =>
    `${baseURL}?page=${page}&cursorId=${cursorId}&direction=${direction}&postsPerPage=${postsPerPage}`,

  GET_USER: (id: string) => `${baseURL}/${id}`,
  UPDATE_USER: (id: string) => `${baseURL}/${id}`,
  DELETE_USER: (id: string) => `${baseURL}/${id}`,
  GET_COMMUNITIES: `/community`,
  GET_MDA: "/mda",
};
