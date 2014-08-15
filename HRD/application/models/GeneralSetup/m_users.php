<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_users extends CI_Model
{

public function __construct(){
        parent::__construct();
}
    public function getGridUsers($limit, $offset)
    {
        // echo $limit.'-'.$offset;
        // exit();
        $this->db->select("u.ad_user_id AS id, u.ad_role_id AS id_role, u.username AS username, u.name AS name, u.description AS description, 
            u.email AS email,r.ad_role_id AS role, u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_user u');
        $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id','left');
        $this->db->order_by('u.name');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }
    public function countGridUsers()
    {
        $this->db->select("u.ad_user_id AS id, u.ad_role_id AS id_role, u.username AS username, u.name AS name, u.description AS description, 
            u.email AS email,r.ad_role_id AS role, u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_user u');
        $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id','left');
        $this->db->order_by('u.name');
        $query = $this->db->get();
        //      echo $this->db->last_query();
        // exit();   
        return $query;
    }
    public function deleteUsers($id)
    {
        $this->db->where('ad_user_id',$id);
        $this->db->delete('ad_user');
    }
    public function saveUsers($name, $username, $password, $email, $isactive, $description, $role, $uuid)
    {
            $this->db->set('ad_user_id', $uuid);
            $this->db->set('name', $name);
            $this->db->set('ad_role_id', $role);
            $this->db->set('username', $username);
            $this->db->set('password', $password);
            $this->db->set('email', $email);
            $this->db->set('isactive', $isactive);
            $this->db->set('description', $description);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('ad_user');
    }
    public function getUUID(){      
        return $this->db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }
    public function saveConfirm($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('ad_user_id',$uuid)->get()->row()->id;
    }
    public function cekUser($username){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('username',$username)->get()->row()->id;
    } 
    public function cekUserID($username, $id){              
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('username',$username)->where('ad_user_id !=',$id)->get()->row()->id;
    } 
    public function cekPswd(){              
        return $this->db->select('password AS id', FALSE)->from('ad_user')->where('ad_user_id',$this->session->userdata('id'))->get()->row()->id;
    }
    public function updateUsers($name, $username, $email, $isactive, $description, $role, $id){
            $data = array(
                           'name'           => $name,
                           'username'       => $username,
                           'ad_role_id'     => $role,
                           'email'          => $email,
                           'isactive'       => $isactive,
                           'description'    => $description,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
            $this->db->where('ad_user_id',$id);
            $this->db->update('ad_user', $data);              
    }
    public function updatePswd($newpswd1){
            $data = array(
                           'password'       => $newpswd1,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
            $this->db->where('ad_user_id',$this->session->userdata('id'));
            $this->db->update('ad_user', $data);              
    } 
    public function searchGridUsers($username)
    {
      $this->db->select("u.ad_user_id AS id, u.ad_role_id AS id_role, u.username AS username, u.name AS name, u.description AS description, 
            u.email AS email,r.ad_role_id AS role, u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_user u');
        $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id','left');
        $this->db->like('LOWER(u.username)', strtolower($username));
        $this->db->or_like('LOWER(u.ad_role_id)', strtolower($username));
        $this->db->or_like('LOWER(u.name)', strtolower($username));
        $this->db->or_like('LOWER(u.email)', strtolower($username));
        $this->db->order_by('u.name');
        $query = $this->db->get();
        return $query;
    }
    public function printUsers()
    {
        $this->db->select("u.ad_user_id AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
            u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $this->db->from('ad_user AS u');
        $this->db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $this->db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
        $this->db->order_by('name');
        $query = $this->db->get();
        return $query;
    }
}