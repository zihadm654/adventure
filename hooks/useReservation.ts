import { Room } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReservationStore {
  roomData: RoomData | null;
  paymentIntentId: string | null;
  clientSecret: string | undefined;
  setRoomData: (roomData: RoomData) => void;
  setPaymentIntentId: (paymentIntentId: string) => void;
  setClientSecret: (clientSecret: string) => void;
  resetRoomReservation: () => void;
}

type RoomData = {
  room: Room;
  totalPrice: number;
  breakfastIncluded: boolean;
  startDate: Date;
  endDate: Date;
};

const useRoomReservation = create<ReservationStore>()(
  persist(
    (set) => ({
      roomData: null,
      paymentIntentId: null,
      clientSecret: undefined,
      setRoomData: (roomData) => set({ roomData }),
      setPaymentIntentId: (paymentIntentId) => set({ paymentIntentId }),
      setClientSecret: (clientSecret) => set({ clientSecret }),
      resetRoomReservation: () =>
        set({ roomData: null, paymentIntentId: null, clientSecret: undefined }),
    }),
    { name: "room-reservation" },
  ),
);
export default useRoomReservation;
