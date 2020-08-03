import IUser from "./IUser";
import IRoom from "./IRoom";

interface IReservation {
  id: string;
  userId: number;
  roomId?: number;
  timePeriod: string;
  name: string;
  date: string;
  room?: IRoom;
  user?: IUser;
}
export default IReservation;
