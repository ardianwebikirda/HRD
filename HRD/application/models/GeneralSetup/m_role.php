<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_role extends CI_Model
{

public function __construct(){
        parent::__construct();
}
    public function getGridRole($limit, $offset)
    {
        $this->db->select("ad_role_id AS id, name AS name, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_role');
        $this->db->order_by('name');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        return $query;
    }
    public function countGridRole()
    {
        $this->db->select("ad_role_id AS id, name AS name, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_role');
        $this->db->order_by('name', FALSE);
        $query = $this->db->get();
        return $query;
    }

    public function viewRole()
    {
        $this->db->select("ad_role_id AS id, name AS name", FALSE);
        $this->db->from('ad_role');
        $this->db->where('isactive','Y');
        $this->db->order_by('name', FALSE);
        $query = $this->db->get();
        return $query;
    }

    public function getModul($id)
    {
        $this->db->select("rm.ad_role_menu_id AS id, CAST(m.ad_menu_id as varchar(10)) AS menu, m.name AS name, 
            CASE WHEN rm.isactive = 'Y' THEN 1 ELSE 0 END AS isactive,
            CASE WHEN rm.iscreate = 'Y' THEN 1 ELSE 0 END AS iscreate,
            CASE WHEN rm.isupdate = 'Y' THEN 1 ELSE 0 END AS isupdate,
            CASE WHEN rm.isdelete = 'Y' THEN 1 ELSE 0 END AS isdelete,
            CASE WHEN rm.isprocess = 'Y' THEN 1 ELSE 0 END AS isprocess", FALSE);
        $this->db->from('ad_role_menu AS rm');
        $this->db->join('ad_menu AS m', 'rm.ad_menu_id=m.ad_menu_id');
        $this->db->where('rm.ad_role_id', $id);
        $this->db->where('m.isactive', 'Y');
        $this->db->order_by('CAST(m.ad_menu_id as varchar(10))', FALSE);
        $query = $this->db->get();
       
        return $query;
    }

    public function saveRole($name, $isactive, $description, $uuid)
    {
        $this->db->set('ad_role_id', $uuid);
        $this->db->set('name', $name);
        $this->db->set('isactive', $isactive);
        $this->db->set('description', $description);
        $this->db->set('createdby', $this->session->userdata('id'));
        $this->db->set('created', date('Y-m-d H:i:s'));
        $this->db->set('updatedby', $this->session->userdata('id'));
        $this->db->set('updated', date('Y-m-d H:i:s'));
        $this->db->insert('ad_role');
    }
    public function getUUID(){      
        return $this->db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }
    public function saveConfirm($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_role')->where('ad_role_id',$uuid)->get()->row()->id;
    }
    public function cekRole($username){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_role')->where('name',$username)->get()->row()->id;
    }
    public function cekRoleUser($username){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('ad_role_id',$username)->get()->row()->id;
    }
    public function cekRoleModul($username){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_role_menu')->where('ad_role_id',$username)->get()->row()->id;
    }
    public function searchGridRole($username)
    {
        $this->db->select("ad_role_id AS id, name AS name, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_role');
        $this->db->like('LOWER(name)', strtolower($username));
        $this->db->or_like('LOWER(description)', strtolower($username));
        $this->db->order_by('name', FALSE);
        $query = $this->db->get();
        return $query;
    }
    public function cekRoleID($username, $id){              
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_role')->where('name',$username)->where('ad_role_id !=',$id)->get()->row()->id;
    } 
    public function updateRole($name, $isactive, $description, $id){
            $data = array(
                           'name'           => $name,
                           'isactive'       => $isactive,
                           'description'    => $description,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
            $this->db->where('ad_role_id',$id);
            $this->db->update('ad_role', $data);              
    }

    public function deleteModul($id)
    {
        $this->db->where('ad_role_id',$id);
        $this->db->delete('ad_role');
    }
    
    public function printRole()
    {
        $this->db->select("u.name AS name, u.description AS description,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $this->db->from('ad_role AS u');
        $this->db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $this->db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $this->db->order_by('name', FALSE);
        $query = $this->db->get();
        return $query;
    }
    public function cekIDModul($id, $idrole){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_role_menu')->where('ad_menu_id',$id)->where('ad_role_id',$idrole)->get()->row()->id;
    }
    public function saveConfirmModul($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_role_menu')->where('ad_role_menu_id',$uuid)->get()->row()->id;
    }
    public function saveRoleModul($id, $idrole, $isactive, $iscreate, $isupdate, $isdelete, $isprocess, $uuid)
    {
        $this->db->set('ad_role_menu_id', $uuid);
        $this->db->set('ad_menu_id', $id);
        $this->db->set('ad_role_id', $idrole);
        $this->db->set('isactive', $isactive);
        $this->db->set('iscreate', $iscreate);
        $this->db->set('isupdate', $isupdate);
        $this->db->set('isdelete', $isdelete);
        $this->db->set('isprocess', $isprocess);
        $this->db->set('createdby', $this->session->userdata('id'));
        $this->db->set('created', date('Y-m-d H:i:s'));
        $this->db->set('updatedby', $this->session->userdata('id'));
        $this->db->set('updated', date('Y-m-d H:i:s'));
        $this->db->insert('ad_role_menu');
    }
    public function deleteRoleModul($id)
    {
        $this->db->where('ad_role_menu_id',$id);
        $this->db->delete('ad_role_menu');
    }
}