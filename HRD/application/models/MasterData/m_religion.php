<?php if ( ! defined('BASEPATH')) exit('No direct srlript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_religion extends CI_Model
{
    /*
    * Contruct Function Aplikasi
    */
    public function __construct(){
        parent::__construct();
    }

    /*
    * Query Untuk mendapatkan Data Grid dari DB
    */
    public function getGridReligion($limit, $offset)
    {
       
        $this->db->select("srl.id_religion AS id, srl.name AS name", FALSE);
        $this->db->from('sys_religion srl');
        $this->db->order_by('id_religion');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridReligion()
    {
        $this->db->select("srl.id_religion AS id, srl.name AS name", FALSE);
        $this->db->from('sys_religion srl');
        $this->db->order_by('id_religion');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Religion
    */
    public function deleteReligion($id)
    {
        $this->db->where('id_religion',$id);
        $this->db->delete('sys_religion');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveReligion($name, $uuid)
    {
            $this->db->set('id_religion', $uuid);
            $this->db->set('name', $name);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_religion');
    }

    /*
    * Query untuk mendapatkan Generate ID dari DB PostgreSQL 
    */
    public function getUUID(){      
        return $this->db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }

    /*
    * Query untuk validasi ID sebelum data disimpan 
    */
    public function saveConfirm($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_religion')->where('id_religion',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekReligion($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_religion')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekReligionID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_religion')->where('name',$name)->where('id_religion !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateReligion($name, $id){
            $data = array(
                           'name'        => $name,
                           'updated'     => date('Y-m-d H:i:s'),
                           'updatedby'   => $this->session->userdata('id')
                        );
            $this->db->where('id_religion',$id);
            $this->db->update('sys_religion', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridReligion($name)
    {
        $this->db->select("srl.id_religion AS id, srl.name AS name", FALSE);
        $this->db->from('sys_religion srl');
        $this->db->like('LOWER(srl.name)', strtolower($name));
        $this->db->order_by('srl.id_religion');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printReligion()
    // {
    //     $this->db->select("u.id_religion AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.desrlription AS desrlription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_religion AS u');
    //     $this->db->join('sys_religion AS u1', 'u.createdby=u1.id_religion');
    //     $this->db->join('sys_religion AS u2', 'u.updatedby=u2.id_religion');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}