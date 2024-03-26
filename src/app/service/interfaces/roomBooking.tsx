export interface RoomBooking {
    map(arg0: (roomBooking: any, index: any) => import("react").JSX.Element): import("react").ReactNode
    id: string
    name: string
    numberOfRoom: number
}