import { DaysAvailability } from "../../enums/DaysAvailability"


export class DaysAvailabilityUtils {

    static returnDayOfWeek(date: string) {
        const appointmentDate = new Date(date)
        const daysOfWeek = Object.values(DaysAvailability)
        console.log(appointmentDate.getDay());
        
        console.log(daysOfWeek[appointmentDate.getDay()]);
        
        return daysOfWeek[appointmentDate.getDay()]
    }
}