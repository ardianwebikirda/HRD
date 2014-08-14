<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_education extends CI_Model
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
    public function getGridEducation($limit, $offset)
    {
       
        $this->db->select("se.id_education AS id, se.level AS level, se.name AS name", FALSE);
        $this->db->from('sys_education se');
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
    public function countGridEducation()
    {
        $this->db->select("se.id_education AS id, se.level AS level, se.name AS name", FALSE);
        $this->db->from('sys_education se');
        $this->db->order_by('level');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Education
    */
    public function deleteEducation($id)
    {
        $this->db->where('id_education',$id);
        $this->db->delete('sys_education');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveEducation($level, $name, $uuid)
    {
            $this->db->set('id_education', $uuid);
            $this->db->set('level',$level);
            $this->db->set('name', $name);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_education');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_education')->where('id_education',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekEducation($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_education')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekEducationID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_education')->where('name',$name)->where('id_education !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateEducation($level, $name, $id){
            $data = array(
                           'level'       => $level,
                           'name'        => $name,
                           'updated'     => date('Y-m-d H:i:s'),
                           'updatedby'   => $this->session->userdata('id')
                        );
            $this->db->where('id_education',$id);
            $this->db->update('sys_education', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridEducation($name)
    {
        $this->db->select("se.id_education AS id, se.level AS level, se.name AS name", FALSE);
        $this->db->from('sys_education se');
        $this->db->like('LOWER(se.name)', strtolower($name));
        $this->db->or_like('LOWER(se.level)', strtolower($name));
        $this->db->order_by('se.level');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printEducation()
    // {
    //     $this->db->select("u.id_education AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.deseription AS deseription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_education AS u');
    //     $this->db->join('sys_education AS u1', 'u.createdby=u1.id_education');
    //     $this->db->join('sys_education AS u2', 'u.updatedby=u2.id_education');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}