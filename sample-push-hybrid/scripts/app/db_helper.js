app.db = null;

app.openDb = function () {
    if (window.navigator.simulator === true || window.sqlitePlugin === undefined) {
        // For debugin in simulator fallback to native SQL Lite
        console.log("Use built in SQL Lite");
        app.db = window.openDatabase("Todo22", "1.0", "Cordova Demo", 200000);
    } else        
    {
        app.db = window.sqlitePlugin.openDatabase("Todo22");
    }
}
var isCreateTableCalled = false;
app.createTable = function () {
    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS imoti(ID INTEGER PRIMARY KEY ASC, IMG_URL TEXT NOT NULL, DESCR TEXT NOT NULL, URL_DESCR TEXT NOT NULL, IS_OPENED INT DEFAULT 0, IMAGE_WIDTH INT NOT NULL, IMAGE_HEIGHT INT NOT NULL, M_ID INT NOT NULL, UNIQUE (M_ID) ON CONFLICT REPLACE);", []);
        tx.executeSql("CREATE TABLE IF NOT EXISTS filters("
                          + "ID INTEGER PRIMARY KEY ASC, "
                          + "DARJAVA TEXT NOT NULL DEFAULT 'Bulgaria', "
                          + "TIP_JILISHTE TEXT NOT NULL DEFAULT 'apartament', "
                          + "TIP_SDELKA TEXT NOT NULL DEFAULT 'rent', "
                          + "GRAD TEXT NOT NULL DEFAULT 'Sofia', "
                          + "KVARTAL TEXT NOT NULL DEFAULT 'allquarters', "
                          + "PERSON INT NOT NULL DEFAULT '1', "
                          + "AGENCY INT NOT NULL DEFAULT '1', "
                          + "BUILDER INT NOT NULL DEFAULT '1', "
                          + "AROOM INT NOT NULL DEFAULT '0', "
                          + "A1ROOM INT NOT NULL DEFAULT '0', "
                          + "A2ROOMS INT NOT NULL DEFAULT '0', "
                          + "A3ROOMS INT NOT NULL DEFAULT '0', "
                          + "A4ROOMS INT NOT NULL DEFAULT '0', "
                          + "MULTIPLEROOMS INT NOT NULL DEFAULT '0', "
                          + "PENTHOUSE INT NOT NULL DEFAULT '0', "
                          + "GARAGE INT NOT NULL DEFAULT '0', "
                          + "ATELIER INT NOT NULL DEFAULT '0', "
                          + "FURNISHED INT NOT NULL DEFAULT '0', "
                          + "UNFURNISHED INT NOT NULL DEFAULT '0', "
                          + "SEMIFURNISHED INT NOT NULL DEFAULT '0', "
                          + "RENTS TEXT NOT NULL DEFAULT 'allrents', "
                          + "CURRENCY TEXT NOT NULL DEFAULT 'EURO', "
                          + "SERVER_UPDATE_TEXT TEXT NOT NULL DEFAULT 'Config and apply filters.', "
                          + "IS_SERVER_UPDATED INT NOT NULL DEFAULT '0'"
                          + ");", []);
        tx.executeSql("INSERT INTO filters (IS_SERVER_UPDATED) values(0);");
    });
    
    isCreateTableCalled = true;
}

app.updateFilters = function(darjava, tip_jilishte, tip_sdelka, grad, kvartal, person, agency, builder,aroom,a1room,a2rooms,a3rooms,a4rooms,multiplerooms,penthouse,garage,atelier,furnished,unfurnished,semifurnished,rents,currency,server_update_text,is_server_updated)
{
   var db = app.db;
    db.transaction(function (tx) 
     {
         tx.executeSql("update filters SET darjava = ?, tip_jilishte = ?, tip_sdelka = ?, "
                       + " grad = ?, kvartal = ?, person = ?, agency = ?, builder = ?, "
                       + " aroom = ?, a1room = ? , a2rooms = ?, a3rooms = ? , a4rooms = ?,"
                       + " multiplerooms = ?, penthouse = ?, garage = ?, atelier = ?, furnished = ?,"
                       + " unfurnished = ?, semifurnished = ?, rents = ?, currency = ?, "
                       + " server_update_text = ?, is_server_updated = ? ",
                       [darjava, tip_jilishte, tip_sdelka, grad, kvartal, person, agency, builder,aroom,a1room,a2rooms,a3rooms,a4rooms,multiplerooms,penthouse,garage,atelier,furnished,unfurnished,semifurnished,rents,currency,server_update_text,is_server_updated],
                      app.onSuccessFilters,
            app.onEventFilters)
                       
     });
}

app.onEventFilters = function (tx, e) {
    alert("Error: " + e.message);
    
}

app.onSuccessFilters = function (tx, r) {
    //alert("Success");
}


app.addImot = function (img_url, descr, url_descr, image_width, image_height, m_id) {
    var db = app.db;
    db.transaction(function (tx) {
        //var addedOn = new Date();
        tx.executeSql("INSERT INTO imoti(img_url, descr, url_descr, image_width, image_height, m_id) VALUES (?,?,?,?,?,?)", [img_url, descr, url_descr, image_width, image_height, m_id],
            app.onSuccess,
            app.onError);
    });
}

app.onError = function (tx, e) {
  alert("Error: " + e.message);
    
}

app.onSuccess = function (tx, r) {
    app.loadImoti();
}

app.deleteTodo = function (id) {
    //	var db = app.db;
    //	db.transaction(function(tx) {
    //		tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
    //					  app.onSuccess,
    //					  app.onError);
    //	});
}

app.deleteImot = function(m_id)
{
    var db = app.db;
    db.transaction(function(tx) 
                   {
                        db.transaction(function(tx) 
                                       {
                                           tx.executeSql("DELETE FROM imoti WHERE M_ID=?", [m_id],
                                               app.loadImoti,
                                               app.onError);        
                                       });
                   });
}

app.refresh = function () {
    /*	var renderTodo = function (row) {
		return "<li>" + "<div class='todo-check'></div>" + row.todo + "<a class='button delete' href='javascript:void(0);'  onclick='app.deleteTodo(" + row.ID + ");'><p class='todo-delete'></p></a>" + "<div class='clear'></div>" + "</li>";
	}
    
	var render = function (tx, rs) {
		var rowOutput = "";
		var todoItems = document.getElementById("todoItems");
		for (var i = 0; i < rs.rows.length; i++) {
			rowOutput += renderTodo(rs.rows.item(i));
		}
      
		todoItems.innerHTML = rowOutput;
	}
    
	var db = app.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo", [], 
					  render, 
					  app.onError);
	});
    */
}

app.selectAll = function () {
    var render = function (tx, rs) {
        //alert(rs.rows.length);
        for (var i = 0; i < rs.rows.length; i++) {
            alert(rs.rows.item(i).ID + "<>" + rs.rows.item(i).IMG_URL + "<>" + rs.rows.item(i).URL_DESCR);
        }
    }

    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM imoti ORDER BY ID", [],
            render,
            app.onError);
    });
}

app.loadFilters = function()
{
    var render = function (tx, rs) 
    {
       $('#darjava').val( rs.rows.item(0).DARJAVA );
       $('#tip_jilishte').val( rs.rows.item(0).TIP_JILISHTE );
       $('#tip_sdelka').val( rs.rows.item(0).TIP_SDELKA );
       $('#grad').val( rs.rows.item(0).GRAD );
       $('#kvartal').val( rs.rows.item(0).KVARTAL);
        
       $('#person').attr("checked",  rs.rows.item(0).PERSON); 
       $('#agency').attr("checked",  rs.rows.item(0).AGENCY); 
       $('#builder').attr("checked",  rs.rows.item(0).BUILDER); 
       $('#aroom').attr("checked",  rs.rows.item(0).AROOM); 
       $('#a1room').attr("checked",  rs.rows.item(0).A1ROOM); 
        $('#a2rooms').attr("checked",  rs.rows.item(0).A2ROOMS); 
        $('#a3room').attr("checked",  rs.rows.item(0).A3ROOMS); 
        $('#a4room').attr("checked",  rs.rows.item(0).A4ROOMS); 
        $('#multiplerooms').attr("checked",  rs.rows.item(0).MULTIPLEROOMS); 
        $('#penthouse').attr("checked",  rs.rows.item(0).PENTHOUSE); 
        $('#garage').attr("checked",  rs.rows.item(0).GARAGE); 
        $('#atelier').attr("checked",  rs.rows.item(0).ATELIER); 
        $('#furnished').attr("checked",  rs.rows.item(0).FURNISHED); 
        $('#unfurnished').attr("checked",  rs.rows.item(0).UNFURNISHED);
        $('#semifurnished').attr("checked",  rs.rows.item(0).SEMIFURNISHED);
        
       $('#rents').val( rs.rows.item(0).RENTS );
       $('#currency').val( rs.rows.item(0).CURRENCY );
       $('#progress_test_apply_filter_button').html( rs.rows.item(0).SERVER_UPDATE_TEXT );
    }
    
   var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM filters", [],
            render,
            app.onError);
    }); 
}

//da se izvikva samo v document ready, zashtoto zarejda
//sadarjanieto v div, koito triabva da e zareden
app.loadImoti = function () {

    if(!isCreateTableCalled)
    {
        init_db_helper();
    }
    
   var render = function (tx, rs) {
        
        if (rs.rows.length > 0) 
        { 
            var innerHTML = '<table class="table">';
            for (var i = 0; i < rs.rows.length; i++) {
                innerHTML += "<tr>";
                innerHTML += '<td ><img width="' +  rs.rows.item(i).IMAGE_WIDTH
                                                + '" height = "' +  rs.rows.item(i).IMAGE_HEIGHT 
                                                + '" src="' + rs.rows.item(i).IMG_URL + '"/></td>';
                innerHTML += '<td>';
                
                var myHref = '<a href="' + rs.rows.item(i).URL_DESCR + '">' + rs.rows.item(i).DESCR + '</a>';
                innerHTML += myHref;
                /*
                if(rs.rows.item(i).IS_OPENED == 0)
                {
                    innerHTML += "<b>" + myHref + "</b>";
                }
                else
                {
                    innerHTML += myHref;
                }
                */
                
                innerHTML += "</td>";
                //innerHTML += "<td>" + rs.rows.item(i).URL_DESCR + "</td>";
                innerHTML += "</tr>";
            }
            innerHTML += '</table>';
            $("#content_holder").html(innerHTML);
        }
        else
        {
            if($("#content_holder").html().length > 100)
            {
                $("#content_holder").html("No ads.");
            }
        }

        
    }

    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM imoti ORDER BY M_ID DESC", [],
            render,
            app.onError);
    });
}

app.getMaxMID = function()
{
    if(!isCreateTableCalled)
    {
        init_db_helper();
    }
    
/*    var render = function (tx, rs) 
    {
        if (rs.rows.length > 0) 
        {
            return rs.rows.item(0).MAX_M_ID;
        }
        else
        {
            return 0;
        }
    }*/

    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM imoti ORDER BY M_ID DESC LIMIT 1", [],
            app.myrender,
            app.onError);
    });
}

function init_db_helper() {
    //navigator.splashscreen.hide();
    app.openDb();
    app.createTable();
    //app.addImot("test1","test2","test3");
    //app.selectAll();
    //alert("init finished");
    //app.refresh();
}
init_db_helper();
/*
function addTodo() {
	var todo = document.getElementById("todo");
	app.addTodo(todo.value);
	todo.value = "";
}*/