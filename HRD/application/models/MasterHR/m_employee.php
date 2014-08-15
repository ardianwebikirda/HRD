<?php if ( ! defined('BASEPATH')) exit('No direct sseript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_employee extends CI_Model
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
    public function getGridEmployee($limit, $offset)
    {
        $this->db->select("
            id_employee AS id, 
            code AS code, 
            fname AS fname, 
            lname AS lname, 
            isactive AS isactive, 
            CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_employee');
        $this->db->order_by('fname');
        $this->db->limit($offset, $limit);
        $query = $this->db->get();
        // echo $this->db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridEmployee()
    {
       
       $this->db->select("
            id_employee AS id, 
            code AS code, 
            fname AS fname, 
            lname AS lname, 
            isactive AS isactive, 
            CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_employee');
        $this->db->order_by('fname');
        $query = $this->db->get();
        // echo $this->db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Employee
    */
    public function deleteEmployee($id)
    {
        $this->db->where('id_employee',$id);
        $this->db->delete('sys_employee');
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
    public function saveEmployee($fname,
          $lname,
          $username,
          $gender,
          $religion,
          $bod_place,
          $bod,
          $marital_status,
          $noc,
          $id_education,
          $blood,
          $photo,
          $address,
          $code,
          $id_company,
          $id_department,
          $id_jobtitle,
          $id_jobstatus,
          $hire,
          $expired,
          $supervisor,
          $phone,
          $mobile1,
          $mobile2,
          $email1,
          $email2,
          $id_bank,
          $bank_account,
          $idcard_type,
          $idcard_number,
          $tax,
          $isactive,
          $isovertime,
          $isresign, 
          $uuid)
    {
        $this->db->set('id_employee', $uuid);
        $this->db->set('fname', $fname);
        $this->db->set('lname', $lname);
        $this->db->set('username', $username);
        $this->db->set('gender', $gender);
        $this->db->set('id_religion', $religion);
        $this->db->set('bod_place', $bod_place);
        $this->db->set('bod', $bod);
        $this->db->set('marital_status', $marital_status);
        $this->db->set('noc', $noc);
        $this->db->set('id_education', $id_education);
        $this->db->set('blood', $blood);
        $this->db->set('photo', $photo);
        $this->db->set('address', $address);
        $this->db->set('code', $code);
        $this->db->set('id_company', $id_company);
        $this->db->set('id_department', $id_department);
        $this->db->set('id_jobtitle', $id_jobtitle);
        $this->db->set('id_jobstatus', $id_jobstatus);
        $this->db->set('hire', $hire);
        $this->db->set('expired', $expired);
        $this->db->set('supervisor', $supervisor);
        $this->db->set('phone', $phone);
        $this->db->set('mobile1', $mobile1);
        $this->db->set('mobile2', $mobile2);
        $this->db->set('email1', $email1);
        $this->db->set('email2', $email2);
        $this->db->set('id_bank', $id_bank);
        $this->db->set('bank_account', $bank_account);
        $this->db->set('idcard_type', $idcard_type);
        $this->db->set('idcard_number', $idcard_number);
        $this->db->set('tax', $tax);
        $this->db->set('isactive', $isactive);
        $this->db->set('isovertime', $isovertime);
        $this->db->set('isresign', $isresign);
        $this->db->set('createdby', $this->session->userdata('id'));
        $this->db->set('created', date('Y-m-d H:i:s'));
        $this->db->set('updatedby', $this->session->userdata('id'));
        $this->db->set('updated', date('Y-m-d H:i:s'));
        $this->db->insert('sys_employee');
    }

        /*
    * Query untuk menyimpan trs employee department
    */
    public function saveDepartment2($id_comp, $id_dept, $isactive, $uuid)
    {
            $this->db->set('id_compdept', $uuid);
            $this->db->set('id_employee', $id_comp);
            $this->db->set('id_department', $id_dept);
            $this->db->set('isactive', $isactive);
            $this->db->set('createdby', $this->session->userdata('id'));
            $this->db->set('created', date('Y-m-d H:i:s'));
            $this->db->set('updatedby', $this->session->userdata('id'));
            $this->db->set('updated', date('Y-m-d H:i:s'));
            $this->db->insert('trs_compdept');
    }

    /*
    * Query untuk Mendapatkan employee department
    */
    public function getDepartment2($id){
        $this->db->select('tcd.id_compdept AS id, 
            sse.id_employee AS id_employee, 
            sse.code AS code_employee, 
            sse.name AS name_employee, 
            tcd.id_department AS id_department,
            ssd.code AS code_department, 
            ssd.name AS name_department, 
            tcd.isactive AS isactive, 
            ssd.name AS name_department',FALSE);
        $this->db->from('trs_compdept tcd');
        $this->db->join('sys_department ssd','tcd.id_department=ssd.id_department');
        $this->db->join('sys_employee sse','tcd.id_employee=sse.id_employee');
        $this->db->where('tcd.id_employee',$id);
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
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_employee')->where('id_employee',$uuid)->get()->row()->id;
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
    public function cekEmployee($code){      
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_employee')->where('code',$code)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekEmployeeID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_employee')->where('name',$name)->where('id_employee !=', $id)->get()->row()->id;
    }

    /*
    * Query Untuk Validasi id_employee 
    */
    public function cekCompDep($id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('trs_compdept')->where('id_employee',$id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateEmployee($code, $name,$isactive, $id){
            $data = array(
                           'code'      => $code,
                           'name'       => $name,
                           'isactive'   => $isactive,
                           'updated'    => date('Y-m-d H:i:s'),
                           'updatedby'  => $this->session->userdata('id')
                        );
            $this->db->where('id_employee',$id);
            $this->db->update('sys_employee', $data);              
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridEmployee($name)
    {
        $this->db->select("sse.id_employee AS id, sse.code AS code, sse.name AS name, 
            sse.isactive AS isactive, CASE WHEN sse.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_employee sse');
        $this->db->like('LOWER(sse.name)', strtolower($name));
        $this->db->order_by('code');
        $query = $this->db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printEmployee()
    // {
    //     $this->db->select("u.id_employee AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.desseription AS desseription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $this->db->from('sys_employee AS u');
    //     $this->db->join('sys_employee AS u1', 'u.createdby=u1.id_employee');
    //     $this->db->join('sys_employee AS u2', 'u.updatedby=u2.id_employee');
    //     $this->db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $this->db->order_by('name');
    //     $query = $this->db->get();
    //     return $query;
    // }
}