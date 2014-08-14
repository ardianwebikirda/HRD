<?php if ( ! defined('BASEPATH')) exit('No direct sjlript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_joblevel extends CI_Model
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
    public function getGridJobLevel($limit, $offset)
    {
        $this->db->select("sjl.id_joblevel AS id, sjl.level AS level, sjl.name AS name, 
            sjl.isactive AS isactive, CASE WHEN sjl.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_joblevel sjl');
        $this->db->order_by('level');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridJobLevel()
    {
        $this->db->select("sjl.id_joblevel AS id, sjl.level AS level, sjl.name AS name, 
            sjl.isactive AS isactive, CASE WHEN sjl.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_joblevel sjl');
        $this->db->order_by('level');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master JobLevel
    */
    public function deleteJobLevel($id)
    {
        $this->db->where('id_joblevel',$id);
        $this->db->delete('sys_joblevel');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveJobLevel($level, $name, $isactive, $uuid)
    {
            $this->db->set('id_joblevel', $uuid);
            $this->db->set('level', $level);
            $this->db->set('name', $name);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_joblevel');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_joblevel')->where('id_joblevel',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekJobLevel($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_joblevel')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekJobLevelID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_joblevel')->where('name',$name)->where('id_joblevel !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateJobLevel($level, $name,$isactive, $id){
            $data = array(
                           'level'      => $level,
                           'name'       => $name,
                           'isactive'   => $isactive,
                           'updated'    => date('Y-m-d H:i:s'),
                           'updatedby'  => $this->session->userdata('id')
                        );
            $this->db->where('id_joblevel',$id);
            $this->db->update('sys_joblevel', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridJobLevel($name)
    {
        $this->db->select("sjl.id_joblevel AS id, sjl.level AS level, sjl.name AS name", FALSE);
        $this->db->from('sys_joblevel sjl');
        $this->db->like('LOWER(sjl.name)', strtolower($name));
        $this->db->order_by('level');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printJobLevel()
    // {
    //     $this->db->select("u.id_joblevel AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.desjlription AS desjlription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_joblevel AS u');
    //     $this->db->join('sys_joblevel AS u1', 'u.createdby=u1.id_joblevel');
    //     $this->db->join('sys_joblevel AS u2', 'u.updatedby=u2.id_joblevel');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}