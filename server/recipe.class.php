<?php
class RecipeHandler
{
    protected $options;
    
    function __construct($options=null) {
        $this->options = array();
    }
    
    public function get() {
       
 		/* grab the variable or set our own */
		$format = strtolower($_GET['format']) == 'json' ? 'json' : 'xml'; //xml is the default
		//$item_id = intval($_GET['recipes']); //no default

		$user = "xxxxx";
		$pass ="xxxxx";
		// connect
		$m = new Mongo("mongodb://".$user.":".$pass."@staff.mongohq.com:10017/getem");
		// select a database
		$db = $m->getem;
		// select a collection (analogous to a relational database's table)
		$main_collection = $db->recipes;
		// find everything in the collection
		$cursor = $main_collection->find();
		// iterate through the results
		$recipes = array();
		foreach ($cursor as $obj) {
			$recipes[] = $obj;
		}
		
		if($format == 'json') {
			header('Content-type: application/json');
			echo json_encode(array('recipes'=>$recipes));
		}
    }
    
    public function post() {
        /* grab the variable or set our own */
		$format = strtolower($_POST['format']) == 'json' ? 'json' : 'xml'; //xml is the default
			$user = "xxxxx";
			$pass ="xxxxx";
			// connect
			$m = new Mongo("mongodb://".$user.":".$pass."@staff.mongohq.com:10017/getem");
		$db = $m->getem;
		// select a collection (analogous to a relational database's table)
		$main_collection = $db->recipes;
		// find everything in the collection
		$cursor = $main_collection->find();
		// iterate through the results
		$recipes = array();
		foreach ($cursor as $obj) {
			$recipes[] = $obj;
		}
		
		if($format == 'json') {
			header('Content-type: application/json');
			echo json_encode(array('recipes'=>$recipes));
		}
    }
    
    public function delete() {
       	$success = "";
			$user = "xxxxx";
			$pass ="xxxxx";
			// connect
			$m = new Mongo("mongodb://".$user.":".$pass."@staff.mongohq.com:10017/getem");
        header('Content-type: application/json');
        echo json_encode($success);
    }

}
