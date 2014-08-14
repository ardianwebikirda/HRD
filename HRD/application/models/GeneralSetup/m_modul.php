<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_modul extends CI_Model
{

public function __construct(){
        parent::__construct();
}
    public function getGridModul($limit, $offset)
    {
        $this->db->select("CAST(ad_menu_id as varchar(10)) AS id, name AS name, parent AS parent, icon AS icon, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_menu');
        $this->db->order_by('CAST(ad_menu_id as varchar(10))', FALSE);
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        return $query;
    }
    public function countGridModul()
    {
        $this->db->select("CAST(ad_menu_id as varchar(10)) AS id, name AS name, parent AS parent, icon AS icon, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_menu');
        $this->db->order_by('CAST(ad_menu_id as varchar(10))', FALSE);
        $query = $this->db->get();
        return $query;
    }
    public function getViewModul()
    {
        $this->db->select("ad_menu_id AS id, name AS name", FALSE);
        $this->db->from('ad_menu');
        $this->db->where('parent',0);
        $this->db->where('isactive','Y');
        $this->db->order_by('ad_menu_id');
        $query = $this->db->get();
        return $query;
    }
    public function getViewAllModul()
    {
        $this->db->select("CAST(ad_menu_id as varchar(10)) AS id, name AS name", FALSE);
        $this->db->from('ad_menu');
        $this->db->where('isactive','Y');
        $this->db->order_by('CAST(ad_menu_id as varchar(10))', FALSE);
        $query = $this->db->get();
        return $query;
    }

    public function deleteModul($id)
    {
        $this->db->where('ad_menu_id',$id);
        $this->db->delete('ad_menu');
    }
    
    public function saveModul($id, $name, $parent, $icon, $isactive, $description)
    {
            $this->db->set('ad_menu_id', $id);
            $this->db->set('name', $name);
            $this->db->set('parent', $parent);
            $this->db->set('icon', $icon);
            $this->db->set('isactive', $isactive);
            $this->db->set('description', $description);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            if($parent > 0){
                $nameParent = $this->getParent($parent);
                $cls = 'HRIS.module.'.$nameParent.'.view.'.$name;
                $this->db->set('leaf', 'TRUE');
                $this->db->set('selector', $name);
                $this->db->set('cls', $cls);
            } else {
                $this->db->set('selector', '');
                $this->db->set('cls', '');
            }
            $this->db->insert('ad_menu');
    }
    public function getParent($id){      
        return $this->db->select("REPLACE(name, ' ', '') AS id", FALSE)->from('ad_menu')->where('ad_menu_id',$id)->get()->row()->id;
    }
    public function saveConfirm($id){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_menu')->where('ad_menu_id',$id)->get()->row()->id;
    }
    public function cekModul($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_menu')->where('name',$name)->get()->row()->id;
    }

    public function cekParent($id){      
        return $this->db->select('parent AS id')->from('ad_menu')->where('ad_menu_id',$id)->get()->row()->id;
    } 

    public function cekAnak($id){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_menu')->where('parent',$id)->get()->row()->id;
    }

    public function cekRoleModul($id){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_role_menu')->where('ad_menu_id',$id)->get()->row()->id;
    } 

    public function cekModulID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('ad_menu')->where('name',$name)->where('ad_menu_id !=',$id)->get()->row()->id;
    } 
    public function updateModul($id, $name, $parent, $icon, $isactive, $description){
        if($parent > 0){
            $data = array(
                           'name'           => $name,
                           'parent'         => $parent,
                           'icon'           => $icon,
                           'isactive'       => $isactive,
                           'selector'       => '',
                           'cls'            => '',
                           'description'    => $description,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
        } else {
            $nameParent = $this->getParent($parent);
            $cls = 'HRIS.module.'.$nameParent.'.view.'.$name;
            $data = array(
                           'name'           => $name,
                           'parent'         => $parent,
                           'icon'           => $icon,
                           'isactive'       => $isactive,
                           'selector'       => $name,
                           'cls'            => $cls,                           
                           'description'    => $description,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );            
        }
            $this->db->where('ad_menu_id',$id);
            $this->db->update('ad_menu', $data);              
    } 
    public function searchGridModul($username)
    {
        $this->db->select("CAST(ad_menu_id as varchar(10)) AS id, name AS name, parent AS parent, icon AS icon, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('ad_menu');
        $this->db->like('LOWER(name)', strtolower($username));
        $this->db->or_like('LOWER(description)', strtolower($username));
        $this->db->order_by('CAST(ad_menu_id as varchar(10))', FALSE);
        $query = $this->db->get();
        return $query;
    }
    public function printModul()
    {
        $this->db->select("CAST(u.ad_menu_id as varchar(10)) AS id, u.name AS name, u.parent AS parent, 
            u.icon AS icon, u.description AS description,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $this->db->from('ad_menu AS u');
        $this->db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $this->db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $this->db->order_by('CAST(u.ad_menu_id as varchar(10))', FALSE);
        $query = $this->db->get();
        return $query;
    }
}