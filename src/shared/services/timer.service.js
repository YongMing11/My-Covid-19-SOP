const getDurationString = (difference) => {
    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    return hoursDifference + " HOUR " + minutesDifference + " MIN " + secondsDifference + " SEC"
}

export {getDurationString};