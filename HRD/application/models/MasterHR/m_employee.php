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
            se.id_employee AS id, 
            se.fname AS fname, 
            se.lname AS lname, 
            se.username AS username, 
            se.gender AS gender,             
            se.id_religion AS id_religion, 
            se.bod_place AS bod_place, 
            se.bod AS bod, 
            se.marital_status AS marital_status, 
            se.noc AS noc,             
            se.id_education AS id_education, 
            se.blood AS blood, 
            se.photo AS photo, 
            se.address AS address, 
            se.id_country AS id_country,
            sc.name AS name_country,             
            se.id_province AS id_province,
            sp.name AS name_province, 
            se.id_region AS id_region,
            sr.name AS name_region,  
            se.zip AS zip, 
            se.code AS code, 
            se.id_company AS id_company, 
            se.id_department AS id_department,             
            se.id_jobtitle AS id_jobtitle, 
            se.id_jobstatus AS id_jobstatus, 
            se.hire AS hire, 
            se.expired AS expired, 
            se.supervisor AS supervisor,             
            se.phone AS phone, 
            se.mobile1 AS mobile1, 
            se.mobile2 AS mobile2, 
            se.email1 AS email1, 
            se.email2 AS email2, 
            se.id_bank AS id_bank,             
            se.bank_account AS bank_account, 
            se.idcard_type AS idcard_type, 
            se.idcard_number AS idcard_number, 
            se.tax AS tax,             
            se.isactive AS isactive, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive,
            se.isovertime AS isovertime, CASE WHEN isovertime = 'Y' THEN 1 ELSE 0 END AS isovertime,
            se.isresign AS isresign, CASE WHEN isresign = 'Y' THEN 1 ELSE 0 END AS isresign", FALSE);
        $this->db->from('sys_employee se');
        $this->db->join('sys_country sc','se.id_country=sc.id_country','left');
        $this->db->join('sys_province sp','se.id_province=sp.id_province','left');
        $this->db->join('sys_region sr','se.id_region=sr.id_region','left');
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
            fname AS fname, 
            lname AS lname, 
            username AS username, 
            gender AS gender,             
            id_religion AS id_religion, 
            bod_place AS bod_place, 
            bod AS bod, 
            marital_status AS marital_status, 
            noc AS noc,             
            id_education AS id_education, 
            blood AS blood, 
            photo AS photo, 
            address AS address, 
            id_country AS id_country,             
            id_province AS id_province, 
            id_region AS id_region, 
            zip AS zip, 
            code AS code, 
            id_company AS id_company, 
            id_department AS id_department,             
            id_jobtitle AS id_jobtitle, 
            id_jobstatus AS id_jobstatus, 
            hire AS hire, 
            expired AS expired, 
            supervisor AS supervisor,             
            phone AS phone, 
            mobile1 AS mobile1, 
            mobile2 AS mobile2, 
            email1 AS email1, 
            email2 AS email2, 
            id_bank AS id_bank,             
            bank_account AS bank_account, 
            idcard_type AS idcard_type, 
            idcard_number AS idcard_number, 
            tax AS tax,             
            isactive AS isactive, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive,
            isovertime AS isovertime, CASE WHEN isovertime = 'Y' THEN 1 ELSE 0 END AS isovertime,
            isresign AS isresign, CASE WHEN isresign = 'Y' THEN 1 ELSE 0 END AS isresign", FALSE);
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
          $id_country,
          $id_province,
          $id_region,
          $zip,
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
        $this->db->set('id_country', $id_country);
        $this->db->set('id_province', $id_province);
        $this->db->set('id_region', $id_region);
        $this->db->set('zip', $zip);
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
    public function cekEmployeeID($code, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_employee')->where('code',$code)->where('id_employee !=', $id)->get()->row()->id;
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
    public function updateEmployee(
        $id,
        $fname,
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
        $id_country,
        $id_province,
        $id_region,
        $code,
        $zip,
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
        $isresign 

    )
    {
        $data = array(
                       'fname'              => $fname,
                       'lname'              => $lname,
                       'isactive'           => $isactive,
                        'username'          => $username,
                        'gender'            => $gender,
                        'id_religion'       => $religion,
                        'bod_place'         => $bod_place,
                        'bod'               => $bod,
                        'marital_status'    => $marital_status,
                        'noc'               => $noc,
                        'id_education'      => $id_education,
                        'blood'             => $blood,
                        'photo'             => $photo,
                        'address'           => $address,
                        'id_country'        => $id_country,
                        'id_province'       => $id_province,
                        'id_region'         => $id_region,
                        'zip'               => $zip,
                        'code'              => $code,
                        'id_company'        => $id_company,
                        'id_department'     => $id_department,
                        'id_jobtitle'       => $id_jobtitle,
                        'id_jobstatus'      => $id_jobstatus,
                        'hire'              => $hire,
                        'expired'           => $expired,
                        'supervisor'        => $supervisor,
                        'phone'             => $phone,
                        'mobile1'           => $mobile1,
                        'mobile2'           => $mobile2,
                        'email1'            => $email1,
                        'email2'            => $email2,
                        'id_bank'           => $id_bank,
                        'bank_account'      => $bank_account,
                        'idcard_type'       => $idcard_type,
                        'idcard_number'     => $idcard_number,
                        'tax'               => $tax,
                        'isactive'          => $isactive,
                        'isovertime'        => $isovertime,
                        'isresign'          => $isresign,
                        'updated'           => date('Y-m-d H:i:s'),
                        'updatedby'         => $this->session->userdata('id')
                    );
        $this->db->where('id_employee',$id);
        $this->db->update('sys_employee', $data);
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridEmployee($name)
    {
        $this->db->select("sse.id_employee AS id, sse.code AS code, sse.fname AS fname, sse.lname AS lname, 
            sse.isactive AS isactive, CASE WHEN sse.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $this->db->from('sys_employee sse');
        $this->db->like('LOWER(sse.code)', strtolower($name));
        $this->db->or_like('LOWER(sse.fname)', strtolower($name));
        $this->db->or_like('LOWER(sse.lname)', strtolower($name));
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