$( document ).ready(function() 
                    {
                      
                        $("#apply_filter_button").click(function()
                        {
                            $("#progress_test_apply_filter_button").html("Sending filters...");
                            $.ajax({
                                url: "http://192.168.197.43:81/im_test_7.pl",
                                dataType: "json",
                                type: "post",
                                data: 'command=filters&darjava=' + $("#darjava").val() +
                                        '&tip_jilishte=' + $("#tip_jilishte").val() +
                                        '&tip_sdelka=' + $("#tip_sdelka").val() +
                                        '&grad=' + $("#grad").val() +
                                        '&kvartal=' + $("#kvartal").val() +
                                        '&person=' + $('#person').is(':checked') +
                                        '&agency=' + $('#agency').is(':checked') +
                                        '&builder=' + $('#builder').is(':checked') +
                                        '&aroom=' + $('#aroom').is(':checked') + 
                                        '&a1room=' + $('#a1room').is(':checked') + 
                                        '&a2rooms=' + $('#a2rooms').is(':checked') + 
                                        '&a3rooms=' + $('#a3rooms').is(':checked') + 
                                        '&a4rooms=' + $('#a4rooms').is(':checked') + 
                                        '&multiplerooms=' + $('#multiplerooms').is(':checked') + 
                                        '&penthouse=' + $('#penthouse').is(':checked') +
                                        '&garage=' + $('#garage').is(':checked') +
                                        '&atelier=' + $('#atelier').is(':checked') +
                                        '&furnished=' + $('#furnished').is(':checked') +
                                        '&unfurnished=' + $('#unfurnished').is(':checked') +
                                        '&semifurnished=' + $('#semifurnished').is(':checked') +
                                        '&rents=' + $('#rents').val() +
                                        '&currency=' + $('#currency').val() +
                                        '&hardware_id=' + device.uuid,
                                async: true,
                                success: function(answer)
                                {
                                    /*
                                    if(answer.status === 'ok')
                                    {
                                        $("#progress_test_apply_filter_button").html("ok");
                                    }
                                    else
                                    {
                                        $("#progress_test_apply_filter_button").html(answer.msg);
                                    }*/
                                    
                                     $("#progress_test_apply_filter_button").html(answer.status_msg);
                                    var person_in = 0;
                                    if($('#person').is(':checked'))
                                    {
                                        person_in = 1;
                                    }
                                    
                                    var agency_in = 0;
                                    if($('#agency').is(':checked'))
                                    {
                                        agency_in = 1;        
                                    }
                                    
                                    var builder_in = 0;
                                    if($('#builder').is(':checked'))
                                    {
                                        builder_in = 1;
                                    }
                                    
                                    var aroom_in = 0;
                                    if($('#aroom').is(':checked'))
                                    {
                                        aroom_in = 1;
                                    }
                                    
                                    var a1room_in = 0;
                                    if($('#a1room').is(':checked'))
                                    {
                                        a1room_in = 1;
                                    }
                                    
                                    var a2rooms_in = 0;
                                    if($('#a2rooms').is(':checked'))
                                    {
                                        a2rooms_in = 1;    
                                    }
                                    
                                    var a3rooms_in = 0;
                                    if($('#a3rooms').is(':checked'))
                                    {
                                       a3rooms_in = 1;     
                                    }
                                    
                                    var a4rooms_in = 0;
                                    if($('#a4rooms').is(':checked'))
                                    {
                                        a4rooms_in = 1;    
                                    }
                                    
                                    var multiplerooms_in = 0;
                                    if($('#multiplerooms').is(':checked'))
                                    {
                                        multiplerooms_in = 1;
                                    }
                                    
                                    var penthouse_in = 0;
                                    if($('#penthouse').is(':checked'))
                                    {
                                         penthouse_in = 1;   
                                    }
                                    
                                    var garage_in = 0;
                                    if($('#garage').is(':checked'))
                                    {
                                        garage_in = 1;   
                                    }
                                    
                                    var atelier_in = 0;
                                    if($('#atelier').is(':checked'))
                                    {
                                         atelier_in = 1;   
                                    }
                                    
                                    var furnished_in = 0;
                                    if($('#furnished').is(':checked'))
                                    {
                                        furnished_in = 1;
                                    }
                                    
                                    var unfurnished_in = 0;
                                    if($('#unfurnished').is(':checked'))
                                    {
                                        unfurnished_in = 1;
                                    }
                                    
                                    var semifurnished_in = 0;
                                    if($('#semifurnished').is(':checked'))
                                    {
                                        semifurnished_in = 1;
                                    }
                           
                                    app.updateFilters($("#darjava").val(), $("#tip_jilishte").val(), $("#tip_sdelka").val(), $("#grad").val(),
                                                         $("#kvartal").val(), person_in, agency_in, builder_in, aroom_in, a1room_in, a2rooms_in,
                                                      a3rooms_in, a4rooms_in, multiplerooms_in, penthouse_in, garage_in, atelier_in, furnished_in,
                                                      unfurnished_in, semifurnished_in, $('#rents').val(), $('#currency').val(), answer.status_msg, 1); 
                                }
                            });
                        });
                    });