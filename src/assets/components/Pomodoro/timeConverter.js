/**
 * Convert a seconds value to the HH:mm:ss format
 * 
 * @param seconds - seconds amount
 * @return a string ""HH:mm:ss"
 */
export function secondsToFormattedTime(seconds){
    let hoursValue
    let minutesValue
    let secondsValue

    hoursValue = Math.trunc(seconds / 3600)
    minutesValue = Math.trunc(seconds / 60 - hoursValue * 60)
    secondsValue = seconds - minutesValue * 60 - hoursValue * 3600

    return hoursValue + ":" + minutesValue + ":" + secondsValue
}