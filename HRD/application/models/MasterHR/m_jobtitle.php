<?php if ( ! defined('BASEPATH')) exit('No direct sjtript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_jobtitle extends CI_Model
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
    public function getGridJobTitle($limit, $offset)
    {
        $this->db->select("sjt.id_jobtitle AS id, sjl.id_joblevel AS id_joblevel, sjl.name AS level, sjt.name AS name, 
            sjt.isactive AS isactive, CASE WHEN sjt.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_jobtitle sjt');
        $this->db->join('sys_joblevel sjl','sjt.id_joblevel=sjl.id_joblevel');
        $this->db->order_by('id_jobtitle');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridJobTitle()
    {
       $this->db->select("sjt.id_jobtitle AS id, sjl.id_joblevel AS id_joblevel, sjl.name AS level, sjt.name AS name, 
            sjt.isactive AS isactive, CASE WHEN sjt.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_jobtitle sjt');
        $this->db->join('sys_joblevel sjl','sjt.id_joblevel=sjl.id_joblevel');
        $this->db->order_by('id_jobtitle');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master JobTitle
    */
    public function deleteJobTitle($id)
    {
        $this->db->where('id_jobtitle',$id);
        $this->db->delete('sys_jobtitle');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveJobTitle($level, $name, $isactive, $uuid)
    {
            $this->db->set('id_jobtitle', $uuid);
            $this->db->set('id_joblevel', $level);
            $this->db->set('name', $name);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_jobtitle');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_jobtitle')->where('id_jobtitle',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekJobTitle($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_jobtitle')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekJobTitleID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_jobtitle')->where('name',$name)->where('id_jobtitle !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateJobTitle($level, $name,$isactive, $id){
            $data = array(
                           'id_joblevel'=> $level,
                           'name'       => $name,
                           'isactive'   => $isactive,
                           'updated'    => date('Y-m-d H:i:s'),
                           'updatedby'  => $this->session->userdata('id')
                        );
            $this->db->where('id_jobtitle',$id);
            $this->db->update('sys_jobtitle', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridJobTitle($name)
    {
       $this->db->select("sjt.id_jobtitle AS id, sjl.id_joblevel AS id_joblevel, sjl.name AS level, sjt.name AS name, 
            sjt.isactive AS isactive, CASE WHEN sjt.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_jobtitle sjt');
        $this->db->join('sys_joblevel sjl','sjt.id_joblevel=sjl.id_joblevel');
        $this->db->like('LOWER(sjt.name)', strtolower($name));
        $this->db->order_by('id_joblevel');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printJobTitle()
    // {
    //     $this->db->select("u.id_jobtitle AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.desjtription AS desjtription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_jobtitle AS u');
    //     $this->db->join('sys_jobtitle AS u1', 'u.createdby=u1.id_jobtitle');
    //     $this->db->join('sys_jobtitle AS u2', 'u.updatedby=u2.id_jobtitle');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}