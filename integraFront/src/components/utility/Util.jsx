export const calculate_age = (dob1) => {
    if (!dob1) {
        return 0
    }
    let today = new Date();
    let converted = convertDate(dob1)
    let birthDate = new Date(converted);  // create a date object directly from `dob1` argument
    let age_now = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    //console.log(today,dob1,birthDate,age_now);
    return age_now;
}
function convertDate(date){
    //console.log(date);
    if(date===null){
        return null;
    }       
    let spl = date.split('/');
    let m = parseInt(spl[1],10)  
    let n = new Date(spl[2],m-1,spl[0]);
    return n;
    //return date;
}

export const calculate_renda = (renda,qt) => {
    if (!renda||!qt||qt==='0') {
        return '_____'
    }
    let rendaValue1,rendaValue2;
    if (renda==='Renda1') {
        rendaValue1=1000;
    }else if(renda==='Renda2'){        
        rendaValue1=1000;
        rendaValue2=3000;
    }
    else if(renda==='Renda3'){        
        rendaValue1=3000;
        rendaValue2=5000;
    }
    else if(renda==='Renda4'){        
        rendaValue1=5000;
        rendaValue2=8000;
    }
    else if(renda==='Renda5'){        
        rendaValue1=8000;
    }
    let renda1,renda2
    if(!rendaValue2){
        renda1 = rendaValue1/qt
    }else{
        renda1 = rendaValue1/qt
        renda2 = rendaValue2/qt
    }
    let retorno = '_____';
    if(renda2&&renda1){
        retorno = 'Entre '+Number(renda1).toFixed(2)+' e '+Number(renda2).toFixed(2)
    }else if(renda1){
        retorno = Number(renda1).toFixed(2)
    }
    return retorno;
}