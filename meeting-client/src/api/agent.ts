import axios, { AxiosResponse } from "axios";
import IUser from "../models/IUser";
import IReservation from "../models/IReservation";
import IRoom from "../models/IRoom";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://localhost:44364/api/";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  toast.error(`${error}`);
});

const responseBody = (response: AxiosResponse) => response.data;
const waitTime = 0;
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) => {
    setTimeout(() => resolve(response), ms);
  });

const requests = {
  get: (url: string) => axios.get(url).then(sleep(waitTime)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(waitTime)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(waitTime)).then(responseBody),
  del: (url: string) =>
    axios.delete(url).then(sleep(waitTime)).then(responseBody),
};

const UserAgent = {
  list: (): Promise<IUser[]> => requests.get("/users"),
};

const ReservationsAgent = {
  list: (): Promise<IReservation[]> => requests.get("/reservations"),
  listPeriod: (): Promise<string[]> => requests.get("/reservations/times"),
  details: (id: number) => requests.get(`/reservations/${id}`),
  create: (reservation: IReservation) =>
    requests.post("/reservations", reservation),
  update: (reservation: IReservation) =>
    requests.put(`/reservations/${reservation.id}`, reservation),
  delete: (id: string) => requests.del(`/reservations/${id}`),
  getAvaibillities: (roomId: number, date: string): Promise<string[]> =>
    requests.get(`reservations/avaibillities?roomId=${roomId}&date=${date}`),
};

const roomAgent = {
  list: (): Promise<IRoom[]> => requests.get("/rooms"),
  details: (id: number) => requests.get(`/rooms/${id}`),
};

export default {
  UserAgent,
  ReservationsAgent,
  roomAgent,
};
