<?php if ( ! defined('BASEPATH')) exit('No direct ssdript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_department extends CI_Model
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
    public function getGridDepartment($limit, $offset)
    {
        $this->db->select("ssd.id_department AS id, ssd.code AS code, ssd.name AS name, 
            ssd.isactive AS isactive, CASE WHEN ssd.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_department ssd');
        $this->db->order_by('code');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridDepartment()
    {
        $this->db->select("ssd.id_department AS id, ssd.code AS code, ssd.name AS name, 
            ssd.isactive AS isactive, CASE WHEN ssd.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_department ssd');
        $this->db->order_by('code');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Department
    */
    public function deleteDepartment($id)
    {
        $this->db->where('id_department',$id);
        $this->db->delete('sys_department');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveDepartment($code, $name, $isactive, $uuid)
    {
            $this->db->set('id_department', $uuid);
            $this->db->set('code', $code);
            $this->db->set('name', $name);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_department');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_department')->where('id_department',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekDepartment($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_department')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekDepartmentID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_department')->where('name',$name)->where('id_department !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateDepartment($code, $name,$isactive, $id){
            $data = array(
                           'code'      => $code,
                           'name'       => $name,
                           'isactive'   => $isactive,
                           'updated'    => date('Y-m-d H:i:s'),
                           'updatedby'  => $this->session->userdata('id')
                        );
            $this->db->where('id_department',$id);
            $this->db->update('sys_department', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridDepartment($name)
    {
        $this->db->select("ssd.id_department AS id, ssd.code AS code, ssd.name AS name, 
            ssd.isactive AS isactive, CASE WHEN ssd.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_department ssd');
        $this->db->like('LOWER(ssd.name)', strtolower($name));
        $this->db->order_by('code');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printDepartment()
    // {
    //     $this->db->select("u.id_department AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.dessdription AS dessdription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_department AS u');
    //     $this->db->join('sys_department AS u1', 'u.createdby=u1.id_department');
    //     $this->db->join('sys_department AS u2', 'u.updatedby=u2.id_department');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}