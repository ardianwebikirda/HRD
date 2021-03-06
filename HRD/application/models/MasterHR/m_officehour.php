<?php if ( ! defined('BASEPATH')) exit('No direct ofhript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_officehour extends CI_Model
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
    public function getGridOfficeHour($limit, $offset)
    {
        $this->db->select("ofh.id_officehour AS id, ofh.name AS name, ofh.time_in AS time_in, ofh.time_out AS time_out,
            ofh.isactive AS isactive, CASE WHEN ofh.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_officehour ofh');
        $this->db->order_by('id_officehour');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridOfficeHour()
    {
        $this->db->select("ofh.id_officehour AS id, ofh.name AS name, ofh.time_in AS time_in, ofh.time_out AS time_out,
            ofh.isactive AS isactive, CASE WHEN ofh.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_officehour ofh');
        $this->db->order_by('id_officehour');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master OfficeHour
    */
    public function deleteOfficeHour($id)
    {
        $this->db->where('id_officehour',$id);
        $this->db->delete('sys_officehour');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveOfficeHour($name, $time_in, $time_out, $isactive, $uuid)
    {
            $this->db->set('id_officehour', $uuid);
            $this->db->set('name', $name);
            $this->db->set('time_in', $time_in);
            $this->db->set('time_out', $time_out);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_officehour');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_officehour')->where('id_officehour',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekOfficeHour($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_officehour')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekOfficeHourID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_officehour')->where('name',$name)->where('id_officehour !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateOfficeHour($name, $time_in, $time_out, $isactive, $id){
            $data = array(
                           'name'       => $name,
                           'time_in'    => $time_in,
                           'time_out'   => $time_out,
                           'isactive'   => $isactive,
                           'updated'    => date('Y-m-d H:i:s'),
                           'updatedby'  => $this->session->userdata('id')
                        );
            $this->db->where('id_officehour',$id);
            $this->db->update('sys_officehour', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridOfficeHour($name)
    {
       $this->db->select("ofh.id_officehour AS id, ofh.name AS name, ofh.time_in AS time_in, ofh.time_out AS time_out,
            ofh.isactive AS isactive, CASE WHEN ofh.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_officehour ofh');
        $this->db->like('LOWER(ofh.name)', strtolower($name));
        $this->db->order_by('id_officehour');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printOfficeHour()
    // {
    //     $this->db->select("u.id_officehour AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.deofhription AS deofhription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_officehour AS u');
    //     $this->db->join('sys_officehour AS u1', 'u.createdby=u1.id_officehour');
    //     $this->db->join('sys_officehour AS u2', 'u.updatedby=u2.id_officehour');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}