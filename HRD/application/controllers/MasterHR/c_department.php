<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_department extends CI_Controller
{
  public function __construct(){
          parent::__construct();
    $this->load->library('excel');
    $this->load->model('MasterHR/m_department');

  }

  public function getDepartment()
  {
    $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
    $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_department->getGridDepartment($start,$limit);
    $result1 = $this->m_department->countGridDepartment();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,
        'code'        => $value->code,        
        'name'        => $value->name,
        'isactive'    => $value->isactive,             
        );
    }
        $data['total'] = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function delDepartment()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      $this->m_department->deleteDepartment($row->id);
    }
  
  $this->getDepartment();   
  }

  public function saveDepartment()
  {    
    $code         = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
    $uuid         = $this->m_department->getUUID();

    if($name == '' && $name == NULL){
      $success = 3;
    } else if($this->m_department->cekDepartment($name) == 0){ 
      $this->m_department->saveDepartment($code, $name, $isactive, $uuid);
      if($this->m_department->saveConfirm($uuid) == 0){ $success = 0; } else { $success = 1; }
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editDepartment()
  {
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $code         = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    if($this->input->post('isactive') == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
// var_dump($id, $name);
    if($name == '' && $name == NULL){ $success = 3;
    } else if($this->m_department->cekDepartmentID($name, $id) == 0){ 
      $this->m_department->updateDepartment($code, $name, $isactive, $id);
      $success = 1;
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function searchDepartment()
  {
    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $result = $this->m_department->searchGridDepartment($name);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,
        'code'        => $value->code,        
        'name'        => $value->name  
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function viewDepartment()
  {
    $result = $this->m_department->viewDepartment();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                           
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function printDepartment()
  { 
    $result = $this->m_department->printDepartment();
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
      $this->excel->getActiveSheet()->setCellValue('A1', 'DATA ROLE');
      $this->excel->getActiveSheet()->mergeCells('A1:N1');
      $this->excel->getActiveSheet()->setCellValue('A3', 'No');
      $this->excel->getActiveSheet()->setCellValue('B3', 'Nama');
      $this->excel->getActiveSheet()->setCellValue('C3', 'Keterangan');
      $this->excel->getActiveSheet()->setCellValue('D3', 'Is Active');
      $this->excel->getActiveSheet()->setCellValue('E3', 'Dibuat Oleh');
      $this->excel->getActiveSheet()->setCellValue('F3', 'Dibuat Tanggal');
      $this->excel->getActiveSheet()->setCellValue('G3', 'Diupdate Oleh');
      $this->excel->getActiveSheet()->setCellValue('H3', 'Diupdate Tanggal');
      $awal = 4;
      $start  = $awal;
      /**
       * End of Header Laporan
       **/
      foreach($data as $key => $val){     
        $this->excel->getActiveSheet()->setCellValue('A'.$start, $key + 1);
        $this->excel->getActiveSheet()->setCellValue('B'.$start, $val->name);
        $this->excel->getActiveSheet()->setCellValue('C'.$start, $val->description);
        $this->excel->getActiveSheet()->setCellValue('D'.$start, $val->active);
        $this->excel->getActiveSheet()->setCellValue('E'.$start, $val->dibuat);
        $this->excel->getActiveSheet()->setCellValue('F'.$start, $val->tgl_buat);
        $this->excel->getActiveSheet()->setCellValue('G'.$start, $val->diupdate);
        $this->excel->getActiveSheet()->setCellValue('H'.$start, $val->tgl_update);
        $start++;
      }
      $this->excel->getActiveSheet()->getStyle('A'.$awal.':H'.$start)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
    }
  public function saveDepartmentModul()
  {    
    $id_department       = ($this->input->post('id_department', TRUE) ? $this->input->post('id_department', TRUE) : '');
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $iscreate1    = ($this->input->post('iscreate', TRUE) ? $this->input->post('iscreate', TRUE) : '');
    if($iscreate1 == 'true') { $iscreate = 'Y'; } else { $iscreate = 'N'; }
    $isupdate1    = ($this->input->post('isupdate', TRUE) ? $this->input->post('isupdate', TRUE) : '');
    if($isupdate1 == 'true') { $isupdate = 'Y'; } else { $isupdate = 'N'; }
    $isdelete1    = ($this->input->post('isdelete', TRUE) ? $this->input->post('isdelete', TRUE) : '');
    if($isdelete1 == 'true') { $isdelete = 'Y'; } else { $isdelete = 'N'; }
    $isprocess1   = ($this->input->post('isprocess', TRUE) ? $this->input->post('isprocess', TRUE) : '');
    if($isprocess1 == 'true') { $isprocess = 'Y'; } else { $isprocess = 'N'; }
    $uuid         = $this->m_department->getUUID();

    if($id_department == '' || $id_department == NULL){
      $success = 1; 
    } else if($id == '' || $id == NULL){ 
      $success = 2; 
    } else if($this->m_department->cekIDModul($id, $id_department) == 0){ 
      $this->m_department->saveDepartmentModul($id, $id_department, $isactive, $iscreate, $isupdate, $isdelete, $isprocess, $uuid);
      if($this->m_department->saveConfirmModul($uuid) == 0){ $success = 4; 
      } else { $success = 0; }
    } else { $success = 3; }

      $result = $this->m_department->getModul($id_department);
      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
            'id'          => $value->id,        
            'id_department'      => $id_department,        
            'name'        => $value->name,                          
            'menu'        => $value->menu,                          
            'isactive'    => $value->isactive,        
            'iscreate'    => $value->iscreate,          
            'isupdate'    => $value->isupdate,         
            'isdelete'    => $value->isdelete,          
            'isprocess'   => $value->isprocess
            );
        }

    $data['total'] = $success;
    $data['success'] = TRUE;
    echo json_encode($data); 
  }

  public function delDepartmentModul()
  {
    $id   = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $id_department   = ($this->input->post('id_department', TRUE) ? $this->input->post('id_department', TRUE) : '');

      $this->m_department->deleteDepartmentModul($id);
      $result = $this->m_department->getModul($id_department);

      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
            'id'          => $value->id,        
            'id_department'      => $id_department,        
            'name'        => $value->name,                          
            'menu'        => $value->menu,                          
            'isactive'    => $value->isactive,        
            'iscreate'    => $value->iscreate,          
            'isupdate'    => $value->isupdate,         
            'isdelete'    => $value->isdelete,          
            'isprocess'   => $value->isprocess
            );
        }
    $data['success'] = TRUE;
    echo json_encode($data);
  }
}