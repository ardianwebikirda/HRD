<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User_model extends CI_Model
{
	function validasi_user($username, $password)
	{
		$this->db->select('ad_user_id, username, password');
		$this->db->from('ad_user');
		$this->db->where('username',$username);
		$this->db->where('password',base64_encode(sha1($password,TRUE)));
		$this->db->where('isactive','Y');
		$this->db->limit(1);
		$query = $this->db->get();
		if($query->num_rows() == 1)
		{
			return $query->result();
		}
		else
		{
			return FALSE;
		}
	}

	function user_rules($id)
	{
		$this->db->select('gm.ad_menu_id AS id');
		$this->db->from('ad_role_menu AS gm');
		$this->db->join('ad_role r', 'r.ad_role_id=gm.ad_role_id');
		$this->db->join('ad_user u', 'r.ad_role_id=u.ad_role_id');
		$this->db->where('u.ad_user_id',$id);
		$query = $this->db->get();
	// echo $this->db->last_query();
  //   	exit();
		return $query;
	}

	public function cekrulesparent($rules){
		$this->db->select('ad_menu_id AS id, name AS name, icon AS icon, leaf AS leaf, selector AS selector, cls AS cls');
		$this->db->from('ad_menu');
		$this->db->where_in('ad_menu_id',$rules);
		$this->db->where('parent',0);
		$this->db->where('isactive','Y');
		$this->db->order_by('ad_menu_id');
		$query = $this->db->get(); 
		return $query;
	}

	public function cekruleschild($id, $rules){
		$this->db->select('ad_menu_id AS id, name AS name, icon AS icon, leaf AS leaf, selector AS selector, cls AS cls');
		$this->db->from('ad_menu');
		$this->db->where_in('parent',$id);
		$this->db->where('parent !=',0);
		$this->db->where('isactive','Y');
		$this->db->where_in('ad_menu_id',$rules);
		$this->db->order_by('ad_menu_id');
		$query = $this->db->get();     
		return $query;
	}

	function validasi_rule($node)
	{
	  	$menus = $this->user_rules($this->session->userdata('id'));
	    foreach($menus->result() as $val){
	        $data[]  = $val->id;
	    }
	  	// var_dump($menus);
	  	// exit();
	  	if ($node) {
	    	$result = $this->cekruleschild($node, $data);
	  	} else {
	    	$result = $this->cekrulesparent($data);
	  	}

	    foreach ($result->result() as $key => $value) {
	      $rules[] = array(
	        'id' 		=> $value->id,        
	        'text' 		=> $value->name,
	        'iconCls' 	=> $value->icon,
	        'leaf' 		=> ($value->leaf === 't') ? true : false,
	        'selector' 	=> $value->selector,
	        'cls' 		=> $value->cls
	        );
	    }
	  	return $rules;
	}
}