
	var myScroll;
	var fullRecipeScroll;
    var newGame;
$(document).ready(function() {
        setTimeout(function () {
			myScroll = new iScroll('scrollWrapper', {checkDOMChange:false});
		}, 100);
			setTimeout(function () {
			fullRecipeScroll = new iScroll('recipeScrollWrapper', {checkDOMChange:false});
		}, 100);
				  
		var screenHeight = $(window).height();
		$("#recipeScrollWrapper, #scrollWrapper").css("height", screenHeight);
				  
	
	    // set starting varibales
        //CHECK REWARD
        if(localStorage.getItem("reward") == null)
        {
            localStorage.setItem("reward", "");
        }else{
            //alert("REWARD IS " + localStorage.getItem("reward"));
        }
        //CHECK PROTEIN          
        if(localStorage.getItem("protien") == null)
        {
            localStorage.setItem("protein", "");
        }else{
            //alert("PROTEIN IS " + localStorage.getItem("protein"));      
        }
        //CHECK SOLVED          
        //localStorage.setItem("totalClues", "7");
        if(localStorage.getItem("solved") == null)
        {
           localStorage.setItem("solved", "0");    
        }else{
           //alert("YOU HAVE SOLVED " + localStorage.getItem("solved"));
		}
        
		//CHECK RECIPE
        if(localStorage.getItem("recipe") == null)
        {
            $.ajax({
                type: "GET",
                timeout: 20000,
                url:   "http://23.21.149.97/grocery/getRecipe.php?recipes=true&format=json",
                contentType: "application/json",
                dataType: "json",
                success: function(data) 
                {
                   console.log(data.recipes[0]);
                   localStorage.setItem("recipe", JSON.stringify(data.recipes[0]));
                   newGame = true;
                },
                error: function()
                {
                   alert("Could not retrieve recipe");
                }
            });
        }else{
            
            newGame = false;
        }
				  
				  
	
		$(".btn").live("touchstart", function(e) {
			var imgSrc = $(this).attr("src");
			imgSrc = imgSrc.replace("btn_", "down_");
			$(this).attr("src", imgSrc);
		});
				  
	
	
	// --------------------- WELCOME BUTTONS ----------------------- //	
	
		$("#titleGoBtn").bind("touchend", function(){
            if(newGame == true){
                jQT.goTo('#welcome', 'slideleft'); 
                              
            }else{
                //alert(localStorage.getItem("complete")); 
                if(localStorage.getItem("complete") != "true"){
                    View_Recipe();
                 }else if(localStorage.getItem("complete") == "true" && localStorage.getItem("redeemed") == "true"){
                    $("#redeem2Btn").attr("src", "img/btn_redeemSq_disabled.png"); 
                    $("#redeem2Btn").unbind("touchend");
                    View_Full_Recipe();
                }else{
                    View_Full_Recipe();          
                }
                  
            }
			$(this).attr("src", "img/btn_playGG.png");	
		
		});
		
		$("#playBtn").bind("touchend", function(){
			jQT.goTo('#selectReward', 'slideleft');
			$(this).attr("src", "img/btn_getem.png");	
		});

		
	// --------------------- CHOOSE REWARD ----------------------- //
		$("#donateBtn").bind("touchend", function(){
            localStorage.setItem("reward", "donate");
			$("#redeemIcon").attr("src", "img/icon_redeemDonate.png");
			jQT.goTo('#selectProtein', 'slideleft');
			$(this).attr("src", "img/btn_donate.png");
        });
		
		$("#couponBtn").bind("touchend", function(){
            localStorage.setItem("reward", "coupon");
			$("#redeemIcon").attr("src", "img/icon_redeemCoupon.png");
			jQT.goTo('#selectProtein', 'slideleft');
			$(this).attr("src", "img/btn_coupon.png");
        });
		
		
		
  // --------------------- CHOOSE PROTEIN ----------------------- //
                        
		$("#meatBtn").bind("touchend", function(){
            localStorage.setItem("protein", "meat");     
            protein_select("meat");
            jQT.goTo("#directions", 'slideleft');
			$(this).attr("src", "img/btn_meat.png");
        });
		
		$("#veggieBtn").bind("touchend", function(){
            localStorage.setItem("protein", "veggie");
            protein_select("veggie");
            jQT.goTo("#directions", 'slideleft');
			$(this).attr("src", "img/btn_veggie.png");
        });
                

  // --------------------- START GAME ----------------------- //
                  
        $("#startBtn").bind("touchend", function(){
            View_Recipe();
			$(this).attr("src", "img/btn_getem.png");
        });
		
	
  // --------------------- VIEW CLUES  ----------------------- //
  
  
	   $(".clueBtn").live("touchend", function(){
						  
		//alert("clue btn");
          var clueNum = $(this).attr("id");
           clueNum = clueNum.replace('clue','');
          // alert(clueNum+" --clue");
		   Select_Ingredient_By_Index(clueNum);
		   $(this).attr("src", "img/btn_clue.png");
        })
                  
        $("#notNowBtn").bind("touchend", function(){
           $(this).attr("src", "img/btn_notNow.png");
            jQT.goTo("#recipe", "slideright");
            myScroll.scrollTo(0, 0);
            
        });

		$("#solveBtn").bind("touchend", function(){
           jQT.goTo("#selectSolve", "slideleft");
		   $(this).attr("src", "img/btn_solve.png");
		});
			
				  
  // --------------------- VIEW CLUES  ----------------------- //
				  
		$("#solveCancelBtn").bind("touchend", function(){
			jQT.goBack("#clue");
			 $(this).attr("src", "img/btn_cancel.png");
		});
				  
		$("#solveScanBtn").bind("touchend", function(){
			scan_barcode();
			 $(this).attr("src", "img/btn_scan.png");
		});
		
		$("#solvePluBtn").bind("touchend", function(){
			jQT.goTo("#solvePlu", "slideleft");
			 $(this).attr("src", "img/btn_plu.png");
		});
				  
				  
  // --------------------- CLUE FEEDBACK  ----------------------- //

		$("#cartItBtn").bind("touchend", function(){
			Cart_It();
			$(this).attr("src", "img/btn_cartIt.png");
		});	
			
	   $("#getHintBtn").bind("touchend", function(){
		    View_Hint();
			$(this).attr("src", "img/btn_getHint.png");
		});			  

		
		
  // --------------------- ENTER PLU NUMBER  ----------------------- //
		
	   $("#pluCancelBtn").bind("touchend", function(){
			jQT.goBack('#selectSolve');
			$(this).attr("src", "img/btn_pluCancel.png");
		});
				  
	   $("#pluEnterBtn").bind("touchend", function(){
			Solve_PLU();
			$(this).attr("src", "img/btn_pluEnter.png");
		});
		
		$(".pluNumBtn").bind("touchend", function(){
			
			//get total number of characters from #pluField
			var charTotal = $("#pluField").text().length;
			// get id from btn
			var numBtn = $(this).attr("id");
			// strip off plu-
			numBtn = numBtn.replace('plu-','');
			// if there are less than 4 characters in the #pluField
			if(charTotal < 4) {
			   // add that number to #pluField
				$("#pluField").append(numBtn);
			}
			$(this).attr("src", "img/btn_plu"+numBtn+".png");
        });
		
		$("#pluDeleteBtn").bind("touchend", function(){
			// get what's currenly in the #pluField
			var pluNum = $("#pluField").text();
			// slice off the last number
			pluNum = pluNum.slice(0,-1);
			// display the new number
			$("#pluField").html(pluNum);
			$(this).attr("src", "img/btn_pluDelete.png");
		});

		$("#pluCancelBtn").bind("touchend", function(){
			$("#pluField").html("");
            jQT.goBack('#selectSolve');
			$(this).attr("src", "img/btn_pluCancel.png");
		});
                  
        $("#pluInfoBtn").bind("touchend", function(){
           jQT.goTo('#pluInfo', 'slideleft');
		   $(this).attr("src", "img/btn_pluInfo.png");
        });
                  
                  
       $("#infoBackBtn").bind("touchend", function(){
            jQT.goBack('#solvePlu');
		    $(this).attr("src", "img/btn_pluSolve.png");
        });
				  
				  
// --------------------- FINISHED FINDING REWARD SCREEN  ----------------------- //	
				  
		$("#redeemNowBtn").bind("touchend", function(){
                                if(localStorage.getItem("reward") == "donate")
                                {
                                $("#redeemIcon").attr("src","img/icon_redeemDonate.png");
                                
                                }else if(localStorage.getItem("reward") == "coupon"){
                                $("#redeemIcon").attr("src","img/icon_redeemDonate.png");              
                                
                                }
			jQT.goTo('#redeem', 'slideleft');
		     $(this).attr("src", "img/btn_redeemNow.png");
		});
				  
		$("#viewRecipeBtn").bind("touchend", function(){
			View_Full_Recipe()
			 $(this).attr("src", "img/btn_viewRecipe.png");
		});

// --------------------- FINISHED FINDING REWARD SCREEN  ----------------------- //	
				
		$("#emailBtn").bind("touchend", function(){
			jQT.goTo('#email', 'slideleft');
		    $(this).attr("src", "img/btn_emailRecipe.png");
        });
				  
		$("#redeem2Btn").bind("touchend", function(){
			jQT.goTo('#redeem', 'slideleft');
                              if(localStorage.getItem("reward") == "donate")
                              {
                              $("#redeemIcon").attr("src","img/icon_redeemDonate.png");
                                                    
                                }else if(localStorage.getItem("reward") == "coupon"){
                                                    $("#redeemIcon").attr("src","img/icon_redeemDonate.png");              
                                                                          
                               }              
			$(this).attr("src", "img/btn_redeemSq.png");
		});


// --------------------- SEND EMAIL SCREEN  ----------------------- //
		$("#cancelEmailBtn").bind("touchend", function(){
			jQT.goBack('#fullRecipe');
			$(this).attr("src", "img/btn_emailCancel.png");
		});
				  
		$("#submitEmail").bind("touchend", function(){
			//send recipe to email address
			$(this).attr("src", "img/btn_sendEmail.png");
            window.plugins.emailComposer.showEmailComposerWithCB(email_sent, "Your GetEmGrocery Recipe", format_email(), $("#emailAddrs").val(),"","",true); 

                               
		});
                  
		
// --------------------- CLICK REDEEM NOW ON COUPON SCREEN  ----------------------- //	
		
        $("#redeemNow2Btn").bind("touchend", function(){
           /* $("#redeemCode").show();
			$(".redeemStep1, #redeem2Btn").hide();
			$(".redeemStep2").show();*/
            $("#redeem2Btn").attr("src", "img/btn_redeemSq_disabled.png"); 
			$("#redeem2Btn").removeClass("btn");
            $("#redeem2Btn").unbind("touchend");
			localStorage.setItem("redeemed","true");
            View_Full_Recipe();
			$(this).attr("src", "img/btn_redeemFinal.png");
            
		});
				  
	    $("#redeemLaterBtn").bind("touchend", function(){
			localStorage.setItem("redeemed","false");
            jQT.goBack('#fullRecipe');
			$(this).attr("src", "img/btn_redeemLater.png");
		});
		

// ----- end on ready
});

protein_select = function(type) {
    var recipe = JSON.parse(localStorage.getItem("recipe"));
    var pared_ingredients = [];
    var clue_count = 0;
    for(var i = 0; i < recipe.ingredients.length; i++)
    {
        //alert("evaluating ingredient :"+recipe.ingredients[i].protein);
        if(recipe.ingredients[i].protein || recipe.ingredients[i].protein == "true")
        {
            if(recipe.ingredients[i].type == type)
                pared_ingredients.push(recipe.ingredients[i]);
        } else
        {
            pared_ingredients.push(recipe.ingredients[i]);
            clue_count++;
        }
    }
    recipe.ingredients = pared_ingredients;
    localStorage.setItem("recipe", JSON.stringify(recipe));
    localStorage.setItem("totalClues", clue_count);
}


View_Recipe = function()
{
	
    var recipe = JSON.parse(localStorage.getItem("recipe"));
    console.log(recipe);
	var compiled_template = _.template($("#tmpl-recipe").html(), {recipe: recipe});
	$("#recipeList").html(compiled_template);
	setTimeout(function(){myScroll.refresh()},100);
    jQT.goTo("#recipe", "slideleft");
}

View_Puzzle = function(puzzle)
{
    console.log(puzzle);
    $("#clueImage").attr("src", "img/"+puzzle.source).one("load",function(){
	
	//vertically center clues
		// get height of #centerClues
		var vMid = $("#centerClues").height();
		// subtract that num from 325 (height of #clueArea) & devide by 2
		vMid = 325-vMid;
		vMid = vMid/2;
		// set that num as margin-top of #centerClues
		$("#centerClues").css("margin-top", vMid+"px");
	});
	
    jQT.goTo("#clue", "slideleft");
}

View_Hint = function()
{
    var recipe = JSON.parse(localStorage.getItem("recipe"));
    var ingredient = recipe.ingredients[selected_ingredient_index];
    var puzzle;
    for(var i = 0; i < ingredient.puzzles.length; i++)
    {
        puzzle = ingredient.puzzles[i];
        if(puzzle.source != "")
            break;
    }
    
    //There may not be any hints at all. Screw it and just go back to the clue
    if(puzzle.hints == undefined || puzzle.hints.length == 0)
        jQT.goTo("#clue", "slideleft");
    
    if( puzzle.hint_index == undefined )
        puzzle.hint_index = 0;
    else
        puzzle.hint_index++;
    
    puzzle.hint_index = Math.min(puzzle.hints.length - 1, puzzle.hint_index);
    
    if( puzzle.hints.length > 0 )
    {
        $("#clueImage").attr("src", "img/"+puzzle.hints[puzzle.hint_index]).one("load",function(){
                   //vertically center clues
                   // get height of #centerClues
                   var vMid = $("#centerClues").height();
                   // subtract that num from 325 (height of #clueArea) & devide by 2
                   vMid = 325-vMid;
                   vMid = vMid/2;
                   // set that num as margin-top of #centerClues
                  $("#centerClues").css("margin-top", vMid+"px");
        });

        localStorage.setItem("recipe", JSON.stringify(recipe));
        jQT.goTo("#clue", "slideleft");
    }
}

View_Feedback = function()
{
    var recipe = JSON.parse(localStorage.getItem("recipe"));
    var feedback_text = recipe.ingredients[selected_ingredient_index].feedback;
    $("#clueFeedback").text(feedback_text);
    
    //vertically center feedback text
    var vFbk = $("#clueFeedback").height();
    vFbk = 325-vFbk;
    vFbk = vFbk/2;
    $("#clueFeedback").css("margin-top", vFbk+"px");
    
    jQT.goTo("#clueSuccess", "slideleft");
}

Cart_It = function()
{
    var solved = localStorage.getItem("solved");
    localStorage.setItem("solved", ++solved);
    if(solved >= localStorage.getItem("totalClues")){
        localStorage.setItem("complete", "true");
        View_Reward();
    }else{
        View_Recipe();
    }
}

View_Reward = function()
{
    var recipe = JSON.parse(localStorage.getItem("recipe"));
    $("#recipeName").text(recipe.title);
    jQT.goTo("#reward", "slideleft");
}

View_Full_Recipe = function()
{	
    var recipe = JSON.parse(localStorage.getItem("recipe"));
    console.log(recipe);
	var compiled_template = _.template($("#tmpl-recipe-complete").html(), {recipe: recipe});
    
    $("#fullRecipeTitle").html(recipe.title);
    $("#fullRecipeList").html(compiled_template);
    $("#fullRecipeTxt").html(recipe.instructions);
    $("#fullRecipeCredit").html("Recipe Credit: <a href='#' ontouchend='openBrowser(\""+ recipe.credit_url+"\");'>"+recipe.credit+"</a>");
    setTimeout(function(){fullRecipeScroll.refresh()},100);
    jQT.goTo("#fullRecipe", "slideleft");
}

format_email = function()
{
    var recipe = JSON.parse(localStorage.getItem("recipe"));
	var compiled_template = _.template($("#tmpl-recipe-complete").html(), {recipe: recipe});
    var full = "<strong>"+recipe.title +"</strong><br />"+ compiled_template +"<br /><strong>Directions</strong><br />";
    full += recipe.instructions;
    full += "<br /><br />Recipe Credit: <a href='"+recipe.credit_url+"'>"+recipe.credit+"</a>";
    
    return full;
}

email_sent = function()
{
    jQT.goBack("#recipe");
}

