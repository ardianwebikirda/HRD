<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_trscompdept extends CI_Model
{

    public function __construct(){
            parent::__construct();
    }

    public function getGridTrsCompdept($limit, $offset, $id)
    {
        $this->db->select("vd.id_compdept AS id, 
            vd.id_department , 
            vd.name_department AS name_department,
            vd.code_department AS code_department,
            vd.id_company AS id_company,
            vd.name_company AS name_company,
            vd.isactive AS isactive", FALSE);
        $this->db->from('v_listdept vd');
        $this->db->where('vd.id_company',$id);
        $this->db->where('vd.isactive', 'Y');
        $this->db->order_by('vd.id_compdept');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        return $query;
    }
    public function countGridTrsCompdept($id)
    {
       
        $this->db->select("vd.id_compdept AS id, 
            vd.id_department , 
            vd.name_department AS name_department,
            vd.code_department AS code_department,
            vd.id_company AS id_company,
            vd.name_company AS name_company,
            vd.isactive AS isactive", FALSE);
        $this->db->from('v_listdept vd');
        $this->db->where('vd.id_company',$id);
        $this->db->where('vd.isactive', 'Y');
        $this->db->order_by('vd.id_compdept');
        $query = $this->db->get();
        return $query;
    }

    public function saveTrsCompdept($name, $isactive, $description, $uuid)
    {
        $this->db->set('sys_trscompdept_id', $uuid);
        $this->db->set('name', $name);
        $this->db->set('isactive', $isactive);
        $this->db->set('description', $description);
        $this->db->set('createdby', $this->session->userdata('id'));
        $this->db->set('created', date('Y-m-d H:i:s'));
        $this->db->set('updatedby', $this->session->userdata('id'));
        $this->db->set('updated', date('Y-m-d H:i:s'));
        $this->db->insert('sys_trscompdept');
    }
    public function getUUID(){      
        return $this->db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }
    public function saveConfirm($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_trscompdept')->where('sys_trscompdept_id',$uuid)->get()->row()->id;
    }
    public function cekTrsCompdept($username){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_trscompdept')->where('name',$username)->get()->row()->id;
    }
    public function cekTrsCompdeptUser($username){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('sys_trscompdept_id',$username)->get()->row()->id;
    }
    public function cekTrsCompdeptModul($username){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_trscompdept_menu')->where('sys_trscompdept_id',$username)->get()->row()->id;
    }
    public function searchGridTrsCompdept($username)
    {
        $this->db->select("sys_trscompdept_id AS id, name AS name, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_trscompdept');
        $this->db->like('LOWER(name)', strtolower($username));
        $this->db->or_like('LOWER(description)', strtolower($username));
        $this->db->order_by('name', FALSE);
        $query = $this->db->get();
        return $query;
    }
    public function cekTrsCompdeptID($username, $id){              
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_trscompdept')->where('name',$username)->where('sys_trscompdept_id !=',$id)->get()->row()->id;
    } 
    public function updateTrsCompdept($name, $isactive, $description, $id){
            $data = array(
                           'name'           => $name,
                           'isactive'       => $isactive,
                           'description'    => $description,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
            $this->db->where('sys_trscompdept_id',$id);
            $this->db->update('sys_trscompdept', $data);              
    }

    public function deleteModul($id)
    {
        $this->db->where('sys_trscompdept_id',$id);
        $this->db->delete('sys_trscompdept');
    }
    
    public function printTrsCompdept()
    {
        $this->db->select("u.name AS name, u.description AS description,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $this->db->from('sys_trscompdept AS u');
        $this->db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $this->db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $this->db->order_by('name', FALSE);
        $query = $this->db->get();
        return $query;
    }
    public function cekIDModul($id, $idtrscompdept){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_trscompdept_menu')->where('ad_menu_id',$id)->where('sys_trscompdept_id',$idtrscompdept)->get()->row()->id;
    }
    public function saveConfirmModul($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_trscompdept_menu')->where('sys_trscompdept_menu_id',$uuid)->get()->row()->id;
    }
    public function saveTrsCompdeptModul($id, $idtrscompdept, $isactive, $iscreate, $isupdate, $isdelete, $isprocess, $uuid)
    {
        $this->db->set('sys_trscompdept_menu_id', $uuid);
        $this->db->set('ad_menu_id', $id);
        $this->db->set('sys_trscompdept_id', $idtrscompdept);
        $this->db->set('isactive', $isactive);
        $this->db->set('iscreate', $iscreate);
        $this->db->set('isupdate', $isupdate);
        $this->db->set('isdelete', $isdelete);
        $this->db->set('isprocess', $isprocess);
        $this->db->set('createdby', $this->session->userdata('id'));
        $this->db->set('created', date('Y-m-d H:i:s'));
        $this->db->set('updatedby', $this->session->userdata('id'));
        $this->db->set('updated', date('Y-m-d H:i:s'));
        $this->db->insert('sys_trscompdept_menu');
    }
    public function deleteTrsCompdeptModul($id)
    {
        $this->db->where('sys_trscompdept_menu_id',$id);
        $this->db->delete('sys_trscompdept_menu');
    }
}