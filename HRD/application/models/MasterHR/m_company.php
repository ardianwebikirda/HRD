<?php if ( ! defined('BASEPATH')) exit('No direct sscript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_company extends CI_Model
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
    public function getGridCompany($limit, $offset)
    {
        $this->db->select("ssc.id_company AS id, ssc.code AS code, ssc.name AS name, ssc.logo AS logo, 
            ssc.isactive AS isactive, CASE WHEN ssc.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_company ssc');
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
    public function countGridCompany()
    {
       $this->db->select("ssc.id_company AS id, ssc.code AS code, ssc.name AS name, ssc.logo AS logo, 
            ssc.isactive AS isactive, CASE WHEN ssc.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_company ssc');
        $this->db->order_by('code');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Company
    */
    public function deleteCompany($id)
    {
        $this->db->where('id_company',$id);
        $this->db->delete('sys_company');
    }

    /*
    * Query Untuk Menghapus data TRS Department
    */
    public function deleteDept($id)
    {
        $this->db->where('id_compdept',$id);
        $this->db->delete('trs_compdept');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveCompany($code, $name, $logo, $isactive, $uuid)
    {
            $this->db->set('id_company', $uuid);
            $this->db->set('code', $code);
            $this->db->set('name', $name);
            $this->db->set('logo', $logo);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_company');
    }

        /*
    * Query untuk menyimpan trs company department
    */
    public function saveDepartment2($id_comp, $id_dept, $isactive, $uuid)
    {
            $this->db->set('id_compdept', $uuid);
            $this->db->set('id_company', $id_comp);
            $this->db->set('id_department', $id_dept);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('trs_compdept');
    }

    /*
    * Query untuk Mendapatkan company department
    */
    public function getDepartment2($id){
        $this->db->select('tcd.id_compdept AS id, 
            ssc.id_company AS id_company, 
            ssc.code AS code_company, 
            ssc.name AS name_company, 
            tcd.id_department AS id_department,
            ssd.code AS code_department, 
            ssd.name AS name_department, 
            tcd.isactive AS isactive, 
            ssd.name AS name_department',FALSE);
        $this->db->from('trs_compdept tcd');
        $this->db->join('sys_department ssd','tcd.id_department=ssd.id_department');
        $this->db->join('sys_company ssc','tcd.id_company=ssc.id_company');
        $this->db->where('tcd.id_company',$id);
        $this->db->where('ssd.isactive','Y');
        $query = $this->db->get();

        return $query;

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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_company')->where('id_company',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekID($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('trs_compdept')->where('id_compdept',$uuid)->get()->row()->id;
    }    
    
    /*
    * Query untuk validasi ID sebelum data disimpan 
    */
    public function saveConfirm2($uuid){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('trs_compdept')->where('id_compdept',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekCompany($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_company')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekCompanyID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_company')->where('name',$name)->where('id_company !=', $id)->get()->row()->id;
    }

    /*
    * Query Untuk Validasi id_company 
    */
    public function cekCompDep($id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('trs_compdept')->where('id_company',$id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateCompany($code, $name,$isactive, $id){
            $data = array(
                           'code'      => $code,
                           'name'       => $name,
                           'isactive'   => $isactive,
                           'updated'    => date('Y-m-d H:i:s'),
                           'updatedby'  => $this->session->userdata('id')
                        );
            $this->db->where('id_company',$id);
            $this->db->update('sys_company', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridCompany($name)
    {
        $this->db->select("ssc.id_company AS id, ssc.code AS code, ssc.name AS name, 
            ssc.isactive AS isactive, CASE WHEN ssc.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_company ssc');
        $this->db->like('LOWER(ssc.name)', strtolower($name));
        $this->db->order_by('code');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printCompany()
    // {
    //     $this->db->select("u.id_company AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.desscription AS desscription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_company AS u');
    //     $this->db->join('sys_company AS u1', 'u.createdby=u1.id_company');
    //     $this->db->join('sys_company AS u2', 'u.updatedby=u2.id_company');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}