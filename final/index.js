const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const encoded = require("body-parser").urlencoded({ extended: false });
const router = express.Router();
const mysql = require('mysql');
const ip = require("ip");
const colors = require("colors");
const port = process.env.PORT || 3000;
var gelati = "";
var gelato = "";

/* CONNECTIONS DEF */
var conn_mysql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

var conn_gelati = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gelati_veronesi'
});
   
/* DATABASE CREATION IFNDEF */
conn_mysql.connect(function(err){
    if (err){
        console.error(colors.red('Error connecting to MySQL: ' + err.stack));
        return;
    }
});
   
conn_mysql.query('CREATE DATABASE gelati_veronesi', function (error) {
    if (error) console.log("Database not created. It already exists.".yellow);
    else{
        console.log("Database `gelati_veronesi` created.".green);
                
        /* TABLE GELATI CREATION  */
        conn_gelati.connect(function(err){
            if (err){
                console.error(colors.red('Error connecting to Database `gelati_veronesi`: ' + err.stack));
                return;
            }
        });

        conn_gelati.query("CREATE TABLE gelati("
            + "id int(11) NOT NULL AUTO_INCREMENT,"
            + " nome varchar(25) NOT NULL,"
            + " costo int(11) NOT NULL,"
            + " produttore varchar(25) NOT NULL,"
            + " descrizione varchar(255) NOT NULL,"
            + " icon varchar(2) NOT NULL,"
            + " PRIMARY KEY (id))", function (error){
            if (error) 
                console.error(colors.red(error));
            else{
                console.log("Table `gelati` created.".green);

                var query = "INSERT INTO gelati (nome, costo, produttore, descrizione, icon) VALUES ?";
                var values = [
                    ["Dada","320","GJX","Un gelato molto morbido al gusto di panna e fragola.","1"],
                    ["Verdodo","1200","GJX","Qualcosa che assomiglia ad un gelato verde e felice, molto raro e unico nel suo genere, mangiare con cautela.","2"],
                    ["Chococo","100","GJX","Cioccolato. Puro e magnifico CIOCCOLATO con un ripieno irresistibile alla panna piskiela.","3"],
                    ["Deadcream","9999","GJX","Messo in produzione già putrefatto, questo Gelajaxissimo non avrà pieta del vostro stomaco (tantomeno del vostro portafoglio).","4"],
                    ["FraCiliegio","10","GJJ","Il Fra Ciliegio è noto per il suo basso prezzo. Ad ogni modo non aspettettavi chissa quale miracolo.","5"],
                    ["CrimsonMentone","101","GJJ","Per quanto il nome possa ingannare, questo gelato è puro Mentone Made in Italy.","6"],
                    ["GNUTella","27","GJJ","Dal costo praticamente inaccessibile ai comuni mortali, il GNUTella garantisce vera nutella al vostro palato.","7"],
                    ["Panninna","333","GJJ","Ottimo soporifero, nato come calmante per donne, la Panninna può farti dormire anche anni, se non sei una figlia dell'amore.","8"],
                    ["KrazyASF","77","GJK","Pazzo sia di nome che di fatto, sto pezzo e' matto quasi come l'atto, che io so' fatto, e anche un po gatto.","9"],
                    ["Punkierro","666","GJK","Si narra che la menta di questo gelato sia in realta un'insieme di raggi gamma solidi provenienti nientemeno che dallo spazio.","10"],
                    ["TipoTimido","59","GJK","Come si puo' dedurre, questo Gelajaxxissimo non e' molto a suo agio in mezzo ai suoi simili. Comprare con moderazione.","11"],
                    ["Okice","99","GJK","Non vendibile senza prescrizione medica. Leggere attentamente il foglietto illustrativo. Tenere lontano dalla portata dei bambocci.","12"]
                ];
                //Execute the SQL statement, with the value array:
                conn_gelati.query(query, [values], function (err) {
                    if (error) 
                        console.error(colors.red(" " + error));
                    else
                        console.log("Table `gelati` filled.".green);
                });
            } 
        });
    }
});
   
conn_mysql.end();

/* VALIDATE DATA FOR SQL INJECTION */
function validate_data(icon, nome, cost, prod, desc){
    if (icon.search(/^[0-9]{1,2}$/) == -1 ||
        nome.search(/^[a-z]{1,25}$/i) == -1 ||
        cost.search(/^[0-9]{1,8}$/) == -1 ||
        prod.search(/^[a-z]{1,25}$/i) == -1 ||
        desc.search(/^[a-z0-9.,;:'\s]{1,255}$/i) == -1) 
        return false;
    return true;
}

/* QUERY SELECT GELATI */
function select_gelati(){
    conn_gelati.query('SELECT * FROM gelati', function (error, result){
        if (error) 
            console.error(colors.red(" " + error));
        else{
            console.log(" Table `gelati` sent.".green);
            gelati = result;
        } 
    });
}

/* QUERY SELECT GELATO */
function select_gelato(id){
    conn_gelati.query('SELECT * FROM gelati WHERE id=' + id, function (error, result){
        if (error) 
            console.error(colors.red(" " + error));
        else{
            console.log(colors.green(" Gelato `" + id + "` sent."));
            
            gelato = result;
        } 
    });
}

/* QUERY INSERT GELATO */
function insert_gelato(icon, nome, cost, prod, desc){
    conn_gelati.query("INSERT INTO gelati (nome, costo, produttore, descrizione, icon) VALUES ('" + nome + "', '" + cost + "', '" + prod + "', '" + desc + "', '" + icon + "')", function (error){
        if (error) 
            console.error(colors.red(" " + error));
        else
            console.log(colors.green(" Gelato `" + nome + "` added."));
    });
}

/* GET GELATI */
router.get("/gelati", encoded, function(req, res){
    console.log("\n INCOMING REQUEST:".cyan);
	console.log(" type: GET(gelati)");
    console.log(" url: " + req.headers.host + req.originalUrl);

    select_gelati();
    setTimeout(_=>res.send(gelati),600);
});

/* POST GELATO */
router.post("/gelato", encoded, function(req, res){
    var url = req.headers.host + req.originalUrl;
    var id = req.body.id;

    console.log("\n INCOMING REQUEST:".cyan);
	console.log(" type: POST(gelato)");
    console.log(" url: " + url);
    console.log(" id: " + id);
    
    if (id.toString().search(/^[0-9]{1,}$/) != -1){
        select_gelato(id);
        setTimeout(_=>res.send(gelato),600);
    }
    else{
        console.error(colors.red("WARNING: Potential SQL Injection detected. (" + url + ")"));
        res.sendStatus(406);
    }
});

/* POST GELATO */
router.post("/nuovogelato", encoded, function(req, res){
    var url = req.headers.host + req.originalUrl;
    var icon = req.body.icon;
    var nome = req.body.nome;
    var cost = req.body.costo;
    var prod = req.body.produttore;
    var desc = req.body.descrizione;
    console.log("\n INCOMING REQUEST:".cyan);
	console.log(" type: POST(nuovogelato)");
    console.log(" url: " + url);
    console.log(" icon: " + icon);
    console.log(" nome: " + nome);
    console.log(" costo: " + cost);
    console.log(" produttore: " + prod);
    console.log(" descrizione: " + desc);
    
    if (validate_data(icon, nome, cost, prod, desc)){
        insert_gelato(icon, nome, cost, prod, desc);
        res.sendStatus(201);
    }
    else{
        console.error(colors.red("WARNING: Potential SQL Injection detected. (" + url + ")"));
        res.sendStatus(406);
    }
});

app.use('/', router);
app.use(express.static(path.join(__dirname, 'client')));
server.listen(port, _=> console.log('[Gelajaxissimo]'.cyan + ' is running on localhost:' + port + ' or ' + ip.address() + ':' + port));