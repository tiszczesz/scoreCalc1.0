$(document).ready(function () {
    $("#newTopics").html(SetSelect("newTopics", NewSchool));
    $("#oldTopics").html(SetSelect("oldTopics", OldSchool));

    $("#newTopicsList").change(function () {
        console.log($(this).val());
        $("#newForm").html(CreateForm(NewSchool, $(this).val()));

        SetOnChangeInputs();
        CountScoreNew();

        });


    $("#oldTopicsList").change(function () {
        console.log($(this).val());
        $("#oldForm").html(CreateForm(OldSchool,$(this).val()));

        SetOnChangeInputs();
        CountScoreOld();
    });


    $("#newForm").html(CreateForm(NewSchool, 0));
    $("#oldForm").html(CreateForm(OldSchool,0));
    //console.log($(':input[type="number"]'));

    SetOnChangeInputs();

    CountScoreNew();
    CountScoreOld();
    // $("#left").click(
    //     function () {
    //         $("#newForm").toggle("slow");
    //     });
    // $('#right').click(function () {
    //     $("#oldForm").toggle("slow");
    // });



});
const SetOnChangeInputs = ()=>{
    $(':input[type="number"]').each(function (index) {
        $(this).change(function () {
            Validate($(this));
            if($(this).attr("id").endsWith(NewSchool.Id)){
                // console.log(NewSchool.Id);
                CountScoreNew();
            }
            if($(this).attr("id").endsWith(OldSchool.Id)){
                //  console.log(OldSchool.Id);
                CountScoreOld();
            }
        });
        // console.log(inputs);
    });
    $(':input[type="checkbox"]').each(function (index)   {
        $(this).click(function () {
            CountScoreNew();
            CountScoreOld();
        });
    })
};
// -------------Walidacja

const Validate = (elem)=>{
    //console.log(elem);
    let min = parseInt(elem.attr("min"));
    let max = parseInt(elem.attr("max"));
    let value = parseInt(elem.val());
    if(isNaN(value) || value<min|| value>max){
        elem.css({"background-color":"#F08080"});
        return false;
    }else{
        elem.css({"background-color":"white"});
        return true;
    }
};
function Score(Id,Value,Ratio) {
    this.Id = Id;
    this.Value = Value;
    this.Ratio = Ratio;
}

//Przeliczanie punktów
const CountScoreNew = ()=>{
    let total = 0;
    let ifOK = true;
   let NewDane = [];
    $(':input[type="number"]').each(function (index) {
        if($(this).attr("Id").endsWith(NewSchool.Id)){
            ifOK = Validate($(this))&& ifOK;
            NewDane.push(parseInt($(this).val()));
           /* if(index>=0 && index<4){
                total += NewSchool.Certificate.getScoreForTopic(parseInt($(this).val()));
                //console.log(total);
                //NewDane.push({index,total});
            }else if(index>=4 && index<=5){
                total+=(parseInt($(this).val()));
            }else if(index=>6 && index<=7){
                total += parseInt($(this).val())*0.3;
                console.log("7terza: "+total);
            }
            else if(index==8){
                total+=parseInt($(this).val())*0.0;
                console.log("terza: "+total);
            }
           */
        }

    });

    total += NewSchool.Certificate.getScoreForTopic(NewDane[0])+NewSchool.Certificate.getScoreForTopic(NewDane[1])
        +NewSchool.Certificate.getScoreForTopic(NewDane[2])+NewSchool.Certificate.getScoreForTopic(NewDane[3])
        +NewDane[4]+NewDane[5]+NewDane[6]*0.35+NewDane[7]*0.35+NewDane[8]*0.3;

    if(document.querySelector("#distinctNew").checked){
        total += 7;console.log("liczy czerwone!!: "+total);
    }
    if(ifOK && !isNaN(total)){
        $("#NewWynik").html(total.toFixed(2))
    }else{
        $("#NewWynik").html("BRAK DANYCH");
    }

};
const CountScoreOld = ()=>{
    let total = 0;
    let ifOK = true;
    let NewDane = [];
    $(':input[type="number"]').each(function (index) {
        if($(this).attr("Id").endsWith(OldSchool.Id)){
            ifOK = Validate($(this))&& ifOK;
            NewDane.push(parseInt($(this).val()));
            /* if(index>=0 && index<4){
                 total += NewSchool.Certificate.getScoreForTopic(parseInt($(this).val()));
                 //console.log(total);
                 //NewDane.push({index,total});
             }else if(index>=4 && index<=5){
                 total+=(parseInt($(this).val()));
             }else if(index=>6 && index<=7){
                 total += parseInt($(this).val())*0.3;
                 console.log("7terza: "+total);
             }
             else if(index==8){
                 total+=parseInt($(this).val())*0.0;
                 console.log("terza: "+total);
             }
            */
        }

    });

    total += NewSchool.Certificate.getScoreForTopic(NewDane[0])+NewSchool.Certificate.getScoreForTopic(NewDane[1])
        +NewSchool.Certificate.getScoreForTopic(NewDane[2])+NewSchool.Certificate.getScoreForTopic(NewDane[3])
        +NewDane[4]+NewDane[5]+NewDane[6]*0.2+NewDane[7]*0.2+NewDane[8]*0.2+NewDane[9]*0.2+NewDane[10]*0.2;

    if(document.querySelector("#distinctOld").checked){
        total += 7;console.log("liczy czerwone!!: "+total);
    }
    if(ifOK && !isNaN(total)){
        $("#OldWynik").html(total.toFixed(2))
    }else{
        $("#OldWynik").html("BRAK DANYCH");
    }
    console.log("Całkowite: "+total);
    console.log(NewDane);
    console.log(ifOK);
};
function SetSelect(id, school){
    let html = "<select id='"+id+"List'>";
    for(let i=0;i<school.ListaKlas.length;i++){
        html += "<option value='"+i+"'>"+school.ListaKlas[i].Name+"</option>";

    }
    //console.log(school);
    return html +"</select>";
}
function CreateForm(school,klasaId){
    let html = "<form><fieldset style='background-color: #d6eeff'><legend class='form-le'>Świadectwo: </legend>";
    console.log(school.ListaKlas[klasaId].ScoreDivision);
    for(let i=0;i<4;i++){
        html +=
         '<div class="form-group row">'
                        +'<label for="IdCert'+i+school.Id+'" class="col-sm-8 col-form-label">'
            +school.ListaKlas[klasaId].ScoreDivision[i]+
            '</label> <div class="col-sm-3"> <input class="form-control" id="IdCert'+i+school.Id+'" type="number" min="1" max="6" value="1">'+
                       ' <span class="error"></span></div></div>';
    }
    html +=  '<div class="form-group row">'+
            '<label for="idAchivment" class="col-sm-8 col-form-label">osiągnięcia max 18pkt</label>'+
        '<div class="col-sm-3"> <input class="form-control" id="idAchivment'+school.Id+'" type="number" min="0" max="18" value="0">'+
        ' <span class="error"></span></div></div>';
    html +=  '<div class="form-group row">'+
        '<label for="idSocial" class="col-sm-8 col-form-label">praca społeczna max 3pkt</label>'+
        '<div class="col-sm-3"> <input class="form-control" id="idSocial'+school.Id+'" type="number" min="0" max="3" value="0">'+
        ' <span class="error"></span></div></div>';
    html +=  '<div class="form-group row">'+
        '<label for="distinct" class="col-sm-8 col-form-label">Świadectwo z wyróżnieniem</label>'+
        '<div class="col-sm-3"> <input class="form-control" id="distinct'+school.Id+'" type="checkbox">'+
        '</div></div>';

   html+="</fieldset>";
   html += examForm(school,klasaId);
    html +="<h3 id='newResult' class='badge-success text-lg-center'>Wynik: <span style='color: #ffc8a0' id='"+school.Id+"Wynik'>BRAK DANYCH</span></h3>";
    return html+"</form>";
}

function examForm(school,klasaId){
    html = "<fieldset style='background-color: #c9ffe5'><legend>Egzamin: </legend>";
    for(let i=0;i<school.Exam.length;i++){
        html +=
            '<div class="form-group row">'
            +'<label for="IdExam'+i+school.Id+'" class="col-sm-8 col-form-label">'
            +school.Exam[i].Topic+
            '</label> <div class="col-sm-3"> <input class="form-control" id="IdExam'+i+school.Id+'" type="number" min="0" max="100" value="0">'+
            ' <span class="error"></span></div></div>';
    }
    return html+"</fieldset>"
}
let Klasy = [];


let A1= {
    Id:"NewA1",
        Name: "A1",
        Extensions: ["matematyka", "geografia", "informatyka"],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "geografia lub fizyka"]
};
let A2 =  {
    Id:"NewA2",
        Name: "A2",
        Extensions: ["matematyka", "geografia", "język angielski"],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "geografia"]
};
let A3= {
    Id:"NewA3",
        Name:"A3 ",
        Extensions: ["biologia" ,"chemia" ],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "biologia lub chemia"]
};
let A4 =  {
    Id:"NewA4",
        Name:"A4 klasa pożarnicza",
        Extensions: ["chemia", "biologia" ],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "biologia lub chemia"]
};
let B1 = {
    Id:"NewB1",
        Name:"B1",
        Extensions: ["język polski"," historia"," wiedza o społeczeństwie" ],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "historia"]
};
let B2 = {
    d:"NewB2",
        Name:"B2",
        Extensions: ["język polski", "historia", "język angielski" ],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "historia"]
};
let B3=  {
    Id:"NewB3",
        Name:"B3 klasa policyjna",
        Extensions: ["historia", "język angielski lub wiedza o społeczeństwie"],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "historia"]
};
 let TI =  {
    Id:"NewTI",
        Name:"TI Technik informatyk",
        Extensions: ["matematyka", "język angielski lub informatyka" ],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "geografia lub fizyka"]
};
let TP= {
    Id:"NewTI",
        Name:"TP Technik programista",
        Extensions: ["matematyka", "geografia", "język angielski"],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "geografia lub fizyka"]
};
let TE= {
    Name:"Technik ekonomista",
        Extensions: ["matematyka", "geografia lub wiedza o społeczeństwie"],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "geografia lub historia"]
};
let TR =  {
    Id:"NewTR",
        Name:"Technik rachunkowości",
        Extensions: ["matematyka", "geografia lub wiedza o społeczeństwie"],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "geografia lub historia"]
};
let THT =  {
    Id:"NewTHT",
        Name:"THT technik hotelarstwa",
        Extensions: ["język polski", "matematyka",
        "język angielski", "geografia lub historia"]
};
let TOT = {
    Id:"NewTOT",
        Name:"TOT technik organizacji turystyk",
        Extensions: ["geografia", "język angielski lub wiedza o społeczeństwie"],
        ScoreDivision: ["język polski", "matematyka",
        "język angielski", "geografia lub historia"]
};
Klasy.push(A1);
Klasy.push(A2);
Klasy.push(A3);
Klasy.push(A4);
Klasy.push(B1);
Klasy.push(B2);
Klasy.push(B3);
Klasy.push(TI);
Klasy.push(TP);
Klasy.push(TE);
Klasy.push(TR);
Klasy.push(THT);
Klasy.push(TOT);



let NewSchool = {
    Id: "New",
    Name: "Po szkole podstawowej",
    Exam:[{ Topic:"Język polski", ratio: 0.35,},
          { Topic:"Matematyka", ratio: 0.35},
        { Topic:"Język obcy",  ratio: 0.3}] ,
    Certificate:{
        getScoreForTopic: function (grade) {
            switch(grade){
                case 1: return 0;
                case 2: return  2;
                case 3: return  8;
                case 4: return  14;
                case 5: return  17;
                case 6: return  18;
                default: return 0;
            }
        }
    },
    ListaKlas: Klasy,

};

let OldSchool = {
    Id: "Old",
    Name: "Po szkole gimnazjalnej",
    Exam:[{ Topic:"Język polski",
        ratio: 0.2,},{ Topic:"Historia i wiedza o społeczeństwie",
        ratio: 0.2},{ Topic:"Matematyka",
        ratio: 0.2},{ Topic:"Przedmioty przyrodnicze",
        ratio: 0.2},{Topic:"Język obcy",
        ratio: 0.2}],
    Certificate:{
        getScoreForTopic: function (grade) {
            switch(grade){
                case 1: return 0;
                case 2: return  2;
                case 3: return  8;
                case 4: return  14;
                case 5: return  17;
                case 6: return  18;
                default: return 0;
            }
        }
    },
    ListaKlas: Klasy
};


