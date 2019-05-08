$(document).ready(function () {
    $("#newTopics").html(SetSelect("newTopics", NewSchool));
    $("#oldTopics").html(SetSelect("oldTopics", OldSchool));

    $("#newTopicsList").change(function () {
        console.log($(this).val());
        $("#newForm").html(CreateForm(NewSchool, $(this).val()));
    });
    $("#newForm").html(CreateForm(NewSchool, 2));
    $("#left").click(
        function () {
            $("#newForm").toggle("slow");
        });
    $('#right').click(function () {
        $("#oldForm").toggle("slow");
    });
    $("input").each(function (index) {
        $(this).change(function () {
            alert(index);
        });
       // console.log(inputs);
    });
});
function SetSelect(id, school){
    let html = "<select id='"+id+"List'>";
    for(let i=0;i<school.ListaKlas.length;i++){
        html += "<option value='"+i+"'>"+school.ListaKlas[i].Name+"</option>";

    }
    //console.log(school);
    return html +"</select>";
};
function CreateForm(school,klasaId){
    let html = "<form><fieldset style='background-color: #d6eeff'><legend class='form-le'>Świadectwo: </legend>";
    console.log(school.ListaKlas[klasaId].ScoreDivision);
    for(let i=0;i<4;i++){
        html +=
         '<div class="form-group row">'
                        +'<label for="IdCert'+i+'" class="col-sm-8 col-form-label">'
            +school.ListaKlas[klasaId].ScoreDivision[i]+
            '</label> <div class="col-sm-3"> <input class="form-control" id="IdCert'+i+'" type="number" min="1" max="6" value="5">'+
                       ' <span class="error"></span></div></div>';
    }
    html +=  '<div class="form-group row">'+
            '<label for="idAchivment" class="col-sm-8 col-form-label">osiągnięcia max 18pkt</label>'+
        '<div class="col-sm-3"> <input class="form-control" id="idAchivment" type="number" min="1" max="18" value="0">'+
        ' <span class="error"></span></div></div>';
    html +=  '<div class="form-group row">'+
        '<label for="idSocial" class="col-sm-8 col-form-label">praca społeczna max 3pkt</label>'+
        '<div class="col-sm-3"> <input class="form-control" id="idSocial" type="number" min="1" max="3" value="0">'+
        ' <span class="error"></span></div></div>';
    html +=  '<div class="form-group row">'+
        '<label for="distinct" class="col-sm-8 col-form-label">Świadectwo z wyróżnieniem</label>'+
        '<div class="col-sm-3"> <input class="form-control" id="distinct" type="checkbox" min="1" max="6">'+
        '</div></div>';

   html+="</fieldset>";
   html += examForm(school,klasaId)
    html +="<h3 id='newResult' class='badge-success text-lg-center'>Wynik: <span style='color: #ffc8a0' id='newWynik'>BRAK DANYCH</span></h3>";
    return html+"</form>";
}

function examForm(school,klasaId){
    html = "<fieldset style='background-color: #c9ffe5'><legend>Egzamin: </legend>";
    for(let i=0;i<school.Exam.length;i++){
        html +=
            '<div class="form-group row">'
            +'<label for="IdExam'+i+'" class="col-sm-8 col-form-label">'
            +school.Exam[i].Topic+
            '</label> <div class="col-sm-3"> <input class="form-control" id="IdExam'+i+'" type="number" min="0" max="100" value="0">'+
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
}
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


