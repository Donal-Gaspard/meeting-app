import IReservation from './IReservation'
interface IRoom {
    id: number;
    name: string;
    reservations: IReservation[];
}

export default IRoom;