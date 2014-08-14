<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_bank extends CI_Model
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
    public function getGridBank($limit, $offset)
    {
        $this->db->select("sb.id_bank AS id, sb.name AS name, sb.isactive AS isactive,
            CASE WHEN sb.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_bank sb');
        $this->db->order_by('name');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridBank()
    {
       $this->db->select("sb.id_bank AS id, sb.name AS name, sb.isactive AS isactive,
            CASE WHEN sb.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_bank sb');
        $this->db->order_by('name');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Bank
    */
    public function deleteBank($id)
    {
        $this->db->where('id_bank',$id);
        $this->db->delete('sys_bank');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveBank($name, $isactive, $uuid)
    {
            $this->db->set('id_bank', $uuid);
            $this->db->set('name', $name);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_bank');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_bank')->where('id_bank',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekBank($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_bank')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekBankID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_bank')->where('name',$name)->where('id_bank !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateBank($name,$isactive, $id){
            $data = array(
                           'name'           => $name,
                           'isactive'       => $isactive,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
            $this->db->where('id_bank',$id);
            $this->db->update('sys_bank', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridBank($name)
    {
      $this->db->select("sb.id_bank AS id, sb.name AS name, sb.isactive AS isactive,
            CASE WHEN sb.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_bank sb');
        $this->db->like('LOWER(sb.name)', strtolower($name));
        $this->db->order_by('sb.name');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printBank()
    // {
    //     $this->db->select("u.id_bank AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_bank AS u');
    //     $this->db->join('sys_bank AS u1', 'u.createdby=u1.id_bank');
    //     $this->db->join('sys_bank AS u2', 'u.updatedby=u2.id_bank');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}