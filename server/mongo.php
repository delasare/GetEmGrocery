<?php
 

$user = "xxxxx";
$pass ="xxxxx";
// connect
$m = new Mongo("mongodb://".$user.":".$pass."@staff.mongohq.com:10017/getem");
//$m = new Mongo(); 
// select a database
$db = $m->getem;
// select a collection (analogous to a relational database's table)
$main_collection = $db->recipes;

$ingredients = array(
	array("name" => "Ground Beef","quantity" => "1lb.", "codes"=> array(array("code" => "1234567891", "code" => "9876543211")), "puzzles" => array(array("type"=>"riddle","source"=>""), array("type"=>"pictogram","source"=>""),  array("type"=>"jumble","source"=>"")), "protein"=>"true", "type"=> "meat", "feedback"=>""),
	
	array("name" => "Black Beans","quantity" => "1 Can", "codes"=> array(array("code" => "1234567891", "code" => "9876543211")), "puzzles" => array(array("type"=>"riddle","source"=>""), array("type"=>"pictogram","source"=>""),  array("type"=>"jumble","source"=>"")), "protein"=>"true", "type"=> "veggie", "feedback"=>""),
	
	array("name" => "Taco Seasoning","quantity" => "1 Package", "codes" => array(array("code"=>"1111111111")),"puzzles" => array(array("type"=>"riddle","source"=>"clue_tacoSeasoning.png"), array("type"=>"pictogram","source"=>""),  array("type"=>"jumble","source"=>"")), "feedback"=>"You're becoming a seasoned veteran!"),
	
	array("name" => "Cream Cheese","quantity" => "4oz.", "codes"=> array(array("code"=>"2222222222")), "puzzles" => array(array("type"=>"riddle","source"=>"clue_creamCheese2.png"), array("type"=>"pictogram","source"=>"clue_creamCheese.png", "hints"=> array("hint_creamCheese1.png","hint_creamCheese3.png","hint_creamCheese3.png")),  array("type"=>"jumble","source"=>"")), "feedback"=>"Smooth!"),
	
	array("name" => "Jumbo Pasta Shells","quantity" => "14-16", "codes"=> array(array("code"=>"3333333333")), "puzzles" => array(array("type"=>"riddle","source"=>""), array("type"=>"pictogram","source"=>"clue_pastaShells.png", "hints"=>array("hint_pastaShells1.png","hint_pastaShells2.png","hint_pastaShells3.png")),  array("type"=>"jumble","source"=>"")), "feedback"=>"Jump for joy!"),
	
	array("name" => "Salsa","quantity" => "1/2 Cup", "codes"=> array(array("code"=>"4444444444")), "puzzles" => array(array("type"=>"riddle","source"=>"clue_salsa.png"), array("type"=>"pictogram","source"=>""),  array("type"=>"jumble","source"=>"")), "feedback"=>"Caliente!"),
	
	array("name" => "Taco Sauce","quantity" => "1 Cup", "codes"=> array(array("code" =>"5555555555")), "puzzles" => array(array("type"=>"riddle","source"=>""), array("type"=>"pictogram","source"=>""),  array("type"=>"jumble","source"=>"clue_tacoSauce.png", "hints"=>array("hint_tacoSauce1.png","hint_tacoSauce2.png","hint_tacoSauce3.png"))), "feedback"=>"You're saucy!"),
	
	array("name" => "Cheddar Cheese","quantity" => "1 Cup", "codes"=> array(array("code" =>"6666666666")), "puzzles" => array(array("type"=>"riddle","source"=>"clue_cheddarCheese.png"), array("type"=>"pictogram",""),  array("type"=>"jumble","source"=>"")), "feedback"=>"You're Sharp!"),
	
	array("name" => "Monteray Jack Cheese","quantity" => "1 Cup", "codes"=> array(array("code" =>"7777777777")), "puzzles" => array(array("type"=>"riddle","source"=>"",), 
	array("type"=>"pictogram","source"=>""),  array("type"=>"jumble","source"=>"clue_montJackCheese.png", "hints"=>array("hint_montJackCheese1.png","hint_montJackCheese2.png","montJackCheese3.png"))), "feedback"=>"You're Shredding Now!"),
	
	array("name" => "Scallions","quantity" => "3", "codes" => array(array("code"=>"1212")), "puzzles" => array(array("type"=>"riddle","source"=>"",), array("type"=>"pictogram","source"=>"clue_greenOnions.png", "hints"=>array("hint_greenOnions1.png","hint_greenOnions2.png","hint_greenOnions3.png")),  array("type"=>"jumble","source"=>"")), "feedback"=>"That's fresh!"),
	
	array("name" => "Sour Cream","quantity" => "8oz.", "codes"=>array(array("code"=>"8888888888")), "puzzles" => array(array("type"=>"riddle","source"=>"",), array("type"=>"pictogram","source"=>""),  array("type"=>"jumble","source"=>"clue_sourCream.png", "hints"=>array("hint_sourCream1.png","hint_sourCream2.png","hint_sourCream3.png"))), "feedback"=>"I scream, You scream, We ALL scream for sour cream!"),
);

// add a record
$obj = array( "title" => "Mexican Stuffed Shells",
 			   "description" => "A Succulent Mexican Take on an Italian Classic",
			   "ingredients" => $ingredients,
			   "instructions" => "Preheat oven to 350 degrees<br />In a frying pan cook ground beef; add taco seasoning and prepare according to package directions.  Add cream cheese, cover and simmer until cheese is melted. Blend well. Set aside and cool completely.  While ground beef is cooking, cook the pasta shells according to directions; drain. Set shells out individually on cutting board/baking sheet so that they don't stick together.<br />Pour salsa on bottom of 9 x 13 baking dish.  Stuff each shell with the meat mixture. Place shells in 9 x 13 pan open side up. Cover shells with taco sauce.  Cover with foil and bake for 30 minutes.<br />After 30 minutes, add shredded cheese and bake for 10-15 more minutes, with the foil removed.  Top with any condiments you'd like (green onions, black olives, etc.) Serve with sour cream and/or more salsa."
 );

$main_collection->insert($obj, true);
$cursor = $main_collection->find();
// iterate through the results
foreach ($cursor as $obj) {
    
	var_dump($obj);
	
}



 
?>