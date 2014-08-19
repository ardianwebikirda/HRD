<?php if ( ! defined('BASEPATH')) exit('No direct spript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_region extends CI_Model
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
    public function getGridRegion($limit, $offset)
    {
        $this->db->select("sp.id_region AS id, sp.code AS code, sp.name AS name, 
            sc.id_province AS id_province, sc.name AS province", FALSE);
        $this->db->from('sys_region sp');
        $this->db->join('sys_province sc', 'sp.id_province = sc.id_province','left');
        $this->db->order_by('name');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // var_dump($query);
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridRegion()
    {
       $this->db->select("sp.id_region AS id, sp.code AS code, sp.name AS name, 
            sc.id_province AS id_province, sc.name AS province", FALSE);
        $this->db->from('sys_region sp');
        $this->db->join('sys_province sc', 'sp.id_province = sc.id_province','left');
        $this->db->order_by('name');
        $query = $this->db->get();
        // echo $this->db->last_query(); //<-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Region
    */
    public function deleteRegion($id)
    {
        $this->db->where('id_region',$id);
        $this->db->delete('sys_region');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveRegion($code, $name, $province, $uuid)
    {
            $this->db->set('id_region', $uuid);
            $this->db->set('id_province', $province);
            $this->db->set('code', $code);
            $this->db->set('name', $name);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_region');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_region')->where('id_region',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekRegion($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_region')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekRegionID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_region')->where('name',$name)->where('id_region !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateRegion($code, $name,$province, $id){
            $data = array(
                           'code'        => $code,
                           'name'        => $name,
                           'id_province' => $province,
                           'updated'     => date('Y-m-d H:i:s'),
                           'updatedby'   => $this->session->userdata('id')
                        );
            $this->db->where('id_region',$id);
            $this->db->update('sys_region', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridRegion($name)
    {
        $this->db->select("sp.id_region AS id, sp.code AS code, sp.name AS name, 
            sc.id_province AS id_province, sc.name AS province", FALSE);
        $this->db->from('sys_region sp');
        $this->db->join('sys_province sc', 'sp.id_province = sc.id_province','left');
        $this->db->like('LOWER(sp.name)', strtolower($name));
        $this->db->or_like('LOWER(sp.code)', strtolower($name));
        $this->db->or_like('LOWER(sc.name)', strtolower($name));
        $this->db->order_by('sp.name');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query Untuk mendapatkan data berelasi
    */
    public function chainRegion($id)
    {
        /*--------------------------------------
        Query Active Record Not Works

        * $this->db->select("id_region AS id, 
        * code AS code, 
        * name AS name", FALSE);
        * $this->db->from('sys_region');
        * $this->db->where('id_province',$id);
        * $query = $this->db->get();
        * return $query;
        ---------------------------------------*/

        $sqlquery = 
            'SELECT sys_region.id_region AS id, 
            sys_region.id_province AS id_province, 
            sys_region.code AS code, 
            sys_region.name AS name 
            FROM sys_region 
            JOIN sys_province ON sys_region.id_province=sys_province.id_province';
        $hslquery = $this->db->query($sqlquery);
        return $hslquery;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printRegion()
    // {
    //     $this->db->select("u.id_region AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.despription AS despription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_region AS u');
    //     $this->db->join('sys_region AS u1', 'u.createdby=u1.id_region');
    //     $this->db->join('sys_region AS u2', 'u.updatedby=u2.id_region');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}