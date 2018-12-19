function post_gelato(){
    $("div#disabled").show();

    var icon = $("input[name=icon]").val();
    var nome = $("input[name=nome]").val();
    var costo = $("input[name=costo]").val();
    var produttore = $("input[name=produttore]").val();
    var descrizione = $("input[name=descrizione]").val();

    $.ajax({
        type: "POST",
        url: "/nuovogelato",
        data: {
            "icon": icon,
            "nome": nome,
            "costo": costo,
            "produttore": produttore,
            "descrizione": descrizione
        },
        success: function(res){
            console.warn("POST(nuovogelato) SUCCESS.");
            alert("Gelajassimo aggiunto! 😎");
            location.reload();
        },
        error: function(err){
            console.error("POST(nuovogelato) FAILED.");
            
            if(err.status == 406){
                alert("Pontential SQL Injection detected and blocked. 🖕");
                location.reload(true);
            }
            else{
                alert("Impossibile Aggiungere il Gelajaxissimo. 😓");
            }

            $("div#disabled").hide();
        }
    });
}

function get_gelati(){
    $("div#disabled").show();

    $.ajax({
        type: "GET",
        url: "/gelati",
        success: function(res){
            $("div.icon-box-view").remove();

            res.forEach(e => {
                var data = '<div id="i' + e.id + '" class="icon-box icon-box-view" onclick="get_gelato(' + e.id + ')">'
                    + '<img src="img/icons/'+e.icon+'.png">'
                    + '<div class="icon-name marquee"><p>'
                    + '<span class="data-nome">'+e.nome+'</span>'
                    + '</p></div><div class="hidden">'
                    + '<span class="data-id">'+e.id+'</span>'
                    + '<span class="data-icon">'+e.icon+'</span>'
                    + '<span class="data-costo">'+e.costo+'</span>'
                    + '<span class="data-produttore">'+e.produttore+'</span>'
                    + '<span class="data-descrizione">'+e.descrizione+'</span>'
                    + '</div></div>';
                
                $("div.viewicon").append(data);
            });

            console.warn("GET(gelati) SUCCESS.");
            setTimeout(_=>{$("section#view").fadeIn(300);}, 500);
            $("div#disabled").hide();
        },
        error: function(err){
            console.error("GET(gelati) FAILED.");
            alert("Impossibile scaricare i Gelajaxissimi. 😓");
            $("div#disabled").hide();
        }
    });
}

function get_gelato(id){
    $("div#disabled").show();

    $.ajax({
        type: "POST",
        url: "/gelato",
        data: {"id": id},
        success: function(res){                    
            $("#details-icon img").prop("src","img/icons/" + res[0].icon + ".png");
            $("#details-data-id").text(res[0].id);
            $("#details-data-nome").text(res[0].nome);
            $("#details-data-costo").text(res[0].costo);
            $("#details-data-produttore").text(res[0].produttore);
            $("#details-data-descrizione").text(res[0].descrizione);

            setTimeout(_=>{
                $("div.shadow").fadeIn(300);
            }, 100);

            $("div#disabled").hide();
        },
        error: function(err){
            console.error("POST(gelato) FAILED.");
            
            if(err.status == 406){
                alert("Pontential SQL Injection detected and blocked. 🖕");
                location.reload(true);
            }
            else{
                alert("Impossibile Scaricare il Gelajaxissimo. 😓");
            }

            $("div#disabled").hide();
        }
    });
}