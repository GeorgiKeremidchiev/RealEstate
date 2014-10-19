$( document ).ready(function() 
                    {
                        $("#filters_href").click(function()
                         {
                             $("#filters_href_li").attr("class", "active");
                             $("#home_href_li").removeClass("active");
                             $("#status_href_li").removeClass("active");
                             
                             $("#content_holder").hide();
                             $("#filter_holder").show(); 
                             $("#status_holder").hide();
                             
                             app.loadFilters();
                         });
                        
                        $("#home_href_li").click(function()
                         {
                             $("#filters_href_li").removeClass("active");
                             $("#home_href_li").attr("class", "active");
                             $("#status_href_li").removeClass("active");
                             
                             $("#content_holder").show();
                             $("#filter_holder").hide();
                             $("#status_holder").hide();
                             
                             loadData();
                         });
                        
                         $("#status_href_li").click(function()
                         {
                             $("#filters_href_li").removeClass("active");
                             $("#home_href_li").removeClass("active");
                             $("#status_href_li").attr("class", "active");
                             
                             $("#content_holder").hide();
                             $("#filter_holder").hide();
                             $("#status_holder").show();
                         });
                        
                        $("#content_holder").show();
                        $("#filter_holder").hide();
                        $("#status_holder").hide();
                    });
