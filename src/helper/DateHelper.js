

const CurrentDate = () => {

    let date = new Date(Date.now());
    let year = date.getFullYear();
    let day = Number(date.getDate());
    let month = Number(date.getMonth()+1);



    let originalMonth;

    if( month < 10){
        originalMonth=0+""+month;
    }else{
        originalMonth=month;
    }


    let originalDay;

    if( day < 10){
        originalDay=0+""+day;
    }
    else{
        originalDay=day;
    }


    let FinalDate = year + originalMonth + originalDay;

    return FinalDate; //20230520
}


module.exports=CurrentDate