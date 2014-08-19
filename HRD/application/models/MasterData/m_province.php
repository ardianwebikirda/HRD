<?php if ( ! defined('BASEPATH')) exit('No direct spript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_province extends CI_Model
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
    public function getGridProvince($limit, $offset)
    {
        $this->db->select("sp.id_province AS id, sp.code AS code, sp.name AS name, 
            sc.id_country AS id_country, sc.name AS country", FALSE);
        $this->db->from('sys_province sp');
        $this->db->join('sys_country sc', 'sp.id_country = sc.id_country','left');
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
    public function countGridProvince()
    {
       $this->db->select("sp.id_province AS id, sp.code AS code, sp.name AS name, 
            sc.id_country AS id_country, sc.name AS country", FALSE);
        $this->db->from('sys_province sp');
        $this->db->join('sys_country sc', 'sp.id_country = sc.id_country','left');
        $this->db->order_by('name');
        $query = $this->db->get();
        // echo $this->db->last_query(); //<-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk mendapatkan data berelasi
    */
    public function chainProvince($id)
    {
       /*------------------------------ 
        Query Active Record Not Work

       *$this->db->select("id_province AS id, CAST(id_country AS varchar(40)) AS id_country, code AS code, name AS name", FALSE);
       *$this->db->from('sys_province');
       *$this->db->where('id_country',$id);
       *$query = $this->db->get();
       *return $query;
       ------------------------------*/

        $sqlquery = 
            'SELECT sys_province.id_province AS id, 
            sys_province.id_country AS id_country, 
            sys_province.code AS code, 
            sys_province.name AS name 
            FROM sys_province 
            JOIN sys_country ON sys_province.id_country=sys_country.id_country';
        $hslquery = $this->db->query($sqlquery);
        return $hslquery;

    }

    /*
    * Query Untuk Menghapus data Master Province
    */
    public function deleteProvince($id)
    {
        $this->db->where('id_province',$id);
        $this->db->delete('sys_province');
    }

    /*
    * Query untuk menyimpan data
    */
    public function saveProvince($code, $name, $country, $uuid)
    {
            $this->db->set('id_province', $uuid);
            $this->db->set('id_country', $country);
            $this->db->set('code', $code);
            $this->db->set('name', $name);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('sys_province');
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_province')->where('id_province',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekProvince($name){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_province')->where('name',$name)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekProvinceID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_province')->where('name',$name)->where('id_province !=', $id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateProvince($code, $name,$country, $id){
            $data = array(
                           'code'        => $code,
                           'name'        => $name,
                           'id_country'  => $country,
                           'updated'     => date('Y-m-d H:i:s'),
                           'updatedby'   => $this->session->userdata('id')
                        );
            $this->db->where('id_province',$id);
            $this->db->update('sys_province', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridProvince($name)
    {
        $this->db->select("sp.id_province AS id, sp.code AS code, sp.name AS name, 
            sc.id_country AS id_country, sc.name AS country", FALSE);
        $this->db->from('sys_province sp');
        $this->db->join('sys_country sc', 'sp.id_country = sc.id_country','left');
        $this->db->like('LOWER(sp.name)', strtolower($name));
        $this->db->or_like('LOWER(sp.code)', strtolower($name));
        $this->db->or_like('LOWER(sc.name)', strtolower($name));
        $this->db->order_by('sp.name');
        $query = $this->db->get();
        return $query;
    }

    // /*
    // * Query untuk pencarian data berlasi
    // */ 
    // public function chainGridProvince($id)
    // {
    //     $this->db->select("sp.id_province AS id, sp.code AS code, sp.name AS name, 
    //         sc.id_country AS id_country, sc.name AS country", FALSE);
    //     $this->db->from('sys_province sp');
    //     $this->db->join('sys_country sc', 'sp.id_country = sc.id_country','left');
    //     $this->db->where('sp.id_country', $id);
    //     $this->db->order_by('sp.name');
    //     $query = $this->db->get();
    //     return $query;
    // }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printProvince()
    // {
    //     $this->db->select("u.id_province AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.despription AS despription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_province AS u');
    //     $this->db->join('sys_province AS u1', 'u.createdby=u1.id_province');
    //     $this->db->join('sys_province AS u2', 'u.updatedby=u2.id_province');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}