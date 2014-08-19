<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_users extends CI_Controller
{
  public function __construct(){
          parent::__construct();
    $this->load->library('excel');
    $this->load->model('GeneralSetup/m_users');

  }

  public function getUsers()
  {
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result   = $this->m_users->getGridUsers($start,$limit);
    $result1  = $this->m_users->countGridUsers();
    $count    = $result1->num_rows();

    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'            => $value->id,  
        'id_role'       => $value->id_role,
        'name_role'     => $value->name_role,        
        'name'          => $value->name,                
        'role'          => $value->role,                
        'username'      => $value->username,             
        'description'   => $value->description,             
        'email'         => $value->email,             
        'isactive'      => $value->isactive    
        );
    }
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
  }
 
  public function delUsers()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      $this->m_users->deleteUsers($row->id);
    }
    
    $this->getUsers();
  }

  public function saveUsers()
  {    
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $password1    = ($this->input->post('password', TRUE) ? $this->input->post('password', TRUE) : '');
    $password     = base64_encode(sha1($password1,TRUE));
    $email        = ($this->input->post('email', TRUE) ? $this->input->post('email', TRUE) : '');
    $role         = ($this->input->post('role', TRUE) ? $this->input->post('role', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
    $uuid         = $this->m_users->getUUID();
// var_dump($role);
// exit();
    if($username == '' && $username == NULL){
      $success = 3;
    } else if($this->m_users->cekUser($username) == 0){ 
      $this->m_users->saveUsers($name, $username, $password, $email, $isactive, $description, $role, $uuid);
      if($this->m_users->saveConfirm($uuid) == 0){ $success = 0; } else { $success = 1; }
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editUsers()
  {
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $email        = ($this->input->post('email', TRUE) ? $this->input->post('email', TRUE) : '');
    $role         = ($this->input->post('role', TRUE) ? $this->input->post('role', TRUE) : '');
    if($this->input->post('isactive') == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');

    if($username == '' && $username == NULL){ $success = 3;
    } else if($this->m_users->cekUserID($username, $id) == 0){ 
      $this->m_users->updateUsers($name, $username, $email, $isactive, $description, $role, $id);
      $success = 1;
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editPswd()
  {
    $oldpswd    = ($this->input->post('oldpswd', TRUE) ? $this->input->post('oldpswd', TRUE) : '');
    $newpswd    = ($this->input->post('newpswd', TRUE) ? $this->input->post('newpswd', TRUE) : '');
    $konfpswd   = ($this->input->post('konfpswd', TRUE) ? $this->input->post('konfpswd', TRUE) : '');
    $oldpswd1   = base64_encode(sha1($oldpswd, TRUE));
    $newpswd1   = base64_encode(sha1($newpswd, TRUE));
    $konfpswd1  = base64_encode(sha1($konfpswd, TRUE));
    if($this->m_users->cekPswd() != $oldpswd1){ $success = 1;
    } else if($newpswd != $konfpswd) { 
      $success = 2;
    } else {
      $this->m_users->updatePswd($newpswd1);
      $success = 0;
    }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function searchUsers()
  {
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $result = $this->m_users->searchGridUsers($username);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'            => $value->id,
        'id_role'       => $value->id_role,        
        'name'          => $value->name,                
        'username'      => $value->username,             
        'email'         => $value->email            
       );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function printUsers()
  { 
    $result = $this->m_users->printUsers();
        $this->export($result->result());
        $objWriter  = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="report_'.__CLASS__.'_'.__FUNCTION__.date('_d_m_Y_H_i_s_').$_SERVER['SERVER_ADDR'].'.xls"');
        header('Cache-Control: max-age=0');
        $objWriter->save('php://output');

  }

    private function export($data){
    $this->excel->setActiveSheetIndex(0);
    $this->excel->getActiveSheet()->setTitle('REPORT '.strtoupper(__CLASS__));
    $this->excel->getDefaultStyle()->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    $this->excel->getDefaultStyle()->getFont()->setName('Arial')->setSize(9);
      /**
       * Header Laporan
       **/
      $this->excel->getActiveSheet()->setCellValue('A1', 'DATA USERS');
      $this->excel->getActiveSheet()->mergeCells('A1:N1');
      $this->excel->getActiveSheet()->setCellValue('A3', 'No');
      $this->excel->getActiveSheet()->setCellValue('B3', 'Nama');
      $this->excel->getActiveSheet()->setCellValue('C3', 'Nama Depan');
      $this->excel->getActiveSheet()->setCellValue('D3', 'Nama Belakang');
      $this->excel->getActiveSheet()->setCellValue('E3', 'Username');
      $this->excel->getActiveSheet()->setCellValue('F3', 'Role');
      $this->excel->getActiveSheet()->setCellValue('G3', 'Phone');
      $this->excel->getActiveSheet()->setCellValue('H3', 'NO Handphone');
      $this->excel->getActiveSheet()->setCellValue('I3', 'Email');
      $this->excel->getActiveSheet()->setCellValue('J3', 'Keterangan');
      $this->excel->getActiveSheet()->setCellValue('K3', 'Is Active');
      $this->excel->getActiveSheet()->setCellValue('L3', 'Dibuat Oleh');
      $this->excel->getActiveSheet()->setCellValue('M3', 'Dibuat Tanggal');
      $this->excel->getActiveSheet()->setCellValue('N3', 'Diupdate Oleh');
      $this->excel->getActiveSheet()->setCellValue('O3', 'Diupdate Tanggal');
      $awal = 4;
      $start  = $awal;
      /**
       * End of Header Laporan
       **/
      foreach($data as $key => $val){     
        $this->excel->getActiveSheet()->setCellValue('A'.$start, $key + 1);
        $this->excel->getActiveSheet()->setCellValue('B'.$start, $val->name);
        $this->excel->getActiveSheet()->setCellValue('C'.$start, $val->firstname);
        $this->excel->getActiveSheet()->setCellValue('D'.$start, $val->lastname);
        $this->excel->getActiveSheet()->setCellValue('E'.$start, $val->username);
        $this->excel->getActiveSheet()->setCellValue('F'.$start, $val->role);
        $this->excel->getActiveSheet()->setCellValue('G'.$start, $val->phone);
        $this->excel->getActiveSheet()->setCellValue('H'.$start, $val->mobile);
        $this->excel->getActiveSheet()->setCellValue('I'.$start, $val->email);
        $this->excel->getActiveSheet()->setCellValue('J'.$start, $val->description);
        $this->excel->getActiveSheet()->setCellValue('K'.$start, $val->active);
        $this->excel->getActiveSheet()->setCellValue('L'.$start, $val->dibuat);
        $this->excel->getActiveSheet()->setCellValue('M'.$start, $val->tgl_buat);
        $this->excel->getActiveSheet()->setCellValue('N'.$start, $val->diupdate);
        $this->excel->getActiveSheet()->setCellValue('O'.$start, $val->tgl_update);
        $start++;
      }
      $this->excel->getActiveSheet()->getStyle('A'.$awal.'O'.$start)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
    }

}