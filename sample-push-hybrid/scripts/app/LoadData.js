/*
$( document ).ready(function() 
                    {
                        $("#content_holder").html("Connecting to server and trying to get new ads...");
                        app.myrender = function(tx, rs)
                        {   
                            var lastMID = 0;
                            
                            if(rs.rows.length > 0)
                            {
                                lastMID = rs.rows.item(0).M_ID;
                            }
                                 alert(device.uuid);                   
                            $.ajax({
                                url: "http://192.168.197.43:81/im_test_7.pl?command=hello&lastMID=" + lastMID,
                                dataType: "json",
                                async: true,
                                success: function(answer)
                                {
                                    if(answer.status === "ok")
                                    {
                                        for(var i = 0; i < answer.msgs.length; i++)
                                        {
                                            app.addImot(answer.msgs[i].image_url, 
                                                        answer.msgs[i].title,
                                                        answer.msgs[i].page_url,
                                                        answer.msgs[i].image_width,
                                                        answer.msgs[i].image_height,
                                                        answer.msgs[i].m_id
                                                       );
                                        }   
                                        
                                         $("#content_holder").html("Server was checked for new ads.");
                                    }
                                }
                                ,
                                error: function(answer)
                                {  }
                            });
                            
                            app.loadImoti();
                        }
                        
                        app.getMaxMID();
                    });
*/


function loadData()
{
   $("#content_holder").html("Connecting to server and trying to get new ads...");                         
   app.getMaxMID();
}
