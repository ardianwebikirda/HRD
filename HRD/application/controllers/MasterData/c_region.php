<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class C_region extends CI_Controller
{
  /*
  * Contruct Function Aplikasi
  * Seluruh Fungsi Dalam Class ini Bekerja dengan cara Memparsing Parameter ke Class Model
  */
  public function __construct(){
  	parent::__construct();
    $this->load->library('excel');
    $this->load->model('MasterData/m_region');

  }

  	/*
    * Fungsi untuk mendapatkan data dari DB 
    */
  public function getRegion()
  {
    $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
    $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result   = $this->m_region->getGridRegion($start,$limit);
    $result1  = $this->m_region->countGridRegion();
    $count    = $result1->num_rows();

    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'            => $value->id,
        'id_province'    => $value->id_province,
        'province'       => $value->province, 
        'code'          => $value->code,         
        'name'          => $value->name                
           
        );
    }

    $data['total']   = $count;
    $data['success'] = true;
    echo json_encode($data);
  }

   	/*
    * Fungsi untuk menghapus data dari DB 
    */
  public function delRegion()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
    	$this->m_region->deleteRegion($row->id);
    }
	
	$this->getRegion();   
  }

    /*
    * Fungsi untuk menyimpan data ke DB 
    */
  public function saveRegion()
  {    
    $code         = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $province      = ($this->input->post('province', TRUE) ? $this->input->post('province', TRUE) : '');
    // $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    // if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $uuid         = $this->m_region->getUUID();

    if($name == '' && $name == NULL){
      $success = 3;
    } else if($this->m_region->cekRegion($name) == 0){ 
      $this->m_region->saveRegion($code, $name, $province, $uuid);
      if($this->m_region->saveConfirm($uuid) == 0){ $success = 0; } else { $success = 1; }
    } else { 
      $success = 2; 
    }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

    /*
    * Fungsi untuk update data ke DB 
    */
  public function editRegion()
  {
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $code         = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $province      = ($this->input->post('province', TRUE) ? $this->input->post('province', TRUE) : '');
    // if($this->input->post('isactive') == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }

    if($name == '' && $name == NULL){ 
    	$success = 3;
    } else if($this->m_region->cekRegionID($name, $id) == 0){ 
      $this->m_region->updateRegion($code, $name, $province, $id);
      $success = 1;
    } else { 
    	$success = 2; 
    }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

    /*
    * Fungsi untuk mencari data DB 
    */
  public function searchRegion()
  {
    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $result = $this->m_region->searchGridRegion($name);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'       => $value->id,
        'province'  => $value->province,
        'code'     => $value->code,        
        'name'     => $value->name            
       );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  /*
  * Fungsi untuk mendapatkan data berelasi
  */
  public function chainRegion()
  {
    $id       = $this->input->post('provinceId');
    $result1  = $this->m_region->chainRegion($id);
    $count    = $result1->num_rows();

    foreach ($result1->result() as $key => $value) {
      $data['data'][] = array(        
        'id'            => $value->id,
        'code'          => $value->code,         
        'name'          => $value->name                
           
        );
    }

    // $data['total']   = $count;
    $data['success'] = true;
    echo json_encode($data);
  }

  // public function printRegion()
  // { 
  //   $result = $this->m_region->printRegion();
  //       $this->export($result->result());
  //       $objWriter  = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
  //       header('Content-Type: application/vnd.ms-excel');
  //       header('Content-Disposition: attachment;filename="report_'.__CLASS__.'_'.__FUNCTION__.date('_d_m_Y_H_i_s_').$_SERVER['SERVER_ADDR'].'.xls"');
  //       header('Cache-Control: max-age=0');
  //       $objWriter->save('php://output');

  // }

  //   private function export($data){
  //   $this->excel->setActiveSheetIndex(0);
  //   $this->excel->getActiveSheet()->setTitle('REPORT '.strtoupper(__CLASS__));
  //   $this->excel->getDefaultStyle()->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
  //   $this->excel->getDefaultStyle()->getFont()->setName('Arial')->setSize(9);
  //     /**
  //      * Header Laporan
  //      **/
  //     $this->excel->getActiveSheet()->setCellValue('A1', 'DATA USERS');
  //     $this->excel->getActiveSheet()->mergeCells('A1:N1');
  //     $this->excel->getActiveSheet()->setCellValue('A3', 'No');
  //     $this->excel->getActiveSheet()->setCellValue('B3', 'Nama');
  //     $this->excel->getActiveSheet()->setCellValue('C3', 'Nama Depan');
  //     $this->excel->getActiveSheet()->setCellValue('D3', 'Nama Belakang');
  //     $this->excel->getActiveSheet()->setCellValue('E3', 'Username');
  //     $this->excel->getActiveSheet()->setCellValue('F3', 'Role');
  //     $this->excel->getActiveSheet()->setCellValue('G3', 'Phone');
  //     $this->excel->getActiveSheet()->setCellValue('H3', 'NO Handphone');
  //     $this->excel->getActiveSheet()->setCellValue('I3', 'Email');
  //     $this->excel->getActiveSheet()->setCellValue('J3', 'Keterangan');
  //     $this->excel->getActiveSheet()->setCellValue('K3', 'Is Active');
  //     $this->excel->getActiveSheet()->setCellValue('L3', 'Dibuat Oleh');
  //     $this->excel->getActiveSheet()->setCellValue('M3', 'Dibuat Tanggal');
  //     $this->excel->getActiveSheet()->setCellValue('N3', 'Diupdate Oleh');
  //     $this->excel->getActiveSheet()->setCellValue('O3', 'Diupdate Tanggal');
  //     $awal = 4;
  //     $start  = $awal;
  //     /**
  //      * End of Header Laporan
  //      **/
  //     foreach($data as $key => $val){     
  //       $this->excel->getActiveSheet()->setCellValue('A'.$start, $key + 1);
  //       $this->excel->getActiveSheet()->setCellValue('B'.$start, $val->name);
  //       $this->excel->getActiveSheet()->setCellValue('C'.$start, $val->firstname);
  //       $this->excel->getActiveSheet()->setCellValue('D'.$start, $val->lastname);
  //       $this->excel->getActiveSheet()->setCellValue('E'.$start, $val->username);
  //       $this->excel->getActiveSheet()->setCellValue('F'.$start, $val->role);
  //       $this->excel->getActiveSheet()->setCellValue('G'.$start, $val->phone);
  //       $this->excel->getActiveSheet()->setCellValue('H'.$start, $val->mobile);
  //       $this->excel->getActiveSheet()->setCellValue('I'.$start, $val->email);
  //       $this->excel->getActiveSheet()->setCellValue('J'.$start, $val->description);
  //       $this->excel->getActiveSheet()->setCellValue('K'.$start, $val->active);
  //       $this->excel->getActiveSheet()->setCellValue('L'.$start, $val->dibuat);
  //       $this->excel->getActiveSheet()->setCellValue('M'.$start, $val->tgl_buat);
  //       $this->excel->getActiveSheet()->setCellValue('N'.$start, $val->diupdate);
  //       $this->excel->getActiveSheet()->setCellValue('O'.$start, $val->tgl_update);
  //       $start++;
  //     }
  //     $this->excel->getActiveSheet()->getStyle('A'.$awal.'O'.$start)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
  //   }

}
