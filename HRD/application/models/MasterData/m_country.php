<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_country extends CI_Model
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
    public function getGridCountry($limit, $offset)
    {
        $this->db->select("sc.id_country AS id, sc.code AS code, sc.name AS name, sc.phonecode AS phone", FALSE);
        $this->db->from('sys_country sc');
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
    public function countGridCountry()
    {
       $this->db->select("sc.id_country AS id, sc.code AS code, sc.name AS name, sc.phonecode AS phone", FALSE);
        $this->db->from('sys_country sc');
        $this->db->order_by('name');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Country
    */
    public function deleteCountry($id)
    {
        $this->db->where('id_country',$id);
        $this->db->delete('sys_country');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveCountry($code, $name, $phone, $uuid)
    {
            $this->db->set('id_country', $uuid);
            $this->db->set('code', $code);
            $this->db->set('name', $name);
            $this->db->set('phonecode', $phone);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_country');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_country')->where('id_country',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekCountry($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_country')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekCountryID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_country')->where('name',$name)->where('id_country !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateCountry($code, $name,$phone, $id){
            $data = array(
                           'code'        => $code,
                           'name'        => $name,
                           'phonecode'   => $phone,
                           'updated'     => date('Y-m-d H:i:s'),
                           'updatedby'   => $this->session->userdata('id')
                        );
            $this->db->where('id_country',$id);
            $this->db->update('sys_country', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridCountry($name)
    {
        $this->db->select("sc.id_country AS id, sc.code AS code, sc.name AS name, sc.phonecode AS phone", FALSE);
        $this->db->from('sys_country sc');
        $this->db->like('LOWER(sc.name)', strtolower($name));
        $this->db->or_like('LOWER(sc.code)', strtolower($name));
        $this->db->or_like('LOWER(sc.phonecode)', strtolower($name));
        $this->db->order_by('sc.name');
        $query = $this->db->get();
        return $query;
    }


    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printCountry()
    // {
    //     $this->db->select("u.id_country AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_country AS u');
    //     $this->db->join('sys_country AS u1', 'u.createdby=u1.id_country');
    //     $this->db->join('sys_country AS u2', 'u.updatedby=u2.id_country');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}