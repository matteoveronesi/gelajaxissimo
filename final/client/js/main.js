$("#menu div").on("click", function(){
    
    $("section#menu").fadeOut(300);

    $("#waffle").animate({
        backgroundPositionY: "+=1000px"
        },{
        duration: 1200,
        easing: "linear"
    });
});

$("div.menu-create").on("click", function(){
    setTimeout(_=>{$("section#create").fadeIn(300);}, 500);
});

$("div.menu-view").on("click", function(){
    get_gelati();
});

$("span.backhome").on("click", function(){
    $("section#view, section#create").fadeOut(300);

    setTimeout(_=>{
        $("section#menu").fadeIn(300);
        $("div.icon-box").css("background","rgb(99, 99, 99)");
        $("input").val("");
    }, 500);
    
    $("#waffle").animate({
        backgroundPositionY: "-110px"
        },{
        duration: 1000,
        easing: "linear"
    });
});

$("span.backinput").on("click", function(){
    $("div.inputicon").fadeOut(300);

    setTimeout(_=>{
        $("div.inputdata").fadeIn(300);
        $("div.icon-box").css("background","rgb(99, 99, 99)");
        $("input[name=icon]").val("");
    }, 500);
});

$("span.backview").on("click", function(){
    $("div.icon-box").css("background","rgb(99, 99, 99)");
    $("input[name=icon]").val("");
    $("div.shadow").fadeOut(300);
    /*setTimeout(_=>{
        $("div.details-icon img").prop("src","");
        $("div.details-data p span").empty();
        $("span.details-desc-text").empty();
    }, 300);*/
});
/*
$("div.viewicon").on("click","div.icon-box-view" , function(){
    //console.log(this.closest("div.icon-box-view").children("#data-id").text());
    //console.log(this.children("#data-nome").text());
    
});*/

$("#settings").on("click", function(){
    $("#settings-box").toggle(200);
});

$("#setsnow").on("click", function(){
    $("#particles").fadeToggle(300);
});

$("#setcolor").change(function(){
    var color = $(this).val();
    
    $("body").css("background",color);
    $("#setcolor-box").css("background",color);
});

$("div.icon-box").on("click", function(){
    $("div.icon-box").css("background","rgb(99, 99, 99)");
    $(this).css("background","rgb(175,175,175)");
    $("input[name=icon]").val($(this).attr("id"));
});

function shakebutton(b){
        b.animate({
            left: "-=10px"
            },{
            duration: 50,
            easing: "linear"
        });
        b.animate({
            left: "+=20px"
            },{
            duration: 50,
            easing: "linear"
        });
        b.animate({
            left: "-=15px"
            },{
            duration: 50,
            easing: "linear"
        });
        b.animate({
            left: "+=10px"
            },{
            duration: 50,
            easing: "linear"
        });
        b.animate({
            left: "-=5px"
            },{
            duration: 50,
            easing: "linear"
        });
}

$("button.next").on("click", function(){
    if($("input[name=descrizione]").val() == "" || $("input[name=nome]").val() == "" || $("input[name=costo]").val() == "" || $("input[name=produttore]").val() == ""){
        var b = $(this);
        b.text("Compila ogni campo");
        b.css({"background":"#ff2d25","left":"220px","box-shadow":"0px 0px 7px #ff2d25","border":"1px solid #ff2d25"});
        shakebutton(b);
        setTimeout(_=>{
            b.html("Continua");
            b.css({"background":"rgb(164, 221, 159)","left":"270px","box-shadow":"0px 0px 7px rgb(108, 241, 95)","border":"1px solid rgb(164, 221, 159)"});
        },1000);
    }else{
        $("div.inputdata").fadeOut(100);
        setTimeout(_=>$("div.inputicon").fadeIn(100),100);
    }
});

$("button.send").on("click", function(){
    if($("input[name=icon]").val() == ""){
        var b = $(this);
        b.text("Scegli un'icona");
        b.css({"background":"#ff2d25","left":"410px","box-shadow":"0px 0px 7px #ff2d25","border":"1px solid #ff2d25"});
        shakebutton(b);
        setTimeout(_=>{
            b.html("Aggiungi");
            b.css({"background":"rgb(164, 221, 159)","left":"440px","box-shadow":"0px 0px 7px rgb(108, 241, 95)","border":"1px solid rgb(164, 221, 159)"});
        },1000);
    }
    else
        post_gelato();
});
